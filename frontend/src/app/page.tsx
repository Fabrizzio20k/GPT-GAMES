"use client";

import { useAppSelector } from "@/redux/store";

export default function Page() {

    const logged = useAppSelector((state) => state.status.logged);

    return (
        <div>
            {logged && (<h1>Hello world</h1>)}
        </div>
    );
}