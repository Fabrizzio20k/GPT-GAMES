"use client"
import MainLayoutPage from "@/pages/MainLayoutPage"
import { useRouter, useParams } from "next/navigation";


export default function NotFound() {
    const router = useRouter();
    const params = useParams();
    const apiId = params?.api_id;

    return (
        <MainLayoutPage>
            <article className='flex flex-col justify-center items-center h-[70vh]'>
                <h1 className="font-inter text-4xl mb-5">404 - Game Not Found</h1>
                <p className="font-alata text-lg">The game with id {apiId} does not exist.</p>
                <button
                    className="gradient button-gradient px-4 py-2 rounded-full mt-5"
                    onClick={() => router.push('/search')}
                >
                    Go back to home
                </button>
            </article>
        </MainLayoutPage>
    )
}
