import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import data from "../data/json/data.json";
import "../css/ProdPage.css";
const VodafoneCash = "https://raw.githubusercontent.com/scholarnet-learn/Pictures/main/voda.webp";
const OrangeCash = "https://raw.githubusercontent.com/scholarnet-learn/Pictures/main/orange.webp";
const InstaPay = "https://raw.githubusercontent.com/scholarnet-learn/Pictures/main/ip.webp";
const ETCash = "https://raw.githubusercontent.com/scholarnet-learn/Pictures/main/ec.webp";
const Visa = "https://raw.githubusercontent.com/scholarnet-learn/Pictures/main/visa.webp";


export default function ProdPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState("Vodafone Cash");
    const [checkoutStep, setCheckoutStep] = useState(1);
    const [direction, setDirection] = useState(1);

    const [customerData, setCustomerData] = useState({
        fullName: "",
        phone: "",
        wallet: "",
        cardNumber: "",
    });

    const allProducts = Object.values(data).flat();
    const product = allProducts.find((item) => item.id === productId);

    if (!product) {
        return (
            <section className="home-page">
                <div className="home-hero">
                    <div className="home-hero-copy">
                        <h1>Product not found</h1>
                        <p>The item you are looking for does not exist.</p>
                        <Link className="view-all-btn" to="/">
                            Return home
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    const paymentMethods = [
        {
            name: "Vodafone Cash",
            image: VodafoneCash,
        },
        {
            name: "Orange Cash",
            image: OrangeCash,
        },
        {
            name: "InstaPay",
            image: InstaPay,
        },
        {
            name: "e& Cash",
            image: ETCash
        },
        {
            name: "Visa/MasterCard",
            image: Visa
        }
    ];

    const pageVariants = {
        initial: (direction) => ({
            x: direction > 0 ? 120 : -120,
            opacity: 0,
        }),
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.35,
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? -120 : 120,
            opacity: 0,
            transition: {
                duration: 0.35,
            },
        }),
    };

    return (
        <>
            <section className="home-page">
                <div className="home-hero">
                    <div className="home-hero-copy">
                        <span className="home-eyebrow">Product Details</span>
                        <h1>{product.name}</h1>
                        <p>{product.description}</p>
                    </div>
                </div>

                <div className="product-detail-card">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />

                        <div className="product-detail-overlay">
                            <div className="product-detail-overlay-copy">
                                <span className="home-eyebrow">
                                    Product Preview
                                </span>

                                <h2>{product.name}</h2>

                                <p>{product.description}</p>
                            </div>

                            <div className="product-detail-overlay-bottom">
                                <div className="product-detail-meta">
                                    <span className="game-price">
                                        {product.price.toFixed(2)} $
                                    </span>
                                </div>

                                <div className="product-detail-actions">
                                    <button
                                        type="button"
                                        className="view-all-btn secondary"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>

                                    <button
                                        type="button"
                                        className="view-all-btn"
                                        onClick={() => setCheckoutOpen(true)} onClick={() => {
                                            setCheckoutOpen(true);
                                            setCheckoutStep(1);
                                        }}
                                    >
                                        Buy now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {checkoutOpen && (
                <div
                    className="checkout-modal-backdrop"
                    onClick={() => setCheckoutOpen(false)}
                >
                    <div
                        className="checkout-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="checkout-close"
                            onClick={() => setCheckoutOpen(false)}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="checkout-header">
                            <h2><i className="fa-solid fa-cart-shopping"></i> Checkout</h2>
                        </div>

                        <div className="checkout-content">
                            <div className="checkout-left">
                                <div className="checkout-product">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <div>
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                    </div>
                                </div>

                                <div className="checkout-summary">
                                    <div>
                                        <span><i className="fa-solid fa-money-bills"></i> Subtotal</span>
                                        <span>
                                            {product.price.toFixed(2)} $
                                        </span>
                                    </div>

                                    <div>
                                        <span><i class="fa-solid fa-receipt"></i> Fees</span>
                                        <span>0.00 $</span>
                                    </div>

                                    <div className="checkout-total">
                                        <span>Total</span>
                                        <span>
                                            {product.price.toFixed(2)} $
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="checkout-right">
                                <AnimatePresence mode="wait" custom={direction}>

                                    {checkoutStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            custom={direction}
                                            variants={pageVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >
                                            <>
                                                <h3>Select Payment Method</h3>

                                                <div className="payment-grid">
                                                    {paymentMethods.map((method) => (
                                                        <button
                                                            key={method.name}
                                                            className={`payment-method ${paymentMethod === method.name ? "active" : ""
                                                                }`}
                                                            onClick={() => setPaymentMethod(method.name)}
                                                        >
                                                            <img
                                                                src={method.image}
                                                                alt={method.name}
                                                                className="payment-logo"
                                                            />

                                                            <span>{method.name}</span>
                                                        </button>
                                                    ))}
                                                </div>

                                                <button
                                                    className="checkout-pay-btn"
                                                    onClick={() => setCheckoutStep(2)}
                                                >
                                                    Continue
                                                    <i className="fa-solid fa-arrow-right"></i>
                                                </button>
                                            </>
                                        </motion.div>
                                    )}

                                    {checkoutStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            custom={direction}
                                            variants={pageVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                        >

                                            <>
                                                <h3 className="checkout-step-title">

                                                    <span>
                                                        {paymentMethod === "Visa/MasterCard"
                                                            ? "Card Information"
                                                            : "Transfer Information"}
                                                    </span>

                                                    <img
                                                        src={paymentMethods.find(
                                                            (method) => method.name === paymentMethod
                                                        )?.image}
                                                        alt={paymentMethod}
                                                        className="checkout-payment-image"
                                                    />

                                                </h3>

                                                <div className="checkout-form">

                                                    <input
                                                        type="text"
                                                        placeholder="Full Name"
                                                        value={customerData.fullName}
                                                        onChange={(e) =>
                                                            setCustomerData({
                                                                ...customerData,
                                                                fullName: e.target.value,
                                                            })
                                                        }
                                                    />

                                                    {paymentMethod === "Visa/MasterCard" ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                placeholder="Card Number"
                                                                value={customerData.cardNumber}
                                                                onChange={(e) =>
                                                                    setCustomerData({
                                                                        ...customerData,
                                                                        cardNumber: e.target.value,
                                                                    })
                                                                }
                                                            />

                                                            <input
                                                                type="text"
                                                                placeholder="Phone Number"
                                                                value={customerData.phone}
                                                                onChange={(e) =>
                                                                    setCustomerData({
                                                                        ...customerData,
                                                                        phone: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <input
                                                                type="text"
                                                                placeholder="Phone Number"
                                                                value={customerData.phone}
                                                                onChange={(e) =>
                                                                    setCustomerData({
                                                                        ...customerData,
                                                                        phone: e.target.value,
                                                                    })
                                                                }
                                                            />

                                                            <input
                                                                type="text"
                                                                placeholder={`${paymentMethod} Number`}
                                                                value={customerData.wallet}
                                                                onChange={(e) =>
                                                                    setCustomerData({
                                                                        ...customerData,
                                                                        wallet: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                        </>

                                                    )}

                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                        marginTop: "20px",
                                                    }}
                                                >
                                                    <button
                                                        className="checkout-pay-btn secondary"
                                                        onClick={() => setCheckoutStep(1)}
                                                    >
                                                        <i className="fa-solid fa-arrow-left"></i>
                                                        Back
                                                    </button>

                                                    <button
                                                        className="checkout-pay-btn"
                                                        onClick={async () => {

                                                            try {

                                                                const response = await fetch("https://legend-games-api.vercel.app/send-order", {
                                                                    method: "POST",
                                                                    headers: {
                                                                        "Content-Type": "application/json",
                                                                    },
                                                                    body: JSON.stringify({
                                                                        message: `
🛒 New Order

🎮 Product: ${product.name}

💰 Price: ${product.price}$

💳 Payment Method: ${paymentMethod}

👤 Name: ${customerData.fullName}

📞 Phone: ${customerData.phone}

${paymentMethod === "Visa/MasterCard"
                                                                                ? `💳 Card Number: ${customerData.cardNumber}`
                                                                                : `🏦 Wallet Number: ${customerData.wallet}`
                                                                            }
                    `,
                                                                    }),
                                                                });

                                                                const data = await response.json();

                                                                if (data.success) {
                                                                    setCheckoutOpen(false);
                                                                    setSuccessPopup(true);

                                                                    setTimeout(() => {
                                                                        setSuccessPopup(false);
                                                                    }, 4000);
                                                                } else {
                                                                    setErrorPopup(true);

                                                                    setTimeout(() => {
                                                                        setErrorPopup(false);
                                                                    }, 4000);
                                                                }

                                                            } catch (err) {
                                                                console.error(err);
                                                                setErrorPopup(true);

                                                                setTimeout(() => {
                                                                    setErrorPopup(false);
                                                                }, 4000);
                                                            }

                                                        }}
                                                    >
                                                        Continue
                                                    </button>
                                                </div>
                                            </>
                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>
                        </div>
                    </div>
                </div>
            )}

            {successPopup && (
                <div className="success-popup-backdrop">
                    <div className="success-popup">

                        <div className="success-icon">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>

                        <h2>Order Sent Successfully!</h2>

                        <p>
                            Thank you for your purchase.
                            <br />
                            We received your order and will contact you shortly.
                        </p>

                        <button
                            className="success-btn"
                            onClick={() => setSuccessPopup(false)}
                        >
                            OK
                        </button>

                    </div>
                </div>
            )}

            {errorPopup && (
                <div className="success-popup-backdrop">
                    <div className="success-popup">

                        <div className="error-icon">
                            <i className="fa-solid fa-circle-xmark"></i>
                        </div>

                        <h2>Order Failed!</h2>

                        <p>
                            Sorry, we couldn't send your order.
                            <br />
                            Please try again in a few moments.
                        </p>

                        <button
                            className="error-btn"
                            onClick={() => setErrorPopup(false)}
                        >
                            OK
                        </button>

                    </div>
                </div>
            )}
        </>
    );
}