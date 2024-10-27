import { withAuth } from "next-auth/middleware";

export default withAuth(
	middleware = (req) => { },
	{
		callbacks: { authorized: ({token}) => !!token },
		secret: process.env.NEXTAUTH_SECRET,
	}
);

export const config = { matcher: ["/"] };