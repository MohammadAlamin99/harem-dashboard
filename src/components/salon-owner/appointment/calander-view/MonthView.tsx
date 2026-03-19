import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useState } from "react";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";
// Month View
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
//  Static team members
const teamMembers = [
  { id: "1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "2", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "3", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "4", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "5", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "6", name: "Maria Rodriguez", avatar: "/images/avator.png" },
];
const makeDate = (y: number, m: number, d: number) => new Date(y, m - 1, d);
const allAppointments: CalAppointment[] = [
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

//  Helpers
const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function MonthView({
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
