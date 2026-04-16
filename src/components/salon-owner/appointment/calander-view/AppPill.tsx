import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useEffect, useState } from "react";

export default function AppPill({
  appt,
  onClick,
  statusColor,
}: {
  appt: CalAppointment;
  onClick: (appt: CalAppointment, e: React.MouseEvent) => void;
  statusColor?: Record<AppStatus, { bg: string; text: string; border: string }>;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(999);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const c = statusColor?.[appt.status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-l-gray-300",
  };

  const isCompact = height < 40;
  const isMedium = height >= 40 && height < 64;
  const isTall = height >= 64;

  return (
    <div
      ref={ref}
      onClick={(e) => onClick(appt, e)}
      className={`
        ${c.bg} ${c.text} ${c.border}
        border-l-4 rounded-[0px_8px_8px_0px]
        w-full h-full
        flex flex-col justify-center
        px-2.5
        cursor-grab active:cursor-grabbing hover:opacity-90
        transition-opacity overflow-hidden touch-none
      `}
      style={{
        minHeight: 28,
        paddingTop: isCompact ? 2 : 4,
        paddingBottom: isCompact ? 2 : 4,
      }}
      draggable="true"
    >
      {/* Compact: everything on one line */}
      {isCompact && (
        <p className="font-manrope font-semibold truncate leading-none text-[11px]">
          <span className="font-semibold">{appt.service}</span>&nbsp;
          <span className="font-normal opacity-75">({appt.clientName})</span>
        </p>
      )}

      {/* Medium: service + client on separate lines */}
      {isMedium && (
        <>
          <p className="font-manrope font-semibold truncate leading-tight text-[12px]">
            {appt.service}
          </p>
          <p className="font-manrope font-normal opacity-75 truncate leading-tight text-[11px]">
            {appt.clientName}
          </p>
        </>
      )}

      {/* Tall: service, client, and time range */}
      {isTall && (
        <>
          <p className="font-manrope font-semibold truncate leading-tight text-[13px]">
            {appt.service}
          </p>
          <p className="font-manrope font-normal opacity-75 truncate leading-tight text-[11px]">
            {appt.clientName}
          </p>
          <p className="font-manrope font-normal opacity-55 truncate leading-tight text-[10px] mt-0.5">
            {appt.startTime} – {appt.endTime}
          </p>
        </>
      )}
    </div>
  );
}