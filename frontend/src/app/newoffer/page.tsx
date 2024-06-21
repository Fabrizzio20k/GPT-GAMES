"use client"

import React, { useState } from 'react'
import MainLayoutPage from '@/pages/MainLayoutPage'
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { FaWindows, FaXbox, FaPlaystation, FaApple } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import axios from "axios";
import Image from 'next/image';

interface IFormPublishOffer {
    title: string;
    description: string;
    gamekey: string;
    price: number;
    discount: number;
    game: number;
}

export default function Newoffer() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormPublishOffer>();
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

    const onSubmit: SubmitHandler<IFormPublishOffer> = async (data) => {
        data.game = 1;
        console.log(data);

        // let gameId = {
        //     id: data.game
        // }

        // try {
        //     const response = await axios.post(urlServer + "/games/", gameId, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `token ${user.token}`,
        //         }
        //     })

        //     console.log(response.data);
        // } catch (error) {
        //     const listErrors = (error as any).response.data;
        //     let errors = '';
        //     for (const key in listErrors) {
        //         errors += `${listErrors[key]}\n`;
        //     }
        //     errors = errors.toUpperCase();
        //     toast.error(errors);
        // }

        // let offerInfo = {
        //     seller: user.id,
        //     game: data.game,
        //     price: data.price,
        //     discount: data.discount
        // }

        // try {
        //     const response = await axios.post(urlServer + "/offers/", offerInfo, {
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `token ${user.token}`,
        //         },
        //     });
        //     toast.success('Offer published successfully');

        //     console.log(response.data);

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
                <section className="w-full lg:w-1/2">
                    <h1 className="text-xl font-alata">Select a game</h1>
                    <input
                        type="text"
                        className="p-2 rounded-2xl bg-tertiary w-full mt-4"
                        placeholder="Search for a game"
                    />
                    <div className="flex flex-col gap-4 mt-4 select-none">
                        <div className="flex flex-row gap-4 bg-tertiary rounded-2xl items-center hover:bg-indigo-900 cursor-pointer">
                            <Image src="/assets/logo/logo.png" width={100} height={100} alt='game' />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-alata">Valorant</h2>
                                <p className="text-sm">First person shooter game</p>
                                <div className="flex flex-row gap-4">
                                    <FaWindows className="text-2xl" />
                                    <FaXbox className="text-2xl" />
                                    <FaPlaystation className="text-2xl" />
                                    <FaApple className="text-2xl" />
                                    <BsNintendoSwitch className="text-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </MainLayoutPage>
    )
}

