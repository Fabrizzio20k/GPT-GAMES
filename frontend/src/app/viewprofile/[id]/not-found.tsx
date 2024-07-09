"use client"
import MainLayoutPage from "@/pages/MainLayoutPage"
import { useRouter, useParams } from "next/navigation";


export default function NotFound() {
	const router = useRouter();
	const params = useParams();
	const Id = params?.id;
	return (
		<MainLayoutPage>
			<article className='flex flex-col justify-center items-center h-[70vh]'>
				<h1 className="font-inter text-4xl mb-5">404 - Offer Not Found</h1>
				<p className="font-alata text-lg">The user with id {Id} does not exist.</p>
				<button
					className="gradient button-gradient px-4 py-2 rounded-full mt-5"
					onClick={() => router.push('/search')}
				>
					Go back to Search
				</button>
			</article>
		</MainLayoutPage>
	)
}
