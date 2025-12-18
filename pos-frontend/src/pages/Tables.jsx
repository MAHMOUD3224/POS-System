import { useState } from "react";
import BackButton from "../components/shared/BackButton";
import BottomNav from "../components/shared/BottomNav";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants";

export default function Tables() {
        const [status,setStatus] = useState("all") ;
    
    return(
        <section className="table-section bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden"> 
            <div className="flex items-center justify-between px-10 py-4">
                <div className="flex items-center gap-3">
                    <BackButton />
                    <h1 className="text-[#f5f5f5] text-xl font-bold tracking-wide">Select Table</h1>
                </div>
                
                <div className="flex items-center justify-around gap-3">
                    <button onClick={() => setStatus("all")} className={`${status === 'all' ? 'bg-[#383838]' : ''} text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold`}>All</button>
                    <button onClick={() => setStatus("booked")} className={`${status === 'booked' ? 'bg-[#383838]' : ''} text-[#ababab] text-lg rounded-lg px-5 py-2 font-semibold`}>Booked</button>
                </div>
            </div>
            {/*  */}
            <div className="flex flex-wrap justify-center gap-6 px-14 pt-4 pb-[80px] overflow-y-auto h-[calc(100vh-5rem-5rem)]">
                {
                    tables.map((table) => {
                        return(
                            <TableCard key={table.id} id={table.id} name={table.name}             status={table.status} initials={table.initial} seats={table.seats}/>
                        )
                    })
                }
            </div>
            <BottomNav />
        </section>
    )
}       