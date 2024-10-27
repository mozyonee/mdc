// File: app/(components)/Header/Header.jsx
"use client"; // This makes the component a client component
import { MdOutlineRemove } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import the usePathname hook
import "./Header.css";

const Header = () => {
    const pathname = usePathname(); // Get the current pathname

    return (
        <header>
            <nav>
                <h4>Los Santos Emergency - {pathname.substring(1)}</h4>
                <div>
                    <Link href="/"><MdOutlineRemove size={25} /></Link>
                    <Link href="/"><AiOutlineClose size={20} /></Link>
                </div>
            </nav>
        </header>
    );
}

export default Header;
