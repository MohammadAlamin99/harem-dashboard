import { ChevronDown } from "lucide-react";

export default function Select({
  value,
  placeholder,
  disabled,
}: {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border border-[#E2E8F0] rounded-[8px] px-3 py-2.5 bg-white text-sm font-manrope cursor-pointer ${
        disabled ? "bg-[#F4F6FA] text-[#B9C3CC]" : "text-[#29343D]"
      }`}
    >
      <span className={value ? "text-[#29343D]" : "text-[#B9C3CC]"}>
        {value || placeholder}
      </span>
      <ChevronDown size={16} className="text-[#B9C3CC]" />
    </div>
  );
}
