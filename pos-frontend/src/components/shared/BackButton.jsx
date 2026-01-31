import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export default function BackButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-3 text-xl font-bold rounded-full text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 border border-white/10"
        >
            <IoArrowBackOutline />
        </button>
    );
}