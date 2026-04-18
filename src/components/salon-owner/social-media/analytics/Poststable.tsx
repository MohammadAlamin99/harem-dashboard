"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { ChevronDown, Search } from "lucide-react";
import PaginationClient from "../../clients/PaginationClient";

export interface TableColumn<T> {
    header: string;
    subHeader?: string;
    width?: string;
    render: (item: T) => ReactNode;
}

interface ReusableTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    filterOptions?: readonly string[] | string[];
    filterKey?: keyof T;
}

export default function PostsTable<T extends Record<string, unknown>>({
    data = [],
    columns = [],
    filterOptions = [],
    filterKey,
}: ReusableTableProps<T>) {
    const [filterValue, setFilterValue] = useState<string>(filterOptions[0] || "");
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const filterRef = useRef<HTMLDivElement>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [ippOpen, setIppOpen] = useState(false);
    const ippRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false);
            if (ippRef.current && !ippRef.current.contains(e.target as Node)) setIppOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const filtered = (data || []).filter((item) => {
        let matchesFilter = true;
        if (filterKey && filterValue && !filterValue.includes("All")) {
            matchesFilter = String(item[filterKey]) === filterValue;
        }
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q || JSON.stringify(item).toLowerCase().includes(q);
        return matchesFilter && matchesSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    return (
        <div className="w-full bg-white rounded-xl p-[15px] md:p-[30px] font-manrope">
            {/* ── Toolbar ── */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                {filterOptions.length > 0 && (
                    <div ref={filterRef} className="relative">
                        <button
                            onClick={() => setFilterOpen(!filterOpen)}
                            className="flex items-center gap-2 px-4 py-2 border border-[#E0E6EB] rounded-lg bg-white text-sm text-[#29343D] font-medium font-manrope hover:border-[#635BFF] transition-colors cursor-pointer"
                        >
                            {filterValue}
                            <ChevronDown size={13} className={`text-[#98A4AE] transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                        </button>
                        {filterOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white rounded-xl shadow-lg z-20 py-1 overflow-hidden min-w-[150px]">
                                {filterOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => { setFilterValue(opt); setCurrentPage(1); setFilterOpen(false); }}
                                        className={`w-full text-left px-3 py-2 text-sm font-manrope cursor-pointer transition-colors ${filterValue === opt ? "bg-[#F0EEFF] text-[#29343D] font-semibold" : "text-[#29343D] hover:bg-[#F4F6FA]"}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="relative flex-1 max-w-[240px]">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#29343D] pointer-events-none" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-8 pr-3 py-2 border border-[#E0E6EB] rounded-lg text-sm text-[#29343D] font-manrope placeholder:text-[#98A4AE] focus:outline-none focus:border-[#635BFF] transition-colors bg-white"
                    />
                </div>
            </div>

            {/* ── Table (Original UI Restored) ── */}
            <div className="border border-[#E0E6EB] rounded-t-[8px] overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[1000px] border-collapse bg-white table-auto">
                    <thead>
                        <tr className="bg-[#F3F3FF]">
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    style={{ width: col.width }}
                                    className="px-4 py-3 text-left text-base font-bold font-manrope text-[#29343D] border-b border-[#E0E6EB] whitespace-nowrap border-r last:border-r-0"
                                >
                                    {col.header}
                                    {col.subHeader && (
                                        <span className="block font-normal font-manrope text-[#29343D] text-[12px] leading-snug mt-0.5 whitespace-normal">
                                            {col.subHeader}
                                        </span>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="px-4 py-10 text-center text-sm font-manrope text-[#526B7A]">
                                    No data found.
                                </td>
                            </tr>
                        ) : (
                            paginated.map((item, rowIndex) => (
                                <tr key={rowIndex} className="group hover:bg-[#FAFBFC] transition-colors">
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-4 py-3 border-b border-[#E0E6EB] group-last:border-b-0 border-r last:border-r-0"
                                        >
                                            {col.render(item)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <PaginationClient
                ippRef={ippRef}
                setIppOpen={setIppOpen}
                itemsPerPage={itemsPerPage}
                ippOpen={ippOpen}
                ITEMS_PER_PAGE_OPTIONS={[5, 10, 20, 50]}
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