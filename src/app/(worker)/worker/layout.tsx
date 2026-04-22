"use client";

import { ReactNode } from "react";
import WorkerSidebar from "@/components/dashboard/WorkerSidebar";
import Navbar from "@/components/dashboard/Navbar";
import withEmployeeAuth from "@/hoc/withEmployeeAuth";

function WorkerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <WorkerSidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Ensure only Worker can access these routes
export default withEmployeeAuth(WorkerLayout, ["worker"]);
