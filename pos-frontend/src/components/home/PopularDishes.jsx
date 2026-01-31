import { popularDishes } from "../../constants";

export default function PopularDishes() {
    return (
        <div className="popular-dishes">
            <div className="bg-[var(--bg-card)] w-full rounded-3xl border border-[var(--border-default)] shadow-[var(--shadow-card)] overflow-hidden transition-all duration-300">
                <div className="flex items-center justify-between px-8 py-6 border-b border-[var(--border-subtle)] bg-[var(--bg-secondary)]/30">
                    <h1 className="text-[var(--text-primary)] text-2xl font-black tracking-tight">Popular Dishes</h1>
                    <a href="/menu" className="bg-[var(--bg-secondary)] text-[var(--color-primary)] px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all shadow-sm">View all</a>
                </div>
                <div className="px-6 py-6 space-y-4">
                    {
                        popularDishes.slice(0, 6).map((dish, index) => {
                            return (
                                <div key={dish.id} className="flex items-center gap-4 bg-[var(--bg-secondary)] rounded-2xl px-4 py-3 border border-[var(--border-default)] hover:border-[var(--color-primary)]/30 transition-all duration-300 group">
                                    <div className="flex items-center justify-center text-[var(--text-muted)] font-bold text-xs bg-[var(--bg-card)] w-10 h-10 rounded-xl border border-[var(--border-default)] group-hover:text-[var(--color-primary)] transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                    <img src={dish.image} alt={dish.name} loading="lazy" className="w-12 h-12 rounded-full object-cover border-2 border-[var(--bg-card)] shadow-sm" />
                                    <div className="flex-1">
                                        <h1 className="text-[var(--text-primary)] text-base font-black tracking-tight line-clamp-1 leading-tight">{dish.name}</h1>
                                        <p className="text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest mt-0.5">
                                            {dish.numberOfOrders} <span className="text-[var(--text-muted)] font-bold">orders</span>
                                        </p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]/40 group-hover:bg-[var(--color-primary)] transition-colors" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}