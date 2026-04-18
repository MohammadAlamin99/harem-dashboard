"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";

const AGE_DATA = [
    { age: "18-24", Man: 68, Woman: 58, Unspecified: 42 },
    { age: "25-34", Man: 68, Woman: 58, Unspecified: 42 },
    { age: "35-44", Man: 68, Woman: 58, Unspecified: 25 },
    { age: "45-54", Man: 68, Woman: 58, Unspecified: 42 },
    { age: "55-64", Man: 68, Woman: 58, Unspecified: 42 },
    { age: "65+", Man: 68, Woman: 58, Unspecified: 42 },
];

const CITY_DATA = [
    { city: "Rome", pct: 20 },
    { city: "Milan", pct: 20 },
    { city: "Naples", pct: 20 },
    { city: "Turin", pct: 20 },
    { city: "Florence", pct: 20 },
];

const COLORS = {
    Man: "#635BFF",
    Woman: "#FF6B8A",
    Unspecified: "#FFD166",
};

interface TooltipPayload {
    name: string;
    value: number;
    fill: string;
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white rounded-xl border border-[#E0E6EB] shadow-lg px-4 py-3 font-manrope">
            <p className="text-[12px] font-bold text-[#29343D] mb-1">{label}</p>
            {payload.map((p) => (
                <p key={p.name} className="text-[11px] font-medium" style={{ color: p.fill }}>
                    {p.name}: {p.value}%
                </p>
            ))}
        </div>
    );
};

// Legend 
const Legend = () => (
    <div className="flex items-center gap-5 mt-4 px-1">
        {Object.entries(COLORS).map(([label, color]) => (
            <div key={label} className="flex items-center gap-1.5">
                <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: color }}
                />
                <span className="text-[12px] text-[#6B7280] font-manrope">
                    {label === "Man" ? "Man (50%)" : label === "Woman" ? "Woman (30%)" : "Unspecified (20%)"}
                </span>
            </div>
        ))}
    </div>
);

// City Progress Row 
const CityRow = ({ city, pct }: { city: string; pct: number }) => (
    <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#6B7280] font-manrope">{city}</span>
            <span className="text-[13px] font-bold text-[#29343D] font-manrope">{pct}%</span>
        </div>
        <div className="w-full h-[6px] rounded-full bg-[#F0F2F8]">
            <div
                className="h-full rounded-full bg-[#635BFF]"
                style={{ width: `${pct}%` }}
            />
        </div>
    </div>
);

// Main Component 
export default function AudienceAnalytics() {
    return (
        <div className="bg-[#F4F6FA] font-manrope mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6">

                {/* ── Left: Gender/Age Bar Chart ── */}
                <div className="bg-white rounded-xl px-7 pt-6 pb-6">
                    <h3 className="text-[16px] font-bold text-[#29343D] font-manrope mb-5">
                        Audience by Gender/Age
                    </h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart
                            data={AGE_DATA}
                            barCategoryGap="30%"
                            barGap={3}
                            margin={{ top: 8, right: 4, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid
                                vertical={false}
                                stroke="#F0F2F8"
                                strokeDasharray="0"
                            />
                            <XAxis
                                dataKey="age"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Manrope" }}
                                dy={8}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Manrope" }}
                                ticks={[20, 40, 60, 80]}
                                domain={[0, 80]}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: "rgba(99,91,255,0.04)" }}
                            />
                            <Bar dataKey="Man" fill={COLORS.Man} radius={[4, 4, 0, 0]} maxBarSize={14} />
                            <Bar dataKey="Woman" fill={COLORS.Woman} radius={[4, 4, 0, 0]} maxBarSize={14} />
                            <Bar dataKey="Unspecified" fill={COLORS.Unspecified} radius={[4, 4, 0, 0]} maxBarSize={14} />
                        </BarChart>
                    </ResponsiveContainer>
                    <Legend />
                </div>

                {/* Right: Audience by City */}
                <div className="bg-white rounded-xl px-6 pt-5 pb-5">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[16px] font-bold text-[#29343D] font-manrope">
                            Audience by City
                        </h3>
                        <button className="flex items-center gap-1.5 px-3 py-[6px] rounded-lg border border-[#E0E6EB] hover:border-[#635BFF]/40 transition-colors">
                            <span className="text-[13px] font-medium text-[#29343D] font-manrope">City</span>
                            <ChevronDown size={14} className="text-[#29343D]" />
                        </button>
                    </div>

                    {/* City rows */}
                    <div className="flex flex-col gap-5">
                        {CITY_DATA.map(({ city, pct }) => (
                            <CityRow key={city} city={city} pct={pct} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}