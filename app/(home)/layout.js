import AuthProvider from "../(components)/AuthProvider";
import Footer from "../(components)/Footer/Footer";
import "./globals.css";

export const metadata = {
	title: "MDC",
	description: "Chiliad Emergency",
};

export default function RootLayout({ children }) {

	return (
		<html lang="en">
			<AuthProvider>
				<body>
					<main>{children}</main>
					<Footer />
				</body>
			</AuthProvider>
		</html>
	);
}