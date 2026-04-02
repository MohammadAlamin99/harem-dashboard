

import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";
import Image from "next/image";

export default function PreviewCard({
  appt,
  onClose,
  style,
  statusBadgeColor,
}: {
  appt: CalAppointment;
  onClose: () => void;
  style?: React.CSSProperties;
  statusBadgeColor?: Record<AppStatus, string>;
}) {
  const badgeClass =
    statusBadgeColor?.[appt.status] ?? "bg-gray-100 text-gray-700";

  return (
    <div
      className="absolute z-50 bg-white rounded-[14px] shadow-[0px_12px_40px_rgba(0,0,0,0.15)] border border-[#EFF4FA] p-4 w-[260px]"
      style={style}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image
            src="/images/avator.png"
            alt={appt.employeeName}
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <span className="text-sm font-semibold font-manrope text-[#29343D]">
            {appt.clientName}
          </span>
        </div>
        <span
          className={`text-xs font-semibold font-manrope px-2 py-0.5 rounded-full ${badgeClass}`}
        >
          {appt.status}
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">Date</p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.date
              .toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replace(/\//g, "/")}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">Time</p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.startTime} - {appt.endTime}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Service
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.service}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Price
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.price}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Duration
          </p>
          <p className="text-xs font-semibold font-manrope text-[#29343D]">
            {appt.duration}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-manrope text-[#98A4AE] mb-0.5">
            Employee
          </p>
          <div className="flex items-center gap-1">
            <Image
              src="/images/avator.png"
              alt={appt.employeeName}
              width={16}
              height={16}
              className="rounded-full object-cover"
            />
            <p className="text-xs font-semibold font-manrope text-[#29343D] truncate">
              {appt.employeeName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



