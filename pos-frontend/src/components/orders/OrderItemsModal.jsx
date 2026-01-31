import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";

export default function OrderItemsModal({ order, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <motion.div     
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-2xl max-h-[calc(100vh-5rem)] bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-default)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--text-primary)]">Order Items</h2>
                        <p className="text-sm text-[var(--text-secondary)]">
                            {order.customerDetails.name} • Table <span className="text-[var(--color-accent)]">{order?.table?.tableNo}</span>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors duration-200"
                    >
                        <IoClose className="text-2xl text-[var(--text-muted)] hover:text-[var(--text-primary)]" />
                    </button>
                </div>

                {/* Modal Body - Scrollable Items List */}
                <div className="p-5 overflow-y-auto max-h-[60vh] bg-[var(--bg-card)] custom-scrollbar">
                    <div className="space-y-3">
                        {order.items.map((item, index) => (
                            <div
                                key={item.id || index}
                                className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-default)] hover:border-[var(--color-primary)]/40 transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-bold text-sm">
                                        {item.quantity}x
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-[var(--text-primary)]">{item.name}</h3>
                                        <p className="text-sm text-[var(--text-muted)]">${item.pricePerQuantity?.toFixed(2) || '0.00'} each</p>
                                    </div>
                                </div>
                                <p className="text-lg font-bold text-[var(--color-accent)]">
                                    ${item.price?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between p-5 border-t border-[var(--border-default)] bg-[var(--bg-primary)]">
                    <div className="text-[var(--text-secondary)]">
                        <span className="font-medium">{order.items.length} items total</span>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-[var(--text-muted)]">Total Amount</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] bg-clip-text text-transparent">
                            ${order.bills.totalWithTax.toFixed(2)}
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
