"use client";

import { useState } from "react";
import { ChevronDown, TrendingUp } from "lucide-react";
import MoneySpentChart from "./MoneySpentChart";
import Card from "@/components/accountProtal/Card";
import IExpense from "@/app/account-protal/svg/IExpense";
import AvarageIcon from "./AvarageIcon";
import ClientFinancialBreakdown from "./Clientfinancialbreakdown";
import ReceiptsList from "./Receiptslist";
import GiftCards from "./Giftcards";

type RangeOption =
  | "Last 7 days"
  | "Last 14 days"
  | "Last Month"
  | "Last 3 Months";

const rangeOptions: RangeOption[] = [
  "Last 7 days",
  "Last 14 days",
  "Last Month",
  "Last 3 Months",
];

const chartData = [
  { date: "Sep 1", value: 650, appointments: 22 },
  { date: "Sep 2", value: 780, appointments: 40 },
  { date: "Sep 3", value: 720, appointments: 35 },
  { date: "Sep 4", value: 900, appointments: 48 },
  { date: "Sep 5", value: 1100, appointments: 55 },
  { date: "Sep 6", value: 2400, appointments: 80 },
  { date: "Sep 7", value: 2200, appointments: 74 },
];

export default function ClientFinacialTab() {
  const [range, setRange] = useState<RangeOption>("Last 7 days");
  const [showDrop, setShowDrop] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-2xl border border-[#E0E6EB] p-4 sm:p-5 md:p-6 font-manrope">

      {/* Title */}
      <h2 className="text-[#29343D] font-semibold text-lg sm:text-xl mb-5">
        Analytics
      </h2>

      {/* ── Stat Cards ── */}
      <div className="flex flex-col gap-4 sm:flex-row">

        <Card
          icon={<IExpense />}
          title="Total Money Spent"
          value="€ 4,358"
          iconBg="bg-indigo-500"
          gradientFrom="#E9E9FF"
          gradientTo="#F4F4FF"
        />

        <Card
          icon={<AvarageIcon />}
          title="Average Spend Per Visit"
          value="€ 258"
          iconBg="bg-teal-500"
          gradientFrom="#DFF5F3"
          gradientTo="#ECFDFC"
        />
      </div>

      {/* ── Chart Card ── */}
      <div className="border border-[#E0E6EB] rounded-2xl p-4 sm:p-5 mt-6">

        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

          <h3 className="text-[#29343D] font-semibold text-sm sm:text-base">
            Money Spent
          </h3>

          {/* Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowDrop((p) => !p)}
              className="flex w-full sm:w-auto justify-between items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-sm font-medium hover:border-[#635BFF] bg-white"
            >
              {range}
              <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
            </button>

            {showDrop && (
              <div className="absolute right-0 left-0 sm:left-auto top-full mt-1 bg-white rounded-xl shadow-lg border py-1 z-30 min-w-[150px]">
                {rangeOptions.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setRange(o);
                      setShowDrop(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA]
                    ${range === o
                        ? "text-[#635BFF] font-semibold"
                        : "text-[#29343D]"
                      }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Value */}
        <p className="text-[22px] sm:text-[26px] font-bold text-[#29343D] mt-2">
          € 1,358
        </p>

        {/* Trend */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          <TrendingUp className="w-4 h-4 text-[#36C76C]" />
          <span className="text-sm font-semibold text-[#36C76C]">+9%</span>
          <span className="text-sm text-[#9CA3AF]">last week</span>
        </div>

        {/* Chart */}
        <div className="w-full overflow-x-auto">
          <MoneySpentChart chartData={chartData} />
        </div>
      </div>

      {/* Sections */}
      <div className="mt-6">
        <ClientFinancialBreakdown />
      </div>

      <div className="mt-6">
        <ReceiptsList />
      </div>

      <div className="mt-6">
        <GiftCards />
      </div>
    </div>
  );
}