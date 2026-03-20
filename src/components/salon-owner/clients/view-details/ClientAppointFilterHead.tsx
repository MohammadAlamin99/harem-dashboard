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
  const [dateFilter, setDateFilter] = useState<DateFilterOption>("Last 7 days");
  const [statusFilter, setStatusFilter] = useState<StatusFilterOption>("All");
  const [showDateDrop, setShowDateDrop] = useState<boolean>(false);
  const [showStatusDrop, setShowStatusDrop] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar on outside click
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
    if (o === "Custom Range") {
      setShowCalendar(true);
    }
  };

  const handleDateSelect = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) setShowCalendar(false);
  };

  // Button label: show selected range if picked, otherwise show filter name
  const dateBtnLabel =
    dateFilter === "Custom Range" && startDate && endDate
      ? `${startDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })} – ${endDate.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}`
      : dateFilter;

  return (
    <div className="bg-white font-manrope mb-[30px] mt-3">
      {/* ── Row 1: Slider centered on top ── */}
      <div className="flex justify-end mb-3 px-60">
        <div className="w-56">
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

      {/* ── Row 2: Title | Amount Spent + labels | Dropdowns ── */}
      <div className="flex justify-between items-center">
        {/* Left: Title */}
        <h2 className="text-[#29343D] font-manrope font-semibold text-lg md:text-[22px] whitespace-nowrap">
          Appointments
        </h2>

        <div className="flex items-center gap-[20px]">
          {/* Center: Amount Spent label + bordered € value boxes */}
          <div className="flex font-manrope items-center gap-2 text-[12px] text-[#9CA3AF]">
            <span className="font-manrope whitespace-nowrap">Amount Spent</span>
            <div className="flex items-center border border-[#DDE1E7] rounded-lg px-3 py-2 bg-white w-24">
              <span className="mr-1">€</span>
              <span>{minVal}</span>
            </div>
            <span>-</span>
            <div className="flex items-center border border-[#DDE1E7] rounded-lg px-3 py-2 bg-white w-24">
              <span className="mr-1">€</span>
              <span>{maxVal}</span>
            </div>
          </div>

          {/* Right: Dropdowns */}
          <div className="flex items-center gap-4">
            {/* Date dropdown + calendar */}
            <div className="relative" ref={calendarRef}>
              <button
                onClick={() => {
                  setShowDateDrop((prev) => !prev);
                  setShowStatusDrop(false);
                  setShowCalendar(false);
                }}
                className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
              >
                {dateBtnLabel}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>

              {/* Normal dropdown */}
              {showDateDrop && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-1 z-30 min-w-[160px]">
                  {dateOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => handleDateOptionClick(o)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors
                      ${dateFilter === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}

              {/* Calendar — opens only when Custom Range is selected */}
              {showCalendar && (
                <div className="absolute right-0 top-full mt-1 z-40 bg-white rounded-xl shadow-xl border border-[#E5E7EB] p-4">
                  <style>{`
                    .custom-cal .react-datepicker {
                      border: none;
                      font-family: 'Manrope', sans-serif;
                      display: flex;
                      gap: 24px;
                    }
                    .custom-cal .react-datepicker__header {
                      background: white;
                      border-bottom: none;
                      padding-top: 0;
                    }
                    .custom-cal .react-datepicker__current-month {
                      font-size: 15px;
                      font-weight: 600;
                      color: #29343D;
                      margin-bottom: 12px;
                    }
                    .custom-cal .react-datepicker__day-name {
                      color: #9CA3AF;
                      font-size: 12px;
                      width: 36px;
                      line-height: 36px;
                    }
                    .custom-cal .react-datepicker__day {
                      width: 36px;
                      line-height: 36px;
                      border-radius: 50%;
                      font-size: 13px;
                      color: #29343D;
                    }
                    .custom-cal .react-datepicker__day:hover {
                      background-color: #EBEAFF;
                      color: #635BFF;
                      border-radius: 50%;
                    }
                    .custom-cal .react-datepicker__day--selected,
                    .custom-cal .react-datepicker__day--range-start,
                    .custom-cal .react-datepicker__day--range-end {
                      background-color: #635BFF !important;
                      color: white !important;
                      border-radius: 50% !important;
                    }
                    .custom-cal .react-datepicker__day--in-range {
                      background-color: #EBEAFF;
                      color: #635BFF;
                      border-radius: 50%;
                    }
                    .custom-cal .react-datepicker__day--in-selecting-range {
                      background-color: #EBEAFF;
                      color: #635BFF;
                      border-radius: 50%;
                    }
                    .custom-cal .react-datepicker__day--outside-month {
                      color: #D1D5DB;
                    }
                    .custom-cal .react-datepicker__navigation-icon::before {
                      border-color: #9CA3AF;
                    }
                    .custom-cal .react-datepicker__month-container {
                      float: none;
                    }
                  `}</style>
                  <div className="custom-cal">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateSelect}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      monthsShown={2}
                      inline
                      calendarStartDay={0}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDrop((prev) => !prev);
                  setShowDateDrop(false);
                  setShowCalendar(false);
                }}
                className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-2 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
              >
                {statusFilter}
                <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
              </button>
              {showStatusDrop && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-1 z-30 min-w-[140px]">
                  {statusOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => {
                        setStatusFilter(o);
                        setShowStatusDrop(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors
                      ${statusFilter === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
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
