"use client";
import { useState } from "react";
import { salonOwnerNavigation } from "@/config/navigation/salon-owner";
import Sidebar from "@/components/accountProtal/Sidebar";
import Topbar from "@/components/accountProtal/Topbar";
import AddGiftCardContent from "../../clients/gift-card/gift-card-add/AddGiftCardContent";

export const FinalcialAddGiftPageLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen rounded-3xl">
            {/* <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
       */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
                navigation={salonOwnerNavigation}
                logoHref="/salon-owner/dashboard"
            />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-6 bg-[#F4F7FB] rounded-[12px]">
                    <AddGiftCardContent />
                </main>
            </div>
        </div>
    );
};

export default FinalcialAddGiftPageLayout;
