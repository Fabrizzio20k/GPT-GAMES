"use client";

import Image from "next/image"
import { FaDiceD6, FaGamepad, FaCartShopping, FaWrench } from "react-icons/fa6"
import { useRouter, usePathname } from "next/navigation"

export default function Sidebar() {

    const path = usePathname()
    const router = useRouter()

    return (
        <aside className="text-white shadow-right p-4 w-full max-w-72 flex flex-col">
            <div className="flex flex-row text-white items-center space-x-5 justify-center mb-12">
                <Image
                    src="/assets/logo/logo.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-16"
                />
                <h2 className="text-2xl font-alata tracking-widest text-fuchsia-500 text-center select-none">
                    GPT GAMES
                </h2>
            </div>
            <ul className="font-inter flex-1 space-y-6 text-white px-4">
                <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => router.push('/')}>
                    <FaDiceD6 className="text-2xl" />
                    <h3 className="text-md">Home</h3>
                </li>
                <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/search' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => router.push('/search')}>
                    <FaGamepad className="text-2xl" />
                    <h3 className="text-md">Game Store</h3>
                </li>
                <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/shoppingcart' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => router.push('/shoppingcart')}>
                    <FaCartShopping className="text-2xl" />
                    <h3 className="text-md">Buy Games</h3>
                </li>
                <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/dashboard' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => router.push('/dashboard')}>
                    <FaWrench className="text-2xl" />
                    <h3 className="text-md">Dashboard</h3>
                </li>
            </ul>
        </aside>
    );
}