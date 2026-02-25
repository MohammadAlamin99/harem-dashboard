'use client';
import Sidebar from "@/components/accountProtal/Sidebar";
import Topbar from "@/components/accountProtal/Topbar";
import { useState } from "react";
import OverviewContant from "./OverviewContant";

export default function OverViewLayout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen rounded-3xl">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-col flex-1 overflow-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 overflow-y-auto p-6 bg-[#F4F7FB] mr-4 rounded-[20px]">
                    <OverviewContant />
                </main>
            </div>
        </div>
    );
};

