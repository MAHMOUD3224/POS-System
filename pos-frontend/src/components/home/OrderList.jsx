import { FaCheckDouble } from "react-icons/fa6";
import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import { getAvatarName } from "../../utils";


export default function OrderList({order}) {
    return(
        <div className="flex items-center gap-5 mb-5"> 
            <button className="bg-[#f6b100] h-[60px] w-[60px] text-xl rounded-full font-bold">{getAvatarName(order.customerDetails.name) || 'CN'}</button>
            <div className="grid items-center grid-cols-3 w-[100%]">
                <div className="flex flex-col items-start gap-1">
                    <h1 className=" max-text text-[#f5f5f5] text-lg font-semibold tracking-wide">{order.customerDetails.name || 'CN'}</h1>
                    <p className="text-[#ababab] text-sm w-[60px]">{order.items.length} Items</p>
                </div>
                
                    <h1 className="w-[120px] mx-auto text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1">Table No: <FaLongArrowAltRight className="text-[#ababab] mx-1 inline" /> {order?.table.tableNo}</h1>
                
                <div className="flex flex-col items-end gap-2">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mb-1 mr-2" /> {order.orderStatus}
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mb-1 mr-2" /> {order.orderStatus}
                </p>

              </>
            )}
          </div>
            </div>
        </div>
    )
}   