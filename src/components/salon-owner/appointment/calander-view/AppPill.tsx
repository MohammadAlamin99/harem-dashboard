// import {
//   AppStatus,
//   CalAppointment,
// } from "@/@types/salon-owner/CalAppointment.type";

// export default function AppPill({
//   appt,
//   onClick,
//   statusColor,
// }: {
//   appt: CalAppointment;
//   onClick: (appt: CalAppointment, e: React.MouseEvent) => void;
//   statusColor?: Record<AppStatus, { bg: string; text: string; border: string }>;
//   compact?: boolean;
// }) {
//   const c = statusColor?.[appt.status] ?? {
//     bg: "bg-gray-100",
//     text: "text-gray-700",
//     border: "border-gray-300",
//   };

//   return (
//     <div
//       onClick={(e) => onClick(appt, e)}
//       className={`${c.bg} ${c.text} border-l-2 ${c.border} w-[95%] mx-auto flex justify-center items-center h-full rounded-[0px_0px_4px_4px] px-2.5 py-0.5 cursor-pointer hover:opacity-90 transition-opacity overflow-hidden`}
//     >
//       <p className={`font-manrope text-sm font-semibold truncate`}>
//         {appt.service} &nbsp;({appt.clientName}) - ...
//       </p>
//     </div>
//   );
// }
import {
  AppStatus,
  CalAppointment,
} from "@/@types/salon-owner/CalAppointment.type";

export default function AppPill({
  appt,
  onClick,
  statusColor,
  compact = false,
}: {
  appt: CalAppointment;
  onClick: (appt: CalAppointment, e: React.MouseEvent) => void;
  statusColor?: Record<AppStatus, { bg: string; text: string; border: string }>;
  compact?: boolean;
}) {
  const c = statusColor?.[appt.status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-l-gray-300",
  };

  return (
    <div
      onClick={(e) => onClick(appt, e)}
      className={`
        ${c.bg} ${c.text} ${c.border}
        border-l-[4px] rounded-[0px_8px_8px_0px]
        w-full h-full
        flex items-center
        px-2.5 py-0.5
        cursor-pointer hover:opacity-90
        transition-opacity overflow-hidden
      `}
    >
      <p
        className={`
        font-manrope font-semibold truncate leading-tight text-sm
      `}
      >
        {appt.service}&nbsp;
        <span className="font-normal font-manrope opacity-80">({appt.clientName})</span>
      </p>
    </div>
  );
}
