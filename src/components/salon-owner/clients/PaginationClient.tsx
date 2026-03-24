import {
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
type Props<T> = {
  ippRef: React.RefObject<HTMLDivElement | null>;
  setIppOpen: (open: boolean | ((o: boolean) => boolean)) => void;
  itemsPerPage: number;
  ippOpen: boolean;
  ITEMS_PER_PAGE_OPTIONS: number[];
  setItemsPerPage: (n: number) => void;
  currentPage: number;
  setCurrentPage: (page: number | ((p: number) => number)) => void;
  totalPages: number;
  start: number;
  filtered: T[];
  margin?: boolean;
};

export default function PaginationClient<T>({
  ippRef,
  setIppOpen,
  itemsPerPage,
  ippOpen,
  ITEMS_PER_PAGE_OPTIONS,
  setItemsPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  start,
  filtered,
  margin
}: Props<T>) {
  return (
    <div>
      <div
        className={`${margin ? "mx-4 md:mx-[30px]" : ""} mb-[30px] py-4 flex flex-wrap md:flex-nowrap items-center
       md:justify-end justify-between gap-4 border-t-0 border-b border-l 
       border-r rounded-[0_0_8px_8px] border-[#E0E6EB] px-[15px] md:px-[30px]`}
      >
        {/* Items per page */}
        <div className="flex items-center gap-2 text-sm text-[#29343D]">
          <span className="whitespace-nowrap">Items per page:</span>

          <div ref={ippRef} className="relative">
            <button
              onClick={() => setIppOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E0E6EB] rounded-lg text-sm text-[#29343D] font-semibold hover:border-[#635BFF] transition-colors cursor-pointer bg-white"
            >
              {itemsPerPage}

              <ChevronDown
                size={13}
                className={`text-[#98A4AE] transition-transform ${ippOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {ippOpen && (
              <div className="absolute bottom-full left-0 mb-1 bg-white rounded-xl shadow-lg z-10 py-1 overflow-hidden w-20">
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      setItemsPerPage(n);
                      setCurrentPage(1);
                      setIppOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm cursor-pointer transition-colors ${itemsPerPage === n
                      ? "bg-[#F0EEFF] text-[#29343D] font-semibold"
                      : "text-[#29343D] hover:bg-[#F4F6FA]"
                      }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Page info */}
        <span className="text-sm text-[#526B7A] w-full md:w-auto text-center md:text-left order-3 md:order-none">
          {start + 1}-{Math.min(start + itemsPerPage, filtered.length)} of{" "}
          {filtered.length}
        </span>

        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          {[
            {
              icon: <ChevronFirst size={15} />,
              action: () => setCurrentPage(1),
              disabled: currentPage === 1,
            },
            {
              icon: <ChevronLeft size={15} />,
              action: () => setCurrentPage((p) => p - 1),
              disabled: currentPage === 1,
            },
            {
              icon: <ChevronRight size={15} />,
              action: () => setCurrentPage((p) => p + 1),
              disabled: currentPage === totalPages,
            },
            {
              icon: <ChevronLast size={15} />,
              action: () => setCurrentPage(totalPages),
              disabled: currentPage === totalPages,
            },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              disabled={btn.disabled}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${btn.disabled
                ? "text-[#C4CDD5] cursor-not-allowed"
                : "text-[#526B7A] hover:bg-[#F4F6FA]"
                }`}
            >
              {btn.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
