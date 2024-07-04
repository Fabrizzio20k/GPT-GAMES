"use client"

import { useState, useEffect } from "react";
import MainLayoutPage from "@/pages/MainLayoutPage";
import { notFound } from "next/navigation";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaAndroid } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { getGameById } from "@/services/api";
import { Toaster } from "sonner";
import Loader from "@/components/Loader";
import Image from "next/image";
import { toastError } from "@/utils/toastError";



type GameProps = {
    params: {
        api_id: string;
    };
}

export default function Game({ params }: GameProps) {
    const [game, setGame] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [gameNotFound, setGameNotFound] = useState(false);

    const displayName = game.name || 'GPTGame'
    const displaySummary = game.summary || 'Game summary not found'
    const displayReleaseDate = game.realase_year || 'Game without release date'
    const displayImg = game.cover || '/assets/logo/logo.png'

    const fetchGame = async () => {
        setLoading(true);
        const { errors, dataGame } = await getGameById(Number(params.api_id));
        setGame(dataGame);
        // Handle erros?

        if (Object.keys(dataGame).length === 0) {
            setGameNotFound(true);
        }

        setLoading(false)
    }

    if (gameNotFound) {
        notFound();
    }

    useEffect(() => {
        fetchGame();
    }, []);

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <h1 className="font-alata text-2xl mb-5">{game.name}</h1>
            {
                Object.keys(game).length > 0 &&
                <section className="flex">
                    <div className='w-1/3'>
                        <Image
                            src={displayImg}
                            alt={displayName}
                            width={400}
                            height={300}
                            sizes="(max-width: 768px) 100vw, 
                                    (max-width: 1200px) 50vw, 
                                    33vw"
                            className="object-cover object-center rounded-lg"
                        />
                    </div>
                    <div className="w-2/3 p-3">
                        <div className="font-bold">Summary</div>
                        <p className="mb-3">{displaySummary}</p>

                        <div className="font-bold">Creators</div>
                        <p>
                            {
                                Object.keys(game.involved_companies).length > 0 ?
                                    game.involved_companies.map((company: string, index: number) => (
                                        <span key={index}>{company}, </span>
                                    ))
                                    : "Game creators not found"
                            }
                        </p>

                        <div className="font-bold mt-4"> Released Year</div>
                        <p>
                            {displayReleaseDate}
                        </p>

                        <div className="font-bold mt-4">Genres:</div>
                        <p>
                            {
                                Object.keys(game.genres).length > 0 ?
                                    game.genres?.map((genre: string, index: number) => (
                                        <span key={index}>{genre}, </span>
                                    ))
                                    : 'Genres not found'
                            }
                        </p>

                        <div className="font-bold mt-4">Platforms</div>
                        <div className="flex flex-row text-xl gap-2">
                            {
                                Object.keys(game.platforms).length > 0 ?
                                    game.platforms.map((platform: string, index: number) => {
                                        let icon;
                                        switch (true) {
                                            case platform.includes("PC"):
                                                icon = <FaWindows />;
                                                break;
                                            case platform.includes("PlayStation"):
                                                icon = <FaPlaystation />;
                                                break;
                                            case platform.includes("Xbox"):
                                                icon = <FaXbox />;
                                                break;
                                            case platform.includes("Nintendo"):
                                                icon = <BsNintendoSwitch />;
                                                break;
                                            case platform.includes("Mac") || platform.includes("iOS"):
                                                icon = <FaApple />;
                                                break;
                                            case platform.includes("Android"):
                                                icon = <FaAndroid />;
                                                break;
                                            default:
                                                icon = platform;
                                        }
                                        return <span key={index}>{icon}</span>;
                                    })
                                    : 'Platforms not found'
                            }
                        </div>
                    </div>
                </section>
            }
        </MainLayoutPage>
    );
};
