import Image from "next/image";
import OfferCommentProps from "@/interfaces/OfferCommentProps"

const OfferComment: React.FC<OfferCommentProps> = (
	{ id, commenter, profile_picture, text }
) => {
	const displayImg = profile_picture || "/assets/img/default-user-profile.jpeg"

	return (
		<div className="flex items-center mb-4">
			<div className="mr-2 w-10 h-10">
				<Image
					src={displayImg}
					alt={commenter}
					width={40}
					height={40}
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover object-center rounded-full w-full h-full"
				/>
			</div>
			<div className="w-full flex flex-col ml-3">
				<b>{commenter}</b>
				<p>{text}</p>
			</div>
		</div>
	)
}

export default OfferComment;