"use client";

import { useState } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import FBIcon from "./FBIcon";
import InstagramIcon from "./InstagramIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Platform = "instagram" | "facebook";
export type PostStatus = "scheduled" | "draft" | "published";

export interface Post {
    id: string;
    date: string; // YYYY-MM-DD
    hour: number;
    title: string;
    platforms: Platform[];
    status: PostStatus;
    caption: string;
    hashtags: string;
}

interface SocialDayviewProps {
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

function genId(): string {
    return Math.random().toString(36).slice(2, 9);
}

const STATUS_OPTS: { value: PostStatus; label: string; color: string; bg: string }[] = [
    { value: "scheduled", label: "Scheduled", color: "#635BFF", bg: "#EDECFF" },
    { value: "draft", label: "Draft", color: "#526B7A", bg: "#F0F4F8" },
    { value: "published", label: "Published", color: "#0BA360", bg: "#E6F7EE" },
];

// ─── Shared Components (Modal, Labels, etc) ───────────────────────────────────

function ModalShell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-[#E8EEFF] shadow-xl" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

function PlatformToggles({ value, onChange }: { value: Platform[]; onChange: (v: Platform[]) => void }) {
    function toggle(p: Platform) {
        onChange(value.includes(p) ? value.filter((x) => x !== p) : [...value, p]);
    }
    return (
        <div className="flex gap-5">
            {(["instagram", "facebook"] as const).map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={value.includes(p)} onChange={() => toggle(p)} className="accent-[#635BFF]" />
                    <span className="text-sm text-[#0A2540] capitalize">{p}</span>
                </label>
            ))}
        </div>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="text-[12px] font-bold text-[#8898A8] block mb-1.5 font-manrope">{children}</label>;
}

// ─── Modals ───────────────────────────────────────────────────────────────────

function AddPostModal({ hour, date, hours, onClose, onAdd }: { hour: number; date: string; hours: number[]; onClose: () => void; onAdd: (post: Post) => void }) {
    const [draft, setDraft] = useState<Omit<Post, "id">>({
        date,
        hour,
        title: "",
        platforms: ["instagram"],
        status: "scheduled",
        caption: "",
        hashtags: "",
    });

    return (
        <ModalShell onClose={onClose}>
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h2 className="text-[17px] font-bold text-[#0A2540]">New post</h2>
                    <p className="text-xs text-[#8898A8] mt-1">Scheduling for <span className="font-semibold text-[#635BFF]">{formatHour(draft.hour)}</span></p>
                </div>
                <button onClick={onClose} className="flex items-center justify-center text-[#0A2540] cursor-pointer"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
                <div>
                    <FieldLabel>TITLE *</FieldLabel>
                    <input autoFocus type="text" placeholder="e.g. Morning Motivation" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm outline-none focus:border-[#635BFF]" />
                </div>
                <div>
                    <FieldLabel>CAPTION</FieldLabel>
                    <textarea rows={3} placeholder="Write your post caption…" value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm resize-none outline-none focus:border-[#635BFF]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <FieldLabel>HOUR</FieldLabel>
                        <select value={draft.hour} onChange={(e) => setDraft({ ...draft, hour: Number(e.target.value) })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm bg-white">
                            {hours.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
                        </select>
                    </div>
                    <div>
                        <FieldLabel>STATUS</FieldLabel>
                        <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as PostStatus })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm bg-white">
                            {STATUS_OPTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <FieldLabel>PLATFORMS</FieldLabel>
                    <PlatformToggles value={draft.platforms} onChange={(v) => setDraft({ ...draft, platforms: v })} />
                </div>
            </div>
            <div className="flex gap-3 mt-6">
                <button onClick={onClose} className="flex-1 py-3 border border-[#E8EEFF] rounded-lg text-sm font-semibold text-[#526B7A] cursor-pointer">Cancel</button>
                <button onClick={() => onAdd({ ...draft, id: genId() })} disabled={!draft.title.trim()} className="flex-1 py-3 bg-[#635BFF] rounded-lg text-sm font-bold text-white disabled:opacity-40 cursor-pointer">Add post</button>
            </div>
        </ModalShell>
    );
}

function EditPostModal({ post, hours, onClose, onSave }: { post: Post; hours: number[]; onClose: () => void; onSave: (post: Post) => void }) {
    const [draft, setDraft] = useState<Post>(post);
    return (
        <ModalShell onClose={onClose}>
            <div className="flex items-start justify-between mb-5">
                <h2 className="text-[17px] font-bold text-[#0A2540]">Edit post</h2>
                <button onClick={onClose} className="flex items-center justify-center text-[#0A2540] cursor-pointer"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-4">
                <div><FieldLabel>TITLE</FieldLabel>
                    <input type="text" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm" /></div>
                <div><FieldLabel>CAPTION</FieldLabel>
                    <textarea rows={3} value={draft.caption} onChange={(e) => setDraft({ ...draft, caption: e.target.value })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm resize-none" /></div>
                <div className="grid grid-cols-2 gap-3">
                    <div><FieldLabel>HOUR</FieldLabel>
                        <select value={draft.hour} onChange={(e) => setDraft({ ...draft, hour: Number(e.target.value) })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm bg-white">
                            {hours.map(h => <option key={h} value={h}>{formatHour(h)}</option>)}
                        </select></div>
                    <div><FieldLabel>STATUS</FieldLabel>
                        <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as PostStatus })} className="w-full px-3 py-2.5 border border-[#E8EEFF] rounded-lg text-sm bg-white">
                            {STATUS_OPTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select></div>
                </div>
                <PlatformToggles value={draft.platforms} onChange={(v) => setDraft({ ...draft, platforms: v })} />
            </div>
            <div className="flex gap-3 mt-6">
                <button onClick={onClose} className="flex-1 py-3 border border-[#E8EEFF] rounded-lg text-sm font-semibold text-[#526B7A] cursor-pointer">Cancel</button>
                <button onClick={() => onSave(draft)} className="flex-1 py-3 bg-[#635BFF] rounded-lg text-sm font-bold text-white cursor-pointer">Save changes</button>
            </div>
        </ModalShell>
    );
}

function DeletePostModal({ post, onClose, onConfirm }: { post: Post; onClose: () => void; onConfirm: () => void }) {
    return (
        <ModalShell onClose={onClose}>
            <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-2xl mx-auto"><Trash2 color="#526B7A" size={24} /></div>
                <h2 className="text-[17px] font-bold text-[#0A2540] mb-2">Delete this post?</h2>
                <p className="text-sm text-[#8898A8] mb-6">Your post <span className="font-semibold text-[#0A2540]">{post.title}</span> will be removed.</p>
                <div className="flex gap-3">
                    <button onClick={onClose} className="flex-1 py-3 border border-[#E8EEFF] rounded-lg text-sm font-semibold text-[#526B7A] cursor-pointer">Keep it</button>
                    <button onClick={onConfirm} className="flex-1 py-3 rounded-lg text-sm font-bold text-white bg-[#635BFF] cursor-pointer">Delete</button>
                </div>
            </div>
        </ModalShell>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SocialDayview({ currentDate, posts, onAdd, onUpdate, onDelete }: SocialDayviewProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const dateStr = currentDate.toISOString().split('T')[0];

    const [addingHour, setAddingHour] = useState<number | null>(null);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [deletingPost, setDeletingPost] = useState<Post | null>(null);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverHour, setDragOverHour] = useState<number | null>(null);

    function handleDrop(targetHour: number) {
        if (!draggedId) return;
        const post = posts.find(p => p.id === draggedId);
        if (post && post.hour !== targetHour) {
            onUpdate({ ...post, hour: targetHour });
        }
        setDraggedId(null);
        setDragOverHour(null);
    }

    return (
        <>
            {addingHour !== null && <AddPostModal hour={addingHour} date={dateStr} hours={hours} onClose={() => setAddingHour(null)} onAdd={(p) => { onAdd(p); setAddingHour(null); }} />}
            {editingPost && <EditPostModal post={editingPost} hours={hours} onClose={() => setEditingPost(null)} onSave={(p) => { onUpdate(p); setEditingPost(null); }} />}
            {deletingPost && <DeletePostModal post={deletingPost} onClose={() => setDeletingPost(null)} onConfirm={() => { onDelete(deletingPost.id); setDeletingPost(null); }} />}

            <div className="border border-[#E0E6EB] rounded-xl mx-4 md:mx-[30px] bg-white overflow-hidden mb-10">
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] md:min-w-full">
                        {hours.map((hour) => {
                            const post = posts.find((p) => p.hour === hour && p.date === dateStr);
                            const isGhost = post?.id === draggedId;

                            return (
                                <div
                                    key={hour}
                                    className={`group flex min-h-[100px] border-b border-[#E0E6EB] last:border-b-0 relative transition-colors ${dragOverHour === hour ? "bg-[#F3F3FF]" : ""}`}
                                    onDragOver={(e) => { e.preventDefault(); setDragOverHour(hour); }}
                                    onDrop={() => handleDrop(hour)}
                                >
                                    <div className="w-24 bg-[#F3F3FF] border-r border-[#E0E6EB] flex items-start justify-center pt-4">
                                        <span className="text-[11px] font-bold text-[#98A4AE] uppercase tracking-tighter">{formatHour(hour)}</span>
                                    </div>

                                    <div className="flex-1 relative bg-white min-w-0 flex items-center px-4">
                                        {post && !isGhost ? (
                                            <div draggable onDragStart={() => setDraggedId(post.id)} className="w-full h-11 bg-[#DDDBFF] border-l-4 border-[#635BFF] rounded-r-md flex items-center justify-between px-3 cursor-grab active:cursor-grabbing group/post">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="flex flex-col gap-[3px] shrink-0 opacity-40">
                                                        {[0, 1, 2].map(i => <div key={i} className="flex gap-[3px]">{[0, 1].map(j => <div key={j} className="w-[3px] h-[3px] rounded-full bg-[#635BFF]" />)}</div>)}
                                                    </div>
                                                    <span className="text-md font-medium text-[#635BFF] truncate">{post.title} - {formatHour(post.hour)}</span>
                                                    <div className="flex items-center gap-2">
                                                        {post.platforms.includes("instagram") && <InstagramIcon />}
                                                        {post.platforms.includes("facebook") && <FBIcon />}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0 ml-2">
                                                    <button onClick={() => setEditingPost(post)} className="w-7 h-7 rounded-md flex items-center justify-center text-[13px] cursor-pointer"><Pencil color="#635BFF" size={16} /></button>
                                                    <button onClick={() => setDeletingPost(post)} className="w-7 h-7 rounded-md flex items-center justify-center text-[13px] cursor-pointer"><Trash2 color="#635BFF" size={16} /></button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center px-4">
                                                <button onClick={() => setAddingHour(hour)} className="w-full h-9 border border-[#635BFF] rounded-lg flex items-center justify-center hover:bg-[#F3F3FF] cursor-pointer bg-white shadow-sm">
                                                    <Plus size={18} className="text-[#635BFF]" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}