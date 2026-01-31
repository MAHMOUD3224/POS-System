import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateTable } from "../../redux/slices/customerSlice";
import { useDispatch } from "react-redux";

export default function TableCard({ id, name, status, initials, seats }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // todos: add parmater (name)
    const handleClick = (name) => {
        if (status === "Booked") return;
        // todos: add table id
        const table = { tableId: id, tableNo: name }
        dispatch(updateTable({ table }))
        navigate(`/menu`);
    };


    return (
        <div onClick={() => handleClick(name)} className="w-[300px] bg-[var(--bg-card)] hover:border-[var(--color-primary)] p-4 rounded-xl mb-4 cursor-pointer shadow-sm border border-[var(--border-default)] transition-all duration-200 group">
            <div className="flex items-center justify-between px-1 mb-2">
                <h1 className="text-[var(--text-primary)] text-xl font-semibold flex items-center gap-2">
                    Table <FaLongArrowAltRight className="text-[var(--text-muted)]" /> {name}
                </h1>
                <p className={`px-3 py-1 rounded-lg text-sm font-medium ${status === "Booked"
                    ? 'text-[var(--color-success)] bg-[var(--color-success)]/10 border border-[var(--color-success)]/20'
                    : 'text-[var(--color-warning)] bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20'
                    }`}>
                    {status}
                </p>
            </div>
            <div className="flex items-center justify-center my-6">
                <h1 className={`flex items-center justify-center text-white rounded-full h-[80px] w-[80px] text-2xl font-bold shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-110 ${status === 'Booked' ? getBgColor() : "bg-[#1f1f1f] text-white"}`} >{getAvatarName(initials) || "N/A"}</h1>
            </div>
            <p className="text-[var(--text-muted)] text-center font-medium">Seats: <span className="text-[var(--text-primary)] font-bold">{seats}</span></p>
        </div>
    )
}