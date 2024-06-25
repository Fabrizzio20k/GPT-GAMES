"use client"

import React, { useState, useCallback } from 'react'
import MainLayoutPage from '@/pages/MainLayoutPage'
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { FaSearch } from "react-icons/fa";
import FormPublishOffer from '@/interfaces/FormPublishOffer';
import { searchGamesByName, createOffer } from '@/services/api';
import NewOfferGame from '@/components/NewOfferGame';


export default function Newoffer() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormPublishOffer>();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();  
    
    const [gameName, setGameName] = useState('');
    const [gamesResult, setGamesResult] = useState([] as any[]);
    const [selectedGame, setSelectedGame] = useState<number | null>(null);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();           
            const games = await searchGamesByName(gameName, user.token);
            setGamesResult(games);
            console.log(games);
        }
    };

    const handleClick = useCallback((api_id: string) => {
        const id = parseInt(api_id);
        setSelectedGame(id);
    }, []);

    const onSubmit: SubmitHandler<FormPublishOffer> = async (data) => {
        data.seller_id = parseInt(user.id);
        data.date_created = new Date().toISOString(); // Backend?
        
        if (selectedGame === null) {
            toast.error("Please select a game");
            return;
        }

        data.game = selectedGame;
        console.log(data);
        

        // try {
            //const response = await createOffer(data, user.token);
            // toast.success('Offer published successfully');
        // } catch (error) {
        //     const listErrors = (error as any).response.data;
        //     let errors = '';
        //     for (const key in listErrors) {
        //         errors += `${listErrors[key]}\n`;
        //     }
        //     errors = errors.toUpperCase();
        //     toast.error(errors);
        // }

        // setTimeout(() => {
        //     router.push('/dashboard');
        // }, 1000);
    }

    return (
        <MainLayoutPage>
            <Toaster richColors />
            <main className="w-full flex flex-col lg:flex-row gap-8">
                <section className="w-full lg:w-1/2">
                    <h1 className="text-xl font-alata uppercase">Publish New Offer</h1>
                    <form
                        className="flex flex-col space-y-4 mt-4 font-inter"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label className="w-full text-sm">Title</label>
                        <input
                            type="text"
                            className="p-2 rounded-2xl bg-tertiary w-full"
                            {...register("title", {
                                required: "Title of offer is required",
                                minLength: { value: 5, message: "Title must be at least 5 characters long" },
                                maxLength: { value: 50, message: "Title must be at most 50 characters long" }
                            })}
                        />
                        {errors.title && <p className="text-alert text-sm">{errors.title.message}</p>}

                        <label className="w-full text-sm">Description</label>
                        <textarea
                            className="p-2 min-h-[100px] resize-none"
                            {...register("description", {
                                required: "Description is required",
                                minLength: { value: 10, message: "Description must be at least 10 characters long" },
                                maxLength: { value: 200, message: "Description must be at most 200 characters long" }
                            })}
                        />
                        {errors.description && <p className="text-alert text-sm">{errors.description.message}</p>}

                        <label className="w-full text-sm">Game Key</label>
                        <input
                            type="text"
                            className="p-2 rounded-2xl bg-tertiary w-full"
                            {...register("gamekey", {
                                required: "Game key is required",
                                minLength: { value: 5, message: "Game key must be at least 5 characters long" },
                                maxLength: { value: 100, message: "Game key must be at most 100 characters long" }
                            })}
                        />
                        {errors.gamekey && <p className="text-alert text-sm">{errors.gamekey.message}</p>}

                        <label className="w-full text-sm">Price</label>
                        <input
                            type="number"
                            className="p-2 rounded-2xl bg-tertiary w-full"
                            {...register("price", {
                                required: "Price is required",
                                valueAsNumber: true,
                                min: { value: 1, message: "Price must be at least 1" }
                            })}
                        />
                        {errors.price && <p className="text-alert text-sm">{errors.price.message}</p>}

                        <label className="w-full text-sm">Discount</label>
                        <input
                            type="number"
                            className="p-2 rounded-2xl bg-tertiary w-full"
                            {...register("discount", {
                                required: "Discount is required",
                                valueAsNumber: true,
                                min: { value: 0, message: "Discount must be a positive number" },
                                max: { value: 100, message: "Discount cannot be more than 100" }
                            })}
                        />
                        {errors.discount && <p className="text-alert text-sm">{errors.discount.message}</p>}

                        <button type="submit" className="font-bold p-2 mt-2 w-full bg-violet-900 rounded-2xl text-sm md:text-md">
                            Publish Offer
                        </button>
                    </form>
                </section>
                <section className="w-full lg:w-1/2 bg-tertiary rounded-xl p-4 flex flex-col h-100vh">
                    <h1 className="text-xl font-alata uppercase mb-3">Choose the game to sell</h1>
                    <div className="w-full bg-secondary rounded-2xl px-2 py-1 flex items-center mb-3">
                        <FaSearch
                            className="w-6 h-6 mx-2"
                        />
                        <input
                            type="text"
                            placeholder="Search game..."
                            onChange={(e) => setGameName(e.target.value)}
                            className="bg-secondary border-0 focus:border-0"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div className='flex-grow overflow-y-scroll h-[500px] custom-scroll'>
                        {
                            gamesResult.map((game, index) => (
                                <NewOfferGame
                                    key={index}
                                    api_id={game.api_id}
                                    name={game.name}
                                    involved_companies={game.involved_companies}
                                    summary={game.summary}
                                    img_url={game.cover}
                                    onClick={handleClick}
                                    isSelected={selectedGame === game.api_id}
                                />
                            ))
                        }
                    </div>
                </section>
            </main>
        </MainLayoutPage>
    )
}

