"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaDiceD6, FaGamepad, FaWrench, FaChevronRight, FaUserAlt } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";

export default function Sidebar() {
    const path = usePathname();
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const logged = useAppSelector((state) => state.status.logged);

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
        <aside>
            <div className={`fixed inset-0 z-40 bg-black transition-opacity ${isSidebarVisible ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}></div>
            <aside
                ref={sidebarRef}
                className={`fixed z-50 top-0 left-0 h-full bg-gptbackground p-4 w-full max-w-72 flex flex-col transform transition-transform ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:flex lg:shadow-right`}
            >
                <div className="flex flex-row items-center space-x-5 justify-center mb-12">
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
                <ul className="font-inter flex-1 space-y-6 px-4">
                    <li
                        className={`button-sidebar ${path === '/' ? 'gradient button-gradient' : ''}`}
                        onClick={() => { router.push('/'); setIsSidebarVisible(false); }}>
                        <FaDiceD6 className="text-2xl" />
                        <h3 className="text-md">Home</h3>
                    </li>
                    <li className={`button-sidebar ${path === '/search' ? 'gradient button-gradient' : ''}`}
                        onClick={() => { router.push('/search'); setIsSidebarVisible(false); }}>
                        <FaGamepad className="text-2xl" />
                        <h3 className="text-md">Game Store</h3>
                    </li>
                    {logged && (
                        <>
                            <li className={`button-sidebar ${path === '/shoppingcart' ? 'gradient button-gradient' : ''}`}
                                onClick={() => { router.push('/shoppingcart'); setIsSidebarVisible(false); }}>
                                <FaCartShopping className="text-2xl" />
                                <h3 className="text-md">Shopping Cart</h3>
                            </li>
                            <li className={`button-sidebar ${path === '/dashboard' ? 'gradient button-gradient' : ''}`}
                                onClick={() => { router.push('/dashboard'); setIsSidebarVisible(false); }}>
                                <FaWrench className="text-2xl" />
                                <h3 className="text-md">Dashboard</h3>
                            </li>
                            <li className={`button-sidebar ${path === '/profile' ? 'gradient button-gradient' : ''}`}
                                onClick={() => { router.push('/profile'); setIsSidebarVisible(false); }}>
                                <FaUserAlt className="text-2xl" />
                                <h3 className="text-md">Profile</h3>
                            </li>
                            <li className={`button-sidebar ${path === '/newoffer' ? 'gradient button-gradient' : ''}`}
                                onClick={() => { router.push('/newoffer'); setIsSidebarVisible(false); }}>
                                <ImUpload className="text-2xl" />
                                <h3 className="text-md">Publish offer</h3>
                            </li>
                        </>
                    )}
                </ul>
            </aside>
            {!isSidebarVisible && (
                <button
                    className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50 p-2 gradient rounded-r-full shadow-lg lg:hidden hover:from-fuchsia-700 hover:to-indigo-600 transition-all duration-300"
                    onClick={() => setIsSidebarVisible(true)}
                >
                    <FaChevronRight className="text-white" />
                </button>
            )}

        </aside>
    );
}
