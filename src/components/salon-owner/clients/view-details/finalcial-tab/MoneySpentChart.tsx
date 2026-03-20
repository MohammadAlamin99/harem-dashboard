import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type chartData = {
  date: string;
  value: number;
  appointments: number;
};
interface chartDataProps {
  chartData: chartData[];
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E0E6EB] rounded-xl shadow-lg px-4 py-3 font-manrope">
        <p className="text-sm font-semibold text-[#29343D] mb-1">
          {label}, 2025
        </p>
        <p className="text-xs text-[#36C76C]">
          Appoiments: &nbsp;
          <span className="font-semibold">
            {payload[0]?.payload?.appointments}
          </span>
        </p>
      </div>
    );
  }
  return null;
}
export default function MoneySpentChart({ chartData }: chartDataProps) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#36C76C" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#36C76C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#F0F4F7" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Manrope" }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "Manrope" }}
            tickFormatter={(v) => `€ ${v >= 1000 ? v / 1000 + "k" : v}`}
            width={48}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#36C76C",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#36C76C"
            strokeWidth={2.5}
            fill="url(#greenGradient)"
            dot={false}
            activeDot={{
              r: 5,
              fill: "#36C76C",
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
