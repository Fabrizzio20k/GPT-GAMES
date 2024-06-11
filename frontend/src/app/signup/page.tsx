"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from 'sonner';
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useState } from "react";

interface IFormInput {
    username: string;
    first_name: string;
    last_name: string;
    description: string;
    phone: string;
    email: string;
    password: string;
}

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const router = useRouter();
    const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;
    const [loading, setLoading] = useState(false);
    

    const onSubmit: SubmitHandler<IFormInput> = async data => {
        setLoading(true);
        try {
            const response = await axios.post(urlServer + "/register/", data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            toast.success('User registered successfully');
            router.push('/signin');
        } catch (error) {
            const listErrors = (error as any).response.data;
            let errors = '';
            for (const key in listErrors) {
                errors += `${listErrors[key]}\n`;
            }
            errors = errors.toUpperCase();
            toast.error(errors);
        }
        finally {
            setLoading(false);
        }
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
                <div className="font-inter bg-gradient-to-tr from-fuchsia-900 to-violet-800 py-4 sm:py-8 px-10 sm:px-20 rounded-2xl w-full max-w-2xl overflow-y-scroll custom-scroll">
                    <form className="flex flex-col gap-2 w-full items-start" onSubmit={handleSubmit(onSubmit)}>
                        <label className="text-white w-full text-sm">Username</label>
                        <input
                            {...register('username', { required: 'Username is required', minLength: { value: 4, message: 'Username must be at least 4 characters long' } })}
                            type="text"
                            placeholder="Username"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full" />
                        {errors.username && <span className="text-red-500 text-sm md:text-md">{errors.username.message}</span>}
                        <label className="text-white w-full text-sm">First Name</label>
                        <input
                            {...register('first_name', { required: 'Firstname is required' })}
                            type="text"
                            placeholder="First Name"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full" />
                        {errors.first_name && <span className="text-red-500 text-sm md:text-md">{errors.first_name.message}</span>}
                        <label className="text-white w-full text-sm">Last Name</label>
                        <input
                            {...register('last_name', { required: 'Lastname is required' })}
                            type="text"
                            placeholder="Last Name"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full" />
                        {errors.last_name && <span className="text-red-500 text-sm md:text-md">{errors.last_name.message}</span>}
                        <label className="text-white w-full text-sm">Description</label>
                        <input
                            {...register('description', { required: 'Description is required' })}
                            type="text"
                            placeholder="Description"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full" />
                        {errors.description && <span className="text-red-500 text-sm md:text-md">{errors.description.message}</span>}
                        <label className="text-white w-full text-sm">Phone</label>
                        <input
                            {...register('phone', { required: 'Phone is required', pattern: { value: /^[0-9]+$/, message: 'Invalid phone number' } })}
                            type="tel"
                            placeholder="Phone"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full" />
                        {errors.phone && <span className="text-red-500 text-sm md:text-md">{errors.phone.message}</span>}

                        <label className="text-white w-full text-sm">Email</label>
                        <input
                            {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                            type="email"
                            placeholder="example@mail.com"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                        />
                        {errors.email && <span className="text-red-500 text-sm md:text-md">{errors.email.message}</span>}

                        <label className="text-white w-full text-sm">Password</label>
                        <input
                            {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters long' } })}
                            type="password"
                            placeholder="********"
                            className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                        />
                        {errors.password && <span className="text-red-500 text-sm md:text-md">{errors.password.message}</span>}

                        <button className="font-bold p-2 mt-2 w-full bg-black text-white rounded-2xl text-sm md:text-md">
                            Register Now
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
                            <h2 className="text-black font-bold text-sm md:text-md">Register with Google</h2>
                        </button>
                    </div>
                </div>
            </div>

        </main>
    );
}