import { useRouter } from 'next/navigation'
import Image from 'next/image'
import NewOfferGameProps from '../interfaces/NewOfferGameProps'


const NewOfferGame: React.FC<NewOfferGameProps> = ({
    api_id,
    name,
    involved_companies,
    summary,
    img_url,
    onClick,
    isSelected
}) => {
    
    const displayName = name || "Game name not found"
    const displayCompanies = involved_companies.length > 0 ? involved_companies : ["Not companies found"]
    const displayImgUrl = img_url || "/assets/logo/logo.png"

    const router = useRouter();
    
    const displaySummary = summary
    ? summary.length > 100
        ? summary.slice(0, 100) + '...'
        : summary
    : "Summary not found";

    const handleRedirect = () => {
        router.push(`/game/${api_id}`)
    }

    const handleClick = () => {
        console.log({api_id, name, img_url})
        onClick({api_id, name, img_url})
    }

    return (
        <article 
            className={`new-offer-game ${isSelected ? 'border-4 border-primary hover:border-primary'  : 'border border-transparent'}`}
            id={api_id}
            onClick={handleClick}
        >
            <div className='sm:w-1/3 w-full mr-3 relative aspect-ratio-1-1'>
                <Image
                    src={displayImgUrl}
                    alt={displayName}
                    fill
                    sizes="(max-width: 768px) 100vw, 
                            (max-width: 1200px) 50vw, 
                            33vw"
                    className="object-cover object-center rounded-lg"
                />
            </div>
            <div className='sm:w-2/3 w-full mt-2 sm:mt-0'>
                <h2 className='text-xl font-medium font-alata'>{displayName}</h2>
                <hr/>
                <h3 className='mb-1'>
                    {
                        displayCompanies.map((company, index) => (
                            <span key={index}> {company} |</span>
                        ))
                    }
                </h3>
                <p className="mb-2">{displaySummary}</p>
                <button 
                    className="gradient button-gradient px-3 py-1 rounded-2xl"
                    onClick={handleRedirect}
                > More info </button>
            </div>
        </article>
    )
}

export default NewOfferGame
