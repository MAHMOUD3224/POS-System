import { FaCheckDouble } from "react-icons/fa6";
import { FaCircle, FaLongArrowAltRight } from "react-icons/fa";
import { fetchDateTime, getAvatarName } from "../../utils";


export default function OrderCard({order}) {
    console.log(order)
    return(
        <div className=" w-[500px] bg-[#262626] p-4 rounded-lg mb-4 h-fit"> 
            <div className="flex items-center gap-5 ">
                <button className="bg-[#f6b100] p-3 text-xl rounded-lg font-bold">{getAvatarName(order.customerDetails.name) || 'CN'}
                </button>
                <div className="flex items-center justify-between w-[100%]">
                <div className="flex flex-col items-start">
                    <h1 className="max-text text-[#f5f5f5] text-lg font-semibold tracking-wide">{order.customerDetails.name}</h1>
                    <p className="max-text text-[#ababab] text-sm">#{Math.floor(new Date(order.orderDate).getTime())} / Dine in</p>
                    <p className="text-[#ababab] text-sm">Table <FaLongArrowAltRight className="text-[#ababab] mx-1 inline" /> {order?.table.tableNo}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
            {order.orderStatus === "Ready" ? (
              <>
                <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
                  <FaCheckDouble className="inline mb-1 mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mb-1 mr-2 text-green-600" /> Ready to
                  serve
                </p>
              </>
            ) : (
              <>
                <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
                  <FaCircle className="inline mb-1 mr-2" /> {order.orderStatus}
                </p>
                <p className="text-[#ababab] text-sm">
                  <FaCircle className="inline mb-1 mr-2 text-yellow-600" /> Preparing your order
                </p>
              </>
            )}
          </div>

            </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-[#ababab]">
                <b className="">{fetchDateTime(order.updatedAt)}</b>
                <p className="font-semibold text-[#f5f5f5]">{order.items.length} items</p>
            </div> 
            <hr className="w-full mt-4 border-gray-500 border-t-1"/>
            <div className="text-[#f5f5f5] flex items-center justify-between mt-4">
                <h1 className="text-xl font-bold">Total</h1>
                <p className="text-lg font-bold ">${order.bills.totalWithTax.toFixed(2)}</p>
            </div>
        </div>
    ) 
}