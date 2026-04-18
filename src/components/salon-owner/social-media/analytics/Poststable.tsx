"use client";

import { useEffect, useRef, useState } from "react";
import {
    ChevronDown,
    Search,
} from "lucide-react";
import PaginationClient from "../../clients/PaginationClient";
import Image from "next/image";
import InstaIcon from "./InstaIcon";
import { AnalyticsBadge } from "./AnalyticsBadge";

type PostType = "Link" | "Photo" | "Gif" | "Carousel" | "Video";

interface Post {
    id: number;
    text: string;
    date: string;
    type: PostType;
    views: string;
    reached: string;
    interactions: string;
    likes: string;
}

const TYPES: PostType[] = [
    "Link", "Photo", "Gif", "Carousel", "Gif",
    "Video", "Gif", "Carousel", "Gif", "Link",
    "Video", "Photo", "Carousel", "Gif", "Link",
];

const MOCK_POSTS: Post[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Wed, 12 Oct at 11:01",
    type: TYPES[i],
    views: (2.1 + Math.random() * 0.5).toFixed(1) + "k",
    reached: (1.2 + Math.random() * 0.3).toFixed(1) + "k",
    interactions: (1.2 + Math.random() * 0.3).toFixed(1) + "k",
    likes: (0.9 + Math.random() * 0.2).toFixed(1) + "k",
}));

const TYPE_FILTER_OPTIONS = [
    "All Post Types",
    "Link",
    "Photo",
    "Gif",
    "Carousel",
    "Video",
] as const;

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];



export default function PostsTable() {
    const [filterType, setFilterType] = useState<string>("All Post Types");
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const filterRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [ippOpen, setIppOpen] = useState(false);
    const ippRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setFilterOpen(false);
            }
            if (ippRef.current && !ippRef.current.contains(e.target as Node)) {
                setIppOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);


    const filtered = MOCK_POSTS.filter((post) => {
        const typeMatch = filterType === "All Post Types" || post.type === filterType;
        const q = searchQuery.toLowerCase();
        const searchMatch = !q || post.text.toLowerCase().includes(q) || post.type.toLowerCase().includes(q);
        return typeMatch && searchMatch;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    return (
        <div className="w-full bg-white rounded-xl p-[15px] md:p-[30px] font-manrope">

            {/* ── Toolbar ── */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">

                {/* Filter dropdown */}
                <div ref={filterRef} className="relative">
                    <button
                        onClick={() => setFilterOpen((o) => !o)}
                        className="flex items-center gap-2 px-4 py-2 border border-[#E0E6EB] rounded-lg bg-white text-sm text-[#29343D] font-medium font-manrope hover:border-[#635BFF] transition-colors cursor-pointer"
                    >
                        {filterType}
                        <ChevronDown
                            size={13}
                            className={`text-[#98A4AE] transition-transform ${filterOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {filterOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg z-20 py-1 overflow-hidden min-w-[150px]">
                            {TYPE_FILTER_OPTIONS.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setFilterType(opt);
                                        setCurrentPage(1);
                                        setFilterOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm font-manrope cursor-pointer transition-colors ${filterType === opt
                                        ? "bg-[#F0EEFF] text-[#29343D] font-semibold"
                                        : "text-[#29343D] hover:bg-[#F4F6FA]"
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Search */}
                <div className="relative flex-1 max-w-[240px] ml-auto">
                    <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#29343D] pointer-events-none"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full pl-8 pr-3 py-2 border border-[#E0E6EB] rounded-lg text-sm text-[#29343D] font-manrope placeholder:text-[#98A4AE] focus:outline-none focus:border-[#635BFF] transition-colors bg-white"
                    />
                </div>
            </div>
            {/* Table */}
            <div className="border border-[#E0E6EB] rounded-t-[8px] overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse bg-white table-auto">
                    <thead>
                        <tr className="bg-[#F3F3FF]">
                            <th className="px-4 py-3 text-left text-base font-bold font-manrope text-[#29343D] border-b border-[#E0E6EB] whitespace-nowrap border-r w-[28%]">
                                Posts
                            </th>
                            <th className="px-4 py-3 text-left text-base font-medium font-manrope text-[#29343D] border-b border-[#E0E6EB] whitespace-nowrap border-r w-[99px]">
                                Type
                            </th>
                            <th className="px-4 py-3 text-left text-base font-medium font-manrope text-[#29343D] border-b border-[#E0E6EB] whitespace-nowrap border-r w-[100px]">
                                Views
                            </th>
                            <th className="px-4 py-3 text-left text-base font-medium font-manrope text-[#29343D] border-b border-[#E0E6EB] whitespace-nowrap border-r w-[150px]">
                                Accounts reached
                            </th>
                            <th className="px-4 py-3 text-left text-base font-medium font-manrope text-[#29343D] border-b border-[#E0E6EB] border-r w-[220px]">
                                <span>Total interactions</span>
                                <span className="block font-normal font-manrope text-[#29343D] text-[12px] leading-snug mt-0.5 whitespace-normal">
                                    (likes + comments + saves + shares where available)
                                </span>
                            </th>
                            <th className="px-4 py-3 text-left text-base font-medium font-manrope text-[#29343D] border-b border-[#E0E6EB] whitespace-nowrap w-[100px]">
                                Likes
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {paginated.map((post) => (
                            <tr key={post.id} className="group hover:bg-[#FAFBFC] transition-colors">
                                <td className="px-4 py-3 border-b border-[#E0E6EB] group-last:border-b-0 border-r">
                                    <div className="flex items-center gap-3 flex-nowrap">
                                        <div className="relative w-[64px] h-[64px]">
                                            <Image
                                                src="/images/media01.jpg"
                                                alt="post"
                                                fill
                                                className="rounded-xl object-cover"
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-manrope text-[#29343D] font-semibold leading-snug line-clamp-2">
                                                {post.text}
                                            </p>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs font-manrope font-normal text-[#98A4AE]">
                                                    {post.date}
                                                </p>
                                                <InstaIcon />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-[14px] border-b border-[#E0E6EB] group-last:border-b-0 border-r">
                                    <AnalyticsBadge type={post.type} />
                                </td>
                                <td className="px-4 py-3 text-sm font-manrope text-[#29343D] border-b border-[#E0E6EB] group-last:border-b-0 border-r">
                                    {post.views}
                                </td>
                                <td className="px-4 py-3 text-sm font-manrope text-[#29343D] border-b border-[#E0E6EB] group-last:border-b-0 border-r">
                                    {post.reached}
                                </td>
                                <td className="px-4 py-3 text-sm font-manrope text-[#29343D] border-b border-[#E0E6EB] group-last:border-b-0 border-r">
                                    {post.interactions}
                                </td>
                                <td className="px-4 py-3 text-sm font-manrope text-[#29343D] border-b border-[#E0E6EB] group-last:border-b-0">
                                    {post.likes}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <PaginationClient
                ippRef={ippRef}
                setIppOpen={setIppOpen}
                itemsPerPage={itemsPerPage}
                ippOpen={ippOpen}
                ITEMS_PER_PAGE_OPTIONS={ITEMS_PER_PAGE_OPTIONS}
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                start={start}
                filtered={filtered}
                margin={false}
                border={true}
            />
        </div>
    );
}