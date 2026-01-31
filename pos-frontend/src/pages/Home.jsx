import Greetings from "../components/Home/Greetings";
import MiniCard from "../components/home/MiniCard";
import BottomNav from "../components/shared/BottomNav";
import { TbCoin } from "react-icons/tb";
import { MdOutlineTimer } from "react-icons/md";
import RecentOrders from "../components/home/RecentOrders";
import PopularDishes from "../components/home/PopularDishes";

export default function Home() {
    return (
        <section className="home-section bg-[var(--bg-base)] h-[calc(100vh-5rem)] overflow-y-auto custom-scrollbar flex flex-col lg:flex-row gap-8 p-6 transition-colors duration-300">
            {/* Left Div - Main Content Area */}
            <div className="flex-[3] flex flex-col gap-10 lg:px-6">
                <Greetings />
                <div className="flex items-center w-full gap-6">
                    <MiniCard title={'Total Earnings'} icon={<TbCoin />} number={512} footerNum={1.6} />
                    <MiniCard title={'In Progress'} icon={<MdOutlineTimer />} number={16} footerNum={1.6} />
                </div>
                <RecentOrders />
            </div>
            {/* == Left Div == */}

            {/*  Right Div - Secondary Area  */}
            <div className="flex-[1.8] flex flex-col gap-10 lg:px-6">
                <PopularDishes />
            </div>
            {/* == Right Div == */}

            <BottomNav />
        </section>
    )
}