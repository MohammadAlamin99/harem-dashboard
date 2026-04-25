"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SocialDayview, { Post } from "./SocialDayview";
import SocialWeekView from "./SocialWeekView";
import SocialMonthView from "./SocialMonthView";
import AllAccountDropdonw from "./AllAccountDropdonw";

type Period = "Month" | "Week" | "Day";

const teamMembers = [
    { id: "1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
];

export default function SocialMediaCalendar() {
    const [period, setPeriod] = useState<Period>("Day");
    const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2));
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(teamMembers.map((m) => m.id));

    // Master state for all posts
    const [allPosts, setAllPosts] = useState<Post[]>([
        {
            id: "1",
            date: "2025-09-02",
            hour: 9,
            title: "Product Launch",
            platforms: ["instagram"],
            status: "scheduled",
            caption: "Excited to announce our newest product drop!",
            hashtags: "#launch #new",
        }
    ]);

    const navigate = (dir: -1 | 1) => {
        const d = new Date(currentDate);
        if (period === "Day") d.setDate(d.getDate() + dir);
        else if (period === "Week") d.setDate(d.getDate() + 7 * dir);
        else d.setMonth(d.getMonth() + dir);
        setCurrentDate(d);
    };

    const dateLabel = () => {
        if (period === "Day") return currentDate.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "2-digit" }).replace(",", "");
        return "Select Date";
    };

    // CRUD Handlers
    const addPost = (post: Post) => setAllPosts([...allPosts, post]);
    const updatePost = (updated: Post) => setAllPosts(allPosts.map(p => p.id === updated.id ? updated : p));
    const deletePost = (id: string) => setAllPosts(allPosts.filter(p => p.id !== id));

    return (
        <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden font-manrope mt-7">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-[30px]">
                <AllAccountDropdonw selectedIds={selectedMemberIds} onChange={setSelectedMemberIds} singleSelect={period !== "Day"} teamMembers={teamMembers} />

                <div className="flex items-center border border-[#E8EEFF] rounded-[8px] overflow-hidden">
                    <button className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] cursor-pointer" onClick={() => navigate(-1)}>
                        <ChevronLeft size={18} className="text-[#635BFF]" />
                    </button>
                    <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold text-[#635BFF] whitespace-nowrap">{dateLabel()}</span>
                    <button className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] cursor-pointer" onClick={() => navigate(1)}>
                        <ChevronRight size={18} className="text-[#635BFF]" />
                    </button>
                </div>

                <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden bg-[#F7F9FC]">
                    {(["Month", "Week", "Day"] as const).map((p) => (
                        <button key={p} onClick={() => setPeriod(p)} className={`px-6 py-[10px] text-[16px] font-medium cursor-pointer ${period === p ? "bg-[#DDDBFF] text-[#0A2540]" : "text-[#526B7A] bg-[white]"}`}>
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {period === "Day" && (
                <SocialDayview
                    currentDate={currentDate}
                    posts={allPosts}
                    onAdd={addPost}
                    onUpdate={updatePost}
                    onDelete={deletePost}
                />
            )}
           
            {period === "Week" && (
                <SocialWeekView
                    currentDate={currentDate}
                    posts={allPosts}
                    onAdd={addPost}
                    onUpdate={updatePost}
                    onDelete={deletePost}
                />
            )}
            
            {period === "Month" && (
                <SocialMonthView
                    currentDate={currentDate}
                    posts={allPosts}
                    onAdd={addPost}
                    onUpdate={updatePost}
                    onDelete={deletePost}
                />
            )}
            
        </div>
    );
}