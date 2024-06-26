"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { searchGamesByName } from "@/services/api";
import MainLayoutPage from "@/pages/MainLayoutPage";
import Offer from "@/components/Offer";

export default function Search() { 
    const user = useAppSelector((state) => state.user);

    const [activeButton, setActiveButton] = useState('offers');
    const [searchResult, setSearchResult] = useState([] as any[]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);

    const searchParams = useSearchParams();
    const router = useRouter();

    const fetchGames = async () => {
        const gameName = searchParams ? searchParams.get('name') || '' : '';
        // console.log(gameName);

        // if (activeButton === 'offers' && gameName !== '') {
            
        // }

        if (activeButton === 'games' && gameName !== '') {

            const games = await searchGamesByName(gameName, user.token);
            setSearchResult(games);
            // console.log(games);
        }
    }

    useEffect(() => {
        setSearchResult([]);
        fetchGames();
    }, [searchParams, activeButton])

    return (
        <MainLayoutPage>
            <article className="flex justify-between items-center mb-5">
                <h1 className="text-2xl">EXPLORE THE CATALOG</h1>
                <section>
                    <button
                        className={`px-4 py-2 rounded-2xl mr-4 ${activeButton === 'offers' ? 'gradient button-gradient' : 'hover:bg-tertiary'}`}
                        onClick={() => setActiveButton('offers')}
                    >
                        Offers
                    </button>
                    <button
                        className={`px-4 py-2 rounded-2xl ${activeButton === 'games' ? 'gradient button-gradient' : 'hover:bg-tertiary'}`}
                        onClick={() => setActiveButton('games')}
                    >
                        Games
                    </button>
                </section>
            </article>

            <article className="w-full gallery">
                {
                    activeButton === 'offers' ? 'Offers' : (
                        searchResult.map((game, index) => (
                            <Offer 
                                key={index}
                                api_id={game.api_id}
                                title={game.name}
                                price={0}
                                img_url={game.cover}
                                isOffer={activeButton === 'offers'}
                            />
                        ))
                    ) 
                }
            </article>
        </MainLayoutPage>
    );
}