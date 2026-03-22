"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BookingStep {
  num: number;
  status: "Overdue" | "To Do";
  time: string;
  service: string;
  staff: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const bookingSteps: BookingStep[] = [
  {
    num: 1,
    status: "Overdue",
    time: "12:00-12:05",
    service: "Shampoo",
    staff: "Angelica",
  },
  {
    num: 2,
    status: "To Do",
    time: "12:00-12:05",
    service: "Shampoo",
    staff: "Angelica",
  },
  {
    num: 3,
    status: "To Do",
    time: "12:00-12:05",
    service: "Shampoo",
    staff: "Angelica",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function ClientBooking() {
  return (
    <div className="w-[361px] max-w-full block mx-auto mt-4">
      <h3 className="text-center text-[#29343D] font-semibold font-manrope mb-4 text-sm">
        Booking Order
      </h3>

      <div className="relative flex justify-between items-start">
        {/* Connector Line */}
        <div className="absolute top-5 left-[calc(16.67%)] right-[calc(16.67%)] h-[2px] bg-[#B9C3CC]" />

        {bookingSteps.map((step) => {
          const isActive = step.status === "Overdue";
          return (
            <div
              key={step.num}
              className="relative z-10 flex flex-col items-center w-1/3"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-manrope font-medium
                  ${
                    isActive
                      ? "bg-[#FFF9E5] text-[#FFD648]"
                      : "bg-gray-500 text-white"
                  }`}
              >
                {step.num}
              </div>

              {/* Status Badge */}
              <span
                className={`mt-3 text-xs px-2 py-1 rounded-[8px] font-medium font-manrope
                  ${
                    isActive
                      ? "bg-[#FFF9E5] text-[#FFD648]"
                      : "bg-[#EFF4FA] text-[#0A2540]"
                  }`}
              >
                {step.status}
              </span>

              {/* Details */}
              <div className="mt-3 text-center">
                <p className="text-xs text-[#999] font-manrope">{step.time}</p>
                <p className="text-sm font-manrope text-[#29343D] font-semibold my-0.5">
                  {step.service}
                </p>
                <p className="text-xs text-[#999] font-manrope font-normal">
                  {step.staff}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ClientBooking;
