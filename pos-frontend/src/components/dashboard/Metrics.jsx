import React from "react";
import { itemsData, metricsData } from "../../constants";

const Metrics = () => {
  return (
    <div className="container px-6 py-2 mx-auto md:px-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[#f5f5f5] text-xl">
            Overall Performance
          </h2>
          <p className="text-sm text-[#ababab]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, obcaecati?
          </p>
        </div>
        <button className="flex items-center gap-1 px-4 py-2 rounded-md text-[#f5f5f5] bg-[#1a1a1a]">
          Last 1 Month
          <svg
            className="w-3 h-3"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="4"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {metricsData.map((metric, index) => {
          return (
            <div
              key={index}
              className="p-4 rounded-lg shadow-sm"
              style={{ backgroundColor: metric.color }}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-xs text-[#f5f5f5]">
                  {metric.title}
                </p>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    style={{ color: metric.isIncrease ? "#000000" : "#f5f5f5" }}
                  >
                    <path
                      d={metric.isIncrease ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                    />
                  </svg>
                  <p
                    className="text-xs font-medium"
                    style={{ color: metric.isIncrease ? "#000000" : "#f5f5f5" }}
                  >
                    {metric.percentage}
                  </p>
                </div>
              </div>
              <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col justify-between mt-12">
        <div>
          <h2 className="font-semibold text-[#f5f5f5] text-xl">
            Item Details
          </h2>
          <p className="text-sm text-[#ababab]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Distinctio, obcaecati?
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">

            {
                itemsData.map((item, index) => {
                    return (
                        <div key={index} className="p-4 rounded-lg shadow-sm" style={{ backgroundColor: item.color }}>
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-xs text-[#f5f5f5]">{item.title}</p>
                          <div className="flex items-center gap-1">
                            {/* todos: Add a condition when the up arrow will show/hide */}
                            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4" fill="none">
                              <path d="M5 15l7-7 7 7" />
                            </svg>
                            <p className="font-medium text-xs text-[#f5f5f5]">{item.percentage}</p>
                          </div>
                        </div>
                        <p className="mt-1 font-semibold text-2xl text-[#f5f5f5]">{item.value}</p>
                      </div>
                    )
                })
            }

        </div>
      </div>
    </div>
  );
};

export default Metrics;