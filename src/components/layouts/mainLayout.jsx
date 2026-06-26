import TopBar from "./main_components/TopBar";
import Footer from "./main_components/Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <TopBar />

            <main>
                {children}
            </main>

            <Footer />
        </>
    );
}