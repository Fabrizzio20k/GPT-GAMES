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
import { ArrowLeft, ArrowRight } from "lucide-react"
import OfferNew from "@/components/OfferNew";
import { useState, useEffect } from "react";
import { searchOfferByName } from "@/services/api";
import { useAppSelector } from "@/redux/store";
import { toastError } from "@/utils/toastError";


export default function Page() {
    const [mainOffers, setMainOffers] = useState([] as any[]);

    const user = useAppSelector((state) => state.user);

    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    const fectchOffers = async () => {
        const { errors, dataOffers } = await searchOfferByName("", user.token);
        Object.keys(errors).length > 0 ? toastError(errors) : setMainOffers(dataOffers);
    }

    useEffect(() => {
        fectchOffers();
    });

    return (
        <MainLayoutPage>
            <section className="gradient background-home rounded-xl mb-6 h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
                {/* <div className="background-home rounded-xl h-full w-1/2"></div> */}
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
                    {mainOffers.map((offer, index) => (
                        <CarouselItem className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4" key={index}>
                            <OfferNew
                                id={offer.id}
                                seller={offer.seller}
                                game={offer.game}
                                price={offer.price}
                                discount={offer.discount}
                                published_date={offer.published_date}
                                description={offer.description}
                                link={offer.link}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2" />
                <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2" />
            </Carousel>
        </MainLayoutPage>
    );
}