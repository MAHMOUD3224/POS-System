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
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
            <div className="flex flex-col gap-1">
                <h1 className="text-[var(--text-primary)] text-4xl font-black tracking-tighter leading-none">
                    Good Morning, <span className="text-[var(--color-primary)]">Mahmoud</span>
                </h1>
                <p className="text-[var(--text-secondary)] text-sm font-bold tracking-tight">
                    Give your best services for customers 😀
                </p>
            </div>

            <div className="flex flex-col items-end gap-1.5 bg-[var(--bg-secondary)] py-3 px-6 rounded-3xl border border-[var(--border-default)] shadow-sm">
                <h2 className="text-[var(--text-primary)] text-2xl font-black tracking-tight tabular-nums leading-none">
                    {time}
                </h2>
                <div className="bg-[var(--bg-card)] px-3 py-1 rounded-full border border-[var(--border-subtle)]">
                    <p className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] leading-none">
                        {date}
                    </p>
                </div>
            </div>
        </div>
    );
}
