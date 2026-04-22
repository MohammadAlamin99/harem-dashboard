"use client";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useState } from "react";
import Image from "next/image";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";
import NewAppointmentModal from "./NewAppointmentModal";

export default function DayView({
  date,
  selectedMemberIds,
  teamMembers,
  allAppointments,
  isSameDay,
  HOURS,
  HOUR_HEIGHT,
  formatHour,
  timeToMinutes,
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
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  statusBadgeColor: Record<AppStatus, string>;
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
    memberId: string;
  } | null>(null);
  const [draggedAppt, setDraggedAppt] = useState<CalAppointment | null>(null);

  // ── FIX #2 & #3: Ghost drop preview + precision ──
  const [dropPreview, setDropPreview] = useState<{
    memberId: string;
    startMin: number;
    endMin: number;
  } | null>(null);
  // Store where inside the pill the user grabbed (offset from top of pill)
  const dragGrabOffsetRef = useRef<number>(0);

  const [selectionPreview, setSelectionPreview] = useState<{
    startMin: number;
    endMin: number;
    memberId: string;
    hourIndex: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeSelectionRef = useRef<{
    startMin: number;
    endMin: number;
    memberId: string;
  } | null>(null);
  const isDraggingRef = useRef(false);

  const slotsPerHour = 60 / slotDuration;
  const slotPxHeight = HOUR_HEIGHT / slotsPerHour;

  const visibleMembers = teamMembers.filter((m) =>
    selectedMemberIds.includes(m.id),
  );
  const dayAppts = allAppointments.filter((a) => isSameDay(a.date, date));

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

  const handleTimeSlotMouseDown = (
    e: React.MouseEvent,
    memberId: string,
    baseMinutes: number,
  ) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('[draggable="true"]')) return;
    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setPreview(null);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const selectedMin =
      baseMinutes + Math.floor(offsetY / slotPxHeight) * slotDuration;

    timeSelectionRef.current = {
      startMin: selectedMin,
      endMin: selectedMin + slotDuration,
      memberId,
    };
  };

  const handleTimeSlotMouseMove = (
    e: React.MouseEvent,
    memberId: string,
    baseMinutes: number,
    hourIndex: number,
  ) => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    if (timeSelectionRef.current.memberId !== memberId) return;
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const currentMin =
      baseMinutes + Math.floor(offsetY / slotPxHeight) * slotDuration;

    if (currentMin >= timeSelectionRef.current.startMin) {
      timeSelectionRef.current.endMin = currentMin + slotDuration;
      setSelectionPreview({
        startMin: timeSelectionRef.current.startMin,
        endMin: timeSelectionRef.current.endMin,
        memberId,
        hourIndex,
      });
    }
  };

  const handleTimeSlotMouseUp = () => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    isDraggingRef.current = false;
    const { startMin, endMin, memberId } = timeSelectionRef.current;
    setSelectedSlot({
      startTime: minutesToTime(startMin),
      endTime: minutesToTime(endMin),
      memberId,
    });
    setSelectionPreview(null);
    timeSelectionRef.current = null;
  };

  // ── FIX #3: Record grab offset when drag starts ──
  const handlePillDragStart = (appt: CalAppointment, e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedAppt(appt);
    e.dataTransfer.effectAllowed = "move";

    // Calculate where inside the pill the user grabbed
    const pillRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragGrabOffsetRef.current = e.clientY - pillRect.top;
  };

  const handlePillDragEnd = () => {
    setDraggedAppt(null);
    setDropPreview(null);
  };

  // ── FIX #2: Show ghost preview on drag over ──
  const handleTimeSlotDragOver = (
    e: React.DragEvent,
    memberId: string,
    baseMinutes: number,
  ) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!draggedAppt) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top - dragGrabOffsetRef.current;
    const rawMin = baseMinutes + (offsetY / HOUR_HEIGHT) * 60;
    const snappedMin = Math.round(rawMin / slotDuration) * slotDuration;
    const duration =
      timeToMinutes(draggedAppt.endTime) - timeToMinutes(draggedAppt.startTime);

    setDropPreview({
      memberId,
      startMin: snappedMin,
      endMin: snappedMin + duration,
    });
  };

  // ── FIX #3: Use grab offset for precise drop position ──
  const handleTimeSlotDrop = (
    e: React.DragEvent,
    memberId: string,
    baseMinutes: number,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedAppt) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    // Subtract grab offset so pill lands where it visually appears
    const offsetY = e.clientY - rect.top - dragGrabOffsetRef.current;
    const rawMin = baseMinutes + (offsetY / HOUR_HEIGHT) * 60;
    const snappedMin = Math.round(rawMin / slotDuration) * slotDuration;
    const duration =
      timeToMinutes(draggedAppt.endTime) - timeToMinutes(draggedAppt.startTime);

    const updatedAppt: CalAppointment = {
      ...draggedAppt,
      startTime: minutesToTime(snappedMin),
      endTime: minutesToTime(snappedMin + duration),
      employeeId: memberId,
      employeeName:
        teamMembers.find((m) => m.id === memberId)?.name ||
        draggedAppt.employeeName,
    };

    onAppointmentUpdate?.(updatedAppt);
    setDraggedAppt(null);
    setDropPreview(null);
  };

  // ── FIX #1: Resize end handler ──
  const handleResizeEnd = (appt: CalAppointment, newEndTime: string) => {
    const updatedAppt: CalAppointment = {
      ...appt,
      endTime: newEndTime,
    };
    onAppointmentUpdate?.(updatedAppt);
  };

  const handleCreateAppointment = (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">,
  ) => {
    if (!selectedSlot) return;
    const newAppt: CalAppointment = {
      id: `appt-${Date.now()}`,
      ...data,
      date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    };
    onAppointmentCreate?.(newAppt);
    setSelectedSlot(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setPreview(null);
          setSelectedSlot(null);
        }
      }}
      onMouseUp={handleTimeSlotMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="border border-[#E0E6EB] mx-[15px] md:mx-[30px] rounded-xl">
        {/* Member header row */}
        <div className="flex border-b border-[#E0E6EB] bg-[#F3F3FF] sticky top-0 z-20 rounded-[12px_12px_0px_0px]">
          <div className="w-[72px] border-r border-[#E0E6EB]" />
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
        <div ref={scrollRef} className="overflow-y-auto flex-1">
          <div className="flex min-w-[1000px]">
            {/* Time labels */}
            <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="relative border-b border-[#E0E6EB]"
                  style={{ height: HOUR_HEIGHT }}
                >
                  <span className="absolute top-0 left-2 text-[10px] font-manrope text-[#98A4AE] px-2 whitespace-nowrap">
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
                  className="flex-1 min-w-[120px] border-r border-[#E0E6EB] last:border-r-0"
                >
                  {HOURS.map((h) => {
                    const baseMinutes = h * 60;
                    const hourIndex = HOURS.indexOf(h);

                    const hourAppts = memberAppts.filter((a) => {
                      const startMin = timeToMinutes(a.startTime);
                      return (
                        startMin >= baseMinutes && startMin < baseMinutes + 60
                      );
                    });

                    const isSelectingInThisSlot =
                      selectionPreview?.memberId === member.id &&
                      selectionPreview?.startMin >= baseMinutes &&
                      selectionPreview?.startMin < baseMinutes + 60;

                    // ── FIX #2: Is drop preview in this cell? ──
                    const isDropPreviewHere =
                      dropPreview?.memberId === member.id &&
                      dropPreview.startMin >= baseMinutes &&
                      dropPreview.startMin < baseMinutes + 60;

                    return (
                      <div
                        key={h}
                        className="relative border-b border-[#E0E6EB] cursor-cell select-none group"
                        style={{ height: HOUR_HEIGHT }}
                        onMouseDown={(e) =>
                          handleTimeSlotMouseDown(e, member.id, baseMinutes)
                        }
                        onMouseMove={(e) =>
                          handleTimeSlotMouseMove(
                            e,
                            member.id,
                            baseMinutes,
                            hourIndex,
                          )
                        }
                        onDragOver={(e) =>
                          handleTimeSlotDragOver(e, member.id, baseMinutes)
                        }
                        onDrop={(e) =>
                          handleTimeSlotDrop(e, member.id, baseMinutes)
                        }
                      >
                        {/* Dynamic grid lines */}
                        <div className="absolute inset-0 flex flex-col pointer-events-none">
                          {Array.from({ length: slotsPerHour }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 border-b border-[#E0E6EB]/60 last:border-b-0"
                            />
                          ))}
                        </div>

                        {/* ── FIX #2: Drop ghost preview ── */}
                        {isDropPreviewHere && dropPreview && draggedAppt && (
                          <div className="absolute inset-0 pointer-events-none z-10">
                            <div
                              className="absolute left-0.5 right-0.5 border-2 border-dashed border-[#635BFF] bg-[#635BFF]/10 rounded-[0px_8px_8px_0px]"
                              style={{
                                top: `${((dropPreview.startMin - baseMinutes) / 60) * HOUR_HEIGHT}px`,
                                height: `${Math.max(
                                  28,
                                  ((dropPreview.endMin - dropPreview.startMin) / 60) * HOUR_HEIGHT
                                )}px`,
                              }}
                            >
                              <div className="flex flex-col justify-center h-full px-2 py-1">
                                <p className="font-manrope font-semibold truncate text-[11px] text-[#635BFF]">
                                  {draggedAppt.service}
                                </p>
                                <p className="font-manrope text-[10px] text-[#635BFF] opacity-75">
                                  {minutesToTime(dropPreview.startMin)} – {minutesToTime(dropPreview.endMin)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── FIX #4: Selection preview with start/end times ── */}
                        {isSelectingInThisSlot && selectionPreview && (
                          <div className="absolute inset-0 pointer-events-none z-10">
                            <div
                              className="absolute left-0 right-0 bg-[#635BFF] opacity-15 border-2 border-[#635BFF]"
                              style={{
                                top: `${(
                                  ((selectionPreview.startMin - baseMinutes) /
                                    60) *
                                  HOUR_HEIGHT
                                ).toFixed(2)}px`,
                                height: `${(
                                  ((selectionPreview.endMin -
                                    selectionPreview.startMin) /
                                    60) *
                                  HOUR_HEIGHT
                                ).toFixed(2)}px`,
                              }}
                            />
                            {/* Start time label at top */}
                            <div
                              className="absolute left-1 right-1 flex items-center justify-start pointer-events-none"
                              style={{
                                top: `${(
                                  ((selectionPreview.startMin - baseMinutes) / 60) * HOUR_HEIGHT + 2
                                ).toFixed(2)}px`,
                              }}
                            >
                              <span className="text-[10px] font-bold font-manrope text-[#635BFF] bg-white bg-opacity-90 rounded px-1 leading-none py-0.5">
                                {minutesToTime(selectionPreview.startMin)}
                              </span>
                            </div>
                            {/* Duration label in center */}
                            <div
                              className="absolute left-0 right-0 flex items-center justify-center text-[11px] font-semibold font-manrope text-[#635BFF] bg-white bg-opacity-90 rounded px-1"
                              style={{
                                top: `${(
                                  ((selectionPreview.startMin - baseMinutes) /
                                    60) *
                                  HOUR_HEIGHT +
                                  (((selectionPreview.endMin -
                                    selectionPreview.startMin) /
                                    60) *
                                    HOUR_HEIGHT) /
                                  2 -
                                  10
                                ).toFixed(2)}px`,
                              }}
                            >
                              {formatDuration(
                                selectionPreview.startMin,
                                selectionPreview.endMin,
                              )}
                            </div>
                            {/* End time label at bottom */}
                            <div
                              className="absolute left-1 right-1 flex items-center justify-end pointer-events-none"
                              style={{
                                top: `${(
                                  ((selectionPreview.endMin - baseMinutes) / 60) * HOUR_HEIGHT - 18
                                ).toFixed(2)}px`,
                              }}
                            >
                              <span className="text-[10px] font-bold font-manrope text-[#635BFF] bg-white bg-opacity-90 rounded px-1 leading-none py-0.5">
                                {minutesToTime(selectionPreview.endMin)}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Appointments — absolute positioned */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                          {hourAppts.map((appt) => {
                            const startMin = timeToMinutes(appt.startTime);
                            const endMin = timeToMinutes(appt.endTime);
                            const topOffset =
                              ((startMin - baseMinutes) / 60) * HOUR_HEIGHT;
                            const height = Math.max(
                              ((endMin - startMin) / 60) * HOUR_HEIGHT,
                              28,
                            );
                            // Hide the original pill while dragging to show ghost instead
                            const isDraggingThis = draggedAppt?.id === appt.id;
                            return (
                              <div
                                key={appt.id}
                                style={{
                                  position: "absolute",
                                  top: topOffset,
                                  left: 2,
                                  right: 2,
                                  height,
                                  pointerEvents: "all",
                                  opacity: isDraggingThis ? 0.35 : 1,
                                  transition: "opacity 0.15s ease",
                                }}
                                draggable
                                onDragStart={(e) =>
                                  handlePillDragStart(appt, e)
                                }
                                onDragEnd={handlePillDragEnd}
                              >
                                <AppPill
                                  appt={appt}
                                  statusColor={statusColor}
                                  onClick={handlePillClick}
                                  onResizeEnd={handleResizeEnd}
                                  slotDuration={slotDuration}
                                  slotPxHeight={slotPxHeight}
                                  baseMinutes={baseMinutes}
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
      </div>

      {/* Preview card */}
      {preview && (
        <PreviewCard
          appt={preview.appt}
          onClose={() => setPreview(null)}
          statusBadgeColor={statusBadgeColor}
          style={{
            top: Math.min(preview.y, 300),
            left: Math.min(preview.x, 400),
          }}
        />
      )}

      {/* New Appointment Modal */}
      {selectedSlot && (
        <NewAppointmentModal
          memberId={selectedSlot.memberId}
          startTime={selectedSlot.startTime}
          endTime={selectedSlot.endTime}
          date={date}
          teamMembers={teamMembers}
          onClose={() => setSelectedSlot(null)}
          onConfirm={handleCreateAppointment}
        />
      )}
    </div>
  );
}