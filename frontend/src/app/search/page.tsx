"use client"

import { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import {
    searchUserByUsername,
    searchOfferByName,
    searchGamesByName
} from "@/services/api";
import {
    SearchUser,
    OfferNew,
    SearchGame
} from "@/components";
import { toastError } from "@/utils/toastError";
import { Toaster } from "sonner";
import Loader from "@/components/Loader";
import MainLayoutPage from "@/pages/MainLayoutPage";

export default function Search() {
    const user = useAppSelector((state) => state.user);

    const [activeButton, setActiveButton] = useState('Offers');
    const [searchResult, setSearchResult] = useState([] as any[]);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const searchParams = useSearchParams();

    const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });

    const handleDropdownSelect = (value: string) => {
        setActiveButton(value);
        setIsDropdownOpen(false);
    };

    const fetchGames = async (searchParam: string) => {
        setLoading(true);
        if (activeButton === 'Users') {
            const { errors, dataUsers } = await searchUserByUsername(searchParam, user.token);
            Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataUsers);
        } else if (activeButton === 'Offers') {
            const { errors, dataOffers } = await searchOfferByName(searchParam, user.token);
            Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataOffers);
        } else if (activeButton === 'Games') {
            if (searchParam === '') {
                searchParam = 'Minecraft'
            }
            const { errors, dataGames } = await searchGamesByName(searchParam, user.token);
            Object.keys(errors).length > 0 ? toastError(errors) : setSearchResult(dataGames);
        }
        setLoading(false);
    }

    useEffect(() => {
        setSearchResult([]);
        const searchParam = searchParams ? searchParams.get('name') || '' : '';
        fetchGames(searchParam);
    }, [searchParams, activeButton])

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <article className="flex justify-between items-center mb-5">
                {(() => {
                    switch (activeButton) {
                        case 'Offers':
                            return <h1 className="text-xl sm:text-2xl">SEARCH OFFERS</h1>;
                        case 'Users':
                            return <h1 className="text-xl sm:text-2xl">FIND USERS</h1>;
                        case 'Games':
                            return <h1 className="text-lg sm:text-2xl">EXPLORE THE CATALOG</h1>;
                        default:
                            return <h1 className="text-xl sm:text-2xl">What?</h1>;
                    }
                })()}

                {isSmallScreen ? (
                    <div className="relative">
                        <button
                            className="custom-select"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {activeButton}
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute w-full bg-ebony-950 p-2 text-white rounded-2xl mt-2 z-10">
                                <li
                                    className="px-4 py-2 hover:bg-secondary cursor-pointer rounded-lg"
                                    onClick={() => handleDropdownSelect('Offers')}
                                >
                                    Offers
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-secondary cursor-pointer rounded-lg"
                                    onClick={() => handleDropdownSelect('Users')}
                                >
                                    Users
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-secondary cursor-pointer rounded-lg"
                                    onClick={() => handleDropdownSelect('Games')}
                                >
                                    Games
                                </li>
                            </ul>
                        )}
                    </div>
                ) : (
                    <section>
                        <button
                            className={`px-4 py-2 rounded-2xl mr-4 ${activeButton === 'Offers' ? 'gradient button-gradient' : 'hover:bg-tertiary'}`}
                            onClick={() => setActiveButton('Offers')}
                        >
                            Offers
                        </button>
                        <button
                            className={`px-4 py-2 rounded-2xl mr-4 ${activeButton === 'Users' ? 'gradient button-gradient' : 'hover:bg-tertiary'}`}
                            onClick={() => setActiveButton('Users')}
                        >
                            Users
                        </button>
                        <button
                            className={`px-4 py-2 rounded-2xl ${activeButton === 'Games' ? 'gradient button-gradient' : 'hover:bg-tertiary'}`}
                            onClick={() => setActiveButton('Games')}
                        >
                            Games
                        </button>
                    </section>
                )}
            </article>

            <article className="w-full gallery">
                {
                    searchResult.length === 0 &&
                    <h1 className="text-2xl">No results found ☠️</h1>
                }
                {(() => {
                    switch (activeButton) {
                        case 'Offers':
                            return (
                                <>
                                    {searchResult.map((offer, index) => (
                                        <OfferNew
                                            key={index}
                                            id={offer.id}
                                            seller={offer.seller}
                                            game={offer.game}
                                            price={offer.price}
                                            discount={offer.discount}
                                            published_date={offer.published_date}
                                            description={offer.description}
                                            link={offer.link}
                                        />
                                    ))}
                                </>
                            )

                        case 'Users':
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

                        case 'Games':
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
        </MainLayoutPage >
    );
}