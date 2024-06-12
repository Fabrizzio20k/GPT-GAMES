"use client"

import React, { useEffect, useState } from "react";
import Offer from "@/components/Offer";
import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import axios from "axios";

export default function Dashboard() {
    const [userOffers, setUserOffers] = useState([] as any);
    const [userOffersInfo, setUserOffersInfo] = useState([] as any);
    const user = useAppSelector((state) => state.user);
    const router = useRouter();
    const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

    const fetchUserOffers = async () => {
        try {
            const response = await axios.get(urlServer + "/profile/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${user.token}`,
                }
            })

            setUserOffers(response.data.user.offers);
            
        } catch (error) {
            const listErrors = (error as any).response.data;
            let errors = '';
            for (const key in listErrors) {
                errors += `${listErrors[key]}\n`;
            }
            errors = errors.toUpperCase();
            toast.error(errors);
        }
    }

    const fetchOffers = async (url: string) => {
        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${user.token}`,
                }
            })

            setUserOffersInfo((prevOffers: any) => [...prevOffers, response.data]);

        } catch (error) {
            const listErrors = (error as any).response.data;
            let errors = '';
            for (const key in listErrors) {
                errors += `${listErrors[key]}\n`;
            }
            errors = errors.toUpperCase();
            toast.error(errors);
        }
    }

    const showOffers = async () => {
        userOffers.map((offer: any) => {
            fetchOffers(offer)
        })

        console.log(userOffersInfo);
        
    }
    

    useEffect(() => {
        fetchUserOffers();
        showOffers();
    }, []);

    return (
        <MainLayoutPage>
            <section className="bg-gradient-to-r from-fuchsia-800 to-indigo-700 p-4 rounded-xl mb-6 h-48 flex justify-center items-center flex-col">
                <h1 className="uppercase font-bold text-4xl mb-6">
                    Dashboard
                </h1>
                <p className="text-xl">
                    Welcome to the dashboard {user.username}!
                </p>
            </section>

            <section className="flex justify-between">
                <h2 className="uppercase text-xl mb-6">
                    Published Games:
                </h2>
                <Button 
                    className="rounded-xl"
                    onClick={() => { router.push('/newoffer') }}
                >
                    <CiCirclePlus className="h-6 w-6" />
                    <span className="ml-2">Publish offer</span>
                </Button>
            </section>

            <Button onClick={showOffers}>
                Show offers
            </Button>
            

            <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Offer />
                <Offer />
            </section>
        </MainLayoutPage>
    );
}