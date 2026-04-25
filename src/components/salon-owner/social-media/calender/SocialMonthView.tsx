"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import FBIcon from "./FBIcon";
import InstagramIcon from "./InstagramIcon";
import { Post } from "./SocialDayview"; // Import your shared types

interface SocialMonthViewProps {
    currentDate: Date;
    posts: Post[];
    onAdd: (post: Post) => void;
    onUpdate: (post: Post) => void;
    onDelete: (id: string) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatHour(hour: number): string {
    if (hour === 0) return "12:00 AM";
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return "12:00 PM";
    return `${hour - 12}:00 PM`;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SocialMonthView({
    currentDate,
    posts,
    onAdd,
    onUpdate,
    onDelete
}: SocialMonthViewProps) {
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [addingDate, setAddingDate] = useState<string | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // Grid Calculation logic
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => {
        const d = prevMonthLastDay - firstDayOfMonth + i + 1;
        const dateObj = new Date(year, month - 1, d);
        return { day: d, dateStr: dateObj.toISOString().split('T')[0], currentMonth: false };
    });

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => {
        const d = i + 1;
        const dateObj = new Date(year, month, d);
        return { day: d, dateStr: dateObj.toISOString().split('T')[0], currentMonth: true };
    });

    const totalCells = 42;
    const nextMonthCount = totalCells - (prevMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: nextMonthCount }, (_, i) => {
        const d = i + 1;
        const dateObj = new Date(year, month + 1, d);
        return { day: d, dateStr: dateObj.toISOString().split('T')[0], currentMonth: false };
    });

    const allCalendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    // Drag and Drop Logic
    const handleDrop = (dateStr: string) => {
        if (!draggedId) return;
        const post = posts.find(p => p.id === draggedId);
        if (post) {
            onUpdate({ ...post, date: dateStr });
        }
        setDraggedId(null);
    };

    return (
        <div className="mx-4 md:mx-[30px] border border-[#E0E6EB] rounded-xl bg-white overflow-hidden mb-10">
            <div className="overflow-x-auto">
                <div className="min-w-[800px] md:min-w-full">

                    {/* HEADER */}
                    <div className="grid grid-cols-7 border-b border-[#E0E6EB] bg-[#F9FAFB]">
                        {daysOfWeek.map((day) => (
                            <div key={day} className="py-3 text-center border-r border-[#E0E6EB] last:border-r-0">
                                <span className="text-[12px] font-medium text-[#6B7280]">{day}</span>
                            </div>
                        ))}
                    </div>

                    {/* CALENDAR GRID */}
                    <div className="grid grid-cols-7">
                        {allCalendarDays.map((dateObj, index) => {
                            // Filter posts that belong to this specific date
                            const dayPosts = posts.filter(p => p.date === dateObj.dateStr);
                            const isToday = dateObj.dateStr === new Date().toISOString().split('T')[0];

                            return (
                                <div
                                    key={index}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(dateObj.dateStr)}
                                    className={`group min-h-[120px] md:min-h-[140px] border-r border-b border-[#E0E6EB] 
                                        ${(index + 1) % 7 === 0 ? "border-r-0" : ""} 
                                        ${index >= 35 ? "border-b-0" : ""} 
                                        ${isToday ? "bg-[#F3F3FF]/50" : "bg-white"} 
                                        relative p-2 flex flex-col`}
                                >
                                    {/* Day Number */}
                                    <div className="text-right mb-1">
                                        <span className={`text-[12px] font-bold ${dateObj.currentMonth ? "text-[#9CA3AF]" : "text-[#D1D5DB]"}`}>
                                            {dateObj.day}
                                        </span>
                                    </div>

                                    {/* Content Area */}
                                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar">
                                        {dayPosts.map((post) => (
                                            <div
                                                key={post.id}
                                                draggable
                                                onDragStart={() => setDraggedId(post.id)}
                                                onClick={() => setEditingPost(post)}
                                                className="w-full py-1 bg-[#DDDBFF] border-l-[3px] border-[#635BFF] rounded-r-sm flex items-center justify-between px-1.5 cursor-pointer hover:bg-[#D0CFFF] transition-colors"
                                            >
                                                <div className="flex items-center gap-1 overflow-hidden">
                                                    <span className="text-[10px] font-bold text-[#635BFF] truncate">
                                                        {formatHour(post.hour).split(':00')[0]}{formatHour(post.hour).slice(-2)} - {post.title}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0 scale-75 origin-right">
                                                    {post.platforms.includes("instagram") && <InstagramIcon />}
                                                    {post.platforms.includes("facebook") && <FBIcon />}
                                                </div>
                                            </div>
                                        ))}

                                        {/* Hover Add Button */}
                                        <button
                                            onClick={() => setAddingDate(dateObj.dateStr)}
                                            className="mt-auto w-full h-7 border border-dashed border-[#635BFF] rounded-md opacity-0 group-hover:opacity-100 flex items-center justify-center bg-white hover:bg-[#F3F3FF] transition-all cursor-pointer"
                                        >
                                            <Plus size={14} className="text-[#635BFF]" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Reuse the Modals from SocialDayview for consistency */}
            {addingDate && (
                <AddMonthPostModal
                    date={addingDate}
                    onClose={() => setAddingDate(null)}
                    onAdd={(p) => { onAdd(p); setAddingDate(null); }}
                />
            )}

            {editingPost && (
                <EditMonthPostModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onUpdate={(p) => { onUpdate(p); setEditingPost(null); }}
                    onDelete={(id) => { onDelete(id); setEditingPost(null); }}
                />
            )}
        </div>
    );
}

// ─── Local Components (Styles matched to your original Modals) ────────────────

function AddMonthPostModal({ date, onClose, onAdd }: { date: string, onClose: () => void, onAdd: (p: Post) => void }) {
    // You can copy the form logic from your AddPostModal here 
    // Ensuring it passes the correct 'date' string
    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#E8EEFF] shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-[17px] font-bold text-[#0A2540] mb-4">Add post for {date}</h2>
                <p className="text-sm text-[#526B7A] mb-4">Please use the Daily view for full scheduling details, or add a quick title here.</p>
                <button
                    onClick={onClose}
                    className="w-full py-3 bg-[#635BFF] rounded-lg text-sm font-bold text-white"
                >
                    Close & Go to Day View
                </button>
            </div>
        </div>
    );
}

function EditMonthPostModal({ post, onClose, onUpdate, onDelete }: { post: Post, onClose: () => void, onUpdate: (p: Post) => void, onDelete: (id: string) => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#E8EEFF] shadow-xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[17px] font-bold text-[#0A2540]">{post.title}</h2>
                    <button onClick={() => onDelete(post.id)} className="text-red-500 text-sm font-bold">Delete</button>
                </div>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 border border-[#E8EEFF] rounded-lg text-sm font-semibold text-[#526B7A]">Close</button>
                    <button onClick={onClose} className="flex-1 py-3 bg-[#635BFF] rounded-lg text-sm font-bold text-white">Save</button>
                </div>
            </div>
        </div>
    );
}