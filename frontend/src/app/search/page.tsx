"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { 
    searchUserByUsername,
    searchOfferByName,
    searchGamesByName 
} from "@/services/api";
import { 
    SearchUser, 
    SearchOffer, 
    SearchGame 
} from "@/components";
import { toastError } from "@/utils/toastError";
import { Toaster } from "sonner";
import Loader from "@/components/Loader";
import MainLayoutPage from "@/pages/MainLayoutPage";

export default function Search() { 
    const user = useAppSelector((state) => state.user);

    const [activeButton, setActiveButton] = useState('offers');
    const [searchResult, setSearchResult] = useState([] as any[]);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();

    const fetchGames = async (searchParam: string) => {
        setLoading(true);
        if (activeButton === 'users') {
            const { errors, dataUsers } = await searchUserByUsername(searchParam, user.token);
            Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataUsers);
        } else if (activeButton === 'offers') {
            // const { errors, dataOffers } = await searchOfferByName(searchParam, user.token);
            // Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataOffers);
            console.log('Offerssss');
        } else if (activeButton === 'games') {
            const { errors, dataGames } = await searchGamesByName(searchParam, user.token);
            Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataGames);            
        }
        setLoading(false);
    }

    useEffect(() => {
        setSearchResult([]);
        const searchParam = searchParams ? searchParams.get('name') || '' : '';
        if (searchParam !== '') {
            fetchGames(searchParam);
        }
    }, [searchParams, activeButton])

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <article className="flex justify-between items-center mb-5">
                {(() => {
                    switch (activeButton) {
                    case 'users':
                        return <h1 className="text-2xl">FIND USERS</h1>;
                    case 'offers':
                        return <h1 className="text-2xl">SEARCH OFFERS</h1>;
                    case 'games':
                        return <h1 className="text-2xl">EXPLORE THE CATALOG</h1>;
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
                case 'users':
                    return (
                        <>
                            {searchResult.map((user, index) => (
                            <SearchUser 
                                key={index}
                                id={user.id}
                                username={user.username}
                                description={user.description}
                                profile_picture={user.profile_picture}
                            />
                            ))}
                        </>
                    )

                case 'offers':
                    return (
                        // <>
                        //     {searchResult.map((offer, index) => (
                        //     <SearchOffer 
                        //         key={index}
                        //         id={offer.id}
                        //         name={offer.name}
                        //         price={offer.price}
                        //         discount={offer.discount}
                        //         seller={offer.seller}
                        //         img_url={offer.cover}
                        //     />
                        //     ))}
                        // </>
                        <div>Offers</div>
                    )

                case 'games':
                    return (
                        <>
                            {searchResult.map((game, index) => (
                            <SearchGame 
                                key={index}
                                api_id={game.api_id}
                                title={game.name}
                                price={10}
                                img_url={game.cover}
                            />
                            ))}
                        </>
                        );
                    
                default:
                    return null;
                }
            })()}
            </article>
        </MainLayoutPage>
    );
}