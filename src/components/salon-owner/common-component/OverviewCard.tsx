import React from "react";

type Props = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  bgGradient: string;
  iconBg: string;
  extra?: string[];
};

export default function OverviewCard({
  title,
  value,
  icon,
  bgGradient,
  iconBg,
  extra = [],
}: Props) {
  return (
    <div
      className={`w-full max-w-sm p-6 rounded-lg font-manrope bg-gradient-to-t ${bgGradient}`}
    >
      <div className="flex items-center space-x-4">
        {/* Icon */}
        <div
          className={`w-[40px] h-[40px] ${iconBg} rounded-xl flex items-center justify-center text-white text-xl`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
      </div>

      {/* Value */}
      <div className="mt-4 text-[28px] font-semibold text-gray-800">
        {value}
      </div>

      {/* Extra Info */}
      <div className="mt-2 text-[13px] text-[#29343D] font-semibold">
        {extra.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
