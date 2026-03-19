import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useState } from "react";
import Image from "next/image";
import AppPill from "./AppPill";
import PreviewCard from "./PreviewCard";

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
}) {
  const [preview, setPreview] = useState<{
    appt: CalAppointment;
    x: number;
    y: number;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleMembers = teamMembers.filter((m) =>
    selectedMemberIds.includes(m.id),
  );
  const dayAppts = allAppointments.filter((a) => isSameDay(a.date, date));

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
      <div className="border border-[#E0E6EB] mx-[30px] rounded-xl">
        {/* Member header row */}
        <div className="flex border-b border-[#E0E6EB] bg-[#F3F3FF] sticky top-0 z-10 rounded-[12px_12px_0px_0px]">
          <div className="w-[72px] border-r border-[#E0E6EB]" />
          {/* scroll arrow left */}
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
          <div className="flex">
            {/* Time labels */}
            <div className="w-[72px] border-r border-[#E0E6EB]">
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
                  className="flex-1 min-w-[120px] relative border-r border-[#E0E6EB] last:border-r-0"
                >
                  {HOURS.map((h) => (
                    <div
                      key={h}
                      className="border-b border-[#E0E6EB] flex flex-col"
                      style={{ height: HOUR_HEIGHT }}
                    >
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 border-b border-[#F0F0F0] ${
                            i === 3 ? "border-b-0" : ""
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                  {/* Appointments */}
                  {memberAppts.map((appt) => {
                    const startMin = timeToMinutes(appt.startTime);
                    const endMin = timeToMinutes(appt.endTime);
                    const top = (startMin / 100) * HOUR_HEIGHT;
                    const height = Math.max(
                      ((endMin - startMin) / 60) * HOUR_HEIGHT,
                      20,
                    );
                    return (
                      <div
                        key={appt.id}
                        className="absolute top-0 left-0 w-full"
                        style={{ top, height }}
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
    </div>
  );
}
