import Greetings from "../components/Home/Greetings";
import MiniCard from "../components/home/MiniCard";
import BottomNav from "../components/shared/BottomNav";
import { TbCoin } from "react-icons/tb";
import { MdOutlineTimer } from "react-icons/md";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

export default function Home() {
    return(
        <section className="home-section bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex gap-3">
            {/* Left Div */}
            <div className="flex-[3]">
                <Greetings/>
                <div className="flex items-center w-full gap-3 px-8 mt-8">
                    <MiniCard title={'Total Earnings'} icon={<TbCoin/>} number={512} footerNum={1.6} />
                    <MiniCard title={'In Progress'} icon={<MdOutlineTimer/>} number={16} footerNum={1.6} />
                </div>
                <RecentOrders />
            </div>
            {/* == Left Div == */}
            {/*  Right Div  */}
            <div className="flex-[2]">
                <PopularDishes/>
            </div>
            {/* == Right Div == */}
            <BottomNav  />
        </section>
    )
}