// File: app/(components)/Footer/FooterWrapper.jsx
import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import FooterInside from "./FooterInside";

const Footer = async () => {
    const session = await getServerSession(options);

    return <FooterInside session={session} />;
};

export default Footer;
