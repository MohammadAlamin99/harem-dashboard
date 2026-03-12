"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Plus, ChevronLeft, ChevronRight, X } from "lucide-react";
import RescheduleCalanderHead from "./RescheduleCalanderHead";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Service {
  id: string;
  name: string;
  duration: string;
}

interface StaffMember {
  id: string;
  name: string;
  avatar: string;
}

interface ScheduledAppointment {
  staffId: string;
  serviceId: string;
  startSlot: number;
  duration: number;
}

type CalendarView = "Month" | "Week" | "Day";

// ─── Static data ─────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  { id: "s1", name: "Haircut", duration: "40 min" },
  { id: "s2", name: "Makeup", duration: "40 min" },
  { id: "s3", name: "Haircut", duration: "40 min" },
];

const STAFF: StaffMember[] = [
  { id: "m1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "m2", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "m3", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "m4", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "m5", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "m6", name: "Maria Rodriguez", avatar: "/images/avator.png" },
];

// ─── Time slots (96 × 15min = 24h) ──────────────────────────────────────────

interface Slot {
  label: string;
  isHour: boolean;
}

function buildSlots(): Slot[] {
  const out: Slot[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      const isHour = m === 0;
      const period = h < 12 ? "AM" : "PM";
      const display = h === 0 ? 12 : h <= 12 ? h : h - 12;
      out.push({ label: isHour ? `${display}:00 ${period}` : "", isHour });
    }
  }
  return out;
}

const SLOTS = buildSlots();
const ROW_H = 40; // px per 15-min slot
const TIME_W = 80; // px for time gutter
const MIN_COL = 110; // minimum column width before scroll kicks in

// ─── Main component ───────────────────────────────────────────────────────────

export default function RescheduleAppointmentContent() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2025, 8, 2));
  const [activePeriod, setActivePeriod] = useState<CalendarView>("Day");
  const [appointments, setAppointments] = useState<ScheduledAppointment[]>([]);
  const [dragging, setDragging] = useState<Service | null>(null);
  const [hoverCell, setHoverCell] = useState<{
    sid: string;
    idx: number;
  } | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<string>("m1");
  const [colW, setColW] = useState<number>(MIN_COL);

  const headRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // right panel — used to measure width

  // ── Dynamic column width: fills full container, min MIN_COL ───────────────
  useEffect(() => {
    function recalc() {
      if (!containerRef.current) return;
      const avail = containerRef.current.offsetWidth - TIME_W;
      setColW(Math.max(Math.floor(avail / STAFF.length), MIN_COL));
    }
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const totalW = colW * STAFF.length;

  // ── Arrow scroll — moves body AND immediately syncs header ────────────────
  function slide(dir: "l" | "r") {
    const body = bodyRef.current;
    const head = headRef.current;
    if (!body) return;
    body.scrollLeft += dir === "l" ? -(colW * 2) : colW * 2;
    if (head) head.scrollLeft = body.scrollLeft;
  }

  // ── Body scroll event — keep header in sync while user drags scrollbar ───
  const onBodyScroll = useCallback(() => {
    if (headRef.current && bodyRef.current)
      headRef.current.scrollLeft = bodyRef.current.scrollLeft;
  }, []);

  // ── Date helpers ──────────────────────────────────────────────────────────
  function fmt(d: Date) {
    return d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "2-digit",
    });
  }
  function prev() {
    setCurrentDate(
      (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1),
    );
  }
  function next() {
    setCurrentDate(
      (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1),
    );
  }

  // ── Drag & drop ───────────────────────────────────────────────────────────
  function onDragStart(e: React.DragEvent, svc: Service) {
    setDragging(svc);
    e.dataTransfer.effectAllowed = "copy";
  }
  function onDragEnd() {
    setDragging(null);
    setHoverCell(null);
  }
  function onOver(e: React.DragEvent, sid: string, idx: number) {
    e.preventDefault();
    setHoverCell({ sid, idx });
  }
  function onDrop(e: React.DragEvent, sid: string, idx: number) {
    e.preventDefault();
    if (!dragging) return;
    const dur = Math.ceil(parseInt(dragging.duration) / 15);
    setAppointments((p) => [
      ...p,
      { staffId: sid, serviceId: dragging.id, startSlot: idx, duration: dur },
    ]);
    setDragging(null);
    setHoverCell(null);
  }
  function removeAppt(i: number) {
    setAppointments((p) => p.filter((_, j) => j !== i));
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="h-full font-manrope flex flex-col gap-5">
      {/* ── Top bar ── */}
      <div className="shrink-0 bg-white rounded-2xl border border-[#EEF2F8] px-7 py-[18px] flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-lg font-bold font-manrope text-[#29343D]">
          Reschedule Appointment
        </h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold font-manrope rounded-[10px] transition-colors cursor-pointer">
          <Plus size={16} strokeWidth={2.5} /> Add Appointment
        </button>
      </div>

      {/* ── Calendar card ── */}
      <div className="flex-1 min-h-0 bg-white rounded-2xl border border-[#EEF2F8] flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="shrink-0">
          <RescheduleCalanderHead
            prevDay={prev}
            activePeriod={activePeriod}
            formatDate={fmt}
            nextDay={next}
            currentDate={currentDate}
            setActivePeriod={setActivePeriod}
          />
        </div>

        {/* ── Two-column body ── */}
        <div className="flex flex-1 min-h-0 flex-col md:flex-row overflow-hidden m-7 border border-[#E0E6EB] rounded-xl">
          {/* ── LEFT: services panel ── */}
          <div className="shrink-0 border-r min-h-0 w-[222px] border-[#EEF2F8] flex flex-col">
            <div className="shrink-0 border-r border-b border-[#E0E6EB] px-5 flex flex-col justify-center bg-[#F3F3FF] h-[88px]">
              <p className="text-base font-semibold font-manrope text-[#29343D]">
                Available Services
              </p>
              <p className="text-sm font-manrope text-[#98A4AE] mt-1">
                Drag services to schedule appointemnts
              </p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, s)}
                  onDragEnd={onDragEnd}
                  className="flex items-center justify-between px-2.5 py-[5px] select-none cursor-grab active:cursor-grabbing hover:brightness-95 transition-all"
                  style={{
                    background: "#DDDBFF",
                    borderLeft: "3px solid #635BFF",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  <div>
                    <p className="text-sm font-medium font-manrope text-[#635BFF] leading-6">
                      {s.name}
                    </p>
                    <p className="text-[12px] font-normal font-manrope text-[#635BFF] leading-4">
                      {s.duration}
                    </p>
                  </div>
                  <button className="text-[#635BFF] text-[18px] leading-none cursor-pointer ml-2">
                    <X size={16} color="#635BFF" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: staff header + grid ── */}
          <div
            ref={containerRef}
            className="flex-1 min-w-0 flex flex-col overflow-hidden"
          >
            {/* Staff header row */}
            <div className="shrink-0 bg-[#F3F3FF] relative h-[88px]">
              {/* Left arrow */}
              <button
                onClick={() => slide("l")}
                className="absolute z-30 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#DDE3EC] shadow-sm hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                style={{ left: TIME_W - 14 }}
              >
                <ChevronLeft
                  size={14}
                  strokeWidth={2}
                  className="text-[#7A8FA6]"
                />
              </button>

              {/* Header: overflow-x hidden, synced via ref */}
              <div
                ref={headRef}
                style={{
                  position: "absolute",
                  left: TIME_W,
                  right: 36,
                  top: 0,
                  bottom: 0,
                  overflowX: "hidden",
                }}
              >
                <div
                  className="flex h-full border-l border-[#E0E6EB]"
                  style={{ width: totalW }}
                >
                  {STAFF.map((staff) => (
                    <div
                      key={staff.id}
                      onClick={() => setSelectedStaff(staff.id)}
                      className="shrink-0 flex flex-col items-center justify-center gap-[6px] border-r border-[#E0E6EB] last:border-r-0 cursor-pointer hover:bg-[#FAFAFE] transition-colors"
                      style={{ width: colW }}
                    >
                      <div
                        className="relative overflow-hidden shrink-0"
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 14,
                          outline:
                            selectedStaff === staff.id
                              ? "2px dashed #635BFF"
                              : "2px solid transparent",
                          outlineOffset: "2px",
                        }}
                      >
                        <Image
                          src={staff.avatar}
                          alt={staff.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold font-manrope text-[#29343D] text-center w-full px-1 truncate">
                        {staff.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right arrow */}
              <button
                onClick={() => slide("r")}
                className="absolute z-30 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[#DDE3EC] shadow-sm hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                style={{ right: 6 }}
              >
                <ChevronRight
                  size={14}
                  strokeWidth={2}
                  className="text-[#7A8FA6]"
                />
              </button>
            </div>

            {/* ── Grid ── */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-auto"
              onScroll={onBodyScroll}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#D1D9E8 transparent",
              }}
            >
              <div
                className="relative"
                style={{ width: TIME_W + totalW, height: SLOTS.length * ROW_H }}
              >
                {SLOTS.map((slot, idx) => (
                  <div
                    key={idx}
                    className="absolute flex w-full"
                    style={{ top: idx * ROW_H, height: ROW_H }}
                  >
                    {/* Time gutter */}
                    <div
                      className={`shrink-0 relative border-r ${slot.isHour ? "border-t" : ""} border-[#E0E6EB]`}
                      style={{ width: TIME_W }}
                    >
                      {slot.isHour && (
                        <span
                          className="absolute right-3 text-[12px] font-manrope text-[#999] whitespace-nowrap leading-none"
                          style={{ top: 7 }}
                        >
                          {slot.label}
                        </span>
                      )}
                    </div>

                    {/* Staff cells */}
                    {STAFF.map((staff) => {
                      const isHover =
                        hoverCell?.sid === staff.id && hoverCell?.idx === idx;
                      return (
                        <div
                          key={staff.id}
                          className={`shrink-0 border-r border-[#EEF2F8] last:border-r-0 transition-colors
                            ${slot.isHour ? "border-t border-t-[#DDE3EC]" : "border-t border-t-[#F2F4F7]"}
                            ${isHover ? "bg-[#F0EEFF]" : "hover:bg-[#FAFAFE]"}`}
                          style={{ width: colW, height: ROW_H }}
                          onDragOver={(e) => onOver(e, staff.id, idx)}
                          onDrop={(e) => onDrop(e, staff.id, idx)}
                        />
                      );
                    })}
                  </div>
                ))}

                {/* Appointment overlays */}
                {appointments.map((appt, i) => {
                  const ci = STAFF.findIndex((s) => s.id === appt.staffId);
                  if (ci === -1) return null;
                  const svc = SERVICES.find((s) => s.id === appt.serviceId);
                  return (
                    <div
                      key={i}
                      className="absolute z-10 bg-[#ECEAFF] rounded-[7px] px-2.5 py-1.5"
                      style={{
                        top: appt.startSlot * ROW_H + 1,
                        left: TIME_W + ci * colW + 3,
                        width: colW - 6,
                        height: appt.duration * ROW_H - 2,
                        borderLeft: "3px solid #635BFF",
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold font-manrope text-[#635BFF] leading-tight">
                            {svc?.name}
                          </p>
                          <p className="text-[9px] font-manrope text-[#635BFF] opacity-70">
                            {svc?.duration}
                          </p>
                        </div>
                        <button
                          onClick={() => removeAppt(i)}
                          className="text-[#635BFF] opacity-40 hover:opacity-80 text-sm leading-none cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="shrink-0 flex justify-end p-[30px_30px] pt-[0px]">
          <button className="px-4 py-2.5 text-[#635BFF] border border-[#635BFF] font-semibold font-manrope rounded-[12px] transition-colors cursor-pointer">
            Save
          </button>
        </div>
      </div>

      {/* ── Save ── */}
    </div>
  );
}
