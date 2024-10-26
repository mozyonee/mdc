

import Link from 'next/link';
import { PiUserCircle } from "react-icons/pi";
import { RiSearchLine, RiCameraLensFill } from "react-icons/ri";

import "./page.css";

const Home = async () => {
	return (<div className="icons">
		<Link href="/Office"><PiUserCircle size={50} />Office</Link>
		<Link href="/Search"><RiSearchLine size={48} />Search</Link>
		<Link href="/Camera"><RiCameraLensFill size={46.45} />Camera</Link>
	</div>);
}

export default Home;