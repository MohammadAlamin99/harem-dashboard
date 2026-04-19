"use client";

import { useState } from "react";
import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
import Sidebar from "@/components/accountProtal/Sidebar";
import Topbar from "@/components/accountProtal/Topbar";
import AnalyticsContent from "./AnalyticsContent";

export default function AnalyticsLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-white overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navigation={salonOwnerNavigation}
                logoHref="/salon-owner/dashboard"
            />

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto bg-[#F4F7FB] p-4 md:p-6 lg:p-8">
                    <div className="">
                        <AnalyticsContent />
                    </div>
                </main>
            </div>
        </div>
    );
}