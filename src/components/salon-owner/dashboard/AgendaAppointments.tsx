"use client";

import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";

type Appointment = {
  id: string;
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
      <div className="grid grid-cols-3 bg-gray-200 rounded-t-xl px-6 py-3 text-gray-600 text-sm font-medium">
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
              <div className="grid grid-cols-3 items-center px-6 py-5">
                {/* Client */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-pink-200 flex items-center justify-center text-white font-bold">
                    {appointment.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {appointment.name}
                    </p>
                    <p className="text-gray-400 text-sm">{appointment.phone}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="text-gray-600 text-sm">{appointment.time}</div>

                {/* Status + Actions */}
                <div className="flex items-center justify-between">
                  <span className="px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm">
                    {appointment.status}
                  </span>

                  <div className="flex items-center gap-3">
                    <button className="bg-gray-200 p-2 rounded-lg">
                      <Pencil size={16} className="text-gray-600" />
                    </button>

                    <button
                      onClick={() => setOpenId(isOpen ? null : appointment.id)}
                      className="text-indigo-500"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${
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
                  <h3 className="text-center font-medium text-gray-700 mb-6">
                    Booking Order
                  </h3>

                  <div className="flex justify-between items-center relative mb-6">
                    {/* Line */}
                    <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-300" />

                    {[1, 2, 3].map((step) => (
                      <div
                        key={step}
                        className="relative flex flex-col items-center"
                      >
                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm z-10">
                          {step}
                        </div>

                        <span className="mt-2 text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                          To Do
                        </span>

                        <div className="mt-3 text-center text-sm">
                          <p className="text-gray-500">12:00-12:05</p>
                          <p className="font-medium text-gray-800">Shampoo</p>
                          <p className="text-gray-400">Angelica</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <button className="px-6 py-3 bg-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-300 transition">
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
