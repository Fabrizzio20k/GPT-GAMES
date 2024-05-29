import Sidebar from "@/components/Sidebar";
import { ReactNode } from "react";
import { FaBell, FaMessage } from "react-icons/fa6";

export default function MainLayoutPage({ children }: { children: ReactNode }) {
    return (
        <main className="bg-gulf-blue-950 h-screen flex">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className=" text-white shadow-bottom p-4">
                    <div className="container mx-auto flex justify-between items-center test">
                        <input type="text" placeholder="Search..." className="bg-gray-700 px-4 py-2 rounded test" />
                        <div className="flex flex-row test">
                            <FaMessage size={24} />
                            <FaBell size={24} />
                        </div>
                        <div className="test">
                            <button className="bg-gulf-blue-900 px-4 py-2 rounded">Sign In</button>
                            <button className="bg-gulf-blue-900 px-4 py-2 rounded">Register</button>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <section className="flex-1 shadow-inner p-6 overflow-y-auto">
                    <div className="container mx-auto">
                        <h1 className="text-2xl font-bold mb-4">Page</h1>
                        {children}
                    </div>
                </section>
            </div>
        </main>
    );
}