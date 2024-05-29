import { FaMessage, FaBell } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {

    const router = useRouter();
    const [searchExpanded, setSearchExpanded] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setSearchExpanded(false);
        }
    };

    useEffect(() => {
        if (searchExpanded) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [searchExpanded]);

    return (
        <nav className="flex items-center justify-center text-white shadow-bottom py-4 px-8 font-inter">
            <div className="w-full max-w-[1920px] flex flex-row justify-between items-center">
                <div className={`relative ${searchExpanded ? 'w-full' : 'max-w-96'}`} ref={searchRef}>
                    <FaSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${searchExpanded ? 'hidden' : 'block lg:hidden'}`}
                        onClick={() => setSearchExpanded(true)}
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`bg-ebony-950 pl-10 pr-4 py-2 rounded-2xl transition-all duration-300 ${searchExpanded ? 'w-full' : 'hidden lg:block'}`}
                    />
                    <FaSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hidden lg:block`}
                    />
                </div>
                {!searchExpanded && (
                    <>
                        <div className="flex flex-row space-x-6">
                            <FaMessage size={24} />
                            <FaBell size={24} />
                        </div>
                        <div className="flex flex-row items-center justify-center space-x-6">
                            <button onClick={() => router.push('/signin')}>Log in</button>
                            <button className="bg-gradient-to-r from-fuchsia-800 to-indigo-700 px-4 py-2 rounded-2xl">
                                Register
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}