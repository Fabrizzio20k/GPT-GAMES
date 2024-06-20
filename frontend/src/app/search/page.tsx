"use client"

import { useSearchParams } from "next/navigation";
import MainLayoutPage from "@/pages/MainLayoutPage";
import Offer from "@/components/Offer";

export default function Search() { 

    return (
        <MainLayoutPage>
            <h1 className="text-2xl mb-5">EXPLORE THE CATALOG</h1>
            <article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Offer />
                <Offer />
                <Offer />
            </article>
        </MainLayoutPage>
    );
}