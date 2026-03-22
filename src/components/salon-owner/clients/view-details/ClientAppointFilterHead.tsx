"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DateFilterOption =
  | "Last 7 days"
  | "Last 14 days"
  | "Last Month"
  | "Last 3 Months"
  | "Custom Range";

type StatusFilterOption =
  | "All"
  | "Booked"
  | "Confirmed"
  | "Arrived"
  | "Started"
  | "Completed"
  | "Canceled"
  | "No-show";

const dateOptions: DateFilterOption[] = [
  "Last 7 days",
  "Last 14 days",
  "Last Month",
  "Last 3 Months",
  "Custom Range",
];

const statusOptions: StatusFilterOption[] = [
  "All",
  "Booked",
  "Confirmed",
  "Arrived",
  "Started",
  "Completed",
  "Canceled",
  "No-show",
];

export default function ClientAppointFilterHead() {
  const [minVal, setMinVal] = useState<number>(0);
  const [maxVal, setMaxVal] = useState<number>(200);
  const [dateFilter, setDateFilter] =
    useState<DateFilterOption>("Last 7 days");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilterOption>("All");
  const [showDateDrop, setShowDateDrop] = useState<boolean>(false);
  const [showStatusDrop, setShowStatusDrop] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setMinVal(value[0]);
      setMaxVal(value[1]);
    }
  };

  const handleDateOptionClick = (o: DateFilterOption) => {
    setDateFilter(o);
    setShowDateDrop(false);
    if (o === "Custom Range") setShowCalendar(true);
  };

  const handleDateSelect = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) setShowCalendar(false);
  };

  const dateBtnLabel =
    dateFilter === "Custom Range" && startDate && endDate
      ? `${startDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })} – ${endDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })}`
      : dateFilter;

  return (
    <div className="bg-white font-manrope mb-[30px] mt-3">
      {/* Slider */}
      <div className="flex justify-end mb-3 px-4 sm:px-6 lg:px-60">
        <div className="w-full sm:w-72 lg:w-56">
          <Slider
            range
            min={0}
            max={200}
            value={[minVal, maxVal]}
            onChange={handleRangeChange}
            styles={{
              track: {
                backgroundColor: "#635BFF",
                height: 8,
                borderRadius: 999,
              },
              rail: {
                backgroundColor: "#DDD9FF",
                height: 8,
                borderRadius: 999,
              },
              handle: {
                backgroundColor: "#635BFF",
                borderColor: "#635BFF",
                width: 16,
                height: 16,
                marginTop: -5,
                opacity: 1,
                cursor: "grab",
              },
            }}
          />
        </div>
      </div>

      {/* Main Row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-center">
        {/* Title */}
        <h2 className="text-[#29343D] font-semibold text-lg sm:text-xl md:text-[22px] whitespace-nowrap">
          Appointments
        </h2>

        <div className="flex flex-col gap-3 w-full lg:w-auto lg:flex-row lg:items-center lg:gap-[20px]">
          {/* Amount */}
          <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#9CA3AF]">
            <span className="whitespace-nowrap">Amount Spent</span>

            <div className="flex items-center border border-[#DDE1E7] rounded-lg px-3 py-2 bg-white w-full sm:w-24">
              <span className="mr-1">€</span>
              <span>{minVal}</span>
            </div>

            <span>-</span>

            <div className="flex items-center border border-[#DDE1E7] rounded-lg px-3 py-2 bg-white w-full sm:w-24">
              <span className="mr-1">€</span>
              <span>{maxVal}</span>
            </div>
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col gap-2 w-full sm:flex-row sm:items-center sm:gap-4">
            {/* Date */}
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => {
                  setShowDateDrop((prev) => !prev);
                  setShowStatusDrop(false);
                  setShowCalendar(false);
                }}
                className="flex w-full sm:w-auto justify-between items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#29343D] font-medium hover:border-[#635BFF] bg-white"
              >
                {dateBtnLabel}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>

              {showDateDrop && (
                <div className="absolute right-0 left-0 sm:left-auto top-full mt-1 bg-white rounded-lg shadow-lg border z-30 min-w-[160px]">
                  {dateOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => handleDateOptionClick(o)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA]
                      ${dateFilter === o
                          ? "text-[#635BFF] font-semibold"
                          : ""
                        }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}

              {showCalendar && (
                <div className="absolute right-0 left-0 sm:left-auto top-full mt-1 z-40 bg-white rounded-xl shadow-xl border p-4 overflow-auto">
                  <div className="custom-cal">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateSelect}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      monthsShown={2}
                      inline
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDrop((prev) => !prev);
                  setShowDateDrop(false);
                  setShowCalendar(false);
                }}
                className="flex w-full sm:w-auto justify-between items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#29343D] font-medium hover:border-[#635BFF] bg-white"
              >
                {statusFilter}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>

              {showStatusDrop && (
                <div className="absolute right-0 left-0 sm:left-auto top-full mt-1 bg-white rounded-xl shadow-lg border z-30 min-w-[140px]">
                  {statusOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setStatusFilter(o);
                        setShowStatusDrop(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA]
                      ${statusFilter === o
                          ? "text-[#635BFF] font-semibold"
                          : ""
                        }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}