"use client"

import { useState } from "react";
import MainLayoutPage from "@/pages/MainLayoutPage";
import Loader from "@/components/Loader";
import { Toaster } from "sonner";


type OfferProps = {
    params: {
        id: string;
    };
}

const Offer = ({params}: OfferProps) => {
    const [loading, setLoading] = useState(false);

    return (
    <MainLayoutPage>
        <Loader activate={loading} />
        <Toaster richColors />
        <h1>Offer {params.id}</h1>
    </MainLayoutPage>
    )
}

export default Offer;