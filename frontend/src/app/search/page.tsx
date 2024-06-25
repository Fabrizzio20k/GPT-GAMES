"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { searchGamesByName } from "@/services/api";
import MainLayoutPage from "@/pages/MainLayoutPage";
import Offer from "@/components/Offer";
import { clear } from "console";

export default function Search() { 
    const user = useAppSelector((state) => state.user);

    const [activeButton, setActiveButton] = useState('offers');
    const [searchResult, setSearchResult] = useState([] as any[]);

    const searchParams = useSearchParams();

    const fetchGames = async () => {
        const gameName = searchParams ? searchParams.get('name') || '' : '';
        console.log(gameName);

        // if (activeButton === 'offers' && gameName !== '') {
            
        // }

        if (activeButton === 'games' && gameName !== '') {

            const games = await searchGamesByName(gameName, user.token);
            setSearchResult(games);
            console.log(games);
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
                    searchResult.map((game, index) => (
                        <Offer 
                            key={index}
                            title={game.name}
                            price={10}
                            img_url={game.cover}
                        />
                    ))
                }
            </article>
        </MainLayoutPage>
    );
}