"use client";

import { ReactNode } from "react";
import OutletAdminSidebar from "@/components/dashboard/OutletAdminSidebar";
import Navbar from "@/components/dashboard/Navbar";
import withAuth from "@/hoc/useAuthGuard";

function OutletAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <OutletAdminSidebar />
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

// Ensure only Outlet Admin can access these routes
export default withAuth(OutletAdminLayout, ["outlet_admin"], "/auth-employee");
