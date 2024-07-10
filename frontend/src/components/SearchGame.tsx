import { useRouter } from 'next/navigation';
import SearchGameProps from '@/interfaces/SearchGameProps';
import Image from 'next/image'

const SearchGame: React.FC<SearchGameProps> = ({
    api_id,
    title,
    img_url,
}) => {

    const displayTitle = title || "Game name not found"
    const displayImgUrl = img_url || "/assets/logo/logo.png"

    const router = useRouter();

    const handleClick = () => {
        router.push(`/game/${api_id}`)
    };

    return (
        <section 
            className='offer-game bg-tertiary p-3 rounded-xl mb-2 w-full block gallery-item'
            onClick = {handleClick}
        >
            <div className='w-full mb-2'>
                <Image
                    src={displayImgUrl}
                    alt={displayTitle}
                    width={500} 
                    height={300}
                    sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw" 
                    className="object-cover object-center rounded-lg"
                />
            </div>
            <div className='flex justify-between'>
                <h2 className='uppercase w-2/3'>{displayTitle}</h2>
                <div className='gradient px-3 py-1 rounded-full font-bold my-auto'>
                    Info
                </div>
            </div>
        </section>
    )
}

export default SearchGame;