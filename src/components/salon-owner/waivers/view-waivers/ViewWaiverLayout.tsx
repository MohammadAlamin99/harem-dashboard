"use client";
import { useState } from "react";

import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
import Topbar from "@/components/accountProtal/Topbar";
import Sidebar from "@/components/accountProtal/Sidebar";
import ViewWaiverContent from "./ViewWaiverContent";

export const ViewWaiverLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen rounded-3xl w-full overflow-hidden">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navigation={salonOwnerNavigation}
                logoHref="/salon-owner/dashboard"
            />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-6 bg-[#F4F7FB] rounded-[20px]">
                    <ViewWaiverContent />
                </main>
            </div>
        </div>
    );
};

export default ViewWaiverLayout;
