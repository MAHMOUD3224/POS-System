import { useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";

export default function Orders() {
    const [status,setStatus] = useState("all") ;
    return(
        <section className="orders-section bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
            <div className="flex items-center justify-between px-10 py-4 ">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <h1 className="text-[#f5f5f5] text-xl font-bold tracking-wide">Orders</h1>
                </div>
                <div className="flex items-center justify-around gap-3">
                    <button onClick={() => setStatus("all")} className={`${status === 'all' ? 'bg-[#383838]' : ''} text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold`}>All</button>
                    <button onClick={() => setStatus("progress")} className={`${status === 'progress' ? 'bg-[#383838]' : ''} text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold`}>In Progress</button>
                    <button onClick={() => setStatus("ready")} className={`${status === 'ready' ? 'bg-[#383838]' : ''} text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold`}>Ready</button>
                    <button onClick={() => setStatus("completed")} className={`${status === 'completed' ? 'bg-[#383838]' : ''} text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold`}>Completed</button>
                </div>
            </div>
            {/* height must be calc(100vh - 226px) cuz header is 85px and second header is 76px and footer is 64px */}
            <div className="flex flex-wrap gap-6 px-16 pt-4 pb-[80px] overflow-y-auto h-[calc(100vh-5rem-5rem)] ">
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
                <OrderCard />
            </div>
            
            <BottomNav />
        </section>
    )
}