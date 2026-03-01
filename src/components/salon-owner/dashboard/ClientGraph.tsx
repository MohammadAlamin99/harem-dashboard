import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", blue: 260, green: 110 },
  { month: "Feb", blue: 250, green: 120 },
  { month: "Mar", blue: 190, green: 140 },
  { month: "Apr", blue: 185, green: 145 },
  { month: "May", blue: 180, green: 135 },
  { month: "Jun", blue: 160, green: 120 },
  { month: "Jul", blue: 100, green: 120 },
  { month: "Aug", blue: 95, green: 122 },
  { month: "Sep", blue: 98, green: 130 },
  { month: "Oct", blue: 102, green: 150 },
  { month: "Nov", blue: 105, green: 155 },
  { month: "Dec", blue: 95, green: 140 },
];

export default function ClientGraph() {
  return (
    <div className="bg-white p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold font-manrope">New Clients</h2>
          <p className="text-sm text-gray-400 font-manrope">
            Last 12 Months{" "}
            <span className="text-green-500 font-medium font-manrope">
              +15%
            </span>
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#14B8A6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "#94A3B8" }} />
            <YAxis tick={{ fill: "#94A3B8" }} />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #E2E8F0",
              }}
            />

            <Area
              type="monotone"
              dataKey="blue"
              stroke="#6366F1"
              fill="url(#blueGradient)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="green"
              stroke="#14B8A6"
              fill="url(#greenGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
