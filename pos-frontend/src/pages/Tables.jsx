import React, { useState, useEffect } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https";
import { messageEnqueue } from "../utils";

const Tables = () => {
  const [status, setStatus] = useState("all");

  useEffect(() => {
    document.title = "POS | Tables"
  }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    messageEnqueue({ message: 'Something went wrong!' }, 'error')
  }

  console.log(resData);

  return (
    <section className="vibrant-bg h-[calc(100vh-5rem)] overflow-hidden">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[var(--text-primary)] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4 bg-[var(--bg-card)] p-1.5 rounded-xl border border-[var(--border-default)]">
          <button
            onClick={() => setStatus("all")}
            className={`text-[var(--text-muted)] text-lg transition-all duration-200 ${status === "all" && "bg-[var(--color-primary)] text-white shadow-md"
              }  rounded-lg px-5 py-2 font-semibold hover:text-[var(--text-primary)]`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[var(--text-muted)] text-lg transition-all duration-200 ${status === "booked" && "bg-[var(--color-primary)] text-white shadow-md"
              }  rounded-lg px-5 py-2 font-semibold hover:text-[var(--text-primary)]`}
          >
            Booked
          </button>
        </div>
      </div>

      <div className="grid table-grid gap-3 px-16 py-4 max-h-[650px] overflow-y-scroll overflow-x-hidden">
        {resData?.data.data.map((table) => {
          return (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          );
        })}
      </div>
      <BottomNav />
    </section>
  );
};

export default Tables;