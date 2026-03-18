import { PreferredTime } from "./Preferencesbehavior";

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════════════ */
const DOT_BORDER = {
  purple: "#635BFF",
  teal: "#16CDC7",
  green: "#36C76C",
  yellow: "#635BFF",
  pink: "#FF6692",
} as const;

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
export default function ClientPreferedTime({
  label,
  times,
}: {
  label: string;
  times: PreferredTime[];
}) {
  const DOT_SIZE = 13;

  return (
    <div className="flex-1 min-w-[260px]">
      {/* Title */}
      <p className="text-[18px] font-manrope font-medium text-[#29343D] mb-3">
        {label}
      </p>

      {/* Content */}
      {times.length ? (
        <div className="border border-[#E8EBF0] rounded-xl p-[15px] md:p-[30px_60px_30px_30px]">
          <div className="relative">
            {times.map((entry, i) => {
              const isLast = i === times.length - 1;

              return (
                <div
                  key={`${entry.day}-${i}`}
                  className="flex items-center relative gap-4 pb-6"
                >
                  {/* Time */}
                  <span className="font-semibold text-sm text-[#29343D] tabular-nums">
                    {entry.time}
                  </span>

                  {/* Dot + Line */}
                  <div
                    className="rounded-full border-2 bg-white relative z-10 flex items-center justify-center"
                    style={{
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderColor: DOT_BORDER[entry.color],
                    }}
                  >
                    {/* Vertical Line */}
                    <div
                      className="w-[1px] absolute left-1/2 -translate-x-1/2 top-full bg-[#E8EBF0]"
                      style={{
                        height: isLast ? "20px" : "34px",
                      }}
                    />
                  </div>

                  {/* Day */}
                  <span className="font-semibold text-[#29343D] font-manrope text-[14px]">
                    {entry.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-400">No preferred times</p>
      )}
    </div>
  );
}
