"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast, Toaster } from "sonner";
import { useState, useEffect, use } from "react";
import Loader from "@/components/Loader";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { User } from "@/types/user";
import axios from "axios";
import { getUserById } from "@/services/api";

export default function ViewProfile() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const params = useParams() as { id: string };
    const { id } = params;
    const [showedUser, setShowedUser] = useState<User>(user);

    const handleClick = () => {
        router.push('/editprofile');
    }

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            if (!user.token) {
                toast.error('You must be logged in to access this page');
                router.push('/signin');
                setLoading(false);
                return;
            }
            if (id !== user.id.toString()) {
                try {
                    const { errors, dataUser } = await getUserById(id, user.token);
                    if (typeof errors === 'object' && Object.keys(errors).length > 0) {
                        toast.error('User not found');
                        router.push(`/viewprofile/${user.id}`);
                    } else {
                        setShowedUser(dataUser);
                    }
                } catch (error) {
                    toast.error('An error occurred. Try again later');
                }
            }
            setLoading(false);
        };

        fetchData();

    }, [user, id, router]);

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <article className="w-full flex flex-col gap-8">
                <section className="w-full flex flex-col md:flex-row gap-8 items-center md:items-start justify-between">
                    <div className="flex flex-col xs:flex-row items-center w-full md:w-fit gap-8">
                        <Image src="/assets/background/d2.jpg" alt="user-photo" width={1920} height={1080} className="rounded-2xl w-[200px] border-gray-300 border-4" />
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
                <section className="test">
                    <h1 className="font-bold text-2xl">
                        {showedUser.id.toString() === user.id.toString() ? "Games Purchased" : "Offers published"}
                    </h1>
                    <div className="flex flex-col gap-4">
                        <p className="text-xl">No games purchased yet</p>
                    </div>
                </section>
            </article>
        </MainLayoutPage>
    );
}
