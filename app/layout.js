// File: /app/(home)/layout.js

import AuthProvider from "./(components)/AuthProvider";

export const metadata = {
	title: "MDC",
	description: "Chiliad Emergency",
};

export default function RootLayout({ children, params }) {

    return (
        <html lang="en">
			<body>
            	<AuthProvider>
					{children}
            	</AuthProvider>
			</body>
        </html>
    );
}
