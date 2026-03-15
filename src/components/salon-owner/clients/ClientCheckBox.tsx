import { Check } from "lucide-react";

export default function Checkbox({
  checked,
  indeterminate = false,
  onChange,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: () => void;
}) {
  return (
    <button
      onClick={onChange}
      className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all cursor-pointer shrink-0 ${
        checked || indeterminate
          ? "bg-[#635BFF] border-[#635BFF]"
          : "border-[#CACFD8] bg-white hover:border-[#635BFF]"
      }`}
    >
      {checked && <Check size={11} strokeWidth={3} className="text-white" />}
      {!checked && indeterminate && (
        <span className="w-2.5 h-0.5 bg-white rounded-full block" />
      )}
    </button>
  );
}
