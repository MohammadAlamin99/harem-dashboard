"use client";
import { memo } from "react";
import StylistCard from "./StylistCard";
import ServiceRowComponent from "./ClientViewService";
import ClientPreferedTime from "./ClientPreferedTime";

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

const ServiceRow = memo(ServiceRowComponent);
ServiceRow.displayName = "ServiceRow";

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
        "w-full bg-white rounded-xl border border-[#E8EBF0] p-5 sm:p-6 lg:p-[30px]",
        className,
      ].join(" ")}
    >
      <div className="space-y-6">
        {/* Title */}
        <h2 className="text-[22px] font-semibold text-[#29343D] tracking-tight">
          {title}
        </h2>

        {/* Stylists */}
        <div>
          <p className="text-[18px] font-manrope font-semibold text-[#29343D] mb-3">
            {stylistSectionLabel}
          </p>

          {stylists.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {stylists.map((s) => (
                <StylistCard
                  key={s.id}
                  stylist={s}
                  onDelete={() => onDeleteStylist?.(s.id)}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No stylists found</p>
          )}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Services */}
          <div className="flex-1">
            <p className="text-[18px] font-manrope font-semibold text-[#29343D] mb-3">
              {servicesSectionLabel}
            </p>

            {services.length ? (
              <div className="flex flex-col gap-4">
                {services.map((svc) => (
                  <ServiceRow key={svc.rank} service={svc} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No services available</p>
            )}
          </div>

          {/* Preferred Times */}
          <div className="w-full lg:w-[264px]">
            <ClientPreferedTime
              label={timeSectionLabel}
              times={preferredTimes}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
