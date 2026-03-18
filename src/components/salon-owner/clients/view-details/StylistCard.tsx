"use client";

import { memo } from "react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { Stylist } from "./Preferencesbehavior";

interface Props {
  stylist: Stylist;
  onDelete?: () => void;
}

const StylistCard = ({ stylist, onDelete }: Props) => {
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 border border-[#E0E6EB] rounded-xl p-[15px] md:p-[30px] bg-white w-full min-w-0">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        aria-label="Delete stylist"
        className="absolute top-7 right-7 hover:opacity-70 active:scale-90 transition-all duration-150 focus:outline-none"
      >
        <Trash color="#FF6692" size={20} />
      </button>

      {/* Avatar */}
      <div
        className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
        style={{ background: stylist.avatarBg ?? "#f0e8ff" }}
      >
        <Image
          src={stylist.avatarUrl || "/images/default-avatar.png"}
          alt={stylist.name}
          width={80}
          height={80}
          sizes="80px"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col items-center gap-0.5 text-center">
        <span className="text-[15px] font-semibold text-[#29343D] leading-snug">
          {stylist.name}
        </span>
        <span className="text-[12.5px] text-[#98A4AE]">{stylist.role}</span>
      </div>
    </div>
  );
};

export default memo(StylistCard);
