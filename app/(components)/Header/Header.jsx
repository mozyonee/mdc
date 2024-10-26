import { MdOutlineRemove } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

import Link from 'next/link';
import "./Header.css";

const Header = async () => {
	return (<header>
		<nav>			
			<h4>Los Santos Emergency</h4>
			<div>
				<Link href="/"><MdOutlineRemove size={25} /></Link>
				<Link href="/"><AiOutlineClose size={20} /></Link>
			</div>
		</nav>
	</header>);
}

export default Header;