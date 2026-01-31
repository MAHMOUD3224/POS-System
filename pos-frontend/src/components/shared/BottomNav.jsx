import { FaConciergeBell, FaHome } from "react-icons/fa";
import { MdOutlineReorder } from "react-icons/md";
import { MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";
export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('')
  const [guestCount, setGuestCount] = useState(0);
  const [name, setName] = useState('')
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const increment = () => {
    if (guestCount >= 6) return;
    setGuestCount((prev) => prev + 1);
  }
  const decrement = () => {
    if (guestCount <= 0) return;
    setGuestCount((prev) => prev - 1);
  }

  const isActive = (path) => location.pathname === path;

  const handleCreateOrder = () => {
    // send the data to store
    dispatch(setCustomer({ name, phone, guests: guestCount }));
    navigate("/tables");
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--bg-primary)] border-t border-[var(--border-default)] p-2 h-20 flex justify-around items-center shadow-[0_-4px_16px_rgba(5,150,105,0.06)] transition-colors duration-300">
      <button
        onClick={() => navigate("/")}
        className={`flex flex-col items-center justify-center gap-1 font-semibold transition-all duration-200
        ${isActive("/") ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}
        px-8 py-2 rounded-xl`}
      >
        <FaHome size={22} />
        <span className="text-xs uppercase tracking-wider">Home</span>
      </button>

      <button
        onClick={() => navigate("/orders")}
        className={`flex flex-col items-center justify-center gap-1 font-semibold transition-all duration-200
        ${isActive("/orders") ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}
        px-8 py-2 rounded-xl`}
      >
        <MdOutlineReorder size={22} />
        <span className="text-xs uppercase tracking-wider">Orders</span>
      </button>

      <button
        onClick={() => navigate("/tables")}
        className={`flex flex-col items-center justify-center gap-1 font-semibold transition-all duration-200
        ${isActive("/tables") ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}
        px-8 py-2 rounded-xl`}
      >
        <MdTableBar size={22} />
        <span className="text-xs uppercase tracking-wider">Tables</span>
      </button>

      <button
        onClick={() => navigate("/more")}
        className={`flex flex-col items-center justify-center gap-1 font-semibold transition-all duration-200
        ${isActive("/more") ? "text-[var(--color-primary)] bg-[var(--color-primary)]/10" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"}
        px-8 py-2 rounded-xl`}
      >
        <CiCircleMore size={22} />
        <span className="text-xs uppercase tracking-wider">More</span>
      </button>

      <button
        disabled={isActive('/tables') || isActive('/menu')}
        onClick={openModal}
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-full p-4 shadow-xl shadow-[var(--color-primary)]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
      >
        <FaConciergeBell size={30} />
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={"Create New Order"}>
        <div className="space-y-5">
          <div>
            <label className="block text-[var(--text-secondary)] mb-2 text-sm font-semibold tracking-tight">Customer Name</label>
            <div className="flex items-center rounded-xl p-3 px-4 bg-[var(--bg-secondary)] border border-[var(--border-default)] focus-within:border-[var(--color-primary)]/50 transition-all">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter customer name"
                className="flex-1 text-[var(--text-primary)] bg-transparent focus:outline-none placeholder:text-[var(--text-dim)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[var(--text-secondary)] mb-2 text-sm font-semibold tracking-tight">Customer Phone</label>
            <div className="flex items-center rounded-xl p-3 px-4 bg-[var(--bg-secondary)] border border-[var(--border-default)] focus-within:border-[var(--color-primary)]/50 transition-all">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="+1 234 567 890"
                className="flex-1 text-[var(--text-primary)] bg-transparent focus:outline-none placeholder:text-[var(--text-dim)]"
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-semibold text-[var(--text-secondary)] tracking-tight">Number of Guests</label>
            <div className="flex items-center justify-between bg-[var(--bg-secondary)] px-4 py-3 rounded-xl border border-[var(--border-default)]">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all text-xl font-bold"
              >
                &minus;
              </button>
              <span className="text-[var(--text-primary)] font-bold text-lg">{guestCount} Guests</span>
              <button
                onClick={increment}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all text-xl font-bold"
              >
                &#43;
              </button>
            </div>
          </div>
          <button
            onClick={handleCreateOrder}
            className="w-full bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-primary-light)] text-white rounded-xl py-4 font-bold text-lg shadow-lg shadow-[var(--color-primary)]/20 transition-all mt-4 border border-white/10"
          >
            Create Order
          </button>
        </div>
      </Modal>
    </div>
  );
}

