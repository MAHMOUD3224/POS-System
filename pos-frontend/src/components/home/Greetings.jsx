import moment from "moment/moment";
import 'moment/min/locales';
import { useState, useEffect } from "react";

export default function Greetings() {
    const [time, setTime] = useState(moment().format("LTS"));
    const date = moment().format("ll");

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(moment().format("LTS"));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-between pb-4 border-b border-[#059669]">
            <div className="flex flex-col gap-1">
                <h1 className="text-[#059669] text-4xl font-black tracking-tighter leading-none">
                    Good Morning, Mahmoud
                </h1>
                <p className="text-[#059669] text-sm font-bold tracking-tight">
                    Give your best services for customers 😀
                </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 bg-[#059669] py-3 px-6 rounded-3xl border border-[var(--border-default)] shadow-sm">
                <h2 className="text-[#059669] text-2xl font-black tracking-tight tabular-nums leading-none">
                    {time}
                </h2>
                <div className="bg-[#059669] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
                    <p className="text-[#059669] text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                        {date}
                    </p>
                </div>
            </div>
        </div>
    );
}
