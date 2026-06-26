import { useState } from "react";
import { NavLink } from "react-router-dom";
const Logo = "https://raw.githubusercontent.com/scholarnet-learn/Pictures/main/main-logo.webp";
import "./../../../css/TopBar.css";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "New Releases", path: "/new" },
    { label: "Contact Us", path: "/contact-us" }
];

export default function TopBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const currentPath = window.location.pathname;

    return (
        <header className={`topbar ${menuOpen ? "menu-open" : ""}`}>

            <div className="topbar-logo">
                <img src={Logo} alt="Logo" />
                <span>Legend Games</span>
            </div>

            <button
                type="button"
                className={`topbar-toggle ${menuOpen ? "active" : ""}`}
                onClick={() => setMenuOpen((open) => !open)}
                aria-label="Toggle navigation"
            >
                <i className="fa-solid fa-bars"></i>
            </button>

            <nav className={`topbar-nav ${menuOpen ? "active" : ""}`}>
                {navLinks.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.path === "/"}
                        className={({ isActive }) => (isActive ? "active" : "")}
                        onClick={() => setMenuOpen(false)}
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>



        </header>
    );
}