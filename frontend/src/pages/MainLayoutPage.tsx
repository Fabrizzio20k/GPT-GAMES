"use client";

import { ReactNode } from 'react';


import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import "@/app/globals.css";

export default function MainLayoutPage({ children }: { children: ReactNode }) {


    return (
        <main className="bg-gulf-blue-950 h-screen flex min-w-[350px]">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <section className="flex-1 shadow-inner p-6 md:p-8 overflow-y-auto custom-scroll">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}
