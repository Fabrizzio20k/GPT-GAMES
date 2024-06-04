"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast, Toaster } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormUpdateProfile {
    username: string;
    firstname: string;
    lastname: string;
    description: string;
    phone: string;
    password: string;
    confirmPassword: string;
    email: string;
}

export default function Profile() {
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormUpdateProfile>();

    const onSubmit: SubmitHandler<IFormUpdateProfile> = async data => {
        data.username = data.username || user.username;
        data.firstname = data.firstname || user.firstname;
        data.lastname = data.lastname || user.lastname;
        data.description = data.description || user.description;
        data.phone = data.phone || user.phone;
        data.email = user.email;
        console.log(data);
    }

    return (
        <MainLayoutPage>
            <Toaster richColors />
            <div className="w-full">
                <div className="flex flex-col lg:flex-row text-white gap-8">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-xl font-alata">Profile Information</h1>
                        <form
                            className="flex flex-col space-y-4 mt-4 font-inter"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <label className="text-white w-full text-sm">Email</label>
                            <div className="flex flex-row items-center space-x-2 p-2 rounded-2xl bg-gray-800/40 text-white w-full select-none"
                                onClick={() => toast.info("Email cannot be changed")}
                            >
                                {user.email}
                            </div>
                            <label className="text-white w-full text-sm">Username</label>
                            <input
                                type="text"
                                placeholder={user.username}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                                {...register("username", {
                                    minLength: {
                                        value: 4,
                                        message: "Username must be at least 4 characters long"
                                    },
                                })}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                            <label className="text-white w-full text-sm">First Name</label>
                            <input
                                type="text"
                                placeholder={user.firstname}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                                {...register("firstname", {
                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Name should not contain numbers' },
                                    minLength: { value: 2, message: 'Name must be at least 2 characters long' }
                                })}
                            />
                            {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname.message}</p>}
                            <label className="text-white w-full text-sm">Last Name</label>
                            <input
                                type="text"
                                placeholder={user.lastname}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                                {...register("lastname", {
                                    pattern: { value: /^[a-zA-Z]+$/, message: 'Name should not contain numbers' },
                                    minLength: { value: 2, message: 'Name must be at least 2 characters long' }
                                })}
                            />
                            {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname.message}</p>}
                            <label className="text-white w-full text-sm">Phone</label>
                            <input
                                type="tel"
                                placeholder={user.phone}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                                {...register("phone")}
                            />
                            <label className="text-white w-full text-sm">Description</label>
                            <textarea
                                placeholder={user.description}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full resize-none"
                                {...register("description")}
                            />
                            <label className="text-white w-full text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                                {...register("password",
                                    { minLength: { value: 8, message: 'Password must be at least 8 characters long' } }
                                )}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            <label className="text-white w-full text-sm">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                                {...register("confirmPassword", {
                                    validate: (value) =>
                                        value === watch('password') || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                            <button type="submit" className="font-bold p-2 mt-2 w-full bg-violet-900 text-white rounded-2xl text-sm md:text-md">
                                Update Profile
                            </button>
                        </form>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-xl font-alata">Games purchased</h1>
                    </div>
                </div>
            </div>
        </MainLayoutPage>
    );
}
