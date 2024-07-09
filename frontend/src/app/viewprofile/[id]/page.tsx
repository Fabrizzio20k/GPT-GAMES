"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppSelector } from "@/redux/store";
import { toast, Toaster } from "sonner";
import { useState, useEffect, useCallback } from "react";
import Loader from "@/components/Loader";
import { useRouter, useParams, notFound } from "next/navigation";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { User } from "@/types/user";
import { getUserById } from "@/services/api";
import OfferNew from "@/components/OfferNew";
import { useDropzone } from 'react-dropzone';
import { FaUpload } from "react-icons/fa";


export default function ViewProfile() {
    const user = useAppSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [showedUser, setShowedUser] = useState<User>();
    const [userNotFound, setUserNotFound] = useState(false);

    const params = useParams() as { id: string };
    const router = useRouter();

    const { id } = params;

    const handleClick = () => {
        router.push('/editprofile');
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log("Uploaded file:", acceptedFiles[0].name);
        // Aquí puedes agregar la lógica para subir la imagen al servidor.
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const fetchData = async () => {
        setLoading(true);
        if (!user.token) {
            toast.error('You must be logged in to access this page');
            router.push('/signin');
            setLoading(false);
            return;
        }

        if (id === user.id.toString()) {
            setShowedUser(user);
        } else if (id !== user.id.toString()) {
            console.log(id, user.id);

            console.log(showedUser);

            try {
                const { errors, dataUser } = await getUserById(id, user.token);
                setShowedUser(dataUser);

                // Handle errors

                if (Object.keys(dataUser).length === 0) {
                    setUserNotFound(true);
                }

            } catch (error: any) {
                toast.error('An error occurred. Try again later');
                console.log(error);

            }
        }
        setLoading(false);
    };

    if (userNotFound) {
        notFound();
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            {
                showedUser && Object.keys(showedUser).length > 0 &&
                <article className="w-full flex flex-col gap-8">
                    <section className="w-full flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                        <div className="flex flex-col xs:flex-row items-center w-full md:w-fit gap-8">
                            <div
                                {...getRootProps()}
                                className={`relative rounded-2xl w-[200px] h-[200px] border-gray-300 border-4 flex items-center justify-center ${isDragActive ? 'bg-gray-200' : ''}`}
                                style={{ cursor: user.id.toString() === showedUser.id.toString() ? 'pointer' : 'default' }}
                            >
                                <input {...getInputProps()} />
                                <Image
                                    src={showedUser.profile_photo}
                                    alt="user-photo"
                                    width={1920}
                                    height={1080}
                                    className="rounded-2xl w-full h-full object-cover"
                                />
                                {user.id.toString() === showedUser.id.toString() && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity p-4 space-x-4 rounded-2xl">
                                        <FaUpload className="text-4xl" />
                                        <span className="ml-2 text-xl">Click or Drop to upload</span>
                                    </div>
                                )}
                            </div>
                            <div className="font-alata space-y-4">
                                <h1 className="font-bold tracking-widest text-2xl">@{showedUser.username}</h1>
                                <h2 className="text-xl">{showedUser.first_name} {showedUser.last_name}</h2>
                                <p className="text-xl">{showedUser.description}</p>
                                <p className="text-xl">{showedUser.phone}</p>
                            </div>
                        </div>

                        {user.id.toString() === showedUser.id.toString() && (
                            <button className="flex flex-row items-center justify-center rounded-2xl p-3 gap-2 font-bold gradient w-full md:w-fit" onClick={handleClick}>
                                Edit Profile
                                <MdEdit className="text-2xl" />
                            </button>
                        )}
                    </section>
                    <section className="space-y-4">
                        <h1 className="font-bold text-2xl">
                            {showedUser.id.toString() === user.id.toString() ? "Games Purchased" : "Offers published"}
                        </h1>
                        <div className="w-full gallery">
                            {showedUser?.offers.length === 0 && (<p className="text-xl">No games purchased yet</p>)}
                            {showedUser?.offers.length > 0 && showedUser?.offers.map((offer) => (
                                <OfferNew key={offer.id} {...offer} />
                            ))}
                        </div>
                    </section>
                </article>
            }
        </MainLayoutPage>
    );
}
