"use client";
import {
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";

// --- Interfaces ---
interface ViewsData {
    name: string;
    value: number;
    color: string;
}

interface WatchTimeData {
    time: string;
    value: number;
}

// --- Mock Data ---
const viewsData: ViewsData[] = [
    { name: "Organic Views", value: 75, color: "#635BFF" },
    { name: "Paid Views", value: 25, color: "#00D1FF" },
];

const watchTimeData: WatchTimeData[] = [
    { time: "", value: 45 },
    { time: "3s", value: 55 },
    { time: "10s", value: 40 },
    { time: "30s", value: 55 },
    { time: "95% complete", value: 110 },
    { time: "", value: 100 },
];

export default function VideosMetrics() {
    return (
        <div className="bg-white p-6 rounded-xl mt-6 font-manrope">
            <h3 className="text-lg font-bold text-[#29343D] mb-7">Videos Metrics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Card: Views by Type */}
                <div className="p-7 border border-[#E0E6EB] rounded-2xl flex flex-col min-h-[400px]">
                    <p className="text-base font-bold text-[#29343D] mb-2">Views by Type</p>
                    <div className="flex-1 flex items-center justify-center">
                        <div className="w-full h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={viewsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={105}
                                        paddingAngle={0}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {viewsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* Custom Legend */}
                    <div className="flex items-center gap-6 mt-4">
                        {viewsData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                ></div>
                                <span className="text-[14px] font-semibold text-[#29343D]">
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Card: Watch Time */}
                <div className="p-7 border border-[#E0E6EB] rounded-2xl flex flex-col min-h-[400px]">
                    <p className="text-base font-bold text-[#29343D] mb-6">Watch Time</p>
                    <div className="flex-1 w-full h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={watchTimeData} margin={{ left: -20, right: 10 }}>
                                <CartesianGrid vertical={false} stroke="#F4F7FB" />
                                <XAxis
                                    dataKey="time"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#98A4AE", fontSize: 11, fontWeight: 500 }}
                                    padding={{ left: 30, right: 30 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#98A4AE", fontSize: 11, fontWeight: 500 }}
                                    domain={[0, 140]}
                                    ticks={[0, 35, 70, 105, 140]}
                                />
                                <Tooltip
                                    content={(props: TooltipProps<number, string>) => (
                                        <CustomWatchTimeTooltip {...props} />
                                    )}
                                    cursor={{ stroke: "#E0E6EB", strokeWidth: 1 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#00C2A0"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{
                                        r: 4,
                                        fill: "#00C2A0",
                                        stroke: "#fff",
                                        strokeWidth: 2,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- Tooltip Component ---
interface CustomWatchTimeTooltipProps extends TooltipProps<number, string> {
    payload?: Array<{
        value: number;
        payload: {
            time: string;
        };
    }>;
}

const CustomWatchTimeTooltip = ({
    active,
    payload,
}: CustomWatchTimeTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-xl rounded-xl border border-[#E0E6EB] font-manrope">
                <p className="text-[12px] font-bold text-[#29343D] mb-1">
                    {payload[0].payload.time || "Peak"}
                </p>
                <div className="flex items-center gap-5">
                    <p className="text-[11px] font-bold text-[#00C2A0]">Total:</p>
                    <p className="text-[11px] font-bold text-[#98A4AE]">
                        {payload[0].value}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};