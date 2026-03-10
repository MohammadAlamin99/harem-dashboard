"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, EllipsisVertical, Home, ChevronLeft } from "lucide-react";
import Link from "next/link";

type AppStatus = "Booked" | "Confirmed" | "Arrived" | "Started" | "No-show";

const STATUS_OPTIONS: AppStatus[] = [
  "Booked",
  "Confirmed",
  "Arrived",
  "Started",
  "No-show",
];

const statusStyle: Record<AppStatus, string> = {
  Booked: "bg-[#DDDBFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "bg-[#F6F7F9] text-[#0A2540]",
  "No-show": "bg-[#FFE5ED] text-[#FF6692]",
};

const activities = [
  {
    label: "Appointement Created",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#98A4AE]",
  },
  {
    label: "Appointment Confirmed",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#16CDC7]",
  },
  {
    label: "Appointment Started",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#98A4AE]",
  },
  {
    label: "Receipt Printed",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#16CDC7]",
  },
  {
    label: "Paid",
    date: "02 Aug 2025",
    time: "at 07:00",
    dot: "border-[#36C76C]",
  },
];

function useOutsideClick(
  ref: React.RefObject<HTMLDivElement | null>,
  cb: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    if (!enabled) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [enabled]);
}

function StatusDropdown({
  value,
  onChange,
}: {
  value: AppStatus;
  onChange: (s: AppStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-sm font-semibold font-manrope cursor-pointer ${statusStyle[value]}`}
      >
        {value}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-1.5 max-w-[120px]">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EllipsisDropdown({ onAddNote }: { onAddNote: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false), open);
  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-9 h-9 flex items-center justify-center border border-[#E0E6EB] bg-white rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
      >
        <EllipsisVertical size={17} className="text-[#526B7A]" />
      </button>
      {open && (
        <div className="absolute right-0 bottom-[calc(100%+6px)] z-50 bg-white rounded-[10px] shadow-[0px_8px_24px_rgba(0,0,0,0.10)] border border-[#EFF4FA] py-1.5 min-w-[140px]">
          <button
            className="w-full text-left px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            onClick={() => {
              setOpen(false);
              onAddNote();
            }}
          >
            Add a Note
          </button>
          <button
            className="w-full text-left px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            onClick={() => setOpen(false)}
          >
            No-show
          </button>
        </div>
      )}
    </div>
  );
}

export default function ViewAppointmentContent() {
  const [status, setStatus] = useState<AppStatus>("Booked");
  const [note, setNote] = useState("");
  const noteRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddNote = () => {
    noteRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => textareaRef.current?.focus(), 400);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/* Top Nav */}
      <div className="bg-white border-b border-[#EFF4FA] px-4 sm:px-[30px] py-3 flex items-center justify-between gap-3 rounded-xl">
        <div className="flex items-center gap-2">
          <button className="cursor-pointer">
            <ChevronLeft color="#635BFF" size={24} />
          </button>
          <h1 className="text-base font-bold font-manrope text-[#29343D]">
            View Appointment
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 sm:px-4 py-2 text-sm font-semibold font-manrope text-[#16CDC7] bg-[#ECFDFD] hover:bg-[#d4faf9] rounded-[8px] transition-colors cursor-pointer whitespace-nowrap">
            Reschedule
          </button>
          <button className="px-3 sm:px-4 py-2 text-sm font-semibold font-manrope text-[#FF6692] bg-[#FFE5ED] hover:bg-[#ffd0e0] rounded-[8px] transition-colors cursor-pointer whitespace-nowrap">
            Cancel Appointment
          </button>
          <div className="hidden sm:flex items-center gap-1.5">
            <Home size={20} className="text-[#526B7A]" />
            <span className="text-[#98A4AE] text-sm">/</span>
            <span className="px-3 py-1.5 bg-[#DDDBFF] text-[#635BFF] text-sm font-semibold font-manrope rounded-[8px]">
              Appointments
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto py-5 space-y-4">
        {/* Row 1: Basic Info + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Basic Informations */}
          <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold font-manrope text-[#29343D]">
                Basic Informations
              </h2>
              <span className="text-sm font-bold font-manrope text-[#29343D]">
                #000
              </span>
            </div>
            <p className="text-[10px] font-manrope text-[#98A4AE] mb-2">
              Client
            </p>
            <div className="flex items-center justify-between bg-[#F4F6FA] rounded-[10px] p-4 mb-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/avator.png"
                  alt="Maria Fernandez"
                  width={56}
                  height={56}
                  className="rounded-[10px] object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-base font-bold font-manrope text-[#29343D]">
                    Maria Fernandez
                  </p>
                  <p className="text-sm font-manrope text-[#98A4AE]">
                    maria@gmail.com
                  </p>
                </div>
              </div>
              <button className="px-4 py-2.5 bg-[#EEEEFF] hover:bg-[#DDDBFF] text-[#635BFF] text-xs font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer whitespace-nowrap">
                View Profile
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-manrope text-[#98A4AE] mb-1">Date</p>
                <p className="text-sm font-semibold font-manrope text-[#29343D]">
                  02/08/2025
                </p>
              </div>
              <div>
                <p className="text-xs font-manrope text-[#98A4AE] mb-1">Time</p>
                <p className="text-sm font-semibold font-manrope text-[#29343D]">
                  11:00 - 11:15
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-manrope text-[#98A4AE] mb-1.5">
                  Status
                </p>
                <StatusDropdown value={status} onChange={setStatus} />
              </div>
              <div>
                <p className="text-xs font-manrope text-[#98A4AE] mb-1.5">
                  Repeating
                </p>
                <button className="px-3 py-1.5 bg-[#F6F7F9] text-[#0A2540] text-xs font-semibold font-manrope rounded-[8px] hover:text-[#635BFF] transition-colors cursor-pointer">
                  Set as Repeating
                </button>
              </div>
            </div>
          </div>

          {/* Appointment Activity */}
          <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
            <h2 className="text-[18px] font-bold font-manrope text-[#29343D] mb-7">
              Appointment Activity
            </h2>
            <div className="relative">
              <div
                className="absolute top-[7px] bottom-[7px] w-px bg-[#E0E6EB]"
                style={{ left: "139px" }}
              />
              <div className="space-y-8">
                {activities.map((act, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-[112px] flex-shrink-0">
                      <p className="text-[13px] font-bold font-manrope text-[#29343D] leading-tight">
                        {act.date}
                      </p>
                      <p className="text-[11px] font-manrope text-[#98A4AE] mt-0.5">
                        {act.time}
                      </p>
                    </div>
                    <div className="flex-shrink-0 relative z-10 px-5">
                      <div
                        className={`w-[14px] h-[14px] rounded-full border-2 bg-white mt-[1px] ${act.dot}`}
                      />
                    </div>
                    <p className="text-[14px] font-semibold font-manrope text-[#29343D] leading-tight mt-[1px]">
                      {act.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div
          ref={noteRef}
          className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]"
        >
          <h2 className="text-[18px] font-bold font-manrope text-[#29343D] mb-4">
            Note
          </h2>
          <textarea
            ref={textareaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full text-sm font-manrope text-[#29343D] font-semibold leading-relaxed border border-[#E0E6EB] rounded-[8px] p-[30px] focus:outline-none focus:border-[#635BFF] transition-colors resize-y min-h-[140px]"
            placeholder="Add a note..."
          />
          <div className="flex justify-end mt-3">
            <button className="px-4 py-2 border border-[#635BFF] text-[#635BFF] text-sm font-semibold font-manrope rounded-[8px] hover:bg-[#EEEEFF] transition-colors cursor-pointer">
              Save
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-[14px] border border-[#EFF4FA] p-[30px]">
          <h2 className="text-[18px] font-bold font-manrope text-[#29343D] mb-5">
            Services
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[540px]">
              <thead>
                <tr className="border-b border-[#EFF4FA]">
                  {[
                    "Service",
                    "Date",
                    "Price",
                    "Start Time",
                    "Duration",
                    "Employee",
                  ].map((h, i) => (
                    <th
                      key={i}
                      className="pb-4 text-left text-sm font-manrope text-[#29343D] whitespace-nowrap pr-6 last:pr-0"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-5 text-sm font-semibold font-manrope text-[#29343D] pr-6">
                    Haircut
                  </td>
                  <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6 whitespace-nowrap">
                    02/08/2025
                  </td>
                  <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6">
                    € 170
                  </td>
                  <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6">
                    11:00
                  </td>
                  <td className="py-5 text-sm font-manrope text-[#526B7A] pr-6 whitespace-nowrap">
                    15 min
                  </td>
                  {/* ── Static employee display — no dropdown ── */}
                  <td className="py-2">
                    <div className="flex items-center gap-2 bg-[#F4F6FA] rounded-[10px] px-3 py-2 w-fit">
                      <Image
                        src="/images/avator.png"
                        alt="Maria Rodriguez"
                        width={48}
                        height={48}
                        className="rounded-[8px] object-cover flex-shrink-0"
                      />
                      <span className="flex items-center gap-6 text-sm font-semibold font-manrope text-[#29343D] whitespace-nowrap">
                        Maria Rodriguez
                        <ChevronDown strokeWidth={1.5} color="#29343D" />
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="mt-2 border border-[#E0E6EB] rounded-[12px] px-5 py-5 flex items-center justify-between">
            <p className="text-sm font-semibold font-manrope text-[#29343D]">
              Total
            </p>
            <p className="text-[18px] font-bold font-manrope text-[#29343D]">
              € 340
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between mt-6">
            <button className="px-5 py-2.5 border border-[#E0E6EB] bg-white text-sm font-semibold font-manrope text-[#526B7A] rounded-[8px] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
              Back
            </button>
            <div className="flex items-center gap-3">
              <EllipsisDropdown onAddNote={handleAddNote} />
              <Link href="/salon-owner/appointment/checkout">
                <button className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer">
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
