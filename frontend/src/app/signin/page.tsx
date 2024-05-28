"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    email: string;
    password: string;
}

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => {
        console.log(data);
    };

    return (
        <main>
            <div className="absolute h-screen w-screen -z-20 filter">
                <Image
                    src="/assets/background/login_wallpaper.webp"
                    alt="Login_background"
                    width={1920}
                    height={1080}
                    className="object-cover object-center h-full w-full"
                />
            </div>
            <div className="absolute h-screen w-screen bg-black bg-opacity-80 -z-10"></div>

            <div className="relative h-screen w-full flex flex-col justify-center items-center space-y-4 overflow-x-clip px-5">
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
                <div className="font-inter bg-gradient-to-tr from-fuchsia-900 to-violet-800 py-4 sm:py-10 px-10 sm:px-20 rounded-2xl w-full max-w-2xl overflow-y-hidden">
                    <form className="flex flex-col gap-4 w-full items-start" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-white w-full">Email</label>
                        <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            type="email"
                            placeholder="example@mail.com"
                            className="p-3 rounded-2xl bg-gray-800/40 text-white w-full"
                        />
                        {errors.email && <span className="text-red-500 text-md">{errors.email.message}</span>}

                        <label className="text-white w-full">Password</label>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters long' } })}
                            type="password"
                            placeholder="********"
                            className="p-3 rounded-2xl bg-gray-800/40 text-white w-full"
                        />
                        {errors.password && <span className="text-red-500 text-md">{errors.password.message}</span>}

                        <button className="font-bold p-2 mt-2 w-full bg-black text-white rounded-2xl">
                            Log in
                        </button>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-4 w-full mt-2">
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