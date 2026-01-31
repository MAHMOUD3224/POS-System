import { IoClose } from "react-icons/io5";

export default function Modal({ title, onClose, isOpen, children }) {
    if (!isOpen) return null;
    return (
        <div className="backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 transition-all duration-300">
            <div className="bg-[var(--bg-card)] shadow-[var(--shadow-xl)] w-full max-w-lg mx-4 rounded-2xl overflow-hidden border border-[var(--border-default)] transform transition-all animate-scale-in">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-default)] bg-[var(--bg-primary)]">
                    <h2 className="text-xl text-[var(--text-primary)] font-bold tracking-tight">{title}</h2>
                    <button
                        className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
                        onClick={onClose}
                    >
                        <IoClose size={24} />
                    </button>
                </div>
                <div className="p-6 bg-[var(--bg-card)]">
                    {children}
                </div>
            </div>
        </div>
    );
}
