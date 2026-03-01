"use client";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Clock, Hourglass } from "lucide-react";

type OnlinePaymentCardProps = {
  toConfirm: number;
  overdue: number;
  lastCheckDate: string;
};

export default function OnlinePaymentGraph({
  toConfirm,
  overdue,
}: OnlinePaymentCardProps) {
  const total = toConfirm + overdue;

  const chartData = [
    {
      name: "To Confirm",
      value: toConfirm,
      color: "#5B5FEF",
    },
    {
      name: "Overdue",
      value: overdue,
      color: "#F35D7F",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 w-full max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#1E293B] font-manrope">
            Online Payment
          </h2>
          <p className="text-sm text-[#94A3B8] font-manrope">
            Last check on 25 february
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-600 text-sm font-medium font-manrope cursor-pointer">
          View Payments
        </button>
      </div>

      {/* Graph Section */}
      <div className="relative w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius="80%"
              outerRadius="100%"
              paddingAngle={6}
              cornerRadius={25}
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-semibold text-[#29343D]">{total}</span>
          <span className="text-gray-400 text-sm mt-2">Payment management</span>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="flex justify-between mt-10">
        {/* To Confirm */}
        <div className="flex items-center gap-4">
          <div className="bg-[#F1F2FE] p-4 rounded-xl">
            <Hourglass color="#635BFF" width={24} height={24} />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#29343D] font-manrope">
              {toConfirm} payments
            </p>
            <p className="text-[#98A4AE] text-sm font-manrope">To Confirm</p>
          </div>
        </div>

        {/* Overdue */}
        <div className="flex items-center gap-4">
          <div className="bg-[#FF6692] p-4 rounded-xl">
            <Clock className="text-[#FFE5ED]" size={24} />
          </div>
          <div>
            <p className="text-[15px] font-semibold text-[#29343D] font-manrope">
              {overdue} payments
            </p>
            <p className="text-[#98A4AE] text-sm font-manrope">Overdue</p>
          </div>
        </div>
      </div>
    </div>
  );
}
