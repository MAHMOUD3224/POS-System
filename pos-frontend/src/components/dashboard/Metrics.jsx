import React from "react";
import { itemsData, metricsData } from "../../constants";
import { MdOutlineTimer } from "react-icons/md";

const Metrics = () => {
  return (
    <div className="py-6 space-y-12">
      {/* Performance Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-[var(--text-primary)] text-2xl tracking-tight">
              Overall Performance
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 font-medium">
              Real-time analytics and system health metrics
            </p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border-default)] hover:border-[var(--color-primary)] transition-all shadow-sm">
            Last 30 Days
            <svg className="w-4 h-4 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => {
            const isRevenue = metric.title === "Revenue";
            const isClick = metric.title === "Outbound Clicks";

            return (
              <div
                key={index}
                className="relative overflow-hidden p-6 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-card)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-md)] transition-all duration-300 group"
              >
                {/* Subtle Background Glow */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${metric.isIncrease ? "bg-[var(--color-success)]" : "bg-[var(--color-error)]"
                  }`} />

                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-xs text-[var(--text-muted)] uppercase tracking-widest">
                    {metric.title}
                  </p>
                  <div className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-bold ${metric.isIncrease
                    ? "text-[var(--color-success)] bg-[var(--color-success)]/10"
                    : "text-[var(--color-error)] bg-[var(--color-error)]/10"
                    }`}>
                    <svg
                      className="w-3 h-3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                    </svg>
                    {metric.percentage}
                  </div>
                </div>
                <p className="font-black text-3xl text-[var(--text-primary)] tracking-tight">
                  {metric.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Details Section */}
      <div className="space-y-6">
        <div>
          <h2 className="font-bold text-[var(--text-primary)] text-2xl tracking-tight">
            Inventory & Orders
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-1 font-medium">
            Detailed breakdown of your catalog and active service status
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsData.map((item, index) => {
            const isActiveOrder = item.title === "Active Orders";

            return (
              <div key={index} className="p-6 rounded-3xl border border-[var(--border-default)] bg-[var(--bg-primary)] hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-bold text-xs text-[var(--text-secondary)] uppercase tracking-widest">{item.title}</p>
                  {item.percentage && (
                    <div className="flex items-center gap-1 text-[var(--color-success)] font-bold text-xs bg-[var(--color-success)]/10 px-2 py-1 rounded-lg">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path d="M5 15l7-7 7 7" />
                      </svg>
                      {item.percentage}
                    </div>
                  )}
                  {isActiveOrder && <MdOutlineTimer className="text-[var(--color-warning)] text-xl" />}
                </div>
                <p className="font-black text-3xl text-[var(--text-primary)] tracking-tight">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Metrics;