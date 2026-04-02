
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
  console.log("OPEN MODAL", selectedSlot);

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
    baseMinutes: number
  ) => {
    if (e.button !== 0) return;

    if ((e.target as HTMLElement).closest('[draggable="true"]')) return;

    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setPreview(null);

    const containerRect = scrollRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const selectedMin = baseMinutes + Math.floor((offsetY / HOUR_HEIGHT) * 60);

    timeSelectionRef.current = {
      startMin: selectedMin,
      endMin: selectedMin + 15,
      memberId,
    };
  };

  const handleTimeSlotMouseMove = (
    e: React.MouseEvent,
    memberId: string,
    baseMinutes: number,
    hourIndex: number
  ) => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    console.log("mouseup", isDraggingRef.current, timeSelectionRef.current);
    if (timeSelectionRef.current.memberId !== memberId) return;

    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const currentMin = Math.max(
      baseMinutes,
      baseMinutes + Math.floor((offsetY / HOUR_HEIGHT) * 60)
    );

    if (currentMin > timeSelectionRef.current.startMin) {
      timeSelectionRef.current.endMin = currentMin + 15;
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
    const startTime = minutesToTime(startMin);
    const endTime = minutesToTime(endMin);

    setSelectedSlot({
      startTime,
      endTime,
      memberId,
    });

    setSelectionPreview(null);
    timeSelectionRef.current = null;
  };

  const handlePillDragStart = (appt: CalAppointment, e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedAppt(appt);
    e.dataTransfer.effectAllowed = "move";
  };

  const handlePillDragEnd = () => {
    setDraggedAppt(null);
  };



  const handleTimeSlotDrop = (
    e: React.DragEvent,
    memberId: string,
    baseMinutes: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedAppt) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const droppedMin = baseMinutes + Math.floor((offsetY / HOUR_HEIGHT) * 60);
    const duration = timeToMinutes(draggedAppt.endTime) - timeToMinutes(draggedAppt.startTime);

    const newStart = minutesToTime(droppedMin);
    const newEnd = minutesToTime(droppedMin + duration);

    const updatedAppt: CalAppointment = {
      ...draggedAppt,
      startTime: newStart,
      endTime: newEnd,
      employeeId: memberId,
      employeeName: teamMembers.find((m) => m.id === memberId)?.name || draggedAppt.employeeName,
    };

    onAppointmentUpdate?.(updatedAppt);
    setDraggedAppt(null);
  };

  const handleCreateAppointment = (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">
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
        <div className="flex border-b border-[#E0E6EB] bg-[#F3F3FF] sticky top-0 z-10 rounded-[12px_12px_0px_0px]">
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
        <div
          ref={scrollRef}
          className="overflow-y-auto overflow-x-auto flex-1"
          style={{ maxHeight: "calc(100vh - 280px)" }}
        >
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
                    const hourAppts = memberAppts.filter((a) => {
                      const startHour = parseInt(a.startTime.split(":")[0]);
                      return startHour === h;
                    });
                    const baseMinutes = h * 60;
                    const hourIndex = HOURS.indexOf(h);
                    const isSelectingInThisSlot =
                      selectionPreview?.memberId === member.id &&
                      selectionPreview?.startMin >= baseMinutes &&
                      selectionPreview?.startMin < baseMinutes + 60;

                    return (
                      <div
                        key={h}
                        className="relative border-b border-[#E0E6EB] cursor-cell select-none group"
                        style={{ height: HOUR_HEIGHT }}
                        onMouseDown={(e) =>
                          handleTimeSlotMouseDown(e, member.id, baseMinutes)
                        }
                        onMouseMove={(e) =>
                          handleTimeSlotMouseMove(e, member.id, baseMinutes, hourIndex)
                        }
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = "move";
                        }}
                        onDrop={(e) =>
                          handleTimeSlotDrop(e, member.id, baseMinutes)
                        }
                      >
                        {/* Quarter lines */}
                        <div className="absolute inset-0 flex flex-col pointer-events-none">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 ${i < 3 ? "border-b border-[#F0F0F0]" : ""
                                }`}
                            />
                          ))}
                        </div>

                        {/* Selection preview overlay */}
                        {isSelectingInThisSlot && selectionPreview && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div
                              className="absolute left-0 right-0 bg-[#635BFF] opacity-15 border-2 border-[#635BFF]"
                              style={{
                                top: `${(
                                  ((selectionPreview.startMin - baseMinutes) / 60) *
                                  HOUR_HEIGHT
                                ).toFixed(2)}px`,
                                height: `${(
                                  ((selectionPreview.endMin - selectionPreview.startMin) / 60) *
                                  HOUR_HEIGHT
                                ).toFixed(2)}px`,
                              }}
                            />
                            <div
                              className="absolute left-0 right-0 flex items-center justify-center text-[11px] font-semibold font-manrope text-[#635BFF] bg-white bg-opacity-90 rounded px-1"
                              style={{
                                top: `${(
                                  ((selectionPreview.startMin - baseMinutes) / 60) *
                                  HOUR_HEIGHT +
                                  (((selectionPreview.endMin - selectionPreview.startMin) / 60) *
                                    HOUR_HEIGHT) /
                                  2 -
                                  10
                                ).toFixed(2)}px`,
                              }}
                            >
                              {formatDuration(
                                selectionPreview.startMin,
                                selectionPreview.endMin
                              )}
                            </div>
                          </div>
                        )}

                        {/* Appointments in this hour */}
                        <div className="relative z-10 flex flex-col">
                          {hourAppts.map((appt) => {
                            const startMin = timeToMinutes(appt.startTime);
                            const endMin = timeToMinutes(appt.endTime);
                            const height = Math.max(
                              ((endMin - startMin) / 60) * HOUR_HEIGHT,
                              20,
                            );
                            return (
                              <div
                                key={appt.id}
                                style={{ height }}
                                className="p-2"
                                draggable
                                onDragStart={(e) => handlePillDragStart(appt, e)}
                                onDragEnd={handlePillDragEnd}
                              >
                                <AppPill
                                  appt={appt}
                                  statusColor={statusColor}
                                  onClick={handlePillClick}
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

