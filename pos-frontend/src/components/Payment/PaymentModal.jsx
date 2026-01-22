import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaCreditCard, FaTimes, FaSpinner } from "react-icons/fa";

const PaymentModal = ({
    isOpen,
    onClose,
    clientSecret,
    amount,
    customerName,
    onPaymentSuccess,
    onPaymentError
}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setErrorMessage("");

        try {
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                clientSecret,
                {
                    payment_method: {
                        card: elements.getElement(CardElement),
                        billing_details: {
                            name: customerName,
                        },
                    },
                }
            );

            if (error) {
                setErrorMessage(error.message);
                onPaymentError(error);
            } else if (paymentIntent.status === "succeeded") {
                onPaymentSuccess(paymentIntent);
                onClose();
            }
        } catch (err) {
            setErrorMessage("An unexpected error occurred. Please try again.");
            onPaymentError(err);
        } finally {
            setIsProcessing(false);
        }
    };

    const cardElementOptions = {
        style: {
            base: {
                fontSize: "16px",
                color: "#1f2937",
                fontFamily: "'Inter', sans-serif",
                "::placeholder": {
                    color: "#9ca3af",
                },
                iconColor: "#6366f1",
            },
            invalid: {
                color: "#ef4444",
                iconColor: "#ef4444",
            },
        },
        hidePostalCode: true,
        hideIcon: false,
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                    >
                        <FaTimes className="text-xl" />
                    </button>

                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <FaLock className="text-green-500" />
                                <h2 className="text-xl font-bold text-gray-800">Secure Payment</h2>
                            </div>
                            <img
                                src="https://stripe.com/img/v3/home/social.png"
                                alt="Stripe"
                                className="h-6"
                            />
                        </div>
                        <p className="text-sm text-gray-500">Your payment information is safe and encrypted</p>
                    </div>

                    {/* Card Visual */}
                    <div className="px-6 pt-6">
                        <div className="relative mb-6 p-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg text-white">
                            <div className="absolute top-4 right-4">
                                <FaCreditCard className="text-3xl opacity-30" />
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-8 bg-yellow-400 rounded" />
                                    <span className="text-xs opacity-75">CHIP</span>
                                </div>
                                <div className="font-mono text-xl tracking-widest">
                                    •••• •••• •••• ••••
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs opacity-75">CARDHOLDER</p>
                                        <p className="font-semibold">{customerName || "Customer Name"}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs opacity-75">AMOUNT</p>
                                        <p className="text-2xl font-bold">${amount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleSubmit} className="px-6 pb-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Details
                            </label>
                            <div className="p-4 border-2 border-gray-200 rounded-lg focus-within:border-indigo-500 transition-colors">
                                <CardElement options={cardElementOptions} />
                            </div>
                        </div>

                        {errorMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                            >
                                <p className="text-sm text-red-600">{errorMessage}</p>
                            </motion.div>
                        )}

                        {/* Amount Summary */}
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Amount to Pay:</span>
                                <span className="font-semibold text-gray-800">${amount}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                You will be charged immediately
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!stripe || isProcessing}
                            className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${isProcessing || !stripe
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg"
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaLock />
                                    Pay ${amount}
                                </>
                            )}
                        </button>

                        {/* Footer */}
                        <p className="text-xs text-center text-gray-500 mt-4">
                            🔒 Processed by Stripe. Safe & Encrypted.
                        </p>
                    </form>

                    {/* Test Card Info (Only in development) */}
                    {import.meta.env.DEV && (
                        <div className="px-6 pb-4">
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-xs font-semibold text-blue-800 mb-1">Test Mode</p>
                                <p className="text-xs text-blue-600">Use: 4242 4242 4242 4242</p>
                                <p className="text-xs text-blue-600">Any future date & CVC</p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PaymentModal;
