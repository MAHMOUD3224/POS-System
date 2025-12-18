import moment from "moment/moment";
import 'moment/min/locales';
import { useState, useEffect } from "react";


export default function Greetings() {
    // التاريخ يتحدد مرة واحدة فقط
    const date = moment().format("ll");

    // الوقت يتغير كل ثانية
    const [time, setTime] = useState(moment().format("LTS"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format("LTS"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-start justify-between px-8 mt-5">
            <div>
                <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
                    Good Morning, Mahmoud
                </h1>
                <p className="text-[#ababab] text-sm">
                    Give your best services for customers 😀
                </p>
            </div>

            <div className="text-center">
                <h1 className="text-[#f5f5f5] text-3xl font-bold">{time}</h1>
                <h1 className="text-[#ababab] text-sm">{date}</h1>
            </div>
        </div>
    );
}
