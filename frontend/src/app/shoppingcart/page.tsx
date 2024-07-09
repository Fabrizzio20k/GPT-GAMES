"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import Image from "next/image";
import { BiSolidStore } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { handlePayment, retrieveCartItems } from "@/services/api";
import { useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import Loader from "@/components/Loader";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import OfferBySeller from "@/interfaces/OfferBySeller";

export default function ShoppingCart() {
    const token = useAppSelector((state) => state.user.token);
    const [cartItems, setCartItems] = useState([] as OfferBySeller[]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchCartItems = async (token: string) => {
            const { errors, shoppingItems } = await retrieveCartItems(token);
            if (Object.keys(errors).length > 0) {
                let errorsText = '';
                for (const key in errors) {
                    errorsText += `${errors[key]}\n`;
                }
                errorsText = errorsText.toUpperCase();
                toast.error(errorsText);
            }
            setCartItems(shoppingItems);
        }
        setLoading(true);
        fetchCartItems(token);
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <section className="rounded-xl mb-6 h-48 flex flex-row items-center justify-center relative overflow-hidden border-2 border-white select-none">
                <Image
                    src="/assets/background/d2.jpg"
                    alt="Dashboard"
                    layout="fill"
                    className="absolute inset-0 z-0 brightness-50 object-center object-cover"
                    priority={true}
                />
                <article className="z-10 flex flex-row gap-10">
                    <h1 className="uppercase font-bold text-4xl font-alata tracking-widest">
                        Shopping Cart
                    </h1>
                    <BiSolidStore className="text-6xl" />
                </article>
            </section>
            <section className="flex flex-col gap-6">
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold font-alata">Your Cart</h2>
                </div>
                <div className="flex flex-col gap-4">
                    {
                        cartItems.map((item, index) => (
                            <div key={index} className="flex flex-row items-center justify-between gap-4 bg-tertiary p-4 rounded-2xl">
                                <div className="flex flex-row gap-4">
                                    <Image
                                        src={item.link}
                                        width={100}
                                        height={100}
                                        alt="Game"
                                    />
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-xl font-alata">{item.game}</h3>
                                        <p className="text-sm">{item.description}</p>
                                        <div className="flex flex-row gap-4">
                                            <p className="text-sm"><strong>{item.price} PEN</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-4 items-center text-alert cursor-pointer">
                                    <MdDelete className="text-4xl" />
                                    <h3 className="text-lg font-bold font-alata">Remove</h3>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold font-alata">Sub total</h2>
                    <p className="text-md">
                        {cartItems.reduce((acc, item) => acc + item.price, 0)} PEN
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold font-alata">Discounts</h2>
                    <p className="text-md">
                        - {
                            // Calcular el total de descuentos
                            cartItems.reduce((acc, item) => acc + (item.price * (item.discount / 100)), 0).toFixed(2)
                        } PEN
                    </p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-4xl font-bold font-alata">Total</h2>
                    <p className="text-lg">
                        {(
                            cartItems.reduce((acc, item) => acc + item.price, 0) -
                            cartItems.reduce((acc, item) => acc + (item.price * (item.discount / 100)), 0)
                        ).toFixed(2)} PEN
                    </p>
                </div>

                <button className="font-bold p-2 bg-violet-900 rounded-2xl text-sm md:text-md" onClick={() => handlePayment(token)}>
                    Checkout
                </button>
            </section>
        </MainLayoutPage>
    );
}