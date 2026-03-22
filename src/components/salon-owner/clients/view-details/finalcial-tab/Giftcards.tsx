"use client";

import { Plus } from "lucide-react";
import { StatCard } from "./StatCard";
import { GiftCard } from "@/@types/salon-owner/GiftCardStatus.type";
import { Gift } from "./Gift";

/* DATA */
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

/* ICONS */
function WalletIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.0037 4H9.9963C6.21809 4 4.32899 4 3.15525 5.17157C2.27661 6.04858 2.0557 7.32572 2.00016 9.49444C1.99304 9.77248 2.22121 9.99467 2.49076 10.0652C3.35074 10.2901 3.98521 11.0711 3.98521 12C3.98521 12.9289 3.35074 13.7099 2.49076 13.9348C2.22121 14.0053 1.99304 14.2275 2.00016 14.5056C2.0557 16.6743 2.27661 17.9514 3.15525 18.8284C4.32899 20 6.21809 20 9.9963 20H14.0037C17.7819 20 19.671 20 20.8448 18.8284C21.7234 17.9514 21.9443 16.6743 21.9998 14.5056C22.007 14.2275 21.7788 14.0053 21.5092 13.9348C20.6493 13.7099 20.0148 12.9289 20.0148 12C20.0148 11.0711 20.6493 10.2901 21.5092 10.0652C21.7788 9.99467 22.007 9.77248 21.9998 9.49444C21.9443 7.32572 21.7234 6.04858 20.8448 5.17157C19.671 4 17.7819 4 14.0037 4Z" stroke="white" strokeWidth="1.5" />
      <path d="M11.1459 10.0225C11.5259 9.34084 11.7159 9 12 9C12.2841 9 12.4741 9.34084 12.8541 10.0225L12.9524 10.1989C13.0603 10.3926 13.1143 10.4894 13.1985 10.5533C13.2827 10.6172 13.3875 10.641 13.5972 10.6884L13.7881 10.7316C14.526 10.8986 14.895 10.982 14.9828 11.2643C15.0706 11.5466 14.819 11.8407 14.316 12.429L14.1858 12.5812C14.0429 12.7483 13.9714 12.8319 13.9392 12.9353C13.9071 13.0387 13.9179 13.1502 13.9395 13.3733L13.9592 13.5763C14.0352 14.3612 14.0733 14.7536 13.8435 14.9281C13.6136 15.1025 13.2682 14.9435 12.5773 14.6254L12.3986 14.5431C12.2022 14.4527 12.1041 14.4075 12 14.4075C11.8959 14.4075 11.7978 14.4527 11.6014 14.5431L11.4227 14.6254C10.7318 14.9435 10.3864 15.1025 10.1565 14.9281C9.92674 14.7536 9.96476 14.3612 10.0408 13.5763L10.0605 13.3733C10.0821 13.1502 10.0929 13.0387 10.0608 12.9353C10.0286 12.8319 9.95713 12.7483 9.81418 12.5812L9.68403 12.429C9.18097 11.8407 8.92945 11.5466 9.01723 11.2643C9.10501 10.982 9.47396 10.8986 10.2119 10.7316L10.4028 10.6884C10.6125 10.641 10.7173 10.6172 10.8015 10.5533C10.8857 10.4894 10.9397 10.3926 11.0476 10.1989L11.1459 10.0225Z" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M16.755 2H7.24502C6.08614 2 5.50671 2 5.03939 2.16261C4.15322 2.47096 3.45748 3.18719 3.15795 4.09946C3 4.58055 3 5.17705 3 6.37006V20.3742C3 21.2324 3.985 21.6878 4.6081 21.1176C4.97417 20.7826 5.52583 20.7826 5.8919 21.1176L6.375 21.5597C7.01659 22.1468 7.98341 22.1468 8.625 21.5597C9.26659 20.9726 10.2334 20.9726 10.875 21.5597C11.5166 22.1468 12.4834 22.1468 13.125 21.5597C13.7666 20.9726 14.7334 20.9726 15.375 21.5597C16.0166 22.1468 16.9834 22.1468 17.625 21.5597L18.1081 21.1176C18.4742 20.7826 19.0258 20.7826 19.3919 21.1176C20.015 21.6878 21 21.2324 21 20.3742V6.37006C21 5.17705 21 4.58055 20.842 4.09946C20.5425 3.18719 19.8468 2.47096 18.9606 2.16261C18.4933 2 17.9139 2 16.755 2Z" stroke="white" strokeWidth="1.5" />
      <path d="M9.5 10.4L10.9286 12L14.5 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.5 15.5H16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* MAIN */
export default function GiftCards() {
  return (
    <div className="bg-white rounded-xl border border-[#E0E6EB] p-4 sm:p-5 md:p-[30px] font-manrope">

      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-7">

        <h2 className="text-[#29343D] font-semibold text-lg sm:text-xl md:text-[22px]">
          Gifts Cards
        </h2>

        <button
          className="w-full sm:w-auto flex justify-center items-center gap-1.5
          bg-[#DDDBFF] text-[#635BFF] px-4 py-2 rounded-lg text-sm font-medium
          hover:bg-[#635BFF] hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Gift Card
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="flex flex-col gap-4 sm:flex-row mb-7">

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

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {giftCards.map((card) => (
          <Gift key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}