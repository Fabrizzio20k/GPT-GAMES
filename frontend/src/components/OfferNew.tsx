import { useRouter } from 'next/navigation';
import Image from 'next/image'
import OfferBySeller from '@/interfaces/OfferBySeller';

const OfferNew: React.FC<OfferBySeller> = (
    { id, seller, game, price, discount, published_date, description, link }
) => {

    const displayName = game || "Game name not found"
    const displayImgUrl = link || "/assets/logo/logo.png"

    const router = useRouter();

    const handleClick = () => {
        router.push(`/offer/${id}`)
    };

    return (
        <section
            className='offer-game bg-tertiary p-3 rounded-xl mb-2 w-full block gallery-item'
            onClick={handleClick}
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
            <div className='flex flex-col gap-2'>
                <h2 className='uppercase w-2/3 font-bold'>{displayName}</h2>
                <div className='flex flex-row justify-start w-full'>
                    <div className='gradient px-3 py-1 rounded-full font-bold my-auto'>
                        {`-${discount}%`}
                    </div>
                    <div className='px-3 py-1 rounded-full text-gray-600 my-auto line-through'>
                        {`${price / (1 - (discount / 100))} PEN`}
                    </div>
                    <div className='px-3 py-1 rounded-full my-auto font-bold'>
                        {`${price} PEN`}
                    </div>
                </div>
                <h2 className='text-gray-400'>Selled by: <strong>{seller}</strong> on <strong>{published_date}</strong></h2>
            </div>
        </section>
    )
}

export default OfferNew;