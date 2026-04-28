"use client";
import { useState } from "react";
import Topbar from "../accountProtal/Topbar";
import Sidebar from "../accountProtal/Sidebar";
import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
import DashboardSalonOwnerLayout from "./dashboard/DashboardSalonOwnerLayout";

export const DashboardSalonOwner = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={salonOwnerNavigation}
        logoHref="/salon-owner/dashboard"
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#F4F7FB] rounded-tl-[20px]">
          <DashboardSalonOwnerLayout />
        </main>
      </div>
    </div>
  );
};
// dashboard salon 
export default DashboardSalonOwner;