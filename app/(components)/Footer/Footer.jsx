// File: app/(components)/Footer/Footer.jsx

"use client";

import { useEffect, useState } from 'react';
import { SiWindows11 } from "react-icons/si";
import { GrLogin, GrLogout } from "react-icons/gr";
import { PiUserCircle } from "react-icons/pi";
import { RiSearchLine, RiCameraLensFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import "./Footer.css";

const Footer = () => {
    const pathname = usePathname();
    const [currentTime, setCurrentTime] = useState(() => new Date().toLocaleTimeString());

    const icons = {
        "/Office": <PiUserCircle size={30} />,
        "/Search": <RiSearchLine size={30} />,
        "/Camera": <RiCameraLensFill size={30} />,
    };

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString());
        };

        // Update the time immediately on mount
        updateTime();

        const intervalId = setInterval(updateTime, 1000); // Update every second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const formattedDate = new Date().toLocaleDateString(); // Use the current date on render

    return (
        <footer>
            <nav>
                <div>
                    <Link href="/"><SiWindows11 size={20} /></Link>
                    {icons[pathname] && (
                        <Link href={pathname}>
                            {icons[pathname]}
                        </Link>
                    )}
                </div>
                <div>
                    <p suppressHydrationWarning={true}>{currentTime}<br />{formattedDate}</p>
                    <Link href="/api/auth/signout?callbackUrl=/"><GrLogout size={22} /></Link>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;
