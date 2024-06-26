"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { searchGamesByName } from "@/services/api";
import MainLayoutPage from "@/pages/MainLayoutPage";
import Offer from "@/components/Offer";
import { toastError } from "@/utils/toastError";
import Loader from "@/components/Loader";
import { Toaster } from "sonner";

export default function Search() { 
    const user = useAppSelector((state) => state.user);

    const [activeButton, setActiveButton] = useState('offers');
    const [searchResult, setSearchResult] = useState([] as any[]);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

    const fetchGames = async (gameName: string) => {
        setLoading(true);
        if (activeButton === 'offers') {
            alert('Offers');
        } else if (activeButton === 'games') {
            const { errors, dataGames } = await searchGamesByName(gameName, user.token);
            Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataGames);
        } else if (activeButton === 'users') {
            alert('Users');
        }

        setLoading(false);
    }

    useEffect(() => {
        setSearchResult([]);
        const gameName = searchParams ? searchParams.get('name') || '' : '';
        if (gameName !== '') {
            fetchGames(gameName);
        }
    }, [searchParams, activeButton])

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <article className="flex justify-between items-center mb-5">
                {(() => {
                    switch (activeButton) {
                    case 'offers':
                        return <h1 className="text-2xl">SEARCH OFFERS</h1>;
                    case 'games':
                        return <h1 className="text-2xl">EXPLORE THE CATALOG</h1>;
                    case 'users':
                        return <h1 className="text-2xl">FIND USERS</h1>;
                    default:
                        return <h1 className="text-2xl">What?</h1>;
                    }
                })()}
            
                <section>
                    <button
                        className={`px-4 py-2 rounded-2xl mr-4 ${activeButton === 'users' ? 'gradient button-gradient' : 'hover:bg-tertiary'}`}
                        onClick={() => setActiveButton('users')}
                    >
                        Users
                    </button>
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
            {(() => {
                switch (activeButton) {
                    case 'offers':
                        return <div>Offers</div>;

                    case 'games':
                        return (
                        <>
                            {searchResult.map((game, index) => (
                            <Offer 
                                key={index}
                                api_id={game.api_id}
                                title={game.name}
                                price={10}
                                img_url={game.cover}
                            />
                            ))}
                        </>
                        );
                    
                    case 'users':
                        return <div>Users</div>;
                        
                    default:
                        return null;
                }
            })()}
            </article>
        </MainLayoutPage>
    );
}