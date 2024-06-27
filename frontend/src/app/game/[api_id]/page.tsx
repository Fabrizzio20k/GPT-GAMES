"use client"

import { useState, useEffect } from "react";
import MainLayoutPage from "@/pages/MainLayoutPage";
import { notFound } from "next/navigation";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
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

    const fetchGame = async () => {
        setLoading(true);
        const { errors, dataGame } = await getGameById(Number(params.api_id));
        Object.keys(errors).length > 0 ? toastError(errors) : setGame(dataGame);

        console.log(dataGame);
        setLoading(false)
    }

    useEffect(() => {
        fetchGame();
    }, []);


    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <h1 className="font-alata text-2xl mb-5">{game.name}</h1>
            <section className="flex">
                <div className='w-1/3'>
                    <Image
                        src={game.cover}
                        alt={game.name}
                        width={300}
                        height={300}
                        sizes="(max-width: 768px) 100vw, 
                                (max-width: 1200px) 50vw, 
                                33vw"
                        className="object-cover object-center rounded-lg"
                    />
                </div>
                <div className="w-2/3 p-3">
                    <div className="font-bold">Summary</div>
                    <p className="mb-3">{game.summary}</p>

                    <div className="font-bold">Creators</div>
                    <p>
                        {
                            game.involved_companies?.map((company: string, index: number) => (
                                <span key={index}>{company}, </span>
                            ))
                        }
                    </p>

                    <div className="font-bold mt-4"> Released Year</div>
                    <p>
                        {game.release_year}
                    </p>

                    <div className="font-bold mt-4">Genres:</div>
                    <p>
                        {
                            game.genres?.map((genre: string, index: number) => (
                                <span key={index}>{genre}, </span>
                            ))
                        }
                    </p>

                    <div className="font-bold mt-4">Platforms</div>
                    <div className="flex flex-row text-xl gap-2">
                        {
                            game.platforms?.map((platform: string, index: number) => (
                                <span key={index}>
                                    {platform.includes("PC") ? <FaWindows /> :
                                        platform.includes("PlayStation") ? <FaPlaystation /> :
                                            platform.includes("Xbox") ? <FaXbox /> :
                                                platform.includes("Nintendo") ? <BsNintendoSwitch /> : platform
                                    }
                                </span>
                            ))
                        }
                    </div>
                </div>
            </section>
        </MainLayoutPage>
    );
};
