import "./../../../css/Footer.css";

const footerLinks = [
    { label: "Home", path: "/" },
    { label: "New Releases", path: "/new" },
    { label: "Support", path: "/support" },
];

const legalLinks = [
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
    { label: "Cookies", path: "/cookies" },
];

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>Legend Games</h2>
                    <p>
                        Build your next epic adventure with our curated game catalogue,
                        exclusive updates, and community-first experiences.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Quick links</h3>
                    <div className="footer-links">
                        {footerLinks.map((link) => (
                            <a key={link.path} href={link.path}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Legal</h3>
                    <div className="footer-links">
                        {legalLinks.map((link) => (
                            <a key={link.path} href={link.path}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-note">© {new Date().getFullYear()} Legend Games. All rights reserved.</p>
                <div className="social-links">
                    <a href="https://x.com/LegendGames_ver" aria-label="X" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-twitter"></i>
                    </a>
                    <a href="https://discord.gg/kdsaCsqUs2" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-discord"></i>
                    </a>
                    <a href="https://www.pinterest.com/legendgamesvercel/_profile/" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-pinterest"></i>
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61591056346224" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-facebook"></i>
                    </a>
                    <a href="https://www.reddit.com/user/Outrageous-Log-8504/" aria-label="Reddit" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-reddit"></i>
                    </a>
                    <a href="https://whatsapp.com/channel/0029VbDQdHZKQuJEASfkff0j" aria-label="Whatsapp" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-whatsapp"></i>
                    </a>
                    <a href="https://t.me/legend_games_vercel" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-telegram"></i>
                    </a>
                    <a href="https://www.tiktok.com/@legend_games_vercel" aria-label="Tiktok" target="_blank" rel="noopener noreferrer">
                        <i className="fa-brands fa-tiktok"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}
