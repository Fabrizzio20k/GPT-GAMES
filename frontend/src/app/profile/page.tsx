"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { toast, Toaster } from "sonner";

export default function Profile() {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    return (
        <MainLayoutPage>
            <Toaster richColors />
            <div className="w-full">
                <div className="flex flex-col lg:flex-row text-white gap-8">
                    <div className="w-full lg:w-1/2">
                        <h1 className="text-xl font-alata">Profile Information</h1>
                        <form className="flex flex-col space-y-4 mt-4 font-inter">
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
                            />
                            <label className="text-white w-full text-sm">First Name</label>
                            <input
                                type="text"
                                placeholder={user.firstname}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                            />
                            <label className="text-white w-full text-sm">Last Name</label>
                            <input
                                type="text"
                                placeholder={user.lastname}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                            />
                            <label className="text-white w-full text-sm">Phone</label>
                            <input
                                type="tel"
                                placeholder={user.phone}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                            />
                            <label className="text-white w-full text-sm">Description</label>
                            <textarea
                                placeholder={user.description}
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full resize-none"

                            />
                            <label className="text-white w-full text-sm">Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                            />
                            <label className="text-white w-full text-sm">Confirm Password</label>
                            <input
                                type="password"
                                placeholder="********"
                                className="p-2 rounded-2xl bg-gray-800/40 text-white w-full"
                            />

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