"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ClientAppointFilterHead from "./ClientAppointFilterHead";
import ClientBooking from "./ClientBooking";

type Status =
  | "Booked"
  | "Confirmed"
  | "Arrived"
  | "Started"
  | "Completed"
  | "Canceled"
  | "No-show";

interface Appointment {
  day: string;
  month: string;
  year: string;
  service: string;
  status: Status;
  time: string;
  duration: string;
  staff: string;
  price: string | null;
  priceLabel: string | null;
  hasBookingOrder: boolean;
  defaultExpanded?: boolean;
}

const statusStyles: Record<Status, string> = {
  Booked: "bg-[#EBEAFF] text-[#635BFF]",
  Confirmed: "bg-[#ECFDFD] text-[#16CDC7]",
  Arrived: "bg-[#FFF9E5] text-[#FFD648]",
  Started: "border border-[#22C55E] text-[#22C55E]",
  Completed: "text-[#22C55E]",
  Canceled: "bg-[#FFEBF1] text-[#FF6692]",
  "No-show": "border border-[#FF6692] text-[#FF6692]",
};

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
function AppointmentRow({ item }: { item: Appointment }) {
  const [expanded, setExpanded] = useState<boolean>(
    item.defaultExpanded ?? false,
  );

  return (
    <div className="bg-[#F6F7F9] p-6 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3">
        {/* Chevron */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-[#9CA3AF] hover:text-[#635BFF] transition-colors cursor-pointer"
        >
          {expanded ? (
            <ChevronUp color="#635BFF" className="w-4 h-4" />
          ) : (
            <ChevronDown color="#635BFF" className="w-4 h-4" />
          )}
        </button>

        {/* Date badge */}
        <div className="w-[68px] h-[62px] rounded-lg bg-[#635BFF] flex flex-col items-center justify-center text-white">
          <span className="text-base font-bold leading-tight">
            {item.day + " " + item.month}
          </span>
          <span className="text-[12px] leading-tight">{item.year}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#29343D] font-manrope text-[16px]">
              {item.service}
            </span>
            <StatusBadge status={item.status} />
          </div>
          <p className="text-sm text-[#526B7A] mt-0.5 truncate">
            {item.time} • {item.duration} • {item.staff} •{" "}
            <span className="text-[#635BFF] cursor-pointer hover:underline">
              List of Services
            </span>
          </p>
        </div>

        {/* Price + Checkout */}
        {item.price && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-bold text-[#29343D] font-manrope text-base">
                € {item.price}
              </p>
              <p className="text-xs text-[#9CA3AF]">{item.priceLabel}</p>
            </div>
            <button className="px-5 py-2.5 bg-[#EBEAFF] text-[#635BFF] rounded-xl text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>

      {expanded && item.hasBookingOrder && <ClientBooking />}
    </div>
  );
}

const appointments: Appointment[] = [
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Haircut",
    status: "Booked",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: null,
    priceLabel: null,
    hasBookingOrder: true,
    defaultExpanded: true,
  },
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Hair Color",
    status: "Confirmed",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: "170",
    priceLabel: "Expected",
    hasBookingOrder: false,
  },
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Blow Dry",
    status: "Arrived",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: "170",
    priceLabel: "Expected",
    hasBookingOrder: false,
  },
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Blow Dry",
    status: "Started",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: "170",
    priceLabel: "Expected",
    hasBookingOrder: false,
  },
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Blow Dry",
    status: "Completed",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: "170",
    priceLabel: "Paid",
    hasBookingOrder: false,
  },
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Blow Dry",
    status: "Canceled",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: "170",
    priceLabel: "Expected",
    hasBookingOrder: false,
  },
  {
    day: "1",
    month: "AUG",
    year: "2025",
    service: "Blow Dry",
    status: "No-show",
    time: "17:00",
    duration: "15 min",
    staff: "Sophia Ventura - Angelica Last",
    price: "170",
    priceLabel: "Expected",
    hasBookingOrder: false,
  },
];

type DateFilterOption =
  | "Last 7 days"
  | "Last 14 days"
  | "Last Month"
  | "Last 3 Months"
  | "Custom Range";
type StatusFilterOption = "All" | Status;

export default function ClientAppointmentTab() {
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("Last 7 days");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [showDateDrop, setShowDateDrop] = useState<boolean>(false);
  const [showStatusDrop, setShowStatusDrop] = useState<boolean>(false);
  const [range, setRange] = useState<number>(200);

  const filtered = appointments.filter(
    (a) => statusFilter === "All" || a.status === statusFilter,
  );

  return (
    <div className="flex flex-col border border-[#E0E6EB] rounded-xl bg-white p-[15px] md:p-[30px]">
      {/* Filter bar */}
      <div className="w-[208px] ml-auto"></div>
      <ClientAppointFilterHead />

      {/* Appointment list */}
      <div className="flex flex-col gap-4">
        {filtered.map((item, i) => (
          <AppointmentRow key={i} item={item} />
        ))}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-[#9CA3AF] text-sm font-manrope">
            No appointments match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}
