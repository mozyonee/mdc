// File: app/(components)/Footer/Footer.jsx
"use client"; // Ensure this is a client component
import { useEffect, useState } from 'react';
import { SiWindows11 } from "react-icons/si";
import { GrLogin, GrLogout } from "react-icons/gr";
import Link from "next/link";
import "./Footer.css";
import { PiUserCircle } from "react-icons/pi";
import { RiSearchLine, RiCameraLensFill } from "react-icons/ri";
import { usePathname } from 'next/navigation';

const FooterInside = ({ session }) => {
    const pathname = usePathname(); // Get the current pathname

    const [currentTime, setCurrentTime] = useState(new Date());

    const icons = {
        "/Office": <PiUserCircle size={30} />,
        "/Search": <RiSearchLine size={30} />,
        "/Camera": <RiCameraLensFill size={30} />,
    };

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        const intervalId = setInterval(updateTime, 1000); // Update every second

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    // Format time as HH:MM:SS
    const formattedTime = currentTime.toLocaleTimeString();
    // Format date as MM/DD/YYYY
    const formattedDate = currentTime.toLocaleDateString();

    return (
        <footer>
            <nav>
                <div>
                    <Link href="/"><SiWindows11 size={20} /></Link>
                    {icons[pathname] ? (
                        <Link href="/">
                            {icons[pathname]}
                        </Link>
                    ) : (
                        console.log(pathname) // Logging current pathname for debugging
                    )}
                </div>
                <div>
                    <p>{formattedTime}<br />{formattedDate}</p>
                    {session ? (
                        <Link href="/api/auth/signout?callbackUrl=/"><GrLogout size={22} /></Link>
                    ) : (
                        <Link href="/api/auth/signin"><GrLogin size={22} /></Link>
                    )}
                </div>
            </nav>
        </footer>
    );
}

export default FooterInside;
