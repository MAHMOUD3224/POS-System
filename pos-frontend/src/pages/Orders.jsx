import { useState } from "react";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https";
import { messageEnqueue } from "../utils";

export default function Orders() {
    const [status, setStatus] = useState("all");
    const { data: resData, isError } = useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            return await getOrders();
        },
        placeholderData: keepPreviousData
    });

    if (isError) {
        messageEnqueue({ message: 'Something went wrong!' }, 'error');
    }



    return (
        <section className="orders-section vibrant-bg h-[calc(100vh-5rem)] overflow-hidden">
            <div className="flex items-center justify-between px-10 py-4 border-b border-[var(--border-default)] bg-[var(--bg-card)] shadow-sm relative">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <h1 className="text-[var(--text-primary)] text-xl font-bold tracking-wide">Orders</h1>
                </div>
                <div className="flex items-center justify-around gap-2 bg-[var(--bg-secondary)] p-1.5 rounded-xl border border-[var(--border-default)]">
                    {["all", "progress", "ready", "completed"].map((btnStatus) => (
                        <button
                            key={btnStatus}
                            onClick={() => setStatus(btnStatus)}
                            className={`px-4 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-300 ${status === btnStatus
                                ? "bg-[var(--color-primary)] text-white shadow-md shadow-[var(--color-primary)]/20"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                                }`}
                        >
                            {btnStatus === "progress" ? "In Progress" : btnStatus}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Grid */}
            <div className="flex flex-wrap gap-6 px-16 pt-6 pb-[80px] overflow-y-auto max-h-[calc(100vh-5rem-5rem)]">
                {resData?.data?.data?.length > 0 ? (
                    resData.data.data.map((order) => {
                        return <OrderCard key={order._id} order={order} />;
                    })
                ) : (
                    <div className="w-full flex justify-center py-20">
                        <p className="text-[var(--text-dim)] text-lg font-bold">No orders available</p>
                    </div>
                )}
            </div>

            <BottomNav />
        </section>
    );
}

