"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Loader from "@/components/Loader";
import { User } from "@/types/user";
import { setUser } from "@/redux/slices/userSlice";

interface IFormUpdateProfile {
    username: string;
    first_name: string;
    last_name: string;
    description: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export default function Profile() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormUpdateProfile>();

    const onSubmit: SubmitHandler<IFormUpdateProfile> = async data => {
        data.username = data.username || user.username;
        data.first_name = data.first_name || user.first_name;
        data.last_name = data.last_name || user.last_name;
        data.description = data.description || user.description;
        data.phone = data.phone || user.phone;
        console.log(data);

        const urlServer = process.env.NEXT_PUBLIC_DEV_SERVER_URL;

        try {
            const response = await axios.patch(urlServer + "/users/" + user.id + "/", data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${user.token}`
                },
            });
            const dataUser: User = {
                id: response.data.id,
                email: response.data.email,
                username: response.data.username,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                phone: response.data.phone,
                description: response.data.description,
                token: user.token,
            };
            dispatch(setUser(dataUser));
            toast.success('Profile updated successfully');
        } catch (error) {
            const listErrors = (error as any).response.data;
            let errors = '';
            for (const key in listErrors) {
                errors += `${key}: ${listErrors[key]}\n`;
            }
            errors = errors.toUpperCase();
            toast.error(errors);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <MainLayoutPage>
            <Loader activate={loading} />
            <Toaster richColors />
            <article className="w-full flex flex-col lg:flex-row gap-8">
                <section className="w-full lg:w-1/2">
                    <h1 className="text-xl font-alata">Profile Information</h1>
                    <form
                        className="flex flex-col space-y-4 mt-4 font-inter"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <label className="w-full text-sm">Email</label>
                        <div className="flex flex-row items-center space-x-2 p-2 rounded-2xl bg-tertiary w-full select-none"
                            onClick={() => toast.info("Email cannot be changed")}
                        >
                            {user.email}
                        </div>

                        <label className="w-full text-sm">Username</label>
                        <input
                            type="text"
                            placeholder={user.username}
                            className=""
                            {...register("username", {
                                minLength: {
                                    value: 4,
                                    message: "Username must be at least 4 characters long"
                                },
                            })}
                        />
                        {errors.username && <p className="text-alert text-sm">{errors.username.message}</p>}

                        <label className="w-full text-sm">First Name</label>
                        <input
                            type="text"
                            placeholder={user.first_name}
                            {...register("first_name", {
                                pattern: { value: /^[a-zA-Z]+$/, message: 'Name should not contain numbers' },
                                minLength: { value: 2, message: 'Name must be at least 2 characters long' }
                            })}
                        />
                        {errors.first_name && <p className="text-alert text-sm">{errors.first_name.message}</p>}

                        <label className="w-full text-sm">Last Name</label>
                        <input
                            type="text"
                            placeholder={user.last_name}
                            {...register("last_name", {
                                pattern: { value: /^[a-zA-Z]+$/, message: 'Name should not contain numbers' },
                                minLength: { value: 2, message: 'Name must be at least 2 characters long' }
                            })}
                        />
                        {errors.last_name && <p className="text-alert text-sm">{errors.last_name.message}</p>}

                        <label className="w-full text-sm">Phone</label>
                        <input
                            type="tel"
                            placeholder={user.phone}
                            {...register("phone")}
                        />
                        <label className="w-full text-sm">Description</label>
                        <textarea
                            placeholder={user.description}
                            className="resize-none"
                            {...register("description")}
                        />
                        <label className="w-full text-sm">Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            {...register("password",
                                { minLength: { value: 8, message: 'Password must be at least 8 characters long' } }
                            )}
                        />
                        {errors.password && <p className="text-alert text-sm">{errors.password.message}</p>}

                        <label className="w-full text-sm">Confirm Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            {...register("confirmPassword", {
                                validate: (value) =>
                                    value === watch('password') || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-alert text-sm">{errors.confirmPassword.message}</p>}

                        <button type="submit" className="font-bold p-2 mt-2 w-full bg-violet-900 rounded-2xl text-sm md:text-md">
                            Update Profile
                        </button>
                    </form>
                </section>
                <section className="w-full lg:w-1/2">
                    <h1 className="text-xl font-alata">Games purchased</h1>
                </section>
            </article>
        </MainLayoutPage>
    );
}
