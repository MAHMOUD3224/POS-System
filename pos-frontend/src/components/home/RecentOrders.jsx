import { FaSearch } from "react-icons/fa";
import { keepPreviousData, useQuery } from "@tanstack/react-query"; // todos: تحذير مهم: keepPreviousData مش حاجة تتستورد من المكتبة. هو خيار (option) بتمرره لـ useQuery، مش export.
import { getOrders} from "../../https/index";
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
        messageEnqueue({message:"Something went wrong!"},"error")
      }
    
      // setTimeout(() => {
      //       console.log(resData.data.data);
      // }, 3000)

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
                className='bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full'
                />
            </div>
            {/* == Search == */}
                <div className="all-orders px-6 mt-4 overflow-y-auto h-[300px]">
                    {
                        resData?.data.data.length > 0 ? (
                            resData.data.data.map((order) => {
                                return <OrderList key={order._id} order={order} />
                            })
                            // todos: we must show the init value is "loading" not "No orders"
                            // cuz the admin will be confused‼️
                            // and when the 
                        ) : <p className="col-span-3 text-gray-500">No orders available</p>
                    }
                </div>
        </div>
    </div>
)
}