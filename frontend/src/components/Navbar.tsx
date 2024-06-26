import { FaMessage, FaBell, FaBarsStaggered, FaUserNinja } from 'react-icons/fa6';
import { FaSearch, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setStatusLoggin } from '@/redux/slices/stateSlice';
import { clearUser } from '@/redux/slices/userSlice';

export default function Navbar() {

    const user = useAppSelector((state) => state.user);
    const logged = useAppSelector((state) => state.status.logged);

    const dispatch = useAppDispatch();

    const router = useRouter();
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setSearchExpanded(false);
        }
    };

    const handleLogout = () => {
        router.push('/signin');
        dispatch(setStatusLoggin(false));
        dispatch(clearUser());

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            router.push(`/search?name=${searchTerm}`);
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
        <nav className="flex items-center justify-center shadow-bottom py-4 px-8 font-inter">
            <div className="w-full flex flex-row justify-between items-center">
                <div className={`relative ${searchExpanded ? 'w-full' : 'max-w-96'}`} ref={searchRef}>
                    <FaSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${searchExpanded ? 'hidden' : 'block lg:hidden'}`}
                        onClick={() => setSearchExpanded(true)}
                    />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`bg-ebony-950 pl-10 pr-4 py-2 rounded-2xl transition-all duration-300 ${searchExpanded ? 'w-full' : 'hidden lg:block'}`}
                        onKeyDown={handleKeyDown}
                    />
                    <FaSearch
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hidden lg:block`}
                    />
                </div>
                {!searchExpanded && (
                    <div className="hidden sm:flex flex-row space-x-6 items-center">
                        {logged ? (
                            <>
                                <FaMessage size={24} />
                                <FaBell size={24} />
                                <button className="gradient button-gradient px-4 py-2 rounded-2xl" onClick={() => router.push(`/viewprofile/${user.id}`)}>{user.username}</button>
                                <button onClick={handleLogout}>
                                    Log out
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => router.push('/signin')}>Log in</button>
                                <button className="gradient button-gradient px-4 py-2 rounded-2xl" onClick={() => router.push('/signup')}>
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                )}
                <div className="sm:hidden flex items-center">
                    {!searchExpanded && (
                        <FaBarsStaggered
                            className="text-gray-500 cursor-pointer"
                            size={24}
                            onClick={() => setMenuOpen(!menuOpen)}
                        />
                    )}
                    {!searchExpanded && menuOpen && (
                        <div ref={menuRef} className="absolute top-14 right-4 bg-ebony-950 rounded-lg shadow-lg z-50">
                            <ul className="flex flex-col p-4 space-y-2">
                                {logged ? (
                                    <>
                                        <li className="button-navbar gradient" onClick={() => router.push('/profile')}>
                                            <FaUserNinja size={20} />
                                            <span>{user.username}</span>
                                        </li>
                                        <li className="button-navbar">
                                            <FaMessage size={20} />
                                            <span>Messages</span>
                                        </li>
                                        <li className="button-navbar">
                                            <FaBell size={20} />
                                            <span>Notifications</span>
                                        </li>
                                        <li className="button-navbar" onClick={handleLogout}>
                                            <FaSignOutAlt size={20} />
                                            <span>Log out</span>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li className="button-navbar" onClick={() => router.push('/signin')}>
                                            <FaSignInAlt size={20} />
                                            <span>Log in</span>
                                        </li>
                                        <li className="button-navbar gradient" onClick={() => router.push('/signup')}>
                                            <FaUserPlus size={20} />
                                            <span>Register</span>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}