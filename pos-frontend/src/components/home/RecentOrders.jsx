import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";

export default function RecentOrders() {
return(
    <div className="px-8 mt-6 recent-orders">
        <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
            <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-[#f5f5f5] text-left font-semibold tracking-wide">Recent Orders</h1>
                <a href="" className="text-[#025cca] text-sm font-semibold">View all</a>
            </div>
            <div className='flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 mx-6 py-4'>
                <FaSearch className='text-[#f5f5f5]' aria-label={'Search icon'}/>
                <input
                type='text'
                placeholder='Search recent orders'
                className='bg-[#1f1f1f] outline-none text-[#f5f5f5] '
                />
            </div>
            {/* == Search == */}
                <div className="all-orders px-6 mt-4 overflow-y-auto h-[300px]">
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                    <OrderList />
                </div>
        </div>
    </div>
)
}