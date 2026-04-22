"use client";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useState } from "react";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";
import NewAppointmentModal from "./NewAppointmentModal";

export default function WeekView({
  date,
  selectedMemberIds,
  teamMembers,
  allAppointments,
  isSameDay,
  HOURS,
  HOUR_HEIGHT,
  formatHour,
  timeToMinutes,
  WEEK_DAYS,
  getWeekStart,
  statusColor,
  statusBadgeColor,
  onAppointmentCreate,
  onAppointmentUpdate,
  slotDuration,
}: {
  date: Date;
  selectedMemberIds: string[];
  teamMembers: { id: string; name: string; avatar: string }[];
  allAppointments: CalAppointment[];
  isSameDay: (a: Date, b: Date) => boolean;
  HOURS: number[];
  HOUR_HEIGHT: number;
  formatHour: (hour: number) => string;
  timeToMinutes: (time: string) => number;
  WEEK_DAYS: string[];
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  statusBadgeColor: Record<AppStatus, string>;
  getWeekStart: (date: Date) => Date;
  onAppointmentCreate?: (appt: CalAppointment) => void;
  onAppointmentUpdate?: (appt: CalAppointment) => void;
  slotDuration: number;
}) {
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    startTime: string;
    endTime: string;
    date: Date;
  } | null>(null);

  // Drag and Drop States
  const [draggedAppt, setDraggedAppt] = useState<CalAppointment | null>(null);
  const [dropPreview, setDropPreview] = useState<{
    dayIndex: number;
    startMin: number;
    endMin: number;
  } | null>(null);
  const dragGrabOffsetRef = useRef<number>(0);

  // Selection States
  const [selectionPreview, setSelectionPreview] = useState<{
    startMin: number;
    endMin: number;
    dayIndex: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeSelectionRef = useRef<{
    startMin: number;
    endMin: number;
    dayIndex: number;
  } | null>(null);
  const isDraggingRef = useRef(false);

  const slotsPerHour = 60 / slotDuration;
  const slotPxHeight = HOUR_HEIGHT / slotsPerHour;

  const weekStart = getWeekStart(date);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  const memberAppts = allAppointments.filter((a) =>
    selectedMemberIds.includes(a.employeeId),
  );

  const minutesToTime = (mins: number): string => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const formatDuration = (startMin: number, endMin: number): string => {
    const duration = endMin - startMin;
    if (duration <= 0) return "0 min";
    if (duration < 60) return `${duration} min`;
    const hours = Math.floor(duration / 60);
    const mins = duration % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

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

  const handleResizeEnd = (appt: CalAppointment, newEndTime: string) => {
    onAppointmentUpdate?.({ ...appt, endTime: newEndTime });
  };

  const handleTimeSlotMouseDown = (e: React.MouseEvent, dayIndex: number, baseMinutes: number) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('[draggable="true"]')) return;
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setPreview(null);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const selectedMin = baseMinutes + Math.floor(offsetY / slotPxHeight) * slotDuration;

    timeSelectionRef.current = { startMin: selectedMin, endMin: selectedMin + slotDuration, dayIndex };
  };

  const handleTimeSlotMouseMove = (e: React.MouseEvent, dayIndex: number, baseMinutes: number) => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    if (timeSelectionRef.current.dayIndex !== dayIndex) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const currentMin = baseMinutes + Math.floor(offsetY / slotPxHeight) * slotDuration;

    if (currentMin >= timeSelectionRef.current.startMin) {
      timeSelectionRef.current.endMin = currentMin + slotDuration;
      setSelectionPreview({
        startMin: timeSelectionRef.current.startMin,
        endMin: timeSelectionRef.current.endMin,
        dayIndex,
      });
    }
  };

  const handleTimeSlotMouseUp = () => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    const { startMin, endMin, dayIndex } = timeSelectionRef.current;
    setSelectedSlot({
      startTime: minutesToTime(startMin),
      endTime: minutesToTime(endMin),
      date: days[dayIndex],
    });
    isDraggingRef.current = false;
    setSelectionPreview(null);
    timeSelectionRef.current = null;
  };

  const handlePillDragStart = (appt: CalAppointment, e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedAppt(appt);
    e.dataTransfer.effectAllowed = "move";
    const pillRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragGrabOffsetRef.current = e.clientY - pillRect.top;
  };

  const handleTimeSlotDragOver = (e: React.DragEvent, dayIndex: number, baseMinutes: number) => {
    e.preventDefault();
    if (!draggedAppt) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Precision offset subtraction
    const offsetY = e.clientY - rect.top - dragGrabOffsetRef.current;
    const rawMin = baseMinutes + (offsetY / HOUR_HEIGHT) * 60;
    const snappedMin = Math.round(rawMin / slotDuration) * slotDuration;
    const duration = timeToMinutes(draggedAppt.endTime) - timeToMinutes(draggedAppt.startTime);

    setDropPreview({
      dayIndex,
      startMin: snappedMin,
      endMin: snappedMin + duration,
    });
  };

  const handleTimeSlotDrop = (e: React.DragEvent, dayIndex: number, baseMinutes: number) => {
    e.preventDefault();
    if (!draggedAppt || !dropPreview) return;

    onAppointmentUpdate?.({
      ...draggedAppt,
      date: days[dayIndex],
      startTime: minutesToTime(dropPreview.startMin),
      endTime: minutesToTime(dropPreview.endMin),
    });

    setDraggedAppt(null);
    setDropPreview(null);
  };

  const handleCreateAppointment = (data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">) => {
    if (!selectedSlot) return;
    onAppointmentCreate?.({
      id: `appt-${Date.now()}`,
      ...data,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });
    setSelectedSlot(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        <div
          ref={containerRef}
          className="relative flex flex-col overflow-hidden md:m-[30px] m-[15px] border border-[#E0E6EB] rounded-xl"
          onClick={() => setPreview(null)}
          onMouseUp={handleTimeSlotMouseUp}
        >
          {/* Day header */}
          <div className="flex border-b border-[#E0E6EB] bg-[#F3F3FF] sticky top-0 z-20">
            <div className="w-[72px] border-r border-[#E0E6EB]" />
            {days.map((d, i) => (
              <div key={i} className="flex-1 min-w-[80px] flex flex-col items-center py-3 border-r border-[#E0E6EB] last:border-r-0">
                <p className="text-xs font-manrope font-semibold text-[#29343D]">
                  {WEEK_DAYS[d.getDay()]} {String(d.getDate()).padStart(2, "0")}
                </p>
              </div>
            ))}
          </div>

          <div ref={scrollRef} className="flex-1">
            <div className="flex">
              {/* Time labels */}
              <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]">
                {HOURS.map((h) => (
                  <div key={h} className="relative border-b border-[#E0E6EB]" style={{ height: HOUR_HEIGHT }}>
                    <span className="absolute top-1 left-2 text-[10px] font-manrope text-[#98A4AE]">{formatHour(h)}</span>
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {days.map((d, di) => {
                const dayAppts = memberAppts.filter((a) => isSameDay(a.date, d));

                return (
                  <div key={di} className="flex-1 min-w-[80px] relative border-r border-[#E0E6EB] last:border-r-0">
                    {HOURS.map((h) => {
                      const baseMinutes = h * 60;
                      const isSelectingHere = selectionPreview?.dayIndex === di && selectionPreview.startMin >= baseMinutes && selectionPreview.startMin < baseMinutes + 60;
                      const isDropPreviewHere = dropPreview?.dayIndex === di && dropPreview.startMin >= baseMinutes && dropPreview.startMin < baseMinutes + 60;

                      return (
                        <div
                          key={h}
                          className="relative border-b border-[#E0E6EB] cursor-cell select-none"
                          style={{ height: HOUR_HEIGHT }}
                          onMouseDown={(e) => handleTimeSlotMouseDown(e, di, baseMinutes)}
                          onMouseMove={(e) => handleTimeSlotMouseMove(e, di, baseMinutes)}
                          onDragOver={(e) => handleTimeSlotDragOver(e, di, baseMinutes)}
                          onDrop={(e) => handleTimeSlotDrop(e, di, baseMinutes)}
                        >
                          <div className="absolute inset-0 flex flex-col pointer-events-none">
                            {Array.from({ length: slotsPerHour }).map((_, i) => (
                              <div key={i} className="flex-1 border-b border-[#E0E6EB]/60 last:border-b-0" />
                            ))}
                          </div>

                          {/* --- Ghost Drop Preview --- */}
                          {isDropPreviewHere && dropPreview && draggedAppt && (
                            <div className="absolute inset-0 pointer-events-none z-30">
                              <div
                                className="absolute left-0.5 right-0.5 border-2 border-dashed border-[#635BFF] bg-[#635BFF]/10 rounded-md shadow-sm"
                                style={{
                                  top: `${((dropPreview.startMin - baseMinutes) / 60) * HOUR_HEIGHT}px`,
                                  height: `${Math.max(28, ((dropPreview.endMin - dropPreview.startMin) / 60) * HOUR_HEIGHT)}px`,
                                }}
                              >
                                <div className="p-1">
                                  <p className="text-[10px] font-bold text-[#635BFF] truncate">{draggedAppt.service}</p>
                                  <p className="text-[9px] text-[#635BFF] opacity-70">
                                    {minutesToTime(dropPreview.startMin)} - {minutesToTime(dropPreview.endMin)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* --- Selection Preview (with Dynamic Start & End Times) --- */}
                          {isSelectingHere && selectionPreview && (
                            <div className="absolute inset-0 pointer-events-none z-20">
                              <div
                                className="absolute left-0 right-0 bg-[#635BFF] opacity-15 border-2 border-[#635BFF]"
                                style={{
                                  top: `${(((selectionPreview.startMin - baseMinutes) / 60) * HOUR_HEIGHT).toFixed(2)}px`,
                                  height: `${(((selectionPreview.endMin - selectionPreview.startMin) / 60) * HOUR_HEIGHT).toFixed(2)}px`,
                                }}
                              />
                              {/* Dynamic Start Time (Top) */}
                              <div className="absolute left-1" style={{ top: `${(((selectionPreview.startMin - baseMinutes) / 60) * HOUR_HEIGHT) + 2}px` }}>
                                <span className="text-[9px] font-bold text-white bg-[#635BFF] px-1 rounded">
                                  {minutesToTime(selectionPreview.startMin)}
                                </span>
                              </div>
                              {/* Duration (Center) */}
                              <div className="absolute inset-x-0 flex justify-center items-center pointer-events-none" style={{ top: `${(((selectionPreview.startMin - baseMinutes) / 60) * HOUR_HEIGHT)}px`, height: `${(((selectionPreview.endMin - selectionPreview.startMin) / 60) * HOUR_HEIGHT)}px` }}>
                                <span className="text-[10px] font-bold text-[#635BFF] bg-white border border-[#635BFF] px-1 rounded shadow-sm">
                                  {formatDuration(selectionPreview.startMin, selectionPreview.endMin)}
                                </span>
                              </div>
                              {/* Dynamic End Time (Bottom) */}
                              <div className="absolute left-1" style={{ top: `${(((selectionPreview.endMin - baseMinutes) / 60) * HOUR_HEIGHT) - 14}px` }}>
                                <span className="text-[9px] font-bold text-white bg-[#635BFF] px-1 rounded">
                                  {minutesToTime(selectionPreview.endMin)}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* --- Appointments --- */}
                          <div className="absolute inset-0 z-10 pointer-events-none">
                            {dayAppts.filter(a => timeToMinutes(a.startTime) >= baseMinutes && timeToMinutes(a.startTime) < baseMinutes + 60).map((appt) => {
                              const startMin = timeToMinutes(appt.startTime);
                              const endMin = timeToMinutes(appt.endTime);
                              const isDraggingThis = draggedAppt?.id === appt.id;

                              return (
                                <div
                                  key={appt.id}
                                  style={{
                                    position: "absolute",
                                    top: ((startMin - baseMinutes) / 60) * HOUR_HEIGHT,
                                    left: 1,
                                    right: 1,
                                    height: Math.max(((endMin - startMin) / 60) * HOUR_HEIGHT, 24),
                                    pointerEvents: "all",
                                    opacity: isDraggingThis ? 0.4 : 1,
                                  }}
                                  draggable
                                  onDragStart={(e) => handlePillDragStart(appt, e)}
                                  onDragEnd={() => { setDraggedAppt(null); setDropPreview(null); }}
                                >
                                  <AppPill
                                    appt={appt}
                                    statusColor={statusColor}
                                    onClick={handlePillClick}
                                    onResizeEnd={handleResizeEnd}
                                    slotDuration={slotDuration}
                                    slotPxHeight={slotPxHeight}
                                    HOUR_HEIGHT={HOUR_HEIGHT}
                                  />
                                </div>
                              );
                            })}
                          </div>
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
              statusBadgeColor={statusBadgeColor}
              style={{ top: Math.min(preview.y, 300), left: Math.min(preview.x, 600) }}
            />
          )}
        </div>
      </div>

      {selectedSlot && (
        <NewAppointmentModal
          memberId={selectedMemberIds[0]}
          startTime={selectedSlot.startTime}
          endTime={selectedSlot.endTime}
          date={selectedSlot.date}
          teamMembers={teamMembers}
          onClose={() => setSelectedSlot(null)}
          onConfirm={handleCreateAppointment}
        />
      )}
    </div>
  );
}