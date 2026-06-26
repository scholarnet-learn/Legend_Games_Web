import { useState } from "react";
import "../css/ContactUs.css";

export default function ContactUs() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [popup, setPopup] = useState({ visible: false, title: "", message: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyNtZyyxv4f7k2yv_lrWv56H_eEpuGeiVYkS4kO0M_IM4dpV9htNaNTejMh8Iqw3Mtx/exec";

        try {
            // تحويل البيانات لشكل يفهمه جوجل بدون مشاكل حماية
            const formData = new URLSearchParams();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("message", form.message);

            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // رجعناها عشان نمنع خطأ الـ CORS في المتصفح
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
            });

            setPopup({
                visible: true,
                title: "Message Sent",
                message: `Thank you, ${form.name}! Your message has been sent successfully. We will contact you soon.`,
            });
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Error!", error);
            setPopup({
                visible: true,
                title: "Submission Failed",
                message: "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const closePopup = () => {
        setPopup({ visible: false, title: "", message: "" });
    };

    return (
        <section className="contact-page">
            <div className="contact-hero">
                <div className="home-hero-copy">
                    <span className="home-eyebrow">Contact Us</span>
                    <h1>We're here to help</h1>
                    <p>Send us a message for support, feedback, or questions about the games.</p>
                </div>
            </div>

            <div className="contact-section">
                <div className="section-header">
                    <div>
                        <h2>Get in touch</h2>
                        <p>Fill out the form and we will respond as soon as possible.</p>
                    </div>
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            disabled={loading}
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </label>
                    <label>
                        Message
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            rows="6"
                            required
                            disabled={loading}
                        />
                    </label>
                    <button type="submit" className="view-all-btn" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>

            {popup.visible && (
                <div className="contact-popup-backdrop" onClick={closePopup}>
                    <div className="contact-popup" onClick={(event) => event.stopPropagation()}>
                        <h3>{popup.title}</h3>
                        <p>{popup.message}</p>
                        <button type="button" className="contact-popup-close" onClick={closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
