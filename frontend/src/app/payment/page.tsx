"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import Image from "next/image";
import { BiSolidStore } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
export default function PaymentStatus() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const status = searchParams?.get("status") === "success";
    const session_id = searchParams?.get("session_id") || "";

    return (
        <MainLayoutPage>
            <section className="rounded-xl mb-6 h-48 flex flex-row items-center justify-center relative overflow-hidden border-2 border-white select-none">
                <Image
                    src="/assets/background/payment_status.jpg"
                    alt="Dashboard"
                    layout="fill"
                    className="absolute inset-0 z-0 brightness-50 object-center object-cover"
                    priority={true}
                />
                <article className="z-10 flex flex-row gap-10 items-center px-4">
                    <h1 className={`uppercase font-bold text-4xl font-alata tracking-widest ${status ? "text-green-500" : "text-red-500"}`}>
                        {status ? "Thanks for your purchase!" : "Oops! Something went wrong"}
                    </h1>
                    {status ? <FaCheckCircle className="text-6xl text-green-500" /> : <MdCancel className="text-6xl text-red-500" />}
                </article>
            </section>
            <section className="flex flex-col gap-4">
                {status ?
                    <h2>
                        Your purchase has been successfully completed. You will receive an email with the details of your purchase. You will find the key or keys of your purchase in <strong>Profile</strong> section.
                        <br />
                        <strong>Session ID:</strong> {session_id}
                    </h2> :
                    <h2>
                        Your purchase has not been completed. Please try again or contact us for more information.
                    </h2>
                }
                <button className="flex flex-row gap-2 items-center justify-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300" onClick={() => router.push("/")}>
                    <BiSolidStore className="text-2xl" />
                    <span>Go to Home</span>
                </button>
            </section>

        </MainLayoutPage>
    );
}