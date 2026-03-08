"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import IAppoinUser from "./IAppoinUser";

// ─── Types ────────────────────────────────────────────────────────────────────
type Period = "Month" | "Week" | "Day";
type AppStatus =
  | "Booked"
  | "Confirmed"
  | "Arrived"
  | "Started"
  | "Completed"
  | "Canceled";

interface CalAppointment {
  id: string;
  clientName: string;
  service: string;
  date: Date;
  startTime: string; // "HH:MM"
  endTime: string;
  price: string;
  duration: string;
  status: AppStatus;
  employeeName: string;
  employeeId: string;
}

// ─── Color map per status (pill bg + text) ───────────────────────────────────
const statusColor: Record<
  AppStatus,
  { bg: string; text: string; border: string }
> = {
  Booked: {
    bg: "bg-[#F3F0FF]",
    text: "text-[#635BFF]",
    border: "border-l-[#635BFF]",
  },
  Confirmed: {
    bg: "bg-[#E6FFFE]",
    text: "text-[#16CDC7]",
    border: "border-l-[#16CDC7]",
  },
  Arrived: {
    bg: "bg-[#FFFBEA]",
    text: "text-[#E6B800]",
    border: "border-l-[#FFD648]",
  },
  Started: {
    bg: "bg-[#FFF0F3]",
    text: "text-[#FF6692]",
    border: "border-l-[#FF6692]",
  },
  Completed: {
    bg: "bg-[#EDFBF3]",
    text: "text-[#36C76C]",
    border: "border-l-[#36C76C]",
  },
  Canceled: {
    bg: "bg-[#FFF0F3]",
    text: "text-[#FF6692]",
    border: "border-l-[#FF6692]",
  },
};

const statusBadgeColor: Record<AppStatus, string> = {
  Booked: "bg-[#DDDBFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "bg-[#F6F7F9] text-[#0A2540]",
  Completed: "bg-[#EBFAF0] text-[#36C76C]",
  Canceled: "bg-[#FFE5ED] text-[#FF6692]",
};

// ─── Static team members ──────────────────────────────────────────────────────
const teamMembers = [
  { id: "1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "2", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "3", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "4", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "5", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "6", name: "Maria Rodriguez", avatar: "/images/avator.png" },
];

// ─── Static appointments ──────────────────────────────────────────────────────
const makeDate = (y: number, m: number, d: number) => new Date(y, m - 1, d);

const allAppointments: CalAppointment[] = [
  // Day view - Sep 02 multiple members
  ...teamMembers.flatMap((member, mi) => [
    {
      id: `d-${mi}-1`,
      clientName: "Client Name",
      service: "Haircut",
      date: makeDate(2025, 9, 2),
      startTime: "00:00",
      endTime: "00:15",
      price: "€ 170",
      duration: "15 min",
      status: "Canceled" as AppStatus,
      employeeName: member.name,
      employeeId: member.id,
    },
    {
      id: `d-${mi}-2`,
      clientName: "Client Name",
      service: "Haircut",
      date: makeDate(2025, 9, 2),
      startTime: "00:20",
      endTime: "00:35",
      price: "€ 170",
      duration: "15 min",
      status: "Completed" as AppStatus,
      employeeName: member.name,
      employeeId: member.id,
    },
    {
      id: `d-${mi}-3`,
      clientName: "Client Name",
      service: "Haircut",
      date: makeDate(2025, 9, 2),
      startTime: "00:45",
      endTime: "01:00",
      price: "€ 170",
      duration: "15 min",
      status: "Booked" as AppStatus,
      employeeName: member.name,
      employeeId: member.id,
    },
    {
      id: `d-${mi}-4`,
      clientName: "Client Name",
      service: "Haircut",
      date: makeDate(2025, 9, 2),
      startTime: "01:10",
      endTime: "01:25",
      price: "€ 170",
      duration: "15 min",
      status: "Arrived" as AppStatus,
      employeeName: member.name,
      employeeId: member.id,
    },
    {
      id: `d-${mi}-5`,
      clientName: "Client Name",
      service: "Haircut",
      date: makeDate(2025, 9, 2),
      startTime: "02:00",
      endTime: "02:15",
      price: "€ 170",
      duration: "15 min",
      status: "Confirmed" as AppStatus,
      employeeName: member.name,
      employeeId: member.id,
    },
  ]),
  // Week view - Sep 01-07
  {
    id: "w-1",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 9, 1),
    startTime: "00:00",
    endTime: "00:15",
    price: "€ 170",
    duration: "15 min",
    status: "Canceled",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "w-2",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 9, 1),
    startTime: "00:30",
    endTime: "01:30",
    price: "€ 170",
    duration: "60 min",
    status: "Booked",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "w-3",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 9, 2),
    startTime: "00:00",
    endTime: "00:15",
    price: "€ 170",
    duration: "15 min",
    status: "Completed",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "w-4",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 9, 5),
    startTime: "00:00",
    endTime: "00:15",
    price: "€ 170",
    duration: "15 min",
    status: "Confirmed",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "w-5",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 9, 7),
    startTime: "00:00",
    endTime: "00:15",
    price: "€ 170",
    duration: "15 min",
    status: "Arrived",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  // Month view - October
  {
    id: "m-1",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 1),
    startTime: "10:00",
    endTime: "10:15",
    price: "€ 170",
    duration: "15 min",
    status: "Canceled",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-2",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 9),
    startTime: "10:00",
    endTime: "10:15",
    price: "€ 170",
    duration: "15 min",
    status: "Booked",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-3",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 11),
    startTime: "10:00",
    endTime: "10:15",
    price: "€ 170",
    duration: "15 min",
    status: "Completed",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-4",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 11),
    startTime: "11:00",
    endTime: "11:15",
    price: "€ 170",
    duration: "15 min",
    status: "Confirmed",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-5",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 11),
    startTime: "12:00",
    endTime: "12:15",
    price: "€ 170",
    duration: "15 min",
    status: "Arrived",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-6",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 13),
    startTime: "10:00",
    endTime: "10:15",
    price: "€ 170",
    duration: "15 min",
    status: "Started",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-7",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 16),
    startTime: "10:00",
    endTime: "10:15",
    price: "€ 170",
    duration: "15 min",
    status: "Arrived",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
  {
    id: "m-8",
    clientName: "Client Name",
    service: "Haircut",
    date: makeDate(2025, 10, 28),
    startTime: "10:00",
    endTime: "10:15",
    price: "€ 170",
    duration: "15 min",
    status: "Booked",
    employeeName: "Maria Rodriguez",
    employeeId: "1",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const timeToMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const HOUR_HEIGHT = 64; // px per hour
const HOURS = Array.from({ length: 24 }, (_, i) => i); // 0..23

function formatHour(h: number) {
  if (h === 0) return "12:00 AM";
  if (h < 12) return `${h}:00 AM`;
  if (h === 12) return "12:00 PM";
  return `${h - 12}:00 PM`;
}

// ─── Appointment Pill ─────────────────────────────────────────────────────────
function AppPill({
  appt,
  onClick,
  compact = false,
}: {
  appt: CalAppointment;
  onClick: (appt: CalAppointment, e: React.MouseEvent) => void;
  compact?: boolean;
}) {
  const c = statusColor[appt.status];
  return (
    <div
      onClick={(e) => onClick(appt, e)}
      className={`${c.bg} ${c.text} border-l-2 ${c.border} rounded-[4px] px-1.5 py-0.5 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
    >
      <p
        className={`font-manrope font-semibold truncate ${compact ? "text-[10px]" : "text-[11px]"}`}
      >
        {appt.service} &nbsp;({appt.clientName}) - ...
      </p>
    </div>
  );
}

// ─── Preview Card ─────────────────────────────────────────────────────────────
function PreviewCard({
  appt,
  onClose,
  style,
}: {
  appt: CalAppointment;
  onClose: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute z-50 bg-white rounded-[14px] shadow-[0px_12px_40px_rgba(0,0,0,0.15)] border border-[#EFF4FA] p-4 w-[260px]"
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image
            src="/images/avator.png"
            alt={appt.employeeName}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-semibold font-manrope text-[#29343D]">
            {appt.clientName}
          </span>
        </div>
        <span
          className={`text-xs font-semibold font-manrope px-2 py-0.5 rounded-full ${statusBadgeColor[appt.status]}`}
        >
          {appt.status}
        </span>
      </div>
      {/* Details grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">Date</p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.date
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "/")}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">Time</p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.startTime} - {appt.endTime}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Service
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.service}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Price
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.price}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Duration
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.duration}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Employee
          </p>
          <div className="flex items-center gap-1">
            <Image
              src="/images/avator.png"
              alt={appt.employeeName}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
            <p className="text-xs font-semibold font-manrope text-[#29343D] truncate">
              {appt.employeeName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Team Filter Dropdown ─────────────────────────────────────────────────────
function TeamDropdown({
  selectedIds,
  onChange,
  singleSelect,
}: {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  singleSelect?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    if (open) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open]);

  const allSelected = teamMembers.every((m) => selectedIds.includes(m.id));
  const displayMember =
    singleSelect && selectedIds.length === 1
      ? teamMembers.find((m) => m.id === selectedIds[0])
      : null;

  const toggle = (id: string) => {
    if (singleSelect) {
      onChange([id]);
      setOpen(false);
      return;
    }
    if (id === "all") {
      onChange(allSelected ? [] : teamMembers.map((m) => m.id));
      return;
    }
    const next = selectedIds.includes(id)
      ? selectedIds.filter((s) => s !== id)
      : [...selectedIds, id];
    onChange(next);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 border border-[#E0E6EB] rounded-[8px] px-3 py-2 cursor-pointer hover:border-[#635BFF] transition-colors bg-white"
      >
        {displayMember ? (
          <Image
            src={displayMember.avatar}
            alt={displayMember.name}
            width={22}
            height={22}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-6 h-6 bg-[#EEEEFF] rounded-[6px] flex items-center justify-center">
            <IAppoinUser />
          </div>
        )}
        <span className="text-sm font-manrope font-medium text-[#29343D]">
          {displayMember ? displayMember.name : "All Team"}
        </span>
        <ChevronDown16 />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 bg-white rounded-[14px] shadow-[0px_12px_32px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-2 min-w-[200px]">
          {!singleSelect && (
            <div
              onClick={() => toggle("all")}
              className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F6FA] cursor-pointer transition-colors mx-1 rounded-[8px]"
            >
              <div
                className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center flex-shrink-0 ${allSelected ? "bg-[#635BFF]" : "border-2 border-[#E0E6EB] bg-white"}`}
              >
                {allSelected && (
                  <Check size={13} color="white" strokeWidth={3} />
                )}
              </div>
              <div className="w-[42px] h-[42px] rounded-[10px] flex-shrink-0 bg-[#EEEEFF] flex items-center justify-center">
                <IAppoinUser />
              </div>
              <span className="text-sm font-manrope font-semibold text-[#29343D]">
                All Team
              </span>
            </div>
          )}
          {teamMembers.map((member) => {
            const checked = selectedIds.includes(member.id);
            return (
              <div
                key={member.id}
                onClick={() => toggle(member.id)}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F6FA] cursor-pointer transition-colors mx-1 rounded-[8px]"
              >
                {!singleSelect && (
                  <div
                    className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center flex-shrink-0 ${checked ? "bg-[#635BFF]" : "border-2 border-[#E0E6EB] bg-white"}`}
                  >
                    {checked && (
                      <Check size={13} color="white" strokeWidth={3} />
                    )}
                  </div>
                )}
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={42}
                  height={42}
                  className="rounded-[10px] object-cover flex-shrink-0"
                />
                <span className="text-sm font-manrope font-semibold text-[#29343D] truncate">
                  {member.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ChevronDown16() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0A2540"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ─── Day View ─────────────────────────────────────────────────────────────────
function DayView({
  date,
  selectedMemberIds,
}: {
  date: Date;
  selectedMemberIds: string[];
}) {
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleMembers = teamMembers.filter((m) =>
    selectedMemberIds.includes(m.id),
  );
  const dayAppts = allAppointments.filter((a) => isSameDay(a.date, date));

  const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setPreview({
      appt,
      x: rect.left - containerRect.left + rect.width + 8,
      y: rect.top - containerRect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden"
      onClick={() => setPreview(null)}
    >
      {/* Member header row */}
      <div className="flex border-b border-[#E0E6EB] bg-white sticky top-0 z-10">
        <div className="w-[72px] flex-shrink-0 border-r border-[#E0E6EB]" />
        {/* scroll arrow left */}
        <div className="flex-1 flex overflow-hidden">
          {visibleMembers.map((member) => (
            <div
              key={member.id}
              className="flex-1 min-w-[120px] flex flex-col items-center py-3 border-r border-[#E0E6EB] last:border-r-0"
            >
              <Image
                src={member.avatar}
                alt={member.name}
                width={40}
                height={40}
                className="rounded-full object-cover mb-1.5"
              />
              <p className="text-xs font-semibold font-manrope text-[#29343D] text-center">
                {member.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Time grid */}
      <div
        ref={scrollRef}
        className="overflow-y-auto overflow-x-auto flex-1"
        style={{ maxHeight: "calc(100vh - 280px)" }}
      >
        <div className="flex">
          {/* Time labels */}
          <div className="w-[72px] flex-shrink-0 border-r border-[#E0E6EB]">
            {HOURS.map((h) => (
              <div
                key={h}
                className="relative border-b border-[#E0E6EB]"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="absolute -top-2.5 left-2 text-[10px] font-manrope text-[#98A4AE] whitespace-nowrap">
                  {formatHour(h)}
                </span>
              </div>
            ))}
          </div>

          {/* Member columns */}
          {visibleMembers.map((member) => {
            const memberAppts = dayAppts.filter(
              (a) => a.employeeId === member.id,
            );
            return (
              <div
                key={member.id}
                className="flex-1 min-w-[120px] relative border-r border-[#E0E6EB] last:border-r-0"
              >
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="border-b border-[#E0E6EB]"
                    style={{ height: HOUR_HEIGHT }}
                  >
                    <div className="border-b border-dashed border-[#F0F0F0] h-1/2" />
                  </div>
                ))}
                {/* Appointments */}
                {memberAppts.map((appt) => {
                  const startMin = timeToMinutes(appt.startTime);
                  const endMin = timeToMinutes(appt.endTime);
                  const top = (startMin / 60) * HOUR_HEIGHT;
                  const height = Math.max(
                    ((endMin - startMin) / 60) * HOUR_HEIGHT,
                    20,
                  );
                  return (
                    <div
                      key={appt.id}
                      className="absolute left-1 right-1"
                      style={{ top, height }}
                    >
                      <AppPill appt={appt} onClick={handlePillClick} />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Preview card */}
      {preview && (
        <PreviewCard
          appt={preview.appt}
          onClose={() => setPreview(null)}
          style={{
            top: Math.min(preview.y, 300),
            left: Math.min(preview.x, 400),
          }}
        />
      )}
    </div>
  );
}

// ─── Week View ────────────────────────────────────────────────────────────────
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekStart(d: Date) {
  const s = new Date(d);
  s.setDate(s.getDate() - s.getDay());
  return s;
}

function WeekView({
  date,
  selectedMemberIds,
}: {
  date: Date;
  selectedMemberIds: string[];
}) {
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const weekStart = getWeekStart(date);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const memberAppts = allAppointments.filter((a) =>
    selectedMemberIds.includes(a.employeeId),
  );

  const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;
    setPreview({
      appt,
      x: rect.left - containerRect.left + rect.width + 8,
      y: rect.top - containerRect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden"
      onClick={() => setPreview(null)}
    >
      {/* Day header */}
      <div className="flex border-b border-[#E0E6EB] bg-white sticky top-0 z-10">
        <div className="w-[72px] flex-shrink-0 border-r border-[#E0E6EB]" />
        {days.map((d, i) => (
          <div
            key={i}
            className="flex-1 min-w-[80px] flex flex-col items-center py-3 border-r border-[#E0E6EB] last:border-r-0"
          >
            <p className="text-xs font-manrope font-medium text-[#98A4AE]">
              {String(d.getDate()).padStart(2, "0")} {WEEK_DAYS[d.getDay()]}
            </p>
          </div>
        ))}
      </div>

      {/* Time grid */}
      <div
        className="overflow-y-auto overflow-x-auto flex-1"
        style={{ maxHeight: "calc(100vh - 280px)" }}
      >
        <div className="flex">
          {/* Time labels */}
          <div className="w-[72px] flex-shrink-0 border-r border-[#E0E6EB]">
            {HOURS.map((h) => (
              <div
                key={h}
                className="relative border-b border-[#E0E6EB]"
                style={{ height: HOUR_HEIGHT }}
              >
                <span className="absolute -top-2.5 left-2 text-[10px] font-manrope text-[#98A4AE] whitespace-nowrap">
                  {formatHour(h)}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((d, di) => {
            const dayAppts = memberAppts.filter((a) => isSameDay(a.date, d));
            return (
              <div
                key={di}
                className="flex-1 min-w-[80px] relative border-r border-[#E0E6EB] last:border-r-0"
              >
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="border-b border-[#E0E6EB]"
                    style={{ height: HOUR_HEIGHT }}
                  >
                    <div className="border-b border-dashed border-[#F0F0F0] h-1/2" />
                  </div>
                ))}
                {dayAppts.map((appt) => {
                  const startMin = timeToMinutes(appt.startTime);
                  const endMin = timeToMinutes(appt.endTime);
                  const top = (startMin / 60) * HOUR_HEIGHT;
                  const height = Math.max(
                    ((endMin - startMin) / 60) * HOUR_HEIGHT,
                    18,
                  );
                  return (
                    <div
                      key={appt.id}
                      className="absolute left-1 right-1"
                      style={{ top, height }}
                    >
                      <AppPill appt={appt} onClick={handlePillClick} compact />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {preview && (
        <PreviewCard
          appt={preview.appt}
          onClose={() => setPreview(null)}
          style={{
            top: Math.min(preview.y, 300),
            left: Math.min(preview.x, 100),
          }}
        />
      )}
    </div>
  );
}

// ─── Month View ───────────────────────────────────────────────────────────────
function getMonthGrid(year: number, month: number): (Date | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const grid: (Date | null)[][] = [];
  let week: (Date | null)[] = Array(firstDay).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      grid.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }
  return grid;
}

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function MonthView({
  date,
  selectedMemberIds,
}: {
  date: Date;
  selectedMemberIds: string[];
}) {
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    dayDate: Date;
  } | null>(null);
  const year = date.getFullYear();
  const month = date.getMonth();
  const grid = getMonthGrid(year, month);
  const today = new Date();

  const memberAppts = allAppointments.filter((a) =>
    selectedMemberIds.includes(a.employeeId),
  );

  const handlePillClick = (
    appt: CalAppointment,
    dayDate: Date,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    setPreview({ appt, dayDate });
  };

  return (
    <div className="relative" onClick={() => setPreview(null)}>
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-[#E0E6EB]">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="py-3 text-center text-xs font-semibold font-manrope text-[#98A4AE] border-r border-[#E0E6EB] last:border-r-0"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Weeks */}
      {grid.map((week, wi) => (
        <div
          key={wi}
          className="grid grid-cols-7 border-b border-[#E0E6EB] last:border-b-0"
        >
          {week.map((day, di) => {
            const dayAppts = day
              ? memberAppts.filter((a) => isSameDay(a.date, day))
              : [];
            const isToday = day ? isSameDay(day, today) : false;
            return (
              <div
                key={di}
                className={`border-r border-[#E0E6EB] last:border-r-0 min-h-[100px] p-2 relative ${!day ? "bg-[#FAFBFF]" : ""} ${isToday ? "bg-[#F0EFFF]" : ""}`}
              >
                {day && (
                  <>
                    <p
                      className={`text-xs font-manrope font-medium mb-1 ${isToday ? "text-[#635BFF] font-bold" : "text-[#98A4AE]"}`}
                    >
                      {day.getDate()}
                    </p>
                    <div className="space-y-0.5">
                      {dayAppts.slice(0, 3).map((appt) => (
                        <div
                          key={appt.id}
                          onClick={(e) => handlePillClick(appt, day, e)}
                        >
                          <AppPill
                            appt={appt}
                            onClick={(a, e) => handlePillClick(a, day, e)}
                            compact
                          />
                        </div>
                      ))}
                      {dayAppts.length > 3 && (
                        <p className="text-[10px] text-[#98A4AE] font-manrope">
                          +{dayAppts.length - 3} more
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Preview card - centered */}
      {preview && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="pointer-events-auto">
            <PreviewCard
              appt={preview.appt}
              onClose={() => setPreview(null)}
              style={{ position: "relative", top: "auto", left: "auto" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main CalendarView ────────────────────────────────────────────────────────
export default function CalendarView() {
  const [period, setPeriod] = useState<Period>("Day");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2)); // Sep 2
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    teamMembers.map((m) => m.id),
  );

  // For day/week use multi-select; month view shows single member filter per design
  const isMonthOrWeek = period === "Month" || period === "Week";

  const navigate = (dir: -1 | 1) => {
    const d = new Date(currentDate);
    if (period === "Day") d.setDate(d.getDate() + dir);
    else if (period === "Week") d.setDate(d.getDate() + 7 * dir);
    else d.setMonth(d.getMonth() + dir);
    setCurrentDate(d);
  };

  const dateLabel = () => {
    if (period === "Day") {
      return currentDate
        .toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "2-digit",
        })
        .replace(",", "");
    }
    if (period === "Week") {
      const ws = getWeekStart(currentDate);
      const we = new Date(ws);
      we.setDate(we.getDate() + 6);
      return `${ws.toLocaleDateString("en-US", { month: "long", day: "2-digit" })} – ${we.toLocaleDateString("en-US", { month: "long", day: "2-digit" })}`;
    }
    return MONTH_NAMES[currentDate.getMonth()];
  };

  // Switch date when changing period
  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    if (p === "Month")
      setCurrentDate(new Date(2025, 9, 1)); // October
    else if (p === "Week")
      setCurrentDate(new Date(2025, 8, 1)); // Sep 1
    else setCurrentDate(new Date(2025, 8, 2)); // Sep 2
  };

  return (
    <div className="bg-white rounded-xl border border-[#EFF4FA] overflow-hidden font-manrope">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-[#EFF4FA]">
        {/* Left: team filter */}
        <TeamDropdown
          selectedIds={selectedMemberIds}
          onChange={setSelectedMemberIds}
          singleSelect={isMonthOrWeek}
        />

        {/* Center: date nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#F4F6FA] rounded-[6px] transition-colors cursor-pointer"
          >
            <ChevronLeft size={18} className="text-[#635BFF]" />
          </button>
          <span className="text-sm font-semibold font-manrope text-[#635BFF] whitespace-nowrap min-w-[160px] text-center">
            {dateLabel()}
          </span>
          <button
            onClick={() => navigate(1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-[#F4F6FA] rounded-[6px] transition-colors cursor-pointer"
          >
            <ChevronRight size={18} className="text-[#635BFF]" />
          </button>
        </div>

        {/* Right: period + expand */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#E0E6EB] rounded-[8px] overflow-hidden">
            {(["Month", "Week", "Day"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodChange(p)}
                className={`px-3 sm:px-4 py-2 text-sm font-manrope font-medium transition-colors cursor-pointer ${period === p ? "bg-[#EEEEFF] text-[#635BFF]" : "text-[#526B7A] hover:text-[#29343D]"}`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Expand icon */}
          <button className="w-9 h-9 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#526B7A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" />
              <line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      {period === "Day" && (
        <DayView date={currentDate} selectedMemberIds={selectedMemberIds} />
      )}
      {period === "Week" && (
        <WeekView date={currentDate} selectedMemberIds={selectedMemberIds} />
      )}
      {period === "Month" && (
        <MonthView date={currentDate} selectedMemberIds={selectedMemberIds} />
      )}
    </div>
  );
}
