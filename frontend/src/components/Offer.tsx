import Image from 'next/image'

export default function Offer() {
    return (
        <section className='bg-tertiary p-3 rounded-xl'>
            <Image
                src="/assets/background/login_wallpaper.webp"
                alt="Login_background"
                layout="responsive"
                width={10}
                height={10} 
                className="object-cover object-center rounded-lg mb-2 w-100px"
            />
            <div className='flex justify-between'>
                <h2 className='uppercase'>Game name</h2>
                <div className='gradient px-3 py-1 rounded-full font-bold'>
                    S/. 19.99
                </div>
            </div>
        </section>
    )
}

