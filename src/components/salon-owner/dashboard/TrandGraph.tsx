import { useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import GraphHead from "./GraphHead";

const revenueData = [
  { month: "Jan", revenue: 30000 },
  { month: "Feb", revenue: 33000 },
  { month: "Mar", revenue: 38000 },
  { month: "Apr", revenue: 37000 },
  { month: "May", revenue: 34000 },
  { month: "Jun", revenue: 33000 },
  { month: "Jul", revenue: 33500 },
  { month: "Aug", revenue: 41000 },
  { month: "Sep", revenue: 38000 },
];

export default function TrandGraph() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Monthly");

  const options = ["Daily", "Weekly", "Monthly", "Yearly"];

  return (
    <div className="bg-white rounded-2xl p-6">
      {/* Header */}
      <GraphHead
        selected={selected}
        setSelected={setSelected}
        open={open}
        setOpen={setOpen}
        options={options}
      />

      {/* Chart */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#F1F5F9" vertical={false} />

            <XAxis
              dataKey="month"
              tick={{ fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tickFormatter={(value) => `${value / 1000}k`}
              tick={{ fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [`€ ${value?.toLocaleString()}`, "Revenue"]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#14B8A6"
              strokeWidth={3}
              fill="url(#revenueGradient)"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
