import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


export default function BackButton() {
    const navigate = useNavigate() ;
    // todos: make navigate transport to '/'
    return(
        <button onClick={() => navigate(-1)} className="bg-[#025cca] p-3 text-xl font-bold rounded-full  text-white ">
            <IoArrowBackOutline/>
        </button>
    ) 
}