import React from "react";
import { ChevronLeft, House } from "lucide-react";

export default function PageHeader({
  title,
  onBack,
  breadcrumb = [],
}: {
  title: string;
  onBack?: () => void;
  breadcrumb?: { label: string; active: boolean }[];
}) {
  return (
    <div className="bg-white md:mb-0 mb-[16px] px-6 py-3.5 flex items-center justify-between border-b border-[#EFF4FA] rounded-xl flex-wrap gap-3">
      {/* Left side: Back button and title */}
      <div className="flex items-center gap-2 text-sm text-[#29343D]">
        {onBack && (
          <button
            onClick={onBack}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <ChevronLeft size={16} className="text-[#635BFF]" />
          </button>
        )}
        <span className="font-semibold">{title}</span>
      </div>

      {/* Right side: Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#98A4AE]">
        {breadcrumb.length > 0 && (
          <>
            <House size={15} />
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                <span className="text-[#29343D]">/</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-md ${
                    item.active
                      ? "text-[#635BFF] font-medium bg-[#EEEEFF]"
                      : "text-[#98A4AE]"
                  }`}
                >
                  {item.label}
                </span>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
