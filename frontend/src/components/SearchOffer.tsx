import { useRouter } from 'next/navigation';
import SearchOfferProps from '@/interfaces/SearchOfferProps';
import Image from 'next/image'

const SearchOffer: React.FC<SearchOfferProps> = ({
    id,
    name,
    price,
    img_url,
}) => {

    const displayName = name || "Game name not found"
    const displayImgUrl = img_url || "/assets/logo/logo.png"

    const router = useRouter();

    const handleClick = () => {
        router.push(`/offer/${id}`)
    };

    return (
        <section 
            className='offer-game bg-tertiary p-3 rounded-xl mb-2 w-full block gallery-item'
            onClick = {handleClick}
        >
            <div className='w-full mb-2'>
                <Image
                    src={displayImgUrl}
                    alt={displayName}
                    width={500} 
                    height={300}
                    sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw" 
                    className="object-cover object-center rounded-lg"
                />
            </div>
            <div className='flex justify-between'>
                <h2 className='uppercase w-2/3'>{displayName}</h2>
                <div className='gradient px-3 py-1 rounded-full font-bold my-auto'>
                    {`$ ${price}`}
                </div>
            </div>
        </section>
    )
}

export default SearchOffer;