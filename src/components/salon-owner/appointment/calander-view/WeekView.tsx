import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useState } from "react";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";

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
