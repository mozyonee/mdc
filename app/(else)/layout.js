import AuthProvider from "../(components)/AuthProvider";
import Header from "../(components)/Header/Header";
import Footer from "../(components)/Footer/Footer";
import "./globals.css";

export const metadata = {
	title: "MDC",
	description: "Chiliad Emergency",
};

export default async function RootLayout({ children, params }) {

	return (
		<html lang="en">
			<AuthProvider>
				<body>
					<style>{`body { grid-template-rows: 50px auto 50px; color: #000; } main { background: #fff; } main a { display: block; } a, a:link, a:visited, a:active, a:focus { color: #000; }`}</style>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</AuthProvider>
		</html>
	);
}
