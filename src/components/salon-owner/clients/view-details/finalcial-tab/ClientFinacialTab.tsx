"use client";

import { useState } from "react";
import { ChevronDown, TrendingUp } from "lucide-react";
import MoneySpentChart from "./MoneySpentChart";
import Card from "@/components/accountProtal/Card";
import IExpense from "@/app/account-protal/svg/IExpense";
import AvarageIcon from "./AvarageIcon";
import ClientFinancialBreakdown from "./Clientfinancialbreakdown ";
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
    <div className="bg-white rounded-2xl border border-[#E0E6EB] p-6 font-manrope">
      {/* Title */}
      <h2 className="text-[#29343D] font-semibold text-xl font-manrope mb-5">
        Analytics
      </h2>

      {/* ── Stat Cards ── */}
      <div className="flex gap-4 mb-6">
        {/* Total Money Spent */}
        <Card
          icon={<IExpense />}
          title="Total Money Spent"
          value="€ 4,358"
          iconBg="bg-indigo-500"
          gradientFrom="#E9E9FF"
          gradientTo="#F4F4FF"
        />

        {/* Average Spend */}
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
      <div className="border border-[#E0E6EB] rounded-2xl p-5">
        {/* Chart header */}
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-[#29343D] font-semibold text-base font-manrope">
            Money Spent
          </h3>

          {/* Range dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDrop((p) => !p)}
              className="flex items-center gap-1.5 border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-sm text-[#29343D] font-medium hover:border-[#635BFF] transition-colors bg-white"
            >
              {range}
              <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
            </button>
            {showDrop && (
              <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E5E7EB] py-1 z-30 min-w-[150px]">
                {rangeOptions.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setRange(o);
                      setShowDrop(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#F4F6FA] transition-colors
                      ${range === o ? "text-[#635BFF] font-semibold" : "text-[#29343D]"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Big value + trend */}
        <p className="text-[26px] font-bold text-[#29343D] font-manrope mt-2">
          € 1,358
        </p>
        <div className="flex items-center gap-1.5 mb-5">
          <TrendingUp className="w-4 h-4 text-[#36C76C]" />
          <span className="text-sm font-semibold text-[#36C76C]">+9%</span>
          <span className="text-sm text-[#9CA3AF]">last week</span>
        </div>

        {/* Area Chart */}
        <MoneySpentChart chartData={chartData} />
      </div>
      <div className="mt-[30px]">
        <ClientFinancialBreakdown />
      </div>
      <div className="mt-[30px]">
        <ReceiptsList />
      </div>
      <div className="mt-[30px]">
        <GiftCards />
      </div>
    </div>
  );
}
