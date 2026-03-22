"use client";
import { Plus } from "lucide-react";
import { StatCard } from "./StatCard";
import { GiftCard } from "@/@types/salon-owner/GiftCardStatus.type";
import { Gift } from "./Gift";

//  Data 
const giftCards: GiftCard[] = [
  {
    id: 1,
    amount: "€ 200",
    code: "#002",
    image: "/images/gift01.png",
    statuses: ["Used"],
  },
  {
    id: 2,
    amount: "€ 200",
    code: "#002",
    image: "/images/gift02.png",
    statuses: ["No-Used", "Active"],
  },
  {
    id: 3,
    amount: "€ 200",
    code: "#002",
    image: "/images/gift02.png",
    statuses: ["No-Used", "Active"],
  },
];


function WalletIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="3"
        stroke="white"
        strokeWidth="1.8"
      />
      <path d="M16 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" fill="white" />
      <path d="M2 9h20" stroke="white" strokeWidth="1.8" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GiftCards() {
  return (
    <div className="bg-white rounded-xl border border-[#E0E6EB] 
    md:p-[30px] p-[15px] font-manrope">
      {/* Header */}
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[#29343D] font-semibold text-[22px] font-manrope">
          Gifts Cards
        </h2>
        <button className="flex items-center gap-1.5 cursor-pointer
         bg-[#DDDBFF] text-[#635BFF] px-4 py-2 rounded-lg text-sm
         font-medium hover:bg-[#635BFF] hover:text-white transition-colors">
          <Plus className="w-4 h-4" />
          Add Gift Card
        </button>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-7">
        <StatCard
          iconBg="bg-[#36C76C]"
          icon={<WalletIcon />}
          label="Total to Still Spend"
          value="€ 540"
        />
        <StatCard
          iconBg="bg-[#FFD648]"
          icon={<TagIcon />}
          label="Total Used"
          value="€ 1,440"
        />
      </div>

      {/* Gift Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {giftCards.map((card) => (
          <Gift key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
