import { Appointment } from "@/@types/salon-owner/Appointment.type";
import React from "react";

export default function ExpandedRowDetail({ row }: { row: Appointment }) {
  const steps = getSteps(row.status);
  const showReceipt = row.status === "Started" || row.status === "Completed";

  return (
    <tr className="bg-[#F9FAFB]">
      <td colSpan={7} className="px-6 py-8 border-b border-[#E0E6EB]">
        {/* Title */}
        <p className="text-base font-bold font-manrope text-[#29343D] mb-4 text-center tracking-tight">
          Booking Order
        </p>

        {/* Stepper — circles connected by full-width lines */}
        <div className="max-w-[361px] mx-auto">
          {/* Top row: line + circles */}
          <div className="flex items-center justify-center px-4">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Circle */}
                <div className="flex-shrink-0">
                  <StepIcon state={step.state} index={idx} />
                </div>
                {/* Full connector line between circles */}
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] ${stepLineColor(step.state)}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Bottom row: labels under each circle */}
          <div className="flex items-start justify-between mt-3">
            {steps.map((step, idx) => {
              const badge = stepBadge(step.state);
              return (
                <div key={idx} className="flex flex-col items-center">
                  <span
                    className={`px-2.5 py-0.5 rounded-[8px] text-[11px] font-semibold font-manrope whitespace-nowrap ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                  <p className="mt-2 text-[11px] font-manrope text-[#9CA3AF] text-center">
                    {step.time}
                  </p>
                  <p className="mt-0.5 text-[12px] font-bold font-manrope text-[#1A2332] text-center">
                    {step.service}
                  </p>
                  <p className="mt-0.5 text-[11px] font-manrope text-[#9CA3AF] text-center">
                    {step.staff}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Print Receipt */}
        {showReceipt && (
          <div className="flex justify-center mt-8">
            <button className="px-10 py-3 bg-[#DDDCFF] hover:bg-[#c9c8ff] text-[#635BFF] text-sm font-semibold font-manrope rounded-2xl transition-colors cursor-pointer tracking-wide">
              Print Receipt
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
