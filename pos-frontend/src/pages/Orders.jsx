import { useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { messageEnqueue } from "../utils";

export default function Orders() {
    const [status,setStatus] = useState("all") ;
    const { data:resData, isError } = useQuery({
        queryKey: [ "orders" ],
        queryFn: async () => {
            return await getOrders();
        },
        placeholderData: keepPreviousData
    })
    console.log(resData)
    if(isError){
        messageEnqueue({message:'Something went wrong!'},'error')
    }
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
            <div className="flex flex-wrap gap-6 px-16 pt-4 pb-[80px] overflow-y-auto max-h-[calc(100vh-5rem-5rem)] ">
                {
                    resData?.data.data.length > 0 ? (
                        resData.data.data.map((order) => {
                            return <OrderCard key={order._id} order={order} />
                        })
                        // todos: we must show the init value is "loading" not "No orders"
                        // cuz the admin will be confused‼️
                        // and when the 
                    ) : <p className="col-span-3 text-gray-500">No orders available</p>
                }
            </div>
            
            <BottomNav />
        </section>
    )
}