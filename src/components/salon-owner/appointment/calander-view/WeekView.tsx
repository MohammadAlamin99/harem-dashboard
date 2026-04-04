// import {
//   AppStatus,
//   CalAppointment,
// } from "@/@types/salon-owner/CalAppointment.type";
// import { useRef, useState } from "react";
// import AppPill from "./AppPill";
// import PreviewCard from "./PreviewCard";

// export default function WeekView({
//   date,
//   selectedMemberIds,
//   teamMembers,
//   allAppointments,
//   isSameDay,
//   HOURS,
//   HOUR_HEIGHT,
//   formatHour,
//   timeToMinutes,
//   WEEK_DAYS,
//   getWeekStart,
//   statusColor,
//   statusBadgeColor,
// }: {
//   date: Date;
//   selectedMemberIds: string[];
//   teamMembers: { id: string; name: string; avatar: string }[];
//   allAppointments: CalAppointment[];
//   isSameDay: (a: Date, b: Date) => boolean;
//   HOURS: number[];
//   HOUR_HEIGHT: number;
//   formatHour: (hour: number) => string;
//   timeToMinutes: (time: string) => number;
//   WEEK_DAYS: string[];
//   statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
//   statusBadgeColor: Record<AppStatus, string>;
//   getWeekStart: (date: Date) => Date;
// }) {
//   const [preview, setPreview] = useState<{
//     appt: CalAppointment;
//     x: number;
//     y: number;
//   } | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   const weekStart = getWeekStart(date);
//   const days = Array.from({ length: 7 }, (_, i) => {
//     const d = new Date(weekStart);
//     d.setDate(d.getDate() + i);
//     return d;
//   });

//   const memberAppts = allAppointments.filter((a) =>
//     selectedMemberIds.includes(a.employeeId),
//   );

//   const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
//     e.stopPropagation();
//     const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
//     const containerRect = containerRef.current?.getBoundingClientRect();
//     if (!containerRect) return;
//     setPreview({
//       appt,
//       x: rect.left - containerRect.left + rect.width + 8,
//       y: rect.top - containerRect.top,
//     });
//   };

//   return (
//     <div className="overflow-x-auto">
//       <div className="min-w-[1000px]">
//         <div
//           ref={containerRef}
//           className="relative flex flex-col overflow-hidden md:m-[30px] m-[15px] border border-[#E0E6EB] rounded-xl"
//           onClick={() => setPreview(null)}
//         >
//           {/* Day header */}
//           <div className="flex border-b border-[#E0E6EB] bg-white sticky top-0 z-10">
//             <div className="w-[72px] border-r border-[#E0E6EB]" />
//             {days.map((d, i) => (
//               <div
//                 key={i}
//                 className="flex-1 min-w-[80px] flex flex-col items-center py-3 border-r border-[#E0E6EB] last:border-r-0"
//               >
//                 <p className="text-xs font-manrope font-medium text-[#98A4AE]">
//                   {String(d.getDate()).padStart(2, "0")} {WEEK_DAYS[d.getDay()]}
//                 </p>
//               </div>
//             ))}
//           </div>

//           {/* Time grid */}
//           <div
//             className="overflow-y-auto overflow-x-auto flex-1"
//             style={{ maxHeight: "calc(100vh - 280px)" }}
//           >
//             <div className="flex">
//               {/* Time labels */}
//               <div className="w-[72px] border-r border-[#E0E6EB]">
//                 {HOURS.map((h) => (
//                   <div
//                     key={h}
//                     className="relative border-b border-[#E0E6EB]"
//                     style={{ height: HOUR_HEIGHT }}
//                   >
//                     <span className="absolute top-0 left-2 text-[10px] font-manrope text-[#98A4AE] whitespace-nowrap">
//                       {formatHour(h)}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               {/* Day columns */}
//               {days.map((d, di) => {
//                 const dayAppts = memberAppts.filter((a) =>
//                   isSameDay(a.date, d),
//                 );
//                 return (
//                   <div
//                     key={di}
//                     className="flex-1 min-w-[80px] relative border-r border-[#E0E6EB] last:border-r-0"
//                   >
//                     {/* Hour grid lines */}
//                     {HOURS.map((h) => (
//                       <div
//                         key={h}
//                         className="border-b border-[#E0E6EB]"
//                         style={{ height: HOUR_HEIGHT }}
//                       >
//                         <div className="border-b border-dashed border-[#F0F0F0] h-1/2" />
//                       </div>
//                     ))}

//                     {/* Appointments overlay */}
//                     <div className="absolute inset-0 pointer-events-none">
//                       {dayAppts.map((appt) => {
//                         const startMin = timeToMinutes(appt.startTime);
//                         const endMin = timeToMinutes(appt.endTime);
//                         const top = (startMin / 60) * HOUR_HEIGHT;
//                         const height = Math.max(
//                           ((endMin - startMin) / 60) * HOUR_HEIGHT,
//                           18,
//                         );
//                         return (
//                           <div
//                             key={appt.id}
//                             className="absolute px-0.5 pointer-events-auto"
//                             style={{ top, height, left: 0, right: 0 }}
//                           >
//                             <AppPill
//                               appt={appt}
//                               statusColor={statusColor}
//                               onClick={handlePillClick}
//                               compact
//                             />
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {preview && (
//             <PreviewCard
//               appt={preview.appt}
//               onClose={() => setPreview(null)}
//               statusBadgeColor={statusBadgeColor}
//               style={{
//                 top: Math.min(preview.y, 300),
//                 left: Math.min(preview.x, 100),
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



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

  const [draggedAppt, setDraggedAppt] = useState<CalAppointment | null>(null);

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

  // ── Preview card on pill click ──────────────────────────────
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

  // ── Time slot drag-to-select ────────────────────────────────
  const handleTimeSlotMouseDown = (
    e: React.MouseEvent,
    dayIndex: number,
    baseMinutes: number
  ) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest('[draggable="true"]')) return;

    e.preventDefault();
    e.stopPropagation();
    isDraggingRef.current = true;
    setPreview(null);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const selectedMin = baseMinutes + Math.floor((offsetY / HOUR_HEIGHT) * 60);

    timeSelectionRef.current = {
      startMin: selectedMin,
      endMin: selectedMin + 15,
      dayIndex,
    };
  };

  const handleTimeSlotMouseMove = (
    e: React.MouseEvent,
    dayIndex: number,
    baseMinutes: number
  ) => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    if (timeSelectionRef.current.dayIndex !== dayIndex) return;

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
        dayIndex,
      });
    }
  };

  const handleTimeSlotMouseUp = (dayIndex: number) => {
    if (!isDraggingRef.current || !timeSelectionRef.current) return;
    if (timeSelectionRef.current.dayIndex !== dayIndex) {
      isDraggingRef.current = false;
      timeSelectionRef.current = null;
      setSelectionPreview(null);
      return;
    }

    isDraggingRef.current = false;
    const { startMin, endMin } = timeSelectionRef.current;

    setSelectedSlot({
      startTime: minutesToTime(startMin),
      endTime: minutesToTime(endMin),
      date: days[dayIndex],
    });

    setSelectionPreview(null);
    timeSelectionRef.current = null;
  };

  // ── Appointment drag & drop ─────────────────────────────────
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
    dayIndex: number,
    baseMinutes: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggedAppt) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetY = e.clientY - rect.top;
    const droppedMin = baseMinutes + Math.floor((offsetY / HOUR_HEIGHT) * 60);
    const duration =
      timeToMinutes(draggedAppt.endTime) - timeToMinutes(draggedAppt.startTime);

    const updatedAppt: CalAppointment = {
      ...draggedAppt,
      date: days[dayIndex],
      startTime: minutesToTime(droppedMin),
      endTime: minutesToTime(droppedMin + duration),
    };

    onAppointmentUpdate?.(updatedAppt);
    setDraggedAppt(null);
  };

  // ── Create appointment ──────────────────────────────────────
  const handleCreateAppointment = (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">
  ) => {
    if (!selectedSlot) return;

    const newAppt: CalAppointment = {
      id: `appt-${Date.now()}`,
      ...data,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    };

    onAppointmentCreate?.(newAppt);
    setSelectedSlot(null);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[1000px]">
        <div
          ref={containerRef}
          className="relative flex flex-col overflow-hidden md:m-[30px] m-[15px] border border-[#E0E6EB] rounded-xl"
          onClick={() => setPreview(null)}
          onMouseUp={() => {
            // Fallback global mouseup in case cursor leaves a cell
            if (isDraggingRef.current && timeSelectionRef.current) {
              const { startMin, endMin, dayIndex } = timeSelectionRef.current;
              isDraggingRef.current = false;
              setSelectedSlot({
                startTime: minutesToTime(startMin),
                endTime: minutesToTime(endMin),
                date: days[dayIndex],
              });
              setSelectionPreview(null);
              timeSelectionRef.current = null;
            }
          }}
        >
          {/* Day header */}
          <div className="flex border-b border-[#E0E6EB] bg-white sticky top-0 z-10">
            <div className="w-[72px] border-r border-[#E0E6EB]" />
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
            ref={scrollRef}
            className="overflow-y-auto overflow-x-auto flex-1"
            style={{ maxHeight: "calc(100vh - 280px)" }}
          >
            <div className="flex">
              {/* Time labels */}
              <div className="w-[72px] shrink-0 border-r border-[#E0E6EB]">
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="relative border-b border-[#E0E6EB]"
                    style={{ height: HOUR_HEIGHT }}
                  >
                    <span className="absolute top-0 left-2 text-[10px] font-manrope text-[#98A4AE] whitespace-nowrap">
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
                    {HOURS.map((h) => {
                      const baseMinutes = h * 60;
                      const hourAppts = dayAppts.filter(
                        (a) => parseInt(a.startTime.split(":")[0]) === h
                      );
                      const isSelectingHere =
                        selectionPreview?.dayIndex === di &&
                        selectionPreview.startMin >= baseMinutes &&
                        selectionPreview.startMin < baseMinutes + 60;

                      return (
                        <div
                          key={h}
                          className="relative border-b border-[#E0E6EB] cursor-cell select-none"
                          style={{ height: HOUR_HEIGHT }}
                          onMouseDown={(e) =>
                            handleTimeSlotMouseDown(e, di, baseMinutes)
                          }
                          onMouseMove={(e) =>
                            handleTimeSlotMouseMove(e, di, baseMinutes)
                          }
                          onMouseUp={() => handleTimeSlotMouseUp(di)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                          }}
                          onDrop={(e) =>
                            handleTimeSlotDrop(e, di, baseMinutes)
                          }
                        >
                          {/* Quarter lines */}
                          <div className="absolute inset-0 flex flex-col pointer-events-none">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className={`flex-1 ${i < 3 ? "border-b border-[#F0F0F0]" : ""}`}
                              />
                            ))}
                          </div>

                          {/* Selection preview overlay */}
                          {isSelectingHere && selectionPreview && (
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
                          <div className="relative z-10">
                            {hourAppts.map((appt) => {
                              const startMin = timeToMinutes(appt.startTime);
                              const endMin = timeToMinutes(appt.endTime);
                              const height = Math.max(
                                ((endMin - startMin) / 60) * HOUR_HEIGHT,
                                20
                              );
                              return (
                                <div
                                  key={appt.id}
                                  style={{ height }}
                                  className="p-0.5"
                                  draggable
                                  onDragStart={(e) => handlePillDragStart(appt, e)}
                                  onDragEnd={handlePillDragEnd}
                                >
                                  <AppPill
                                    appt={appt}
                                    statusColor={statusColor}
                                    onClick={handlePillClick}
                                    compact
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

          {/* Preview card */}
          {preview && (
            <PreviewCard
              appt={preview.appt}
              onClose={() => setPreview(null)}
              statusBadgeColor={statusBadgeColor}
              style={{
                top: Math.min(preview.y, 300),
                left: Math.min(preview.x, 100),
              }}
            />
          )}
        </div>
      </div>

      {/* New Appointment Modal */}
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