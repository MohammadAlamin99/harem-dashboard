"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import FBIcon from "./FBIcon";
import InstagramIcon from "./InstagramIcon";
import { Post } from "./SocialDayview"; // Import the Post type

interface SocialWeekViewProps {
    currentDate: Date;
    posts: Post[];
    onAdd: (post: Post) => void;
    onUpdate: (post: Post) => void;
    onDelete: (id: string) => void;
}

export default function SocialWeekView({
    currentDate,
    posts,
    onAdd,
    onUpdate,
    onDelete
}: SocialWeekViewProps) {
    const [addingCell, setAddingCell] = useState<{ date: string; hour: number } | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);

    const hours: number[] = Array.from({ length: 24 }, (_, i) => i);

    // Calculate the 7 days of the current week (Sun - Sat)
    const days: Date[] = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentDate);
        const day = date.getDay();
        const diff = date.getDate() - day + i;
        return new Date(new Date(date.setDate(diff)).setHours(0, 0, 0, 0));
    });

    const formatDayLabel = (date: Date): string => {
        const dayNumber = date.getDate().toString().padStart(2, "0");
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        return `${dayNumber} ${dayName}`;
    };

    const formatHour = (hour: number) => {
        if (hour === 0) return "12:00 AM";
        if (hour < 12) return `${hour}:00 AM`;
        if (hour === 12) return "12:00 PM";
        return `${hour - 12}:00 PM`;
    };

    // Drag and Drop logic
    const handleDrop = (dateStr: string, hour: number) => {
        if (!draggedId) return;
        const post = posts.find(p => p.id === draggedId);
        if (post) {
            onUpdate({ ...post, date: dateStr, hour: hour });
        }
        setDraggedId(null);
    };

    return (
        <div className="mx-4 md:mx-[30px] border border-[#E0E6EB] rounded-xl bg-white overflow-hidden mb-10">
            <div className="overflow-x-auto">
                <div className="min-w-[800px] md:min-w-full">

                    {/* HEADER ROW */}
                    <div className="flex border-b border-[#E0E6EB]">
                        <div className="w-20 md:w-24 bg-[#F3F3FF] border-r border-[#E0E6EB]" />
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className="flex-1 py-3 bg-[#F3F3FF] border-r border-[#E0E6EB] last:border-r-0 text-center"
                            >
                                <span className="text-[12px] font-semibold text-[#1F2937]">
                                    {formatDayLabel(day)}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* GRID ROWS */}
                    {hours.map((hour) => (
                        <div key={hour} className="flex min-h-[100px] border-b border-[#E0E6EB] last:border-b-0">

                            {/* LEFT TIME COLUMN */}
                            <div className="w-20 md:w-24 bg-[#F3F3FF] border-r border-[#E0E6EB] flex items-start justify-center pt-4">
                                <span className="text-[10px] md:text-[11px] font-bold text-[#98A4AE] uppercase tracking-tighter">
                                    {formatHour(hour)}
                                </span>
                            </div>

                            {/* DAY COLUMNS CONTENT */}
                            {days.map((dayDate, dayIndex) => {
                                const dateStr = dayDate.toISOString().split('T')[0];
                                const post = posts.find(p => p.date === dateStr && p.hour === hour);
                                const isGhost = draggedId === post?.id;

                                return (
                                    <div
                                        key={dayIndex}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(dateStr, hour)}
                                        className={`group flex-1 relative border-r border-[#E0E6EB] last:border-r-0 flex items-center px-1 md:px-2 transition-colors ${draggedId ? 'hover:bg-[#F3F3FF]' : ''}`}
                                    >
                                        {post && !isGhost ? (
                                            <div
                                                draggable
                                                onDragStart={() => setDraggedId(post.id)}
                                                onClick={() => setEditingPost(post)}
                                                className="w-full py-2 bg-[#DDDBFF] border-l-4 border-[#635BFF] rounded-r-md flex items-center justify-between px-2 cursor-grab active:cursor-grabbing hover:bg-[#D0CFFF] transition-colors"
                                            >
                                                <div className="flex items-center gap-1 md:gap-2 overflow-hidden">
                                                    <span className="text-[11px] font-bold text-[#635BFF] truncate">
                                                        {post.title}
                                                    </span>
                                                    <div className="flex items-center gap-1 shrink-0 scale-90">
                                                        {post.platforms.includes("instagram") && <InstagramIcon />}
                                                        {post.platforms.includes("facebook") && <FBIcon />}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            /* Hover Add Button */
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                                                <button
                                                    onClick={() => setAddingCell({ date: dateStr, hour })}
                                                    className="w-full h-9 border border-[#635BFF] rounded-lg flex items-center justify-center hover:bg-[#F3F3FF] transition-colors cursor-pointer bg-white shadow-sm"
                                                >
                                                    <Plus size={18} className="text-[#635BFF]" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals - Reusing the designs from your SocialDayview */}
            {addingCell && (
                <AddWeekPostModal
                    data={addingCell}
                    onClose={() => setAddingCell(null)}
                    onAdd={(p) => { onAdd(p); setAddingCell(null); }}
                />
            )}

            {editingPost && (
                <EditWeekPostModal
                    post={editingPost}
                    onClose={() => setEditingPost(null)}
                    onUpdate={(p) => { onUpdate(p); setEditingPost(null); }}
                    onDelete={(id) => { onDelete(id); setEditingPost(null); }}
                />
            )}
        </div>
    );
}

// ─── Modal Shells (Styled to match your original UI) ────────────────────────

function AddWeekPostModal({ data, onClose, onAdd }: { data: { date: string, hour: number }, onClose: () => void, onAdd: (p: Post) => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#E8EEFF] shadow-xl" onClick={e => e.stopPropagation()}>
                <h2 className="text-[17px] font-bold text-[#0A2540] mb-2">New Week Post</h2>
                <p className="text-sm text-[#8898A8] mb-6">Scheduling for {data.date} at {data.hour}:00</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 border border-[#E8EEFF] rounded-lg text-sm font-semibold text-[#526B7A]">Cancel</button>
                    <button
                        onClick={() => onAdd({
                            id: Math.random().toString(36).substr(2, 9),
                            date: data.date,
                            hour: data.hour,
                            title: "New Post",
                            platforms: ["instagram"],
                            status: "scheduled",
                            caption: "",
                            hashtags: ""
                        })}
                        className="flex-1 py-3 bg-[#635BFF] rounded-lg text-sm font-bold text-white"
                    >
                        Quick Add
                    </button>
                </div>
            </div>
        </div>
    );
}

function EditWeekPostModal({ post, onClose, onUpdate, onDelete }: { post: Post, onClose: () => void, onUpdate: (p: Post) => void, onDelete: (id: string) => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#E8EEFF] shadow-xl" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[17px] font-bold text-[#0A2540]">{post.title}</h2>
                    <button onClick={() => onDelete(post.id)} className="text-red-500 text-sm font-bold hover:underline">Delete</button>
                </div>
                <button onClick={onClose} className="w-full py-3 bg-[#635BFF] rounded-lg text-sm font-bold text-white">Save Changes</button>
            </div>
        </div>
    );
}