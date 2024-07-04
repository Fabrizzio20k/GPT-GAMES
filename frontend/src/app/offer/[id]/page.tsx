"use client"

import { useEffect, useState } from "react";
import MainLayoutPage from "@/pages/MainLayoutPage";
import Loader from "@/components/Loader";
import { Toaster, toast } from 'sonner';
import { getOfferById, addCommentOffer } from "@/services/api";
import { useAppSelector } from "@/redux/store";
import { useRouter, notFound } from "next/navigation";
import Image from "next/image";
import { FaCartShopping } from "react-icons/fa6";
import { toastError } from "@/utils/toastError";

type OfferProps = {
    params: {
        id: string;
    };
}

const Offer = ({ params }: OfferProps) => {
    const user = useAppSelector((state) => state.user);
    const [offer, setOffer] = useState({} as any);
    const [loading, setLoading] = useState(false);
    const [offerNotFound, setOfferNotFound] = useState(false);
    const [comment, setComent] = useState('')

    const router = useRouter();

    const fetchOffer = async () => {
        setLoading(true);
        const { errors, dataOffer } = await getOfferById(Number(params.id), user.token);
        setOffer(dataOffer);
        // Handle erros?
        console.log(dataOffer);

        if (Object.keys(dataOffer).length === 0) {
            setOfferNotFound(true);
        }

        setLoading(false);
    }

    if (offerNotFound) {
        notFound();
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (comment.length === 0) {
                toast.error("Please write down a comment")
            } else {
                setLoading(true);
                const { errors, dataResponse } = await addCommentOffer(offer.url, comment, user.token);
                Object.keys(errors).length > 0 ? toastError(errors) : toast.success("Comment added!");

                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchOffer();
    }, []);

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            {
                Object.keys(offer).length > 0 &&
                <article className="grid grid-cols-3">
                    <section>
                        <Image
                            src={offer.link}
                            alt={offer.game}
                            width={400}
                            height={300}
                            sizes="(max-width: 768px) 100vw, 
                                    (max-width: 1200px) 50vw, 
                                    33vw"
                            className="object-cover object-center rounded-lg"
                        />
                    </section>

                    <section className="pl-6 col-start-2 col-end-4">
                        <h1 className="font-alata text-2xl mb-6">{offer.game}</h1>
                        <div className='flex justify-between mb-6'>
                            <div>
                                <p className="text-sm text-gray-400 line-through mb-2">S/.{(offer.price).toFixed(2)}</p>
                                <div className="flex items-center">
                                    <p className="gradient px-4 py-2 rounded-full font-bold text-xl">S/.{(offer.price - (offer.price * offer.discount / 100)).toFixed(2)}</p>
                                    <p className='ml-2 font-bold text-green-500'>{offer.discount}% OFF</p>
                                </div>
                            </div>
                            <button
                                className="gradient button-gradient px-4 py-2 rounded-3xl flex flex-col justify-center items-center"
                                onClick={() => console.log(offer.id)}
                            >
                                <p>Add to Cart</p>
                                <FaCartShopping className="text-2xl" />
                            </button>
                        </div>

                        <h2 className="font-alata text-xl mb-1">About</h2>
                        <hr className="border-2 border-fuchsia-800 mb-1" />
                        <p className="mb-4">{offer.description}</p>
                        <p className="text-sm text-gray-400 mb-4">Published on {offer.published_date}</p>
                        <div className="flex items-center">
                            <p>Offer selled by</p>
                            <button
                                className="gradient button-gradient ml-2 px-3 py-1 rounded-full text-lg"
                                onClick={() => console.log(offer.seller)}
                            >
                                {offer.seller}
                            </button>
                        </div>
                    </section>

                    <section className="col-start-1 col-end-2 mt-4 flex justify-center h-fit">
                        <button
                            className="gradient button-gradient px-4 py-2 rounded-full"
                            onClick={() => router.push(`/game/${offer.game_id}`)}
                        >
                            More info about the game
                        </button>
                    </section>

                    <section className="mt-4 p-4 bg-tertiary rounded-3xl col-start-2 col-end-4">
                        <h2 className="font-alata text-lg mb-2">{Object.keys(offer.reviews).length} Comments</h2>
                        <div className="flex items-center mb-2">
                            <div className="mr-1 w-1/12 h-[45px]"> {/* TODO: Fix this bug */}
                                <Image
                                    src={user.profile_photo}
                                    alt={user.username}
                                    width={300}
                                    height={300}
                                    className="object-cover w-full h-full rounded-full"
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="text"
                                    name="comment"
                                    id="comment"
                                    className="border-b-2 outline-none py-2 px-4"
                                    placeholder="Add your thoughts..."
                                    onChange={(e) => setComent(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>

                        {
                            offer.reviews.map((comment: any, index: any) => (
                                <div className="flex items-center mb-2" key={index}>
                                    <div className="mr-2 w-1/12">
                                        <Image
                                            src='/assets/img/default-user-profile.jpeg'
                                            alt={user.username}
                                            width={400}
                                            height={300}
                                            sizes="(max-width: 768px) 100vw, 
                                                (max-width: 1200px) 50vw, 
                                                33vw"
                                            className="object-cover object-center rounded-full"
                                        />
                                    </div>
                                    <div className="w-full flex flex-col ml-3">
                                        <b>{comment.commenter}</b>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </article>
            }
        </MainLayoutPage >
    )
}

export default Offer;