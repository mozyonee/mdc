// File: /app/(home)/layout.js

import AuthProvider from "../(components)/AuthProvider";
import Footer from "../(components)/Footer/Footer";
import "./globals.css";

export default function Layout({ children }) {

	return (
		<AuthProvider>
			<main>{children}</main>
			<Footer />
		</AuthProvider>
	);
}