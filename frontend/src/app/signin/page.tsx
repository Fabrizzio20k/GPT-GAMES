import Image from "next/image";

export default function Login() {
    return (
        <main>
            <div className="absolute h-screen w-screen -z-20 filter">
                <Image
                    src="/assets/background/login_wallpaper.webp"
                    alt="Login_background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="absolute h-screen w-screen bg-black bg-opacity-70 -z-10"></div>

            <div className="relative h-screen w-full flex flex-col justify-center items-center">
                <div className="flex flex-row text-white items-center space-x-5 justify-center">
                    <Image src="/assets/logo/logo.png" alt="Logo" width={100} height={100} className="invert filter brightness-0" />
                    <h2 className="text-6xl font-alata tracking-widest bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">GPT GAMES</h2>
                </div>
                <div className="bg-gradient-to-tr from-fuchsia-800 to-violet-700 p-10 rounded-lg">
                    <form className="flex flex-col gap-4 mt-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="p-2 border border-gray-300 rounded-md"
                        />
                        <button className="p-2 bg-blue-500 text-white rounded-md">
                            Sign In
                        </button>
                        <hr className="border border-gray-300" />
                        <p className="text-center">or</p>
                        <button className="p-2 bg-white rounded-md shadow-lg text-black">
                            Sign In with Google
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}