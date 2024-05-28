import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

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
            <div className="absolute h-screen w-screen bg-black bg-opacity-80 -z-10"></div>

            <div className="relative h-screen w-full flex flex-col justify-center items-center space-y-5 overflow-x-clip px-5">
                <div className="flex flex-row text-white items-center space-x-5 justify-center">
                    <Image
                        src="/assets/logo/logo.png"
                        alt="Logo"
                        width={100}
                        height={100}
                        className="invert filter brightness-0 w-16 sm:w-20 lg:w-auto opacity-80 select-none"
                    />
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-alata tracking-widest bg-gradient-to-r from-fuchsia-800 to-indigo-700 bg-clip-text text-transparent text-center select-none">
                        GPT GAMES
                    </h2>
                </div>
                <div className="font-inter bg-gradient-to-tr from-fuchsia-900 to-violet-800 py-10 px-10 sm:px-20 rounded-2xl w-full max-w-2xl">
                    <form className="flex flex-col gap-3 w-full items-center">
                        <label className="text-white w-full">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@mail.com"
                            className="p-3 rounded-2xl bg-gray-800/40 text-white w-full"
                        />
                        <label className="text-white w-full">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Pepito el mas capito"
                            className="p-3 rounded-2xl bg-gray-800/40 text-white w-full"
                        />
                        <button className="font-bold p-2 mt-4 w-full bg-black text-white rounded-2xl">
                            Log in
                        </button>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-3 w-full mt-4">
                        <div className="flex items-center w-full">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-2 text-gray-300">or</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <button className="flex items-center justify-center w-full p-2 bg-white rounded-2xl shadow-lg space-x-4">
                            <FcGoogle className="text-4xl" />
                            <h2 className="text-black font-bold">Sign in with Google</h2>
                        </button>
                        <a href="#" className="text-white underline">Forgot your password?</a>
                        <a href="#" className="text-white underline">Create an account</a>
                    </div>
                </div>
            </div>

        </main>
    );
}