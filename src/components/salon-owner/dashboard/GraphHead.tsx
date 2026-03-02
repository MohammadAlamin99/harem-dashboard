import { ChevronDown } from "lucide-react";

export default function GraphHead({
  selected,
  setSelected,
  setOpen,
  open,
  options,
  title,
  subtitle,
}: {
  selected: string;
  setSelected: (value: string) => void;
  setOpen: (value: boolean) => void;
  open: boolean;
  options: string[];
  title: string;
  subtitle: string;
}) {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#1E293B] font-manrope">
            {title}
          </h2>
          <p className="text-sm text-[#94A3B8] font-manrope">{subtitle}</p>
        </div>

        <div className="flex gap-3">
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="px-4 py-2 flex items-center gap-2.5 font-manrope rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              {selected}
              <ChevronDown width={16} height={16} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-md z-20">
                {options.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelected(item);
                      setOpen(false);
                    }}
                    className="font-manrope block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export */}
          <button className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 text-sm font-medium font-manrope cursor-pointer">
            Export Data
          </button>
        </div>
      </div>
    </>
  );
}
