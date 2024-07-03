import { useRouter } from 'next/navigation';
import SearchUserProps from '@/interfaces/SearchUserProps';
import Image from 'next/image'

const SearchOffer: React.FC<SearchUserProps> = ({
    id,
    username,
    description,
    profile_picture,
}) => {

    const displayUsername = username || "GPT user"
    const displayDescription = description || "Best description ever!"
    const displayProfilePic = profile_picture || "/assets/img/default-user-profile.jpeg"

    const router = useRouter();

    const handleClick = () => {
        router.push(`/viewprofile/${id}`)
    };

    return (
        <section
            className='offer-game bg-tertiary p-3 rounded-xl mb-2 w-full block gallery-item'
            onClick={handleClick}
        >
            <div className='w-full mb-2'>
                <Image
                    src={displayProfilePic}
                    alt={displayUsername}
                    width={500}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw"
                    className="object-cover object-center rounded-lg"
                />
            </div>
            <div>
                <h2 className='font-alata text-xl'>@{displayUsername}</h2>
                <p> {displayDescription} </p>
            </div>
        </section>
    )
}

export default SearchOffer;