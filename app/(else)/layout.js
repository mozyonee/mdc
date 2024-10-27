
// File: /app/(else)/layout.js
import Header from "../(components)/Header/Header";
import Footer from "../(components)/Footer/Footer";
import "./globals.css";

export default function Layout({ children })  {

    return (
        <>
            <style>{`body { color: #000; } main { background: #fff; } main a { display: block; } a, a:link, a:visited, a:active, a:focus { color: #000; }`}</style>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
