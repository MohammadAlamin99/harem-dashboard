"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, MoreVertical, Eye, Pencil, Trash2 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type GiftCardStatus = "Used" | "No-Used" | "Active";

interface GiftCard {
  id: number;
  amount: string;
  code: string;
  image: string;
  statuses: GiftCardStatus[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const giftCards: GiftCard[] = [
  {
    id: 1,
    amount: "€ 200",
    code: "#002",
    image: "/images/giftimg.png",
    statuses: ["Used"],
  },
  {
    id: 2,
    amount: "€ 200",
    code: "#002",
    image: "/images/giftimg.png",
    statuses: ["No-Used", "Active"],
  },
  {
    id: 3,
    amount: "€ 200",
    code: "#002",
    image: "/images/giftimg.png",
    statuses: ["No-Used", "Active"],
  },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────

const statusStyles: Record<GiftCardStatus, string> = {
  Used: "bg-[#E8F8EF] text-[#36C76C]",
  "No-Used": "bg-[#FFF9E5] text-[#FFD648] border border-[#FFD648]",
  Active: "border border-[#16CDC7] text-[#16CDC7]",
};

function StatusBadge({ status }: { status: GiftCardStatus }) {
  return (
    <span
      className={`text-xs font-medium px-3 py-1 rounded-full font-manrope ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

// ─── Gift Card Item ───────────────────────────────────────────────────────────

function GiftCardItem({ card }: { card: GiftCard }) {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div className="bg-white border border-[#E0E6EB] rounded-2xl p-4 flex flex-col gap-3 relative">
      {/* Top row: amount + menu */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#29343D] font-bold font-manrope text-base">
            {card.amount}
          </p>
          <p className="text-[#9CA3AF] text-xs font-manrope">{card.code}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu((p) => !p)}
            className="text-[#9CA3AF] hover:text-[#29343D] transition-colors p-1"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[120px]">
              <button
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
              >
                <Eye className="w-4 h-4 text-[#635BFF]" />
                View
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
              >
                <Pencil className="w-4 h-4 text-[#635BFF]" />
                Edit
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#FFF0F0] transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gift card image */}
      <div className="relative w-full h-[160px] rounded-xl overflow-hidden">
        <Image src={card.image} alt="Gift Card" fill className="object-cover" />
      </div>

      {/* Status badges */}
      <div className="flex items-center gap-2 flex-wrap">
        {card.statuses.map((s) => (
          <StatusBadge key={s} status={s} />
        ))}
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  iconBg: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatCard({ iconBg, icon, label, value }: StatCardProps) {
  return (
    <div className="flex-1 border border-[#E0E6EB] rounded-2xl px-6 py-4 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
        >
          {icon}
        </div>
        <span className="text-[#526B7A] font-medium font-manrope text-sm">
          {label}
        </span>
      </div>
      <p className="text-[#29343D] font-bold font-manrope text-xl">{value}</p>
    </div>
  );
}

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function GiftCards() {
  return (
    <div className="bg-white rounded-2xl border border-[#E0E6EB] p-6 font-manrope">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[#29343D] font-semibold text-xl font-manrope">
          Gifts Cards
        </h2>
        <button className="flex items-center gap-1.5 bg-[#EBEAFF] text-[#635BFF] px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#635BFF] hover:text-white transition-colors">
          <Plus className="w-4 h-4" />
          Add Gift Card
        </button>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-6">
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
          <GiftCardItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
