import { popularDishes } from "../../constants";

export default function PopularDishes() {
    const PopularDishes = [] ;
    return(
        <div className="pr-6 mt-6">
            <div className="bg-[#1a1a1a] w-full rounded-lg">
                <div className="flex items-center justify-between px-6 py-4">
                    <h1 className="text-[#f5f5f5] text-left font-semibold tracking-wide">Popular Dishes</h1>
                    <a href="" className="text-[#025cca] text-sm font-semibold">View all</a>
                </div>
                <div className="overflow-y-auto h-[680px] pb-3">
                    {
                        popularDishes.map((dish) => {
                            return(
                                <div key={dish.id} className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6 mt-3">
                                    <h1 className="flex items-center justify-center text-[#f5f5f5]  font-bold text-xl bg-[#1a1a1a] w-[45px] h-[45px] rounded-2xl">{String(dish.id).padStart(2,'0')}</h1>
                                    <img src={dish.image} alt={dish.name} loading="lazy" className="w-[50px] h-[50px] rounded-full object-cover object-center" />
                                    <div className="">
                                        <h1 className="text-[#f5f5f5] font-semibold tracking-wide">{dish.name}</h1>
                                        <p className="text-[#ababab] text-sm font-semibold mt-1">
                                            orders: <b className="text-[#f5f5f5]">{dish.numberOfOrders}</b>
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}