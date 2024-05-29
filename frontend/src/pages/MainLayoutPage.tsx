"use client";

import { ReactNode } from 'react';


import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function MainLayoutPage({ children }: { children: ReactNode }) {


    return (
        <main className="bg-gulf-blue-950 h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <section className="flex-1 shadow-inner p-8 overflow-y-auto">
                    <div className="container mx-auto">
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}
