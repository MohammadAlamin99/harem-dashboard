"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import Image from "next/image";

type Appointment = {
  id: string;
  photo?: string;
  name: string;
  phone: string;
  time: string;
  status: "Booked" | "Completed" | "Cancelled";
};

type Props = {
  appointments: Appointment[];
};

export default function AgendaAppointments({ appointments }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Sep 16, 2025");

  const options = [
    "Sep 16, 2025",
    "Sep 17, 2025",
    "Sep 18, 2025",
    "Sep 19, 2025",
  ];
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#1E293B] font-manrope">
            Agenda - Appointments
          </h2>
        </div>

        <div className="flex gap-3">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 flex items-center gap-2.5 font-manrope rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              {selected}
              <ChevronDown width={16} height={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-md z-20">
                {options.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelected(item);
                      setOpen(false);
                    }}
                    className="font-manrope block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export */}
          <button className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 text-sm font-medium font-manrope cursor-pointer">
            View All
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 bg-[#F3F3FF] rounded-t-xl px-6 py-3 text-[#29343D] text-sm font-medium font-manrope">
        <span>Client</span>
        <span>Time</span>
        <span>Status</span>
      </div>

      {/* Scrollable Body */}
      <div className="max-h-[500px] overflow-y-auto bg-white rounded-b-xl border border-gray-200">
        {appointments.map((appointment) => {
          const isOpen = openId === appointment.id;

          return (
            <div key={appointment.id} className="border-t border-gray-200">
              {/* Main Row */}
              <div className="grid grid-cols-3 max-[575px]:grid-cols-1 max-[575px]:gap-3 items-center px-6 py-5">
                {/* Client */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-pink-200 flex items-center justify-center text-white font-bold">
                    {/* {appointment.photo} */}
                    <Image
                      src={appointment.photo || ""}
                      alt={appointment.name}
                      width={48}
                      height={48}
                      objectFit="cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-[#29343D] font-manrope text-sm">
                      {appointment.name}
                    </p>
                    <p className="text-[#999] text-[12px] font-manrope font-normal">
                      {appointment.phone}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="text-[#526B7A] font-manrope font-normal text-[12px]">
                  {appointment.time}
                </div>

                {/* Status + Actions */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-[#DDDBFF] text-[#635BFF] text-sm font-manrope font-medium">
                    {appointment.status}
                  </span>

                  <div className="flex items-center gap-3">
                    <button className="bg-[#EFF4FA] px-4 py-2.5 rounded-[8px] cursor-pointer">
                      <Pencil size={16} color="#46CAEB" />
                    </button>

                    <button
                      onClick={() => setOpenId(isOpen ? null : appointment.id)}
                      className="text-indigo-500"
                    >
                      <ChevronDown
                        color="#635BFF"
                        size={24}
                        className={`cursor-pointer transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Section */}
              {isOpen && (
                <div className="px-10 pb-8">
                  <h3 className="text-center text[#29343D] font-semibold font-manrope mb-4 text-sm">
                    Booking Order
                  </h3>
                  <div className="relative flex justify-between items-start">
                    {/* Connector Line */}
                    <div className="absolute top-5 left-6 right-6 h-[2px] bg-[#B9C3CC]" />
                    {[1, 2, 3].map((step) => {
                      const isActive = step === 1;
                      return (
                        <div
                          key={step}
                          className="relative z-10 flex flex-col items-center w-1/3"
                        >
                          {/* Circle */}
                          <div
                            className={`
                              w-10 h-10 rounded-full flex items-center justify-center text-sm font-manrope font-medium
                              ${
                                isActive
                                  ? "bg-[#FFF9E5] text-[#FFD648]"
                                  : "bg-gray-500 text-white"
                              }
                            `}
                          >
                            {step}
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`
                              mt-3 text-xs px-2 py-1 rounded-[8px] font-medium font-manrope
                              ${
                                isActive
                                  ? "bg-[#FFF9E5] text-[#FFD648]"
                                  : "bg-[#EFF4FA] text-[#0A2540]"
                              }
                            `}
                          >
                            {isActive ? "Overdue" : "To Do"}
                          </span>

                          {/* Details */}
                          <div className="mt-3 text-center">
                            <p className="text-xs text-[#999] font-manrope">
                              12:00-12:05
                            </p>
                            <p className="text-sm font-manrope text-[#29343D] font-semibold my-0.5">
                              Shampoo
                            </p>
                            <p className="text-xs text-[#999] font-manrope font-normal">
                              Angelica
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-center">
                    <button className="px-4 py-2.5 bg-[#DDDBFF] text-[#635BFF] rounded-[8px] font-manrope hover:bg-[#D3D0FF] transition mt-4 cursor-pointer">
                      Print Receipt
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
