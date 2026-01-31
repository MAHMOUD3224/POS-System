import { FaCheckDouble } from "react-icons/fa6";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineTimer } from "react-icons/md";
import { getAvatarName } from "../../utils";


export default function OrderList({ order }) {
  return (
    <div className="flex items-center gap-5 mb-5 p-3 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors duration-200">
      <button className="bg-[var(--color-primary)] h-[54px] w-[54px] min-w-[54px] text-lg rounded-2xl font-bold text-white shadow-lg shadow-[var(--color-primary)]/20 uppercase">{getAvatarName(order.customerDetails.name) || 'CN'}</button>
      <div className="grid items-center grid-cols-3 w-full">
        <div className="flex flex-col items-start">
          <h1 className="text-[var(--text-primary)] text-base font-black tracking-tight line-clamp-1 leading-tight">{order.customerDetails.name || 'CN'}</h1>
          <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest mt-0.5">{order.items.length} Items</p>
        </div>

        <h1 className="w-fit mx-auto text-[var(--color-primary)] text-xs font-bold bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg border border-[var(--color-primary)]/20">
          Table {order?.table.tableNo}
        </h1>

        <div className="flex flex-col items-end">
          {order.orderStatus === "Ready" ? (
            <div className="flex items-center gap-1.5 text-[var(--color-success)] text-xs font-bold bg-[var(--color-success)]/10 px-3 py-1.5 rounded-lg">
              <FaCheckDouble size={14} /> {order.orderStatus}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[var(--color-warning)] text-xs font-bold bg-[var(--color-warning)]/10 px-3 py-1.5 rounded-lg">
              <MdOutlineTimer size={14} /> {order.orderStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}   