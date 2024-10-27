// File: /app/(home)/layout.js


export const metadata = {
	title: "MDC",
	description: "Chiliad Emergency",
};

export default function RootLayout({ children, params }) {

    return (
        <html lang="en">
			<body>
				{children}
			</body>
        </html>
    );
}
