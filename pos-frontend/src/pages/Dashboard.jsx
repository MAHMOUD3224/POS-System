import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/dashboard/Metrics";
import RecentOrders from "../components/dashboard/RecentOrders";
import Modal from "../components/dashboard/Modal";

const buttons = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs = ["Metrics", "Orders", "Payments"];

const Dashboard = () => {

  useEffect(() => {
    document.title = "POS | Admin Dashboard"
  }, [])

  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Metrics");

  const handleOpenModal = (action) => {
    if (action === "table") setIsTableModalOpen(true);
  };

  return (
    <div className="bg-[var(--bg-base)] min-h-[calc(100vh-5rem)] p-6 transition-colors duration-300">
      <div className="container flex items-center justify-between mx-auto py-8 mb-6 border-b border-[var(--border-default)]">
        <div className="flex items-center gap-4">
          {buttons.map(({ label, icon, action }) => {
            return (
              <button
                key={label}
                onClick={() => handleOpenModal(action)}
                className="bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] border border-[var(--border-default)] hover:border-[var(--color-primary)]/50 px-6 py-3 rounded-xl text-[var(--text-primary)] font-bold text-sm flex items-center gap-3 transition-all duration-300 shadow-sm"
              >
                {label} <span className="text-[var(--color-primary)] text-lg">{icon}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center p-1 bg-[var(--bg-secondary)] rounded-2xl border border-[var(--border-default)]">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={`
                px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab
                    ? "bg-[var(--color-primary)] text-white shadow-lg"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto">
        {activeTab === "Metrics" && <Metrics />}
        {activeTab === "Orders" && <RecentOrders />}
        {activeTab === "Payments" &&
          <div className="p-12 text-center bg-[var(--bg-card)] rounded-3xl border border-[var(--border-default)] border-dashed">
            <p className="text-[var(--text-muted)] text-xl font-medium">Payment Analytics Component Coming Soon</p>
          </div>
        }
      </div>

      {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />}
    </div>
  );
};

export default Dashboard;