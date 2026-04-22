"use client";
import { useState } from "react";
import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
import Sidebar from "@/components/accountProtal/Sidebar";
import Topbar from "@/components/accountProtal/Topbar";
import RescheduleAppointmentContent from "./RescheduleAppointmentContent";

export const RescheduleAppointmentLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={salonOwnerNavigation}
        logoHref="/salon-owner/dashboard"
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-hidden p-6 bg-[#F4F7FB] rounded-[20px] flex flex-col">
          <RescheduleAppointmentContent />
        </main>
      </div>
    </div>
  );
};

export default RescheduleAppointmentLayout;
