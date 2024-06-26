"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from 'sonner';
import { setStatusLoggin } from "@/redux/slices/stateSlice";
import { setUser } from "@/redux/slices/userSlice";
import Loader from "@/components/Loader";
import { useState } from "react";
import { loginUser } from "@/services/api";

interface IFormInput {
    username: string;
    password: string;
}

export default function Login() {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        setLoading(true);

        const { errors, dataUser } = await loginUser(data);

        console.log(dataUser);
        

        if (Object.keys(errors).length > 0) {
            let errorsText = '';
            for (const key in errors) {
                errorsText += `${errors[key]}\n`;
            }
            errorsText = errorsText.toUpperCase();
            toast.error(errorsText);
        } else {
            toast.success('User logged in successfully');
            dispatch(setStatusLoggin(true));
            dispatch(setUser(dataUser));

            setTimeout(() => {
                // router.push('/');
            }, 1000);
        }

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <main>
            <Loader activate={loading} />
            <Toaster richColors />
            <div className="absolute h-screen w-screen -z-20 filter">
                <Image
                    src="/assets/background/login_wallpaper.webp"
                    alt="Login_background"
                    width={1920}
                    height={1080}
                    className="object-cover object-center h-full w-full"
                    priority={true}
                />
            </div>
            <div className="absolute h-screen w-screen bg-black bg-opacity-80 -z-10"></div>

            <div className="relative h-screen w-full flex flex-col justify-center items-center space-y-4 overflow-x-clip px-5 py-5">
                <div className="flex flex-row items-center space-x-5 justify-center">
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
                <div className="font-inter bg-gradient-to-tr from-fuchsia-900 to-violet-800 py-4 sm:py-8 px-10 sm:px-20 rounded-2xl w-full max-w-2xl overflow-y-scroll custom-scroll">
                    <form className="flex flex-col gap-2 w-full items-start" onSubmit={handleSubmit(onSubmit)}>
                        <label className="w-full text-sm">Username</label>
                        <input
                            {...register('username', { required: 'Username is required', minLength: { value: 4, message: 'Username must be at least 4 characters long' } })}
                            type="text"
                            placeholder="GPTUser"
                            className="p-2 rounded-2xl bg-gray-800/40 w-full"
                        />
                        {errors.username && <span className="text-red-500 text-sm md:text-md">{errors.username.message}</span>}

                        <label className="w-full text-sm">Password</label>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })}
                            type="password"
                            placeholder="********"
                            className="p-2 rounded-2xl bg-gray-800/40 w-full"
                        />
                        {errors.password && <span className="text-red-500 text-sm md:text-md">{errors.password.message}</span>}

                        <button className="font-bold p-2 mt-2 w-full bg-black rounded-2xl text-sm md:text-md">
                            Log in
                        </button>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-2 w-full mt-2">
                        <div className="flex items-center w-full">
                            <hr className="flex-grow border-t border-gray-300" />
                            <span className="mx-2 text-gray-300">or</span>
                            <hr className="flex-grow border-t border-gray-300" />
                        </div>
                        <button className="flex items-center justify-center w-full p-2 bg-white rounded-2xl shadow-lg space-x-4">
                            <FcGoogle className="text-2xl" />
                            <h2 className="text-black font-bold text-sm md:text-md">Sign in with Google</h2>
                        </button>
                        <div className="flex flex-row w-full items-center justify-evenly mt-2">
                            <Link href="#" className="text-sm underline">Forgot your password?</Link>
                            <Link href="/signup" className="text-sm underline">Create an account</Link>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}