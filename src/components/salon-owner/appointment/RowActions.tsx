import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function RowActions() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 hover:bg-[#F4F6FA] rounded-lg transition-colors cursor-pointer"
      >
        <EllipsisVertical size={16} className="text-[#526B7A]" />
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-[#F0F2F5] py-1.5 w-44">
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
          >
            <Eye size={15} className="text-[#635BFF] flex-shrink-0" />
            View Details
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#F8F9FA] transition-colors cursor-pointer"
          >
            <Pencil size={15} className="text-[#526B7A] flex-shrink-0" />
            Edit
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-manrope font-medium text-[#29343D] hover:bg-[#FFF5F7] transition-colors cursor-pointer"
          >
            <Trash2 size={15} className="text-[#FF6692] flex-shrink-0" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
