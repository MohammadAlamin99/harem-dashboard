import ICalaender from "@/app/account-protal/svg/ICalaender";
import { CalendarDays, Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ActionDropdown({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const actions = [
    {
      label: "View Details",
      icon: <Eye size={20} className="text-[#635BFF]" />,
    },
    {
      label: "Book now",
      icon: <ICalaender color="#36C76C" size={20} />,
    },
    { label: "Edit", icon: <Pencil size={16} className="text-[#46CAEB]" /> },
    {
      label: "Delete",
      icon: <Trash2 size={16} className="text-[#FF6692]" />,
      danger: true,
    },
  ];

  return (
    <div ref={ref} className="relative flex justify-center">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors cursor-pointer"
      >
        <MoreVertical size={17} className="text-[#29343D]" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-[#E8ECF0] rounded-2xl shadow-2xl z-30 py-2 w-44 overflow-hidden">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => setOpen(false)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-manrope transition-colors cursor-pointer ${
                a.danger
                  ? "text-[#29343D] hover:bg-red-50"
                  : "text-[#29343D] hover:bg-[#F4F6FA]"
              }`}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
