"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay"
import Offer from "@/components/Offer";
import { ArrowLeft, ArrowRight } from "lucide-react"


export default function Page() {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    return (
        <MainLayoutPage>
            <section className="bg-gradient-to-r from-fuchsia-800 to-indigo-700 p-4 rounded-xl mb-6 h-96">
                hi
            </section>

            <section className="flex justify-between  mb-6">
                <h2 className="text-2xl">NEW GAMES AVAILABLE</h2>
                <div>
                    <Button className="rounded-xl">
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                    <Button className="rounded-xl ml-5">
                        <ArrowRight className="h-6 w-6" />
                    </Button>
                </div>
            </section>



            <Carousel 
                className="w-full"
                opts={{
                    align: "start",                
                }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Offer />
                    </CarouselItem>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Offer />
                    </CarouselItem>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Offer />
                    </CarouselItem>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Offer />
                    </CarouselItem>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Offer />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2"/>
                <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2"/>
            </Carousel>
        </MainLayoutPage>
    );
}