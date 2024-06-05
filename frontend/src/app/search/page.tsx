"use client";

import { useSearchParams } from "next/navigation";
import MainLayoutPage from "@/pages/MainLayoutPage";

export default function Search() {

    const searchParams = useSearchParams();
    const searchTerm = searchParams?.get("name") || "";


    return (
        <MainLayoutPage>
            <h1>{searchTerm}</h1>
        </MainLayoutPage>
    );
}