"use client";

import { useSearchParams } from "next/navigation";
import MainLayoutPage from "@/pages/MainLayoutPage";

export default function Search() {

    const searchParams = useSearchParams();
    const searchTerm = searchParams?.get("name") || "";

    document.title = searchTerm ? `Resultados para: ${searchTerm}` : "Encuentra tus juegos";

    return (
        <MainLayoutPage>
            <h1>{searchTerm}</h1>
        </MainLayoutPage>
    );
}