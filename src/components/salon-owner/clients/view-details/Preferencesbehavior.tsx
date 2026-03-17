"use client";

import Image from "next/image";

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
export interface Stylist {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  avatarBg?: string;
}

export interface BookedService {
  rank: number;
  label: string;
}

export interface PreferredTime {
  time: string;
  day: string;
  /** dot color: "purple" | "teal" | "green" | "yellow" | "pink" */
  color: "purple" | "teal" | "green" | "yellow" | "pink";
}

export interface PreferencesBehaviorProps {
  title?: string;
  stylistSectionLabel?: string;
  stylists?: Stylist[];
  servicesSectionLabel?: string;
  services?: BookedService[];
  timeSectionLabel?: string;
  preferredTimes?: PreferredTime[];
  onDeleteStylist?: (id: string) => void;
  className?: string;
}

/* ══════════════════════════════════════════════════════════════
   DOT COLORS
══════════════════════════════════════════════════════════════ */
const DOT_COLOR: Record<PreferredTime["color"], string> = {
  purple: "bg-purple-400",
  teal: "bg-teal-400",
  green: "bg-green-400",
  yellow: "bg-yellow-400",
  pink: "bg-pink-400",
};

/* ══════════════════════════════════════════════════════════════
   TRASH ICON
══════════════════════════════════════════════════════════════ */
const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F87171"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   STYLIST CARD
══════════════════════════════════════════════════════════════ */
const StylistCard = ({
  stylist,
  onDelete,
}: {
  stylist: Stylist;
  onDelete?: () => void;
}) => (
  <div
    className="relative flex flex-col items-center justify-center gap-2
                  border border-[#E8EBF4] rounded-2xl pt-8 pb-6 px-6 bg-white flex-1 min-w-0"
  >
    {/* Delete */}
    <button
      onClick={onDelete}
      className="absolute top-3.5 right-3.5 hover:opacity-70 active:scale-90
                 transition-all duration-150 focus:outline-none"
    >
      <TrashIcon />
    </button>

    {/* Avatar */}
    <div
      className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
      style={{ background: stylist.avatarBg ?? "#f0e8ff" }}
    >
      <Image
        src={stylist.avatarUrl}
        alt={stylist.name}
        width={80}
        height={80}
        className="object-cover w-full h-full"
      />
    </div>

    {/* Name + role */}
    <div className="flex flex-col items-center gap-0.5 text-center">
      <span className="text-[15px] font-semibold text-[#29343D] font-manrope leading-snug">
        {stylist.name}
      </span>
      <span className="text-[12.5px] text-[#98A4AE] font-manrope">
        {stylist.role}
      </span>
    </div>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   SERVICE ROW
══════════════════════════════════════════════════════════════ */
const ServiceRow = ({ service }: { service: BookedService }) => (
  <div className="flex items-center gap-4 bg-[#F3F5FB] rounded-xl px-4 py-4">
    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
      <span className="text-white text-[12px] font-bold font-manrope">
        {service.rank}
      </span>
    </div>
    <span className="text-[14px] font-medium text-[#29343D] font-manrope">
      {service.label}
    </span>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   PREFERRED TIME ROW
══════════════════════════════════════════════════════════════ */
const TimeRow = ({
  entry,
  isLast,
}: {
  entry: PreferredTime;
  isLast: boolean;
}) => (
  <div
    className={`flex items-center gap-4 py-3.5 ${!isLast ? "border-b border-[#F0F2F8]" : ""}`}
  >
    <span className="text-[13.5px] font-semibold text-[#29343D] font-manrope w-[80px] flex-shrink-0">
      {entry.time}
    </span>
    <span
      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${DOT_COLOR[entry.color]}`}
    />
    <span className="text-[13.5px] font-medium text-[#29343D] font-manrope">
      {entry.day}
    </span>
  </div>
);

/* ══════════════════════════════════════════════════════════════
   DEFAULT DATA
══════════════════════════════════════════════════════════════ */
const DEFAULT_STYLISTS: Stylist[] = [
  {
    id: "1",
    name: "Lola Ortega",
    role: "Staff",
    avatarUrl: "/images/avator.png",
    avatarBg: "#f9e8ee",
  },
  {
    id: "2",
    name: "Virgie Sutton",
    role: "Staff",
    avatarUrl: "/images/avator.png",
    avatarBg: "#e8eef9",
  },
  {
    id: "3",
    name: "Lois Gregory",
    role: "Staff",
    avatarUrl: "/images/avator.png",
    avatarBg: "#e8f9f5",
  },
];

const DEFAULT_SERVICES: BookedService[] = [
  { rank: 1, label: "Haircuts" },
  { rank: 2, label: "Coloring" },
  { rank: 3, label: "Treatments" },
];

const DEFAULT_TIMES: PreferredTime[] = [
  { time: "09:46 AM", day: "Monday", color: "purple" },
  { time: "10:00 AM", day: "Tuesday", color: "teal" },
  { time: "12:00 AM", day: "Thursday", color: "green" },
  { time: "09:30 AM", day: "Friday", color: "yellow" },
  { time: "09:30 AM", day: "Saturday", color: "pink" },
];

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function PreferencesBehavior({
  title = "Preferences & Behavior",
  stylistSectionLabel = "Preferred stylist/employee",
  stylists = DEFAULT_STYLISTS,
  servicesSectionLabel = "Services most frequently booked",
  services = DEFAULT_SERVICES,
  timeSectionLabel = "Preferred days/times",
  preferredTimes = DEFAULT_TIMES,
  onDeleteStylist,
  className = "",
}: PreferencesBehaviorProps) {
  return (
    <div
      className={[
        "font-manrope w-full bg-white rounded-2xl border border-[#E8EBF0] shadow-sm p-6",
        className,
      ].join(" ")}
    >
      {/* ── Page title ───────────────────────────────────── */}
      <h2 className="text-[22px] font-semibold text-[#29343D] mb-5 tracking-tight">
        {title}
      </h2>

      {/* ── Stylist section ──────────────────────────────── */}
      <p className="text-[14px] font-medium text-[#29343D] mb-3">
        {stylistSectionLabel}
      </p>

      <div className="flex gap-4 mb-8 flex-wrap">
        {stylists.map((s) => (
          <StylistCard
            key={s.id}
            stylist={s}
            onDelete={() => onDeleteStylist?.(s.id)}
          />
        ))}
      </div>

      {/* ── Bottom two-column section ─────────────────────── */}
      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Services */}
        <div className="flex-[2] min-w-0">
          <p className="text-[14px] font-medium text-[#29343D] mb-3">
            {servicesSectionLabel}
          </p>
          <div className="flex flex-col gap-3">
            {services.map((svc) => (
              <ServiceRow key={svc.rank} service={svc} />
            ))}
          </div>
        </div>

        {/* Preferred times */}
        <div className="flex-[1] min-w-[240px]">
          <p className="text-[14px] font-medium text-[#29343D] mb-3">
            {timeSectionLabel}
          </p>
          <div className="border border-[#E8EBF0] rounded-2xl px-5 py-1">
            {preferredTimes.map((entry, i) => (
              <TimeRow
                key={`${entry.day}-${i}`}
                entry={entry}
                isLast={i === preferredTimes.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
