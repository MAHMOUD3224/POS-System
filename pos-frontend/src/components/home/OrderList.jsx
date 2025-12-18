import { FaCheckDouble } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";


export default function OrderList() {
    return(
        <div className="flex items-center gap-5 mb-3"> 
            <button className="bg-[#f6b100] p-3 text-xl rounded-lg font-bold">MR</button>
            <div className="flex items-center justify-between w-[100%]">
                <div className="flex flex-col items-start gap-2">
                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Mahmoud Rashad</h1>
                    <p className="text-[#ababab] text-sm">8 Items</p>
                </div>
                
                    <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1">Table No: 3</h1>
                
                <div className="flex flex-col items-end gap-2">
                    <p className="px-3 py-1 text-green-600 bg-[#068e3823] rounded-lg p-1"><FaCheckDouble className="inline mr-2"/> Ready</p>                                                        
                    <p className="flex items-center text-[#ababab] text-sm"><FaCircle className="inline mr-2 text-green-600"/> Ready to serve</p>
                </div>
            </div>
        </div>
    )
}