"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Download,
  Plus,
  Trash2,
  Check,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import AddClientModal from "./AddClientModal";
import ActionDropdown from "./ActionDropdown";
import Checkbox from "./ClientCheckBox";

interface Client {
  id: string;
  name: string;
  email: string;
  avatar: string;
  telephone: string;
  lastAppointment: string;
  allergy: string;
  allergyColor: "yellow" | "purple" | "pink";
  createdAt: string;
}

const CLIENTS: Client[] = Array.from({ length: 9 }, (_, i) => ({
  id: `c${i + 1}`,
  name: "Maria Rodriguez",
  email: "maria@beautywellness.com",
  avatar: "/images/avator.png",
  telephone: "+39 345 678 9123",
  lastAppointment: "02/09/2025",
  allergy: "Fragrances Allergie",
  allergyColor: (
    [
      "yellow",
      "purple",
      "purple",
      "yellow",
      "pink",
      "yellow",
      "pink",
      "yellow",
      "pink",
    ] as const
  )[i],
  createdAt: "08/08/2024",
}));

const ALLERGY_STYLES: Record<string, string> = {
  yellow: "bg-[#FFD648]",
  purple: "bg-[#635BFF]",
  pink: "bg-[#FF6692]",
};

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
export default function ClientsTable() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [ippOpen, setIppOpen] = useState(false);
  const [activeYear, setActiveYear] = useState("All Years");
  const [activeReg, setActiveReg] = useState("All");
  const [lastAppt, setLastAppt] = useState("Last 7 days");
  const [addClientOpen, setAddClientOpen] = useState(false);
  const ippRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ippRef.current && !ippRef.current.contains(e.target as Node))
        setIppOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const filtered = CLIENTS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);
  const allSelected =
    paginated.length > 0 && paginated.every((c) => selected.has(c.id));

  function toggleAll() {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.delete(c.id));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        paginated.forEach((c) => next.add(c.id));
        return next;
      });
    }
  }

  // Exit selection mode clear
  function exitSelection() {
    setSelectionMode(false);
    setSelected(new Set());
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col gap-5">
      <AddClientModal
        open={addClientOpen}
        onClose={() => setAddClientOpen(false)}
      />
      {/* Top bar */}
      <div className="bg-white rounded-2xl border border-[#EEF2F8] px-6 py-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base font-bold text-[#29343D]">Clients</h1>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#635BFF] text-[#635BFF] text-sm font-semibold rounded-[8px] hover:bg-[#F0EEFF] transition-colors cursor-pointer">
              Import Clients
            </button>
            <button className="flex items-center gap-2.5 px-4 py-2.5 border border-[#DDDBFF] text-[#635BFF] text-sm font-semibold rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer bg-[#F8FAFC]">
              <Download size={15} className="text-[#635BFF]" />
              Export Data
            </button>
            <button
              onClick={() => setAddClientOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors cursor-pointer"
            >
              <Plus size={15} />
              Add Client
            </button>
          </div>
        </div>
        {/* Filters */}
        <div className="flex items-end gap-8 flex-wrap">
          {/* Client Since */}
          <div>
            <p className="text-xs font-semibold text-[#98A4AE] mb-2 flex items-center gap-1">
              Client Since <Filter size={12} className="text-[#98A4AE]" />
            </p>
            <div className="flex items-center gap-2">
              {["All Years", "2025", "2024", "2023"].map((y) => (
                <button
                  key={y}
                  onClick={() => setActiveYear(y)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    activeYear === y
                      ? "border-[#635BFF] text-[#635BFF] bg-white"
                      : "border-[#EFF4FA] text-[#526B7A] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Registration */}
          <div>
            <p className="text-xs text-[#98A4AE] font-semibold mb-2">
              Registration
            </p>
            <div className="flex items-center gap-2">
              {["All", "Imported", "Mannual"].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveReg(r)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    activeReg === r
                      ? "border-[#635BFF] text-[#635BFF] bg-white"
                      : "border-[#EFF4FA] text-[#526B7A] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Sales */}
          <div>
            <p className="text-xs text-[#98A4AE] font-semibold mb-2">Sales</p>
            <div className="flex items-center gap-2">
              <span className="px-4 py-2.5 text-xs text-[#526B7A] border border-[#E0E6EB] rounded-lg bg-white">
                € 0
              </span>
              <span className="text-xs text-[#98A4AE]">-</span>
              <span className="px-4 py-2.5 text-xs text-[#526B7A] border border-[#E0E6EB] rounded-lg bg-white">
                € 200
              </span>
            </div>
          </div>

          {/* Last Appointment */}
          <div>
            <p className="text-xs text-[#98A4AE] font-semibold mb-2">
              Last Appointment
            </p>
            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#526B7A] border border-[#E0E6EB] rounded-lg bg-white hover:border-[#635BFF] transition-colors cursor-pointer">
              {lastAppt}
              <ChevronDown size={13} className="text-[#98A4AE]" />
            </button>
          </div>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#EEF2F8]">
        {/* Search Mass Deletion */}
        <div className="px-[30px] pt-5 pb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg bg-white w-72">
            <Search size={15} className="text-[#29343D] shrink-0" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="flex-1 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none bg-transparent"
            />
          </div>

          {selectionMode && (
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#FFE5ED] hover:bg-[#FFD6E0] text-[#FF6692] text-sm font-semibold rounded-lg transition-colors cursor-pointer">
              <Trash2 size={15} />
              Mass Deletion
            </button>
          )}
        </div>
        {/* Table */}
        <div className="overflow-x-auto border-t rounded-[12px_12px_0_0] m-[0_30px_0px_30px] border border-[#E0E6EB]">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr
                className={`border-b-2 border-[#EAEEF2] ${selectionMode ? "bg-[#EEEEFF]" : "bg-[#F8F9FB]"}`}
              >
                {/* Combined checkbox + Name column */}
                <th className="px-5 py-4 text-left bg-[#F3F3FF]">
                  <div className="flex items-center gap-3">
                    {/* Checkbox — always visible, triggers selection mode */}
                    {selectionMode ? (
                      <button
                        onClick={allSelected ? exitSelection : exitSelection}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 ${
                          allSelected
                            ? "bg-[#635BFF] border-[#635BFF]"
                            : "bg-[#FF6692] border-[#FF6692]"
                        }`}
                      >
                        {allSelected ? (
                          <Check
                            size={11}
                            strokeWidth={3}
                            className="text-white"
                          />
                        ) : (
                          <span className="w-2.5 h-0.5 bg-white rounded-full block" />
                        )}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectionMode(true)}
                        className="w-6 h-6 rounded-lg border-2 border-[#CACFD8] bg-white hover:border-[#635BFF] transition-colors cursor-pointer shrink-0"
                      />
                    )}
                    {/* Name label */}
                    {selectionMode ? (
                      <button
                        onClick={allSelected ? exitSelection : toggleAll}
                        className="text-sm font-semibold text-[#635BFF] cursor-pointer hover:underline"
                      >
                        {allSelected
                          ? "Unselect All Salons"
                          : "Select All Salons"}
                      </button>
                    ) : (
                      <span className="text-sm font-semibold text-[#29343D]">
                        Name
                      </span>
                    )}
                  </div>
                </th>
                {[
                  "Telephone",
                  "Last Appointment",
                  "Allergies",
                  "Created at",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="bg-[#F3F3FF] px-4 py-4 text-left text-sm font-semibold text-[#29343D] whitespace-nowrap border-l border-[#E0E6EB]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginated.map((client) => {
                const isSelected = selected.has(client.id);
                return (
                  <tr
                    key={client.id}
                    className={`border-b border-[#EAEEF2] last:border-b-0 transition-colors ${
                      isSelected ? "bg-[#F5F4FF]" : "hover:bg-[#FAFAFE]"
                    }`}
                  >
                    {/* Combined checkbox + Name cell */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {/* Row checkbox — only shows in selection mode */}
                        {selectionMode && (
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleOne(client.id)}
                          />
                        )}
                        {/* Avatar + name */}
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#F0F2F5]">
                            <Image
                              src={client.avatar}
                              alt={client.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#29343D]">
                              {client.name}
                            </p>
                            <p className="text-xs text-[#98A4AE] mt-0.5">
                              {client.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Telephone */}
                    <td className="px-4 py-5 text-sm text-[#29343D] whitespace-nowrap border-l border-[#EAEEF2]">
                      {client.telephone}
                    </td>

                    {/* Last Appointment */}
                    <td className="px-4 py-5 text-sm text-[#29343D] border-l border-[#EAEEF2]">
                      {client.lastAppointment}
                    </td>

                    {/* Allergy badge */}
                    <td className="px-4 py-5 border-l border-[#EAEEF2]">
                      <span
                        className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${ALLERGY_STYLES[client.allergyColor]}`}
                      >
                        {client.allergy}
                      </span>
                    </td>

                    {/* Created at */}
                    <td className="px-4 py-5 text-sm text-[#29343D] border-l border-[#EAEEF2]">
                      {client.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 border-l border-[#EAEEF2]">
                      <ActionDropdown clientId={client.id} />
                    </td>
                  </tr>
                );
              })}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-sm text-[#98A4AE]"
                  >
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="mx-[30px] mb-[30px] py-4 flex items-center justify-end gap-4 border-t-0 border-b border-l border-r rounded-[0_0_8px_8px] border-[#EEF2F8]">
          {/* Items per page */}
          <div className="flex items-center gap-2 text-sm text-[#29343D]">
            <span>Items per page:</span>
            <div ref={ippRef} className="relative">
              <button
                onClick={() => setIppOpen((o) => !o)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E0E6EB] rounded-lg text-sm text-[#29343D] font-semibold hover:border-[#635BFF] transition-colors cursor-pointer bg-white"
              >
                {itemsPerPage}
                <ChevronDown
                  size={13}
                  className={`text-[#98A4AE] transition-transform ${ippOpen ? "rotate-180" : ""}`}
                />
              </button>
              {ippOpen && (
                <div className="absolute bottom-full left-0 mb-1 bg-white rounded-xl shadow-lg z-10 py-1 overflow-hidden w-20">
                  {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setItemsPerPage(n);
                        setCurrentPage(1);
                        setIppOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors ${
                        itemsPerPage === n
                          ? "bg-[#F0EEFF] text-[#29343D] font-semibold"
                          : "text-[#29343D] hover:bg-[#F4F6FA]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Page info */}
          <span className="text-sm text-[#526B7A]">
            {start + 1}-{Math.min(start + itemsPerPage, filtered.length)} of{" "}
            {filtered.length}
          </span>

          {/* Nav buttons */}
          <div className="flex items-center gap-1">
            {[
              {
                icon: <ChevronFirst size={15} />,
                action: () => setCurrentPage(1),
                disabled: currentPage === 1,
              },
              {
                icon: <ChevronLeft size={15} />,
                action: () => setCurrentPage((p) => p - 1),
                disabled: currentPage === 1,
              },
              {
                icon: <ChevronRight size={15} />,
                action: () => setCurrentPage((p) => p + 1),
                disabled: currentPage === totalPages,
              },
              {
                icon: <ChevronLast size={15} />,
                action: () => setCurrentPage(totalPages),
                disabled: currentPage === totalPages,
              },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.action}
                disabled={btn.disabled}
                className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                  btn.disabled
                    ? "text-[#C4CDD5] cursor-not-allowed"
                    : "text-[#526B7A] hover:bg-[#F4F6FA]"
                }`}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
