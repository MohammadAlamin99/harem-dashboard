
// "use client";

// import { useEffect, useRef, useState } from "react";
// import AppPill from "./AppPill";
// import NewAppointmentModal from "./NewAppointmentModal";
// import {
//   CalAppointment,
//   AppStatus,
// } from "@/@types/salon-owner/CalAppointment.type";

// // ─── Types ─────────────────────────
// type Props = {
//   date: Date;
//   selectedMemberIds: string[];
//   teamMembers: { id: string; name: string; avatar: string }[];
//   allAppointments: CalAppointment[];
//   statusColor: Record<
//     AppStatus,
//     { bg: string; text: string; border: string }
//   >;
//   onAppointmentCreate?: (appt: CalAppointment) => void;
// };

// // ─── Helpers ───────────────────────
// const isSameDay = (a: Date, b: Date) =>
//   a.getFullYear() === b.getFullYear() &&
//   a.getMonth() === b.getMonth() &&
//   a.getDate() === b.getDate();

// function getMonthGrid(year: number, month: number): (Date | null)[][] {
//   const firstDay = new Date(year, month, 1).getDay();
//   const daysInMonth = new Date(year, month + 1, 0).getDate();
//   const grid: (Date | null)[][] = [];
//   let week: (Date | null)[] = Array(firstDay).fill(null);

//   for (let d = 1; d <= daysInMonth; d++) {
//     week.push(new Date(year, month, d));
//     if (week.length === 7) {
//       grid.push(week);
//       week = [];
//     }
//   }

//   if (week.length) {
//     while (week.length < 7) week.push(null);
//     grid.push(week);
//   }

//   return grid;
// }

// // ─── MAIN ─────────────────────────
// export default function MonthView({
//   date,
//   selectedMemberIds,
//   teamMembers,
//   allAppointments,
//   statusColor,
//   onAppointmentCreate,
// }: Props) {
//   const [selectedRange, setSelectedRange] = useState<{
//     start: Date;
//     end: Date;
//   } | null>(null);

//   const rangeRef = useRef<{
//     start: Date;
//     end: Date;
//   } | null>(null);

//   const isDraggingRef = useRef(false);

//   const grid = getMonthGrid(date.getFullYear(), date.getMonth());

//   const memberAppts = (allAppointments ?? []).filter((a) =>
//     selectedMemberIds.includes(a.employeeId)
//   );

//   // ─── Drag Start ─────────────────
//   const handleMouseDown = (day: Date, e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest('[draggable="true"]')) return;

//     e.preventDefault();
//     isDraggingRef.current = true;

//     rangeRef.current = {
//       start: day,
//       end: day,
//     };
//   };

//   // ─── Global Mouse Move ───────────
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isDraggingRef.current || !rangeRef.current) return;

//       const el = document.elementFromPoint(e.clientX, e.clientY);
//       if (!el) return;

//       const cell = el.closest("[data-date]") as HTMLElement | null;
//       if (!cell) return;

//       const dateStr = cell.getAttribute("data-date");
//       if (!dateStr) return;

//       const day = new Date(dateStr);

//       rangeRef.current.end = day;

//       setSelectedRange({
//         start: rangeRef.current.start,
//         end: day,
//       });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // ─── Mouse Up ───────────────────
//   useEffect(() => {
//     const handleMouseUp = () => {
//       if (!rangeRef.current) return;

//       setSelectedRange({
//         start: rangeRef.current.start,
//         end: rangeRef.current.end,
//       });

//       isDraggingRef.current = false;
//       rangeRef.current = null;
//     };

//     window.addEventListener("mouseup", handleMouseUp);
//     return () => window.removeEventListener("mouseup", handleMouseUp);
//   }, []);

//   // ─── App click ─────────────────
//   const handlePillClick = (
//     appt: CalAppointment,
//     e: React.MouseEvent
//   ) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className="w-full overflow-x-auto">
//       <div className="min-w-[1000px]">
//         <div className="mx-[15px] md:mx-[30px] border border-[#E0E6EB] rounded-xl">

//           {/* Header */}
//           <div className="grid grid-cols-7 border-b border-[#E0E6EB] bg-[#E0E6EB] rounded-[12px_12px_0px_0px]">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//               <div
//                 key={d}
//                 className="py-5 text-center text-sm font-semibold text-[#526B7A]"
//               >
//                 {d}
//               </div>
//             ))}
//           </div>

//           {/* Grid */}
//           {grid.map((week, wi) => (
//             <div key={wi} className="grid grid-cols-7 border-b border-[#E0E6EB]">
//               {week.map((day, di) => {
//                 const dayAppts = day
//                   ? memberAppts.filter((a) => isSameDay(a.date, day))
//                   : [];

//                 const isSelected =
//                   selectedRange &&
//                   day &&
//                   day >= selectedRange.start &&
//                   day <= selectedRange.end;

//                 return (
//                   <div
//                     key={di}
//                     data-date={day ? day.toISOString() : ""}
//                     className={`
//                       border-r border-[#E0E6EB]
//                       min-h-[120px] p-2
//                       ${!day ? "bg-[#FAFBFF]" : "bg-white"}
//                       ${isSelected ? "bg-[#F0EFFF]" : ""}
//                     `}
//                     onMouseDown={(e) => day && handleMouseDown(day, e)}
//                   >
//                     {day && (
//                       <>
//                         <p className="text-[11px] text-right text-[#98A4AE] mb-1.5">
//                           {day.getDate()}
//                         </p>

//                         <div className="flex flex-col gap-[3px]">
//                           {dayAppts.slice(0, 3).map((appt) => (
//                             <div key={appt.id}>
//                               <AppPill
//                                 appt={appt}
//                                 onClick={handlePillClick}
//                                 statusColor={statusColor}
//                                 compact
//                               />
//                             </div>
//                           ))}

//                           {dayAppts.length > 3 && (
//                             <p className="text-[14px] text-[#98A4AE]">
//                               +{dayAppts.length - 3} more
//                             </p>
//                           )}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedRange && (
//         <NewAppointmentModal
//           memberId={selectedMemberIds[0]}
//           startTime="00:00"
//           endTime="23:59"
//           date={selectedRange.start}
//           teamMembers={teamMembers}
//           onClose={() => setSelectedRange(null)}
//           onConfirm={(data) => {
//             if (!selectedRange) return;

//             const newAppt: CalAppointment = {
//               id: `appt-${Date.now()}`,
//               ...data,
//               date: selectedRange.start,
//               startTime: "00:00",
//               endTime: "23:59",
//             };

//             onAppointmentCreate?.(newAppt);
//             setSelectedRange(null);
//           }}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import AppPill from "./AppPill";
import NewAppointmentModal from "./NewAppointmentModal";
import PreviewCard from "./PreviewCard";
import {
  CalAppointment,
  AppStatus,
} from "@/@types/salon-owner/CalAppointment.type";

// ─── Types ─────────────────────────
type Props = {
  date: Date;
  selectedMemberIds: string[];
  teamMembers: { id: string; name: string; avatar: string }[];
  allAppointments: CalAppointment[];
  statusColor: Record<AppStatus, { bg: string; text: string; border: string }>;
  statusBadgeColor?: Record<AppStatus, string>;
  onAppointmentCreate?: (appt: CalAppointment) => void;
  onAppointmentUpdate?: (appt: CalAppointment) => void;
};

// ─── Helpers ───────────────────────
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

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

  if (week.length) {
    while (week.length < 7) week.push(null);
    grid.push(week);
  }

  return grid;
}

// ─── MAIN ─────────────────────────
export default function MonthView({
  date,
  selectedMemberIds,
  teamMembers,
  allAppointments,
  statusColor,
  statusBadgeColor,
  onAppointmentCreate,
  onAppointmentUpdate,
}: Props) {
  // Modal for new appointment — triggered by single click on a day cell
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  // Preview card for existing appointment
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);

  // Drag & drop state
  const [draggedAppt, setDraggedAppt] = useState<CalAppointment | null>(null);
  const [dragOverDay, setDragOverDay] = useState<Date | null>(null);

  // Ref to detect if a pill was clicked (so we don't also open the "new appt" modal)
  const didClickPillRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const grid = getMonthGrid(date.getFullYear(), date.getMonth());

  const memberAppts = (allAppointments ?? []).filter((a) =>
    selectedMemberIds.includes(a.employeeId)
  );

  // ─── Click on day cell → open NewAppointmentModal ────────────
  const handleDayCellClick = (day: Date, e: React.MouseEvent) => {
    // If the click came from an AppPill, don't open the new-appt modal
    if (didClickPillRef.current) {
      didClickPillRef.current = false;
      return;
    }
    e.stopPropagation();
    setPreview(null);
    setSelectedDay(day);
  };

  // ─── Click on AppPill → show PreviewCard ─────────────────────
  const handlePillClick = (appt: CalAppointment, e: React.MouseEvent) => {
    e.stopPropagation();
    didClickPillRef.current = true;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    setPreview({
      appt,
      x: rect.left - containerRect.left + rect.width + 8,
      y: rect.top - containerRect.top,
    });
    setSelectedDay(null);
  };

  // ─── Drag & Drop: AppPill drag ────────────────────────────────
  const handlePillDragStart = (appt: CalAppointment, e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedAppt(appt);
    e.dataTransfer.effectAllowed = "move";
  };

  const handlePillDragEnd = () => {
    setDraggedAppt(null);
    setDragOverDay(null);
  };

  // ─── Drag & Drop: Day cell drop ───────────────────────────────
  const handleDayCellDragOver = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverDay(day);
  };

  const handleDayCellDrop = (e: React.DragEvent, day: Date) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedAppt) return;

    const updatedAppt: CalAppointment = {
      ...draggedAppt,
      date: day,
    };

    onAppointmentUpdate?.(updatedAppt);
    setDraggedAppt(null);
    setDragOverDay(null);
  };

  const handleDayCellDragLeave = () => {
    setDragOverDay(null);
  };

  // ─── Create appointment from modal ───────────────────────────
  const handleConfirm = (
    data: Omit<CalAppointment, "id" | "date" | "startTime" | "endTime">
  ) => {
    if (!selectedDay) return;

    const newAppt: CalAppointment = {
      id: `appt-${Date.now()}`,
      ...data,
      date: selectedDay,
      startTime: "00:00",
      endTime: "23:59",
    };

    onAppointmentCreate?.(newAppt);
    setSelectedDay(null);
  };

  // ─── Close preview when clicking outside ─────────────────────
  useEffect(() => {
    const handler = () => setPreview(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-auto"
      onClick={() => setPreview(null)}
    >
      <div className="min-w-[1000px]">
        <div className="mx-[15px] md:mx-[30px] border border-[#E0E6EB] rounded-xl">

          {/* Header */}
          <div className="grid grid-cols-7 border-b border-[#E0E6EB] bg-[#E0E6EB] rounded-[12px_12px_0px_0px]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div
                key={d}
                className="py-5 text-center text-sm font-semibold text-[#526B7A]"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          {grid.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 border-b border-[#E0E6EB]">
              {week.map((day, di) => {
                const dayAppts = day
                  ? memberAppts.filter((a) => isSameDay(a.date, day))
                  : [];

                const isDragOver =
                  dragOverDay && day && isSameDay(dragOverDay, day);

                return (
                  <div
                    key={di}
                    className={`
                      border-r border-[#E0E6EB] last:border-r-0
                      min-h-[120px] p-2 relative
                      transition-colors duration-100
                      ${!day ? "bg-[#FAFBFF]" : "bg-white hover:bg-[#FAFBFF] cursor-pointer"}
                      ${isDragOver ? "bg-[#F0EFFF] ring-2 ring-inset ring-[#635BFF]" : ""}
                    `}
                    onClick={(e) => day && handleDayCellClick(day, e)}
                    onDragOver={(e) => day && handleDayCellDragOver(e, day)}
                    onDrop={(e) => day && handleDayCellDrop(e, day)}
                    onDragLeave={handleDayCellDragLeave}
                  >
                    {day && (
                      <>
                        <p className="text-[11px] text-right text-[#98A4AE] mb-1.5 select-none">
                          {day.getDate()}
                        </p>

                        <div className="flex flex-col gap-[3px]">
                          {dayAppts.slice(0, 3).map((appt) => (
                            <div
                              key={appt.id}
                              draggable
                              onDragStart={(e) => handlePillDragStart(appt, e)}
                              onDragEnd={handlePillDragEnd}
                            >
                              <AppPill
                                appt={appt}
                                onClick={handlePillClick}
                                statusColor={statusColor}
                                compact
                              />
                            </div>
                          ))}

                          {dayAppts.length > 3 && (
                            <p className="text-[11px] text-[#98A4AE] pl-1">
                              +{dayAppts.length - 3} more
                            </p>
                          )}
                        </div>

                        {/* "+" hint on hover (only when no drag is happening) */}
                        {!draggedAppt && (
                          <div className="absolute bottom-1.5 right-1.5 opacity-0 group-hover:opacity-100 pointer-events-none">
                            <span className="text-[10px] text-[#635BFF] font-semibold">+</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Preview card */}
      {preview && (
        <PreviewCard
          appt={preview.appt}
          onClose={() => setPreview(null)}
          statusBadgeColor={statusBadgeColor}
          style={{
            top: Math.min(preview.y, 400),
            left: Math.min(preview.x, 500),
          }}
        />
      )}

      {/* New Appointment Modal */}
      {selectedDay && (
        <NewAppointmentModal
          memberId={selectedMemberIds[0]}
          startTime="09:00"
          endTime="10:00"
          date={selectedDay}
          teamMembers={teamMembers}
          onClose={() => setSelectedDay(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}