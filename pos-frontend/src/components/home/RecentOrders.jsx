import { FaSearch } from "react-icons/fa";
import { keepPreviousData, useQuery } from "@tanstack/react-query"; // todos: تحذير مهم: keepPreviousData مش حاجة تتستورد من المكتبة. هو خيار (option) بتمرره لـ useQuery، مش export.
import { getOrders } from "../../https/index";
import {
    //  fetchDateTime,
    messageEnqueue
} from "../../utils";
import OrderList from "./OrderList";


export default function RecentOrders() {
    const { data: resData, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            return await getOrders();
        },
        placeholderData: keepPreviousData,
    });

    if (isError) {
        messageEnqueue({ message: "Something went wrong!" }, "error")
    }

    return (
        <div className="recent-orders">
            <div className="bg-[var(--bg-card)] w-full rounded-3xl border border-[var(--border-default)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-300">
                <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
                    <h1 className="text-[var(--text-primary)] text-2xl font-black tracking-tight">Recent Orders</h1>
                    <a href="/orders" className="bg-[var(--bg-secondary)] text-[var(--color-primary)] px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all shadow-sm">View all</a>
                </div>

                <div className='flex items-center gap-4 bg-[var(--bg-secondary)] rounded-2xl px-5 mx-8 mt-8 py-4 border border-[var(--border-default)] focus-within:border-[var(--color-primary)] focus-within:ring-4 focus-within:ring-[var(--color-primary)]/10 transition-all'>
                    <FaSearch className='text-[var(--color-primary)] text-lg' aria-label={'Search icon'} />
                    <input
                        type='text'
                        placeholder='Search recent orders...'
                        className='bg-transparent outline-none text-[var(--text-primary)] w-full text-sm font-bold placeholder:text-[var(--text-dim)]'
                    />
                </div>

                <div className="all-orders px-6 my-6 space-y-3">
                    {
                        resData?.data.data.length > 0 ? (
                            resData.data.data.slice(0, 5).map((order) => {
                                return <OrderList key={order._id} order={order} />
                            })
                        ) : (
                            <div className="py-10 text-center">
                                <p className="text-[var(--text-dim)] font-medium">No orders available</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
