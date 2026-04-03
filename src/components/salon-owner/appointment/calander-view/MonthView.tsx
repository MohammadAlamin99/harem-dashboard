// import { useState } from "react";
// import AppPill from "./AppPill";

// // ─── Types ────────────────────────────────────────────────────────────────────
// export type AppStatus =
//   | "Booked"
//   | "Confirmed"
//   | "Arrived"
//   | "Started"
//   | "Completed"
//   | "Canceled";

// export interface CalAppointment {
//   id: string;
//   clientName: string;
//   service: string;
//   date: Date;
//   startTime: string;
//   endTime: string;
//   price: string;
//   duration: string;
//   status: AppStatus;
//   employeeName: string;
//   employeeId: string;
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
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
//   if (week.length > 0) {
//     while (week.length < 7) week.push(null);
//     grid.push(week);
//   }
//   return grid;
// }

// const isSameDay = (a: Date, b: Date) =>
//   a.getFullYear() === b.getFullYear() &&
//   a.getMonth() === b.getMonth() &&
//   a.getDate() === b.getDate();

// const makeDate = (y: number, m: number, d: number) => new Date(y, m - 1, d);

// // ─── Constants ────────────────────────────────────────────────────────────────
// const statusColor: Record<
//   AppStatus,
//   { bg: string; text: string; border: string }
// > = {
//   Booked: {
//     bg: "bg-[#F3F0FF]",
//     text: "text-[#635BFF]",
//     border: "border-l-[#635BFF]",
//   },
//   Confirmed: {
//     bg: "bg-[#E6FFFE]",
//     text: "text-[#16CDC7]",
//     border: "border-l-[#16CDC7]",
//   },
//   Arrived: {
//     bg: "bg-[#FFFBEA]",
//     text: "text-[#E6B800]",
//     border: "border-l-[#FFD648]",
//   },
//   Started: {
//     bg: "bg-[#FFF0F3]",
//     text: "text-[#FF6692]",
//     border: "border-l-[#FF6692]",
//   },
//   Completed: {
//     bg: "bg-[#EDFBF3]",
//     text: "text-[#36C76C]",
//     border: "border-l-[#36C76C]",
//   },
//   Canceled: {
//     bg: "bg-[#FFF0F3]",
//     text: "text-[#FF6692]",
//     border: "border-l-[#FF6692]",
//   },
// };

// const statusBadgeColor: Record<AppStatus, string> = {
//   Booked: "bg-[#DDDBFF] text-[#635BFF]",
//   Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
//   Arrived: "bg-[#FFF9E5] text-[#FFD648]",
//   Started: "bg-[#F6F7F9] text-[#0A2540]",
//   Completed: "bg-[#EBFAF0] text-[#36C76C]",
//   Canceled: "bg-[#FFE5ED] text-[#FF6692]",
// };

// // ─── Sample Data ──────────────────────────────────────────────────────────────
// const teamMembers = [
//   { id: "1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
//   { id: "2", name: "James Wilson", avatar: "/images/avator.png" },
//   { id: "3", name: "Sofia Chen", avatar: "/images/avator.png" },
//   { id: "4", name: "Daniel Park", avatar: "/images/avator.png" },
//   { id: "5", name: "Layla Hassan", avatar: "/images/avator.png" },
//   { id: "6", name: "Tom Nguyen", avatar: "/images/avator.png" },
// ];

// const allAppointments: CalAppointment[] = [
//   ...teamMembers.flatMap((member, mi) => [
//     {
//       id: `d-${mi}-1`,
//       clientName: "Client Name",
//       service: "Haircut",
//       date: makeDate(2025, 9, 2),
//       startTime: "00:00",
//       endTime: "00:15",
//       price: "€ 170",
//       duration: "15 min",
//       status: "Canceled" as AppStatus,
//       employeeName: member.name,
//       employeeId: member.id,
//     },
//     {
//       id: `d-${mi}-2`,
//       clientName: "Client Name",
//       service: "Haircut",
//       date: makeDate(2025, 9, 2),
//       startTime: "00:20",
//       endTime: "00:35",
//       price: "€ 170",
//       duration: "15 min",
//       status: "Completed" as AppStatus,
//       employeeName: member.name,
//       employeeId: member.id,
//     },
//     {
//       id: `d-${mi}-3`,
//       clientName: "Client Name",
//       service: "Haircut",
//       date: makeDate(2025, 9, 2),
//       startTime: "00:45",
//       endTime: "01:00",
//       price: "€ 170",
//       duration: "15 min",
//       status: "Booked" as AppStatus,
//       employeeName: member.name,
//       employeeId: member.id,
//     },
//     {
//       id: `d-${mi}-4`,
//       clientName: "Client Name",
//       service: "Haircut",
//       date: makeDate(2025, 9, 2),
//       startTime: "01:10",
//       endTime: "01:25",
//       price: "€ 170",
//       duration: "15 min",
//       status: "Arrived" as AppStatus,
//       employeeName: member.name,
//       employeeId: member.id,
//     },
//     {
//       id: `d-${mi}-5`,
//       clientName: "Client Name",
//       service: "Haircut",
//       date: makeDate(2025, 9, 2),
//       startTime: "02:00",
//       endTime: "02:15",
//       price: "€ 170",
//       duration: "15 min",
//       status: "Confirmed" as AppStatus,
//       employeeName: member.name,
//       employeeId: member.id,
//     },
//   ]),
//   {
//     id: "w-1",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 9, 1),
//     startTime: "00:00",
//     endTime: "00:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Canceled",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "w-2",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 9, 1),
//     startTime: "00:30",
//     endTime: "01:30",
//     price: "€ 170",
//     duration: "60 min",
//     status: "Booked",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "w-3",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 9, 2),
//     startTime: "00:00",
//     endTime: "00:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Completed",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "w-4",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 9, 5),
//     startTime: "00:00",
//     endTime: "00:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Confirmed",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "w-5",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 9, 7),
//     startTime: "00:00",
//     endTime: "00:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Arrived",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-1",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 1),
//     startTime: "10:00",
//     endTime: "10:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Canceled",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-2",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 9),
//     startTime: "10:00",
//     endTime: "10:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Booked",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-3",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 11),
//     startTime: "10:00",
//     endTime: "10:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Completed",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-4",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 11),
//     startTime: "11:00",
//     endTime: "11:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Confirmed",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-5",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 11),
//     startTime: "12:00",
//     endTime: "12:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Arrived",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-6",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 13),
//     startTime: "10:00",
//     endTime: "10:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Started",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-7",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 16),
//     startTime: "10:00",
//     endTime: "10:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Arrived",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
//   {
//     id: "m-8",
//     clientName: "Client Name",
//     service: "Haircut",
//     date: makeDate(2025, 10, 28),
//     startTime: "10:00",
//     endTime: "10:15",
//     price: "€ 170",
//     duration: "15 min",
//     status: "Booked",
//     employeeName: "Maria Rodriguez",
//     employeeId: "1",
//   },
// ];

// // ─── PreviewCard ──────────────────────────────────────────────────────────────
// function PreviewCard({
//   appt,
//   onClose,
//   style,
// }: {
//   appt: CalAppointment;
//   onClose: () => void;
//   statusBadgeColor: typeof statusBadgeColor;
//   style?: React.CSSProperties;
// }) {
//   const badge = statusBadgeColor[appt.status];
//   return (
//     <div
//       className="bg-white rounded-2xl shadow-2xl border border-[#E0E6EB] w-[280px] p-4 z-50"
//       style={style}
//       onClick={(e) => e.stopPropagation()}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <div className="w-8 h-8 rounded-full bg-[#635BFF]/10 flex items-center justify-center">
//             <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//               <path
//                 d="M8 8C9.933 8 11.5 6.433 11.5 4.5S9.933 1 8 1 4.5 2.567 4.5 4.5 6.067 8 8 8zm0 1.5c-2.667 0-8 1.34-8 4v1.5h16V13.5c0-2.66-5.333-4-8-4z"
//                 fill="#635BFF"
//               />
//             </svg>
//           </div>
//           <div>
//             <p className="text-xs font-bold font-manrope text-[#0A2540]">
//               {appt.clientName}
//             </p>
//             <p className="text-[10px] text-[#98A4AE] font-manrope">
//               {appt.employeeName}
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           className="text-[#98A4AE] hover:text-[#0A2540] transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#F3F4F6]"
//         >
//           <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
//             <path
//               d="M1 1l10 10M11 1L1 11"
//               stroke="currentColor"
//               strokeWidth="1.5"
//               strokeLinecap="round"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Divider */}
//       <div className="border-t border-[#F0F3F7] mb-3" />

//       {/* Details */}
//       <div className="space-y-2 mb-3">
//         <Row
//           icon={
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <rect
//                 x="1"
//                 y="2"
//                 width="11"
//                 height="10"
//                 rx="1.5"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//               />
//               <path
//                 d="M4 1v2M9 1v2M1 5h11"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//               />
//             </svg>
//           }
//           label={`${appt.date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`}
//         />
//         <Row
//           icon={
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <circle
//                 cx="6.5"
//                 cy="6.5"
//                 r="5"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//               />
//               <path
//                 d="M6.5 3.5V6.5L8.5 8"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//               />
//             </svg>
//           }
//           label={`${appt.startTime} – ${appt.endTime} · ${appt.duration}`}
//         />
//         <Row
//           icon={
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <path
//                 d="M2 10.5c0-2.5 2-3.5 4.5-3.5S11 8 11 10.5"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//               />
//               <circle
//                 cx="6.5"
//                 cy="4"
//                 r="2.5"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//               />
//             </svg>
//           }
//           label={appt.service}
//         />
//         <Row
//           icon={
//             <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
//               <path
//                 d="M2 2h9M2 6.5h6M2 11h4"
//                 stroke="#98A4AE"
//                 strokeWidth="1.2"
//                 strokeLinecap="round"
//               />
//             </svg>
//           }
//           label={appt.price}
//         />
//       </div>

//       {/* Status badge */}
//       <div className="flex items-center justify-between">
//         <span
//           className={`text-[10px] font-semibold font-manrope px-2.5 py-1 rounded-full ${badge}`}
//         >
//           {appt.status}
//         </span>
//         <button className="text-[10px] font-semibold text-[#635BFF] hover:underline font-manrope">
//           View Details →
//         </button>
//       </div>
//     </div>
//   );
// }

// function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
//   return (
//     <div className="flex items-center gap-2">
//       <span className="text-[#98A4AE] flex-shrink-0">{icon}</span>
//       <span className="text-[11px] font-manrope text-[#4A5568]">{label}</span>
//     </div>
//   );
// }

// // ─── MonthView (main export) ──────────────────────────────────────────────────
// export default function MonthView({
//   date,
//   selectedMemberIds,
// }: {
//   date: Date;
//   selectedMemberIds: string[];
// }) {
//   const [preview, setPreview] = useState<{
//     appt: CalAppointment;
//     dayDate: Date;
//   } | null>(null);

//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const grid = getMonthGrid(year, month);
//   const today = new Date();

//   const memberAppts = allAppointments.filter((a) =>
//     selectedMemberIds.includes(a.employeeId),
//   );

//   const handlePillClick = (
//     appt: CalAppointment,
//     dayDate: Date,
//     e: React.MouseEvent,
//   ) => {
//     e.stopPropagation();
//     setPreview({ appt, dayDate });
//   };

//   return (
//     <div className="w-full overflow-x-auto">
//       <div className="min-w-[1000px]">
//         <div
//           className="relative mx-[15px] md:mx-[30px] border border-[#E0E6EB] rounded-xl"
//           onClick={() => setPreview(null)}
//         >
//           {/* Day headers */}
//           <div className="grid grid-cols-7 border-b border-[#E0E6EB] bg-[#E0E6EB] rounded-[12px_12px_0px_0px]">
//             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
//               <div
//                 key={d}
//                 className="py-5 text-center text-sm font-semibold font-manrope text-[#526B7A] border-r border-[#E0E6EB] last:border-r-0"
//               >
//                 {d}
//               </div>
//             ))}
//           </div>

//           {/* Weeks */}
//           {grid.map((week, wi) => (
//             <div
//               key={wi}
//               className="grid grid-cols-7 border-b border-[#E0E6EB] last:border-b-0"
//             >
//               {week.map((day, di) => {
//                 const dayAppts = day
//                   ? memberAppts.filter((a) => isSameDay(a.date, day))
//                   : [];
//                 const isToday = day ? isSameDay(day, today) : false;

//                 return (
//                   <div
//                     key={di}
//                     className={`
//                   border-r border-[#E0E6EB] last:border-r-0
//                   min-h-[120px] p-2
//                   ${!day ? "bg-[#FAFBFF]" : "bg-white"}
//                   ${isToday ? "!bg-[#F0EFFF]" : ""}
//                 `}
//                   >
//                     {day && (
//                       <>
//                         <p
//                           className={`
//                         text-[11px] font-manrope font-medium mb-1.5 text-right
//                         ${isToday ? "text-[#635BFF] font-bold" : "text-[#98A4AE]"}
//                       `}
//                         >
//                           {day.getDate()}
//                         </p>

//                         <div className="flex flex-col gap-[3px]">
//                           {dayAppts.slice(0, 3).map((appt) => (
//                             <div
//                               key={appt.id}
//                               className="w-full"
//                               onClick={(e) => handlePillClick(appt, day, e)}
//                             >
//                               <AppPill
//                                 appt={appt}
//                                 statusColor={statusColor}
//                                 onClick={(a, e) => handlePillClick(a, day, e)}
//                                 compact
//                               />
//                             </div>
//                           ))}
//                           {dayAppts.length > 3 && (
//                             <p className="text-[14px] py-1 text-[#98A4AE] font-manrope pl-0.5">
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

//           {/* Preview card – centered overlay */}
//           {preview && (
//             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
//               <div className="pointer-events-auto">
//                 <PreviewCard
//                   appt={preview.appt}
//                   onClose={() => setPreview(null)}
//                   statusBadgeColor={statusBadgeColor}
//                   style={{ position: "relative", top: "auto", left: "auto" }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─── Demo wrapper (remove in production) ─────────────────────────────────────
// export function MonthViewDemo() {
//   const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1)); // Oct 2025
//   const [selectedMemberIds] = useState(["1"]);

//   const prevMonth = () =>
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
//     );
//   const nextMonth = () =>
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
//     );

//   const monthName = currentDate.toLocaleString("default", {
//     month: "long",
//     year: "numeric",
//   });

//   return (
//     <div className="w-full overflow-x-auto">
//       <div className="min-w-[1000px]">
//         <div className="bg-[#F7F8FC] p-6">
//           <div className="mx-auto bg-white rounded-xl  border border-[#E0E6EB] overflow-hidden">
//             {/* Toolbar */}
//             <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E6EB]">
//               <h2 className="text-base font-bold text-[#0A2540] font-manrope">
//                 {monthName}
//               </h2>
//               <div className="flex gap-2">
//                 <button
//                   onClick={prevMonth}
//                   className="w-8 h-8 rounded-lg border border-[#E0E6EB] flex items-center justify-center text-[#98A4AE] hover:bg-[#F0EFFF] hover:text-[#635BFF] transition-colors"
//                 >
//                   ‹
//                 </button>
//                 <button
//                   onClick={nextMonth}
//                   className="w-8 h-8 rounded-lg border border-[#E0E6EB] flex items-center justify-center text-[#98A4AE] hover:bg-[#F0EFFF] hover:text-[#635BFF] transition-colors"
//                 >
//                   ›
//                 </button>
//               </div>
//             </div>

//             <MonthView
//               date={currentDate}
//               selectedMemberIds={selectedMemberIds}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import AppPill from "./AppPill";
import NewAppointmentModal from "./NewAppointmentModal";
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
  statusColor: Record<
    AppStatus,
    { bg: string; text: string; border: string }
  >;
  onAppointmentCreate?: (appt: CalAppointment) => void;
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
  onAppointmentCreate,
}: Props) {
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

  const rangeRef = useRef<{
    start: Date;
    end: Date;
  } | null>(null);

  const isDraggingRef = useRef(false);

  const grid = getMonthGrid(date.getFullYear(), date.getMonth());

  const memberAppts = (allAppointments ?? []).filter((a) =>
    selectedMemberIds.includes(a.employeeId)
  );

  // ─── Drag Start ─────────────────
  const handleMouseDown = (day: Date, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[draggable="true"]')) return;

    e.preventDefault();
    isDraggingRef.current = true;

    rangeRef.current = {
      start: day,
      end: day,
    };
  };

  // ─── Global Mouse Move ───────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !rangeRef.current) return;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      const cell = el.closest("[data-date]") as HTMLElement | null;
      if (!cell) return;

      const dateStr = cell.getAttribute("data-date");
      if (!dateStr) return;

      const day = new Date(dateStr);

      rangeRef.current.end = day;

      setSelectedRange({
        start: rangeRef.current.start,
        end: day,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ─── Mouse Up ───────────────────
  useEffect(() => {
    const handleMouseUp = () => {
      if (!rangeRef.current) return;

      setSelectedRange({
        start: rangeRef.current.start,
        end: rangeRef.current.end,
      });

      isDraggingRef.current = false;
      rangeRef.current = null;
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // ─── App click ─────────────────
  const handlePillClick = (
    appt: CalAppointment,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full overflow-x-auto">
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

                const isSelected =
                  selectedRange &&
                  day &&
                  day >= selectedRange.start &&
                  day <= selectedRange.end;

                return (
                  <div
                    key={di}
                    data-date={day ? day.toISOString() : ""}
                    className={`
                      border-r border-[#E0E6EB]
                      min-h-[120px] p-2
                      ${!day ? "bg-[#FAFBFF]" : "bg-white"}
                      ${isSelected ? "bg-[#F0EFFF]" : ""}
                    `}
                    onMouseDown={(e) => day && handleMouseDown(day, e)}
                  >
                    {day && (
                      <>
                        <p className="text-[11px] text-right text-[#98A4AE] mb-1.5">
                          {day.getDate()}
                        </p>

                        <div className="flex flex-col gap-[3px]">
                          {dayAppts.slice(0, 3).map((appt) => (
                            <div key={appt.id}>
                              <AppPill
                                appt={appt}
                                onClick={handlePillClick}
                                statusColor={statusColor}
                                compact
                              />
                            </div>
                          ))}

                          {dayAppts.length > 3 && (
                            <p className="text-[14px] text-[#98A4AE]">
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
        </div>
      </div>

      {/* Modal */}
      {selectedRange && (
        <NewAppointmentModal
          memberId={selectedMemberIds[0]}
          startTime="00:00"
          endTime="23:59"
          date={selectedRange.start}
          teamMembers={teamMembers}
          onClose={() => setSelectedRange(null)}
          onConfirm={(data) => {
            if (!selectedRange) return;

            const newAppt: CalAppointment = {
              id: `appt-${Date.now()}`,
              ...data,
              date: selectedRange.start,
              startTime: "00:00",
              endTime: "23:59",
            };

            onAppointmentCreate?.(newAppt);
            setSelectedRange(null);
          }}
        />
      )}
    </div>
  );
}