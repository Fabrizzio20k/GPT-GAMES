"use client";

import MainLayoutPage from "@/pages/MainLayoutPage";
import { useAppDispatch, useAppSelector } from "@/redux/store";

export default function Profile() {

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    return (
        <MainLayoutPage>
            <div className="test w-full">
                <h1 className="text-xl font-alata">Profile Page</h1>
                <div className="flex flex-col lg:flex-row">
                    <form className="flex flex-col space-y-4 mt-4 w-full lg:w-1/2">
                        <label>
                            Username
                        </label>
                        <input
                            type="text"
                            value={user.username}
                        />
                        <label>
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email}
                        />
                        <label>
                            First Name
                        </label>
                        <input
                            type="text"
                            value={user.firstname}
                        />
                        <label>
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={user.lastname}
                        />
                        <label>
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={user.phone}
                        />
                        <label>
                            Description
                        </label>
                        <textarea
                            value={user.description}
                        />
                        <label>
                            New Password
                        </label>
                        <input
                            type="password"
                            value=""
                        />
                        <label>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value=""
                        />
                        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">Save</button>
                    </form>
                    <div className="mt-4 w-full lg:w-1/2">
                    </div>
                </div>
            </div>
        </MainLayoutPage>
    );
}