
import { SiWindows11 } from "react-icons/si";
import { GrLogin, GrLogout } from "react-icons/gr";
import { headers } from "next/headers";

import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import Link from "next/link";
import "./Footer.css";
import { PiUserCircle } from "react-icons/pi";
import { RiSearchLine, RiCameraLensFill } from "react-icons/ri";

const Footer = async ({ }) => {
	const headersList = headers();

	const session = await getServerSession(options);
	const pathname = headersList.get("next-url")
	const icons = {
		"/Office": <PiUserCircle size={30} />,
		"/Search": <RiSearchLine size={30} />,
		"/Camera": <RiCameraLensFill size={30} />,
	};
	  
	return (<footer>
		<nav>
			<div>
				<Link href="/"><SiWindows11 size={20} /></Link>
				{icons[pathname] && (
					<Link href='/'>
					{icons[pathname]}
					</Link>
				)}
			</div>
			<div>
				<p>04:42:50<br />05/02/2024</p>
				{session ? <Link href="/api/auth/signout?callbackUrl=/"><GrLogout size={22} /></Link> : <Link href="/api/auth/signin"><GrLogin size={22} /></Link>}
			</div>
		</nav>
	</footer>);
}

export default Footer;