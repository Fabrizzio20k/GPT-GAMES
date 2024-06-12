"use client"

import React, { useState } from 'react'
import MainLayoutPage from '@/pages/MainLayoutPage'
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppSelector } from '@/redux/store';
import { useRouter } from 'next/navigation';
import axios from "axios";

interface IFormPublishOffer {
    seller: string;
    game: number;
    price: number;
    discount: number;
}

export default function Newoffer() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormPublishOffer>();
    const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    const onSubmit: SubmitHandler<IFormPublishOffer> = async data => {
        let gameId = {
            id: data.game
        }

        try {
            const response = await axios.post(urlServer + "/games/", gameId, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${user.token}`,
                }
            })

            console.log(response.data);
        } catch (error) {
            const listErrors = (error as any).response.data;
            let errors = '';
            for (const key in listErrors) {
                errors += `${listErrors[key]}\n`;
            }
            errors = errors.toUpperCase();
            toast.error(errors);
        }

        let offerInfo = {
            seller: user.id,
            game: data.game,
            price: data.price,
            discount: data.discount
        }

        try {
            const response = await axios.post(urlServer + "/offers/", offerInfo, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${user.token}`,
                },
            });
            toast.success('Offer published successfully');

            console.log(response.data);

        } catch (error) {
            const listErrors = (error as any).response.data;
            let errors = '';
            for (const key in listErrors) {
                errors += `${listErrors[key]}\n`;
            }
            errors = errors.toUpperCase();
            toast.error(errors);
        }

        setTimeout(() => {
            router.push('/dashboard');
        }, 1000);
    }

    return (
        <MainLayoutPage>
        <Toaster richColors />
        <div className="w-full">
            <div className="flex flex-col lg:flex-row text-white gap-8">
            <div className="w-full lg:w-1/2">
                <h1 className="text-xl font-alata">Publish New Offer</h1>
                <form
                    className="flex flex-col space-y-4 mt-4 font-inter"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <label className="text-white w-full text-sm">Game</label>
                    <input
                        type="number"
                        className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                        {...register("game", {
                            required: "Game ID is required",
                            valueAsNumber: true,
                        })}
                    />
                    {errors.game && <p className="text-red-500 text-sm">{errors.game.message}</p>}

                    <label className="text-white w-full text-sm">Price</label>
                    <input
                        type="number"
                        className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                        {...register("price", {
                        required: "Price is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Price must be a positive number" }
                        })}
                    />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

                    <label className="text-white w-full text-sm">Discount</label>
                    <input
                        type="number"
                        className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                        {...register("discount", {
                        required: "Discount is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Discount must be a positive number" },
                        max: { value: 100, message: "Discount cannot be more than 100" }
                        })}
                    />
                    {errors.discount && <p className="text-red-500 text-sm">{errors.discount.message}</p>}

                    <button type="submit" className="font-bold p-2 mt-2 w-full bg-violet-900 text-white rounded-2xl text-sm md:text-md">
                        Publish Offer
                    </button>
                </form>
            </div>
            <div className="w-full lg:w-1/2">
                <h1 className="text-xl font-alata">Games purchased</h1>
            </div>
            </div>
        </div>
        </MainLayoutPage>
    )
}

