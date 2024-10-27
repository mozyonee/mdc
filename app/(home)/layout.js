// File: /app/(home)/layout.js

import Footer from "../(components)/Footer/Footer";
import "./globals.css";

export default function Layout({ children }) {

	return (
		<>
			<main>{children}</main>
			<Footer />
		</>
	);
}