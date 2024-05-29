"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaDiceD6, FaGamepad, FaWrench, FaChevronRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
    const path = usePathname();
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsSidebarVisible(false);
        }
    };

    useEffect(() => {
        if (isSidebarVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSidebarVisible]);

    return (
        <>
            <div className={`fixed inset-0 z-40 bg-black transition-opacity ${isSidebarVisible ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}></div>
            <aside ref={sidebarRef} className={`fixed z-50 top-0 left-0 h-full bg-gulf-blue-950 p-4 w-full max-w-72 flex flex-col transform transition-transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:flex lg:shadow-right`}>
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
                    <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => { router.push('/'); setIsSidebarVisible(false); }}>
                        <FaDiceD6 className="text-2xl" />
                        <h3 className="text-md">Home</h3>
                    </li>
                    <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/search' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => { router.push('/search'); setIsSidebarVisible(false); }}>
                        <FaGamepad className="text-2xl" />
                        <h3 className="text-md">Game Store</h3>
                    </li>
                    <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/shoppingcart' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => { router.push('/shoppingcart'); setIsSidebarVisible(false); }}>
                        <FaCartShopping className="text-2xl" />
                        <h3 className="text-md">Buy Games</h3>
                    </li>
                    <li className={`flex flex-row items-center justify-start cursor-pointer px-4 py-4 space-x-4 rounded-2xl ${path === '/dashboard' ? 'bg-gradient-to-r from-fuchsia-800 to-indigo-700' : ''}`} onClick={() => { router.push('/dashboard'); setIsSidebarVisible(false); }}>
                        <FaWrench className="text-2xl" />
                        <h3 className="text-md">Dashboard</h3>
                    </li>
                </ul>
            </aside>
            {!isSidebarVisible && (
                <button
                    className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 p-2 bg-gradient-to-r from-fuchsia-800/40 to-indigo-700/40 text-white rounded-r-full shadow-lg lg:hidden hover:from-fuchsia-700 hover:to-indigo-600 transition-all duration-300"
                    onClick={() => setIsSidebarVisible(true)}
                >
                    <FaChevronRight className="text-white" />
                </button>
            )}

        </>
    );
}
