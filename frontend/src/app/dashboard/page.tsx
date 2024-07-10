"use client"

import OfferNew from "@/components/OfferNew";
import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppSelector } from "@/redux/store";
import { Button } from "@/components/ui/button";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
    const user = useAppSelector((state) => state.user);
    const router = useRouter();

    return (
        <MainLayoutPage>
            <section className="rounded-xl mb-6 h-48 flex justify-center items-center flex-col relative overflow-hidden border-2 border-white select-none">
                <Image
                    src="/assets/background/dashboard.jpg"
                    alt="Dashboard"
                    width={1920}
                    height={1080}
                    className="absolute inset-0 z-0 object-contain object-bottom brightness-75"
                    priority={true}
                />
                <h1 className="uppercase font-bold text-4xl mb-6 z-10">
                    Dashboard
                </h1>
                <p className="text-xl z-10">
                    Manage your games here <strong>{user.username}</strong>!
                </p>
            </section>

            <section className="flex justify-between">
                <h2 className="uppercase font-alata text-xl mb-6">
                    Published Offers:
                </h2>
                <Button
                    className="gradient button-gradient rounded-full"
                    onClick={() => { router.push('/newoffer') }}
                >
                    <CiCirclePlus className="h-6 w-6" />
                    <span className="ml-2">Publish offer</span>
                </Button>
            </section>

            <section>
                {
                    user.offers.length == 0 &&
                    <h1 className="text-2xl">You havent published any offer yet 👀</h1>
                }
            </section>

            <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {
                    user.offers.map((offer, index) => (
                        <OfferNew
                            key={index}
                            id={offer.id}
                            seller={offer.seller}
                            game={offer.game}
                            price={offer.price}
                            discount={offer.discount}
                            published_date={offer.published_date}
                            description={offer.description}
                            link={offer.link}
                        />
                    ))
                }
            </section>
        </MainLayoutPage>
    );
}