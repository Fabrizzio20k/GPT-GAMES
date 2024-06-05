"use client"
import MainLayoutPage from "@/pages/MainLayoutPage";
import { useRef } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Game from "@/components/Game";

export default function Search() {
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )

    return (
        <MainLayoutPage>
            <h1 className="text-2xl mb-5">EXPLORE THE CATALOG</h1>
            {/* <article className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Game />
                <Game />
                <Game />
            </article> */}

            <Carousel 
                className="w-1/2 sm:w-full"
                opts={{
                    align: "start",                
                }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Game />
                    </CarouselItem>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Game />
                    </CarouselItem>
                    <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
                        <Game />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-0 transform -translate-y-1/2"/>
                <CarouselNext className="absolute top-1/2 right-0 transform -translate-y-1/2"/>
            </Carousel>
        </MainLayoutPage>
    );
}