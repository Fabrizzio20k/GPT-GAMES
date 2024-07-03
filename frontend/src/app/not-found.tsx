"use client"
import MainLayoutPage from "@/pages/MainLayoutPage"
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";

const NotFound = () => {
    const router = useRouter();

    return (
        <MainLayoutPage>
            <Toaster richColors />
            <article className='flex flex-col justify-center items-center h-[70vh]'>
                <h1 className="font-inter text-2xl lg:text-4xl mb-5">404 - Page Not Found</h1>
                <p className="font-alata text-lg">The page you are looking for does not exist.</p>
                <button
                    className="gradient button-gradient px-4 py-2 rounded-full mt-5"
                    onClick={() => router.push('/')}
                >
                    Go back to home
                </button>
            </article>
        </MainLayoutPage>
    )
}

export default NotFound