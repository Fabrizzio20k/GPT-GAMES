"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import Image from "next/image";
import { BiSolidStore } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

export default function ShoppingCart() {
    return (
        <MainLayoutPage>
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
                    <p className="text-sm">Total: $0.00</p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-between gap-4 bg-tertiary p-4 rounded-2xl">
                        <div className="flex flex-row gap-4">
                            <Image
                                src="/assets/logo/logo.png"
                                width={100}
                                height={100}
                                alt="Game"
                            />
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-alata">Valorant</h3>
                                <p className="text-sm">First person shooter game</p>
                                <div className="flex flex-row gap-4">
                                    <p className="text-sm"><strong>$0.00</strong></p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center text-alert cursor-pointer">
                            <MdDelete className="text-4xl" />
                            <h3 className="text-lg font-bold font-alata">Remove</h3>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold font-alata">Sub total</h2>
                    <p className="text-md">$0.00</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-2xl font-bold font-alata">Discounts</h2>
                    <p className="text-md">-$50.00</p>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <h2 className="text-4xl font-bold font-alata">Total</h2>
                    <p className="text-lg">$0.00</p>
                </div>
                <button className="font-bold p-2 bg-violet-900 rounded-2xl text-sm md:text-md">
                    Checkout
                </button>
            </section>
        </MainLayoutPage>
    );
}