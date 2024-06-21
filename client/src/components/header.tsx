"use client";
import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { tokenType } from '@/types/types';
import { useAuth } from '@/context/auth_context';
import { jwtDecode } from 'jwt-decode';

const Header: React.FC = () => {
    const { authToken, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);
    const recentSearches = ["React", "Tailwind CSS", "Framer Motion", "TypeScript"];
    useEffect(() => {
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const handleSearchClick = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const handleProfileClick = () => {
        setIsProfileOpen(!isProfileOpen);
    };
    const searchRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
            setIsSearchOpen(false);
        }
        if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
        }
    };
    let decodedToken = "";
    try {
        const token = jwtDecode<tokenType>(authToken);
        decodedToken = token.username
    } catch (error) {
        console.log(error)
    }
  

   

    return (
        <header className="fixed top-0 z-50 flex items-center justify-between w-full p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg shadow-primary">
            {/* Logo */}
            <div className="text-indigo-600 text-xl font-semibold cursor-pointer" onClick={e=>{}}>MyLogo{decodedToken}</div>

            {/* Search Bar */}
            <div ref={searchRef} className="relative flex items-center flex-grow mx-4 justify-center">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="w-1/3 px-2 py-1 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
                    onClick={handleSearchClick}
                />
                <AnimatePresence>
                    {isSearchOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full w-1/3 bg-white bg-opacity-90 rounded-lg shadow-primary mt-2 z-10"
                        >
                            <ul>
                                {recentSearches.map((item, index) => (
                                    <li key={index} className="px-4 py-2 hover:bg-indigo-100 cursor-pointer">{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div ref={profileRef} className="relative">
                <img 
                    src="/path/to/profile-image.jpg" 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full cursor-pointer" 
                    onClick={handleProfileClick}
                />
                <AnimatePresence>
                    {isProfileOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 w-48 bg-white bg-opacity-90 rounded-lg shadow-primary mt-2 z-10"
                        >
                            <ul className="relative">
                                <motion.div
                                    className="absolute left-0 w-full h-12 bg-indigo-100 "
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, y: hoveredItem !== null ? hoveredItem * 40 : 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "", stiffness: 5000 }}
                                />
                               <Link href={`/profile/${decodedToken}`}> <li 
                                    className="px-4 py-2   cursor-pointer flex items-center justify-start gap-2 relative"
                                    onMouseEnter={() => setHoveredItem(0)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    <Image src="" alt="" className="w-8 h-8 rounded-full"/>
                                    <span>Profile</span>
                                </li></Link>
                                <li 
                                    className="px-4 py-2  cursor-pointer relative flex items-center justify-start"
                                    onMouseEnter={() => setHoveredItem(1)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    Settings
                                </li>
                                <li 
                                    className="px-4 py-2  cursor-pointer relative flex items-center justify-start"
                                    onMouseEnter={() => setHoveredItem(2)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    Privacy & Policy
                                </li>
                                <li 
                                    className="px-4 py-2  cursor-pointer relative flex items-center justify-start"
                                    onMouseEnter={() => setHoveredItem(3)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                >
                                    Logout
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Header;
