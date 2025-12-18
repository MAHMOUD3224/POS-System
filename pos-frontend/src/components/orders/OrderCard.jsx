import { FaCheckDouble } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";


export default function OrderCard() {
    return(
        <div className=" w-[500px] bg-[#262626] p-4 rounded-lg mb-4"> 
            <div className="flex items-center gap-5 ">
                <button className="bg-[#f6b100] p-3 text-xl rounded-lg font-bold">MR</button>
                <div className="flex items-center justify-between w-[100%]">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Mahmoud Rashad</h1>
                    <p className="text-[#ababab] text-sm">#101/ Dine in</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <p className="px-2 py-1 text-green-600 bg-[#068e3823] rounded-lg"><FaCheckDouble className="inline mr-2"/> Ready</p>                                                        
                    <p className="flex items-center text-[#ababab] text-sm"><FaCircle className="inline mr-2 text-green-600"/> Ready to serve</p>
                </div>
            </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-[#ababab]">
                <p className="">November 27, 2025 08:32 PM</p>
                <p className="font-semibold text-[#f5f5f5]">8 items</p>
            </div> 
            <hr className="w-full mt-4 border-gray-500 border-t-1"/>
            <div className="text-[#f5f5f5] flex items-center justify-between mt-4">
                <h1 className="text-xl font-bold">Total</h1>
                <p className="text-lg font-bold "> $250.00</p>
            </div>
        </div>
    ) 
}