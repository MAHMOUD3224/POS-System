import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateTable } from "../../redux/slices/customerSlice";
import { useDispatch } from "react-redux";

export default function TableCard({id,name, status, initials, seats}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // todos: add parmater (name)
    const handleClick = (name) => {
    if(status === "Booked") return;
    // todos: add table id
    const table = { tableId: id, tableNo: name }
    dispatch(updateTable({table}))
    navigate(`/menu`);
  };

  
    return(
        <div onClick={() => handleClick(name)} className="w-[300px] bg-[#262626] hover:bg-[#1f1f1f] p-4 rounded-lg mb-4 cursor-pointer shadow-lg">
            <div className="flex items-center justify-between px-1 ">
                <h1 className="text-[#f5f5f5] text-xl font-semibold">Table <FaLongArrowAltRight className="text-[#ababab] mx-2 inline" /> {name}</h1>
                <p className={` ${status === "Booked" ? 'text-green-600 bg-[#068e3823]' : 'text-[#f6b100] bg-[#7a550723]'} px-2 py-1 rounded-lg`}>{status}</p>  
            </div>
            <div className="flex items-center justify-center my-5">
                <h1 className={`flex items-center justify-center text-white rounded-full h-[70px] w-[70px] text-xl ${ status === 'Booked' ? getBgColor() : "bg-[#1f1f1f]"}`} >{getAvatarName(initials) || "N/A"}</h1>
            </div>
            <p className="text-[#ababab]">Seats: <span className="text-[#f5f5f5]">{seats}</span></p>
        </div>
    )
}