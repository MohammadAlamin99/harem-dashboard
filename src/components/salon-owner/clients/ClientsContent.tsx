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
  ChevronFirst,
  ChevronLast,
} from "lucide-react";
import AddClientModal from "./AddClientModal";
import ActionDropdown from "./ActionDropdown";
import Checkbox from "./ClientCheckBox";
import Link from "next/link";
import ImportTopBar from "./import/ImportTopBar";
import PaginationClient from "./PaginationClient";

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
  const ippRef = useRef<HTMLDivElement | null>(null);

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
      <ImportTopBar
        setAddClientOpen={setAddClientOpen}
        setActiveYear={setActiveYear}
        activeYear={activeYear}
        setActiveReg={setActiveReg}
        activeReg={activeReg}
        lastAppt={lastAppt}
      />

      {/* Table card */}
      <div className="bg-white rounded-2xl border border-[#EEF2F8]">
        {/* Search + Mass Deletion */}
        <div className="px-4 md:px-[30px] pt-5 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg bg-white w-full md:w-72">
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
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#FFE5ED] hover:bg-[#FFD6E0] text-[#FF6692] text-sm font-semibold rounded-lg transition-colors cursor-pointer w-full md:w-auto justify-center md:justify-start">
              <Trash2 size={15} />
              Mass Deletion
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto border-t rounded-[12px_12px_0_0] mx-4 md:m-[0_30px_0px_30px] border border-[#E0E6EB]">
          <table className="w-full min-w-[750px] border-collapse">
            <thead>
              <tr
                className={`border-b-2 border-[#EAEEF2] ${selectionMode ? "bg-[#EEEEFF]" : "bg-[#F8F9FB]"}`}
              >
                {/* Combined checkbox + Name column */}
                <th className="px-5 py-4 text-left bg-[#F3F3FF]">
                  <div className="flex items-center gap-3">
                    {selectionMode ? (
                      <button
                        onClick={allSelected ? exitSelection : toggleAll}
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
                        {selectionMode && (
                          <Checkbox
                            checked={isSelected}
                            onChange={() => toggleOne(client.id)}
                          />
                        )}
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
        />
      </div>
    </div>
  );
}
