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
  Eye,
  Pencil,
  Trash2,
  Search,
  ChevronUp,
  Clock,
  User,
  Scissors,
} from "lucide-react";
import IAppoinUser from "./IAppoinUser";

// ── Types ────────────────────────────────────────────────────────
type Status =
  | "Booked"
  | "Confirmed"
  | "Arrived"
  | "Started"
  | "Completed"
  | "Canceled";

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  scheduledDate: string;
  price: string;
  status: Status;
}

// ── Static Data ──────────────────────────────────────────────────
const allAppointments: Appointment[] = [
  {
    id: "#001",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Booked",
  },
  {
    id: "#002",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Started",
  },
  {
    id: "#003",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Canceled",
  },
  {
    id: "#004",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Confirmed",
  },
  {
    id: "#005",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Arrived",
  },
  {
    id: "#006",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Completed",
  },
  {
    id: "#007",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Arrived",
  },
  {
    id: "#008",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Arrived",
  },
  {
    id: "#009",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Canceled",
  },
  {
    id: "#010",
    clientName: "Maria Rodriguez",
    clientPhone: "+39 345 678 9123",
    service: "Haircut",
    scheduledDate: "5 Aug 2025 (12:00 AM - 12:15 AM)",
    price: "€ 170",
    status: "Booked",
  },
];

// ── Status Badge ─────────────────────────────────────────────────
const statusStyles: Record<Status, string> = {
  Booked: "bg-[#DDDBFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "bg-[#F6F7F9] text-[#0A2540]",
  Completed: "bg-[#EBFAF0] text-[#36C76C]",
  Canceled: "bg-[#FFE5ED] text-[#FF6692]",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block text-xs font-manrope font-semibold w-fit px-3 py-1 rounded-[8px] ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// ── Row Actions Dropdown ─────────────────────────────────────────
function RowActions() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
      >
        <EllipsisVertical size={16} className="text-[#526B7A]" />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#F0F2F5] py-1.5 w-44">
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
          >
            <Eye size={15} className="text-[#635BFF] flex-shrink-0" />
            View Details
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
          >
            <Pencil size={15} className="text-[#526B7A] flex-shrink-0" />
            Edit
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#FFF5F7] transition-colors cursor-pointer"
          >
            <Trash2 size={15} className="text-[#FF6692] flex-shrink-0" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── Booking Order Stepper ────────────────────────────────────────
type StepState = "done" | "active" | "todo" | "canceled";

interface BookingStep {
  time: string;
  service: string;
  staff: string;
  state: StepState;
}

function getSteps(status: Status): BookingStep[] {
  const base = [
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
    { time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
  ];
  switch (status) {
    case "Booked":
    case "Confirmed":
      return base.map((s) => ({ ...s, state: "todo" as StepState }));
    case "Arrived":
      return [
        { ...base[0], state: "active" as StepState },
        { ...base[1], state: "todo" as StepState },
        { ...base[2], state: "todo" as StepState },
      ];
    case "Started":
      return [
        { ...base[0], state: "done" as StepState },
        { ...base[1], state: "active" as StepState },
        { ...base[2], state: "todo" as StepState },
      ];
    case "Completed":
      return base.map((s) => ({ ...s, state: "done" as StepState }));
    case "Canceled":
      return base.map((s) => ({ ...s, state: "canceled" as StepState }));
    default:
      return base.map((s) => ({ ...s, state: "todo" as StepState }));
  }
}

function StepIcon({ state, index }: { state: StepState; index: number }) {
  const base =
    "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold font-manrope z-10 relative";
  if (state === "done")
    return (
      <div className={`${base} bg-[#4CD964] text-white`}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10l4.5 4.5L16 6"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  if (state === "active")
    return <div className={`${base} bg-[#635BFF] text-white`}>{index + 1}</div>;
  if (state === "canceled")
    return (
      <div className={`${base} bg-[#FF6692] text-white`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 3l10 10M13 3L3 13"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  return (
    <div
      className={`${base} bg-white border-2 border-[#D1D5DB] text-[#9CA3AF]`}
    >
      {index + 1}
    </div>
  );
}

function stepBadge(state: StepState): { label: string; className: string } {
  if (state === "done")
    return { label: "Completed", className: "bg-[#EBFAF0] text-[#36C76C]" };
  if (state === "active")
    return { label: "Doing", className: "bg-[#DDDBFF] text-[#635BFF]" };
  if (state === "canceled")
    return { label: "Cancelled", className: "bg-[#FFE5ED] text-[#FF6692]" };
  return { label: "To Do", className: "bg-[#EFF4FA] text-[#0A2540]" };
}

function stepLineColor(state: StepState): string {
  if (state === "done") return "bg-[#4CD964]";
  if (state === "active") return "bg-[#635BFF]";
  if (state === "canceled") return "bg-[#FF6692]";
  return "bg-[#D1D5DB]";
}

// ── Inline Expanded Row Detail ───────────────────────────────────
function ExpandedRowDetail({ row }: { row: Appointment }) {
  const steps = getSteps(row.status);
  const showReceipt = row.status === "Started" || row.status === "Completed";

  return (
    <tr className="bg-[#F9FAFB]">
      <td colSpan={7} className="px-6 py-8 border-b border-[#E0E6EB]">
        {/* Title */}
        <p className="text-base font-bold font-manrope text-[#29343D] mb-4 text-center tracking-tight">
          Booking Order
        </p>

        {/* Stepper — circles connected by full-width lines */}
        <div className="max-w-[361px] mx-auto">
          {/* Top row: line + circles */}
          <div className="flex items-center justify-center px-4">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Circle */}
                <div className="flex-shrink-0">
                  <StepIcon state={step.state} index={idx} />
                </div>
                {/* Full connector line between circles */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] ${stepLineColor(step.state)}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom row: labels under each circle */}
          <div className="flex items-start justify-between mt-3">
            {steps.map((step, idx) => {
              const badge = stepBadge(step.state);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-[8px] text-[11px] font-semibold font-manrope whitespace-nowrap ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <p className="mt-2 text-[11px] font-manrope text-[#9CA3AF] text-center">
                    {step.time}
                  </p>
                  <p className="mt-0.5 text-[12px] font-bold font-manrope text-[#1A2332] text-center">
                    {step.service}
                  </p>
                  <p className="mt-0.5 text-[11px] font-manrope text-[#9CA3AF] text-center">
                    {step.staff}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Print Receipt */}
        {showReceipt && (
          <div className="flex justify-center mt-8">
            <button className="px-10 py-3 bg-[#DDDCFF] hover:bg-[#c9c8ff] text-[#635BFF] text-sm font-semibold font-manrope rounded-2xl transition-colors cursor-pointer tracking-wide">
              Print Receipt
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

// ── Search Member Modal ──────────────────────────────────────────
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

function SearchMemberModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = recentMembers.filter(
    (m) =>
      !query ||
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.phone.includes(query),
  );

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4"
    >
      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4">
          <h2 className="text-base font-bold font-manrope text-[#29343D]">
            Search a Member
          </h2>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors cursor-pointer text-[#98A4AE] hover:text-[#29343D] text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Search input */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-[10px] px-3 py-2.5 focus-within:border-[#635BFF] transition-colors">
            <Search size={16} className="text-[#98A4AE] flex-shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 text-sm font-manrope text-[#29343D] placeholder:text-[#C4CDD5] outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Recent / Results */}
        <div className="px-6 pb-5">
          <p className="text-xs font-semibold font-manrope text-[#98A4AE] mb-3">
            {query ? "Results" : "Recent research"}
          </p>
          <div className="space-y-1">
            {filtered.map((m, i) => (
              <button
                key={i}
                onClick={onClose}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-[#F4F6FA] transition-colors cursor-pointer text-left"
              >
                <Image
                  src={m.avatar}
                  alt={m.name}
                  width={38}
                  height={38}
                  className="rounded-xl object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold font-manrope text-[#29343D]">
                    {m.name}
                  </p>
                  <p className="text-xs font-manrope text-[#98A4AE]">
                    {m.phone}
                  </p>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm font-manrope text-[#98A4AE] text-center py-4">
                No members found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Status Filters ───────────────────────────────────────────────
const statusFilters: (Status | "All")[] = [
  "All",
  "Booked",
  "Confirmed",
  "Arrived",
  "Started",
  "Completed",
  "Canceled",
];

// ── Mobile Card ──────────────────────────────────────────────────
function MobileAppointmentCard({ row }: { row: Appointment }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border border-[#E0E6EB] rounded-xl bg-white overflow-hidden">
      <div className="p-4 flex items-center gap-3">
        {/* Avatar */}
        <Image
          src="/images/avator.png"
          alt={row.clientName}
          width={40}
          height={40}
          className="rounded-xl object-cover flex-shrink-0"
        />

        {/* Name + phone */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold font-manrope text-[#635BFF] flex-shrink-0">
              {row.id}
            </span>
            <span className="text-sm font-semibold font-manrope text-[#29343D] truncate">
              {row.clientName}
            </span>
          </div>
          <p className="text-xs font-manrope text-[#98A4AE] mt-0.5">
            {row.clientPhone}
          </p>
        </div>

        {/* Status + actions — fixed right side */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <StatusBadge status={row.status} />
          <RowActions />
          <button
            onClick={() => setExpanded((p) => !p)}
            className="p-1 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
          >
            {expanded ? (
              <ChevronUp size={16} className="text-[#635BFF]" />
            ) : (
              <ChevronDown size={16} className="text-[#635BFF]" />
            )}
          </button>
        </div>
      </div>
      {expanded && (
        <div className="border-t border-[#EFF4FA] bg-[#FAFBFF] px-4 py-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEEEFF] flex items-center justify-center flex-shrink-0">
              <Scissors size={13} className="text-[#635BFF]" />
            </div>
            <div>
              <p className="text-[10px] text-[#98A4AE] font-manrope uppercase tracking-wide">
                Service
              </p>
              <p className="text-sm font-semibold font-manrope text-[#29343D]">
                {row.service}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEEEFF] flex items-center justify-center flex-shrink-0">
              <User size={13} className="text-[#635BFF]" />
            </div>
            <div>
              <p className="text-[10px] text-[#98A4AE] font-manrope uppercase tracking-wide">
                Price
              </p>
              <p className="text-sm font-bold font-manrope text-[#635BFF]">
                {row.price}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-start gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#EEEEFF] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock size={13} className="text-[#635BFF]" />
            </div>
            <div>
              <p className="text-[10px] text-[#98A4AE] font-manrope uppercase tracking-wide">
                Scheduled Date
              </p>
              <p className="text-sm font-manrope text-[#526B7A]">
                {row.scheduledDate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
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
      {searchOpen && <SearchMemberModal onClose={() => setSearchOpen(false)} />}

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
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-manrope font-medium transition-colors cursor-pointer ${activeView === "calendar" ? "bg-[#F4F6FA] text-[#29343D]" : "text-[#98A4AE] hover:text-[#29343D]"}`}
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
            <button className="w-[44px] h-[44px] flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
              <EllipsisVertical size={20} color="#0A2540" />
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope rounded-[8px] cursor-pointer">
              <Plus size={16} />
              <span className="hidden sm:inline">Add Appointment</span>
            </button>
          </div>
        </div>

        {/* Status filter */}
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
      </div>

      {/* ── Table Card ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden p-4 sm:p-6 lg:p-[30px]">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          {/* Left: Team filter + Search */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-[8px] px-3 py-2 cursor-pointer hover:border-[#635BFF] transition-colors">
              <div className="w-6 h-6 bg-[#EEEEFF] rounded-[6px] flex items-center justify-center">
                <IAppoinUser />
              </div>
              <span className="text-sm font-manrope font-medium text-[#29343D]">
                All Team
              </span>
              <ChevronDown size={18} color="#0A2540" />
            </div>
            <button
              onClick={() => setSearchOpen(true)}
              className="w-11 h-10 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              <Search size={18} className="text-[#0A2540]" />
            </button>
          </div>

          {/* Center: Date navigation */}
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

          {/* Right: Period toggle */}
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

        {/* ── DESKTOP TABLE (md+) ─────────────────────────────── */}
        <div className="hidden md:block border border-[#E0E6EB] rounded-[12px] overflow-visible">
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
                      {/* ID */}
                      <td className="px-4 py-4 border-r border-[#E0E6EB]">
                        <span className="text-sm font-semibold font-manrope text-[#635BFF]">
                          {row.id}
                        </span>
                      </td>
                      {/* Client */}
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
                      {/* Service */}
                      <td className="px-4 py-4 border-r border-[#E0E6EB]">
                        <span className="text-sm font-manrope text-[#29343D]">
                          {row.service}
                        </span>
                      </td>
                      {/* Scheduled Date */}
                      <td className="px-4 py-4 border-r border-[#E0E6EB]">
                        <span className="text-sm font-manrope text-[#526B7A] whitespace-nowrap">
                          {row.scheduledDate}
                        </span>
                      </td>
                      {/* Price */}
                      <td className="px-4 py-4 border-r border-[#E0E6EB]">
                        <span className="text-sm font-manrope text-[#29343D]">
                          {row.price}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-4 py-4 border-r border-[#E0E6EB]">
                        <StatusBadge status={row.status} />
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1 justify-center">
                          <RowActions />
                          <button
                            onClick={() => handleChevronClick(globalIndex)}
                            className="p-1.5 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
                          >
                            {isExpanded ? (
                              <ChevronUp size={16} className="text-[#635BFF]" />
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
                    {/* Inline expanded detail row */}
                    {isExpanded && <ExpandedRowDetail row={row} />}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE CARDS (< md) ─────────────────────────────── */}
        <div className="md:hidden space-y-3">
          {paginated.map((row, i) => (
            <MobileAppointmentCard key={i} row={row} />
          ))}
        </div>

        {/* ── Pagination ──────────────────────────────────────── */}
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
    </div>
  );
}
