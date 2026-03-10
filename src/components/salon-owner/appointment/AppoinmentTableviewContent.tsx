"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronFirst,
  ChevronLast,
  EllipsisVertical,
  Search,
  ChevronUp,
} from "lucide-react";
import SearchMemberModal from "./SearchMemberModal";
import RowActions from "./RowActions";
import { Appointment } from "@/@types/salon-owner/appointment.type";
import StatusBadge from "./StatusBadge";
import ExpandedRowDetail from "./ExpandedRowDetail";
import { Status } from "@/@types/salon-owner/Statu.type";
import CalendarView from "./Calendarview ";
import TeamFilterDropdown from "./Teamfilterdropdown ";
import Link from "next/link";

const allAppointments: Appointment[] = [
  {
    id: "001",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Booked",
  },
  {
    id: "002",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Started",
  },
  {
    id: "003",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Canceled",
  },
  {
    id: "004",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Confirmed",
  },
  {
    id: "005",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Arrived",
  },
  {
    id: "006",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Completed",
  },
  {
    id: "007",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Arrived",
  },
  {
    id: "008",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Arrived",
  },
  {
    id: "009",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Canceled",
  },
  {
    id: "010",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Booked",
  },
];

const statusStyles: Record<Status, string> = {
  Booked: "bg-[#DDDBFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "bg-[#F6F7F9] text-[#0A2540]",
  Completed: "bg-[#EBFAF0] text-[#36C76C]",
  Canceled: "bg-[#FFE5ED] text-[#FF6692]",
};

const recentMembers = [
  {
    name: "Maria Rodriguez",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
  {
    name: "Maria Rodriguez",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
  {
    name: "Maria Rodriguez",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
  {
    name: "Maria Rodriguez",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
];

const statusFilters: (Status | "All")[] = [
  "All",
  "Booked",
  "Confirmed",
  "Arrived",
  "Started",
  "Completed",
  "Canceled",
];

export default function AppoinmentTableviewContent() {
  const [activeStatus, setActiveStatus] = useState<Status | "All">("All");
  const [activeView, setActiveView] = useState<"calendar" | "table">("table");
  const [activePeriod, setActivePeriod] = useState<"Month" | "Week" | "Day">(
    "Day",
  );
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsHovered, setSettingsHovered] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setSettingsHovered(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const filtered = allAppointments.filter(
    (a) => activeStatus === "All" || a.status === activeStatus,
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleChevronClick = (globalIndex: number) => {
    setExpandedRow((prev) => (prev === globalIndex ? null : globalIndex));
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope space-y-4">
      {searchOpen && (
        <SearchMemberModal
          recentMembers={recentMembers}
          onClose={() => setSearchOpen(false)}
        />
      )}

      {/* ── Header Card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl py-4 px-4 sm:px-6 border border-[#EFF4FA]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <h1 className="text-lg font-bold font-manrope text-[#29343D]">
            Appointments
          </h1>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Calendar / Table toggle */}
            <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden">
              <button
                onClick={() => setActiveView("calendar")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-manrope font-medium transition-colors cursor-pointer ${activeView === "calendar" ? "bg-[#DDDBFF] text-[#635BFF]" : "text-[#98A4AE] hover:text-[#29343D]"}`}
              >
                <span>Calendar View</span>
              </button>
              <button
                onClick={() => setActiveView("table")}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-manrope font-medium transition-colors cursor-pointer ${activeView === "table" ? "bg-[#DDDBFF] text-[#635BFF]" : "text-[#98A4AE] hover:text-[#29343D]"}`}
              >
                <span>Table View</span>
              </button>
            </div>

            {/* ── EllipsisVertical with Dropdown ── */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => {
                  setMenuOpen((prev) => !prev);
                  setSettingsHovered(false);
                }}
                className="w-[44px] h-[44px] flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
              >
                <EllipsisVertical size={20} color="#0A2540" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-[calc(100%+6px)] z-50">
                  <div className="bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 min-w-[190px]">
                    <div
                      className="relative flex items-center justify-between px-4 py-2.5 hover:bg-[#F4F6FA] cursor-pointer"
                      onMouseEnter={() => setSettingsHovered(true)}
                      onMouseLeave={() => setSettingsHovered(false)}
                    >
                      <span className="text-sm font-manrope font-medium text-[#29343D]">
                        Settings
                      </span>
                      <ChevronRight size={15} className="text-[#98A4AE]" />
                      {settingsHovered && (
                        <div
                          className="absolute left-full top-0 ml-1 bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 min-w-[220px]"
                          onMouseEnter={() => setSettingsHovered(true)}
                          onMouseLeave={() => setSettingsHovered(false)}
                        >
                          <Link href="/salon-owner/appointment/settings">
                            <button
                              className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                              onClick={() => {
                                setMenuOpen(false);
                                setSettingsHovered(false);
                              }}
                            >
                              General settings
                            </button>
                          </Link>
                          <button
                            className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                            onClick={() => {
                              setMenuOpen(false);
                              setSettingsHovered(false);
                            }}
                          >
                            Notifications &amp; Communication
                          </button>
                        </div>
                      )}
                    </div>
                    <Link href="/salon-owner/appointment/import-appointments">
                      <button
                        className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                      >
                        Import Appointments
                      </button>
                    </Link>
                    <button
                      className="w-full text-left px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                      onClick={() => setMenuOpen(false)}
                    >
                      Export Data
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope rounded-[8px] cursor-pointer">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Appointment</span>
            </button>
          </div>
        </div>

        {/* Status filter — only in table view */}
        {activeView === "table" && (
          <div>
            <p className="text-xs font-manrope font-semibold text-[#98A4AE] mb-2">
              Status
            </p>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {statusFilters.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setActiveStatus(s);
                    setCurrentPage(1);
                    setExpandedRow(null);
                  }}
                  className={`flex-shrink-0 px-3 py-1.5 text-sm font-manrope font-medium rounded-[6px] border transition-all cursor-pointer ${activeStatus === s ? "border-[#635BFF] text-[#635BFF] bg-white" : "border-[#E0E6EB] text-[#526B7A] hover:border-[#635BFF] hover:text-[#635BFF]"}`}
                >
                  {s} 
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Calendar View ─────────────────────────────────────────── */}
      {activeView === "calendar" && <CalendarView />}

      {/* ── Table Card ──────────────────────────────────────────── */}
      {activeView === "table" && (
        <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden p-4 sm:p-6 lg:p-[30px]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <TeamFilterDropdown />
              <button
                onClick={() => setSearchOpen(true)}
                className="w-11 h-10 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
              >
                <Search size={18} className="text-[#0A2540]" />
              </button>
            </div>
            <div className="flex items-center border border-[#E8EEFF] rounded-[12px] overflow-hidden">
              <button className="px-3 sm:px-4 py-2.5 border-r border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
                <ChevronLeft size={18} className="text-[#635BFF]" />
              </button>
              <span className="px-4 sm:px-6 py-2.5 text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap">
                Tuesday Sep 02
              </span>
              <button className="px-3 sm:px-4 py-2.5 border-l border-[#E8EEFF] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
                <ChevronRight size={18} className="text-[#635BFF]" />
              </button>
            </div>
            <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden">
              {(["Month", "Week", "Day"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePeriod(p)}
                  className={`px-3 sm:px-4 py-2 text-sm font-manrope font-medium transition-colors cursor-pointer ${activePeriod === p ? "bg-[#EEEEFF] text-[#635BFF]" : "text-[#526B7A] hover:text-[#29343D]"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-[#E0E6EB] rounded-[12px] overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F3F3FF] border-b border-[#E0E6EB]">
                  {[
                    "ID",
                    "Client",
                    "Service",
                    "Scheduled Date",
                    "Price",
                    "Status",
                    "",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-5 border-r border-[#E0E6EB] last:border-r-0 text-sm font-semibold font-manrope text-[#29343D] text-left whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, i) => {
                  const globalIndex = (currentPage - 1) * itemsPerPage + i;
                  const isExpanded = expandedRow === globalIndex;
                  return (
                    <React.Fragment key={globalIndex}>
                      <tr
                        className={`border-b border-[#E0E6EB] transition-colors ${isExpanded ? "bg-[#F7F7FF]" : "hover:bg-[#FAFBFF]"} ${isExpanded ? "" : "last:border-b-0"}`}
                      >
                        <td className="px-4 py-4 border-r border-[#E0E6EB]">
                          <span className="text-sm font-semibold font-manrope text-[#635BFF]">
                            {row.id}
                          </span>
                        </td>
                        <td className="px-4 py-4 border-r border-[#E0E6EB]">
                          <div className="flex items-center gap-3">
                            <Image
                              src="/images/avator.png"
                              alt={row.clientName}
                              width={36}
                              height={36}
                              className="rounded-xl object-cover flex-shrink-0"
                            />
                            <div>
                              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                                {row.clientName}
                              </p>
                              <p className="text-xs font-manrope text-[#98A4AE]">
                                {row.clientPhone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 border-r border-[#E0E6EB]">
                          <span className="text-sm font-manrope text-[#29343D]">
                            {row.service}
                          </span>
                        </td>
                        <td className="px-4 py-4 border-r border-[#E0E6EB]">
                          <span className="text-sm font-manrope text-[#526B7A] whitespace-nowrap">
                            {row.scheduledDate}
                          </span>
                        </td>
                        <td className="px-4 py-4 border-r border-[#E0E6EB]">
                          <span className="text-sm font-manrope text-[#29343D]">
                            {row.price}
                          </span>
                        </td>
                        <td className="px-4 py-4 border-r border-[#E0E6EB]">
                          <StatusBadge
                            status={row.status}
                            statusStyles={statusStyles}
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1 justify-center">
                            <RowActions />
                            <button
                              onClick={() => handleChevronClick(globalIndex)}
                              className="p-1.5 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
                            >
                              {isExpanded ? (
                                <ChevronUp
                                  size={16}
                                  className="text-[#635BFF]"
                                />
                              ) : (
                                <ChevronDown
                                  size={16}
                                  className="text-[#635BFF]"
                                />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {isExpanded && <ExpandedRowDetail row={row} />}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-4 sm:gap-6 px-1 py-3.5 mt-2">
            <div className="flex items-center gap-2 text-sm font-manrope text-[#526B7A]">
              <span className="hidden sm:inline">Items per page:</span>
              <div className="flex items-center gap-1 border border-[#E0E6EB] rounded-[6px] px-2.5 py-1 cursor-pointer">
                <span>{itemsPerPage}</span>
                <ChevronDown size={12} className="text-[#98A4AE]" />
              </div>
            </div>
            <span className="text-sm font-manrope text-[#526B7A]">
              {(currentPage - 1) * itemsPerPage + 1}–
              {Math.min(currentPage * itemsPerPage, filtered.length)} of{" "}
              {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronFirst size={22} className="text-[#526B7A]" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronLeft size={22} className="text-[#526B7A]" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronRight size={22} className="text-[#526B7A]" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="rounded-[6px] hover:bg-[#F4F6FA] disabled:opacity-30 transition-colors cursor-pointer"
              >
                <ChevronLast size={22} className="text-[#526B7A]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
