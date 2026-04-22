
"use client";
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import { useRef, useEffect, useState } from "react";

export default function AppPill({
  appt,
  onClick,
  statusColor,
  onResizeEnd,
  slotDuration = 15,
  slotPxHeight = 12,
  // baseMinutes = 0,
  HOUR_HEIGHT = 48,
}: {
  appt: CalAppointment;
  onClick: (appt: CalAppointment, e: React.MouseEvent) => void;
  statusColor?: Record<AppStatus, { bg: string; text: string; border: string }>;
  compact?: boolean;
  onResizeEnd?: (appt: CalAppointment, newEndTime: string) => void;
  slotDuration?: number;
  slotPxHeight?: number;
  baseMinutes?: number;
  HOUR_HEIGHT?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(999);
  const isResizingRef = useRef(false);
  const lastResizeEndTimeRef = useRef(0);
  const resizeStartYRef = useRef(0);
  const resizeStartEndMinRef = useRef(0);

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

  const timeToMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const minutesToTime = (mins: number): string => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    resizeStartYRef.current = e.clientY;
    resizeStartEndMinRef.current = timeToMinutes(appt.endTime);

    const onMouseMove = (ev: MouseEvent) => {
      if (!isResizingRef.current) return;
      const deltaY = ev.clientY - resizeStartYRef.current;
      const deltaMin = Math.round(deltaY / slotPxHeight) * slotDuration;

      const startMin = timeToMinutes(appt.startTime);
      const newEndMin = resizeStartEndMinRef.current + deltaMin;
      const clampedEnd = Math.max(startMin + slotDuration, newEndMin);

      if (ref.current?.parentElement) {
        const newHeight = ((clampedEnd - startMin) / 60) * HOUR_HEIGHT;
        ref.current.parentElement.style.height = `${newHeight}px`;
      }
    };

    const onMouseUp = (ev: MouseEvent) => {
      if (isResizingRef.current) {
        const deltaY = ev.clientY - resizeStartYRef.current;
        const deltaMin = Math.round(deltaY / slotPxHeight) * slotDuration;
        const startMin = timeToMinutes(appt.startTime);
        const clampedEnd = Math.max(startMin + slotDuration, resizeStartEndMinRef.current + deltaMin);

        onResizeEnd?.(appt, minutesToTime(clampedEnd));
        lastResizeEndTimeRef.current = Date.now();
        isResizingRef.current = false;
      }

      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleMainClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastResizeEndTimeRef.current < 200) {
      return;
    }
    onClick(appt, e);
  };

  return (
    <div
      ref={ref}
      onClick={handleMainClick}
      className={`
        ${c.bg} ${c.text} ${c.border}
        border-l-4 rounded-[0px_8px_8px_0px]
        w-full h-full
        flex flex-col justify-center
        px-2.5
        cursor-grab active:cursor-grabbing hover:opacity-90
        transition-opacity overflow-hidden touch-none
        relative group/pill
      `}
      style={{
        minHeight: 28,
        paddingTop: isCompact ? 2 : 4,
        paddingBottom: isCompact ? 2 : 4,
      }}
      draggable="true"
    >
      {/* Service Info */}
      {isCompact && (
        <p className="font-manrope font-semibold truncate leading-none text-[11px]">
          <span className="font-semibold">{appt.service}</span>&nbsp;
          <span className="font-normal opacity-75">({appt.clientName})</span>
        </p>
      )}

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

      {/* ── Resize handle ── */}
      {onResizeEnd && (
        <div
          onMouseDown={handleResizeMouseDown}
          onClick={(e) => e.stopPropagation()}
          className="
            absolute bottom-0 left-0 right-0 h-[10px]
            flex items-center justify-center
            cursor-ns-resize
            opacity-0 group-hover/pill:opacity-100
            transition-opacity z-20
          "
        >
          <div className="flex gap-[3px] mb-[2px] pointer-events-none">
            <span className="w-[3px] h-[3px] rounded-full bg-current opacity-40" />
            <span className="w-[3px] h-[3px] rounded-full bg-current opacity-40" />
            <span className="w-[3px] h-[3px] rounded-full bg-current opacity-40" />
          </div>
        </div>
      )}
    </div>
  );
}