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

            <div className="relative h-screen w-full test flex flex-col justify-center items-center">
                <h1 className="text-white">hola</h1>
                <div className="bg-white bg-opacity-50 p-10 rounded-lg">
                    <h1 className="text-2xl font-bold text-center">Sign In</h1>
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
                        <button className="p-2 bg-red-500 text-white rounded-md">
                            Sign In with Google
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}