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

const DATA = [
    { day: "Sunday", active: 4 },
    { day: "Monday", active: 4 },
    { day: "Tuesday", active: 5 },
    { day: "Wednesday", active: 4 },
    { day: "Thursday", active: 5 },
    { day: "Friday", active: 4 },
    { day: "Saturday", active: 8 },
];

const MAX = 21;

interface ChartBarProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    background?: {
        y: number;
        height: number;
    };
}

//  Custom Background Bar Shape 
const BackgroundBar = (props: ChartBarProps) => {
    const { x, width, background } = props;
    if (!background) return null;
    const { y, height } = background;
    const radius = 10;
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={radius}
            ry={radius}
            fill="#F0F2F8"
        />
    );
};

// Custom Active Bar Shape 
const ActiveBar = (props: ChartBarProps) => {
    const { x, y, width, height } = props;
    if (!height || height <= 0) return null;
    const radius = 10;
    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={radius}
            ry={radius}
            fill="#635BFF"
        />
    );
};

// Custom Tooltip 
interface TooltipPayload {
    payload: {
        active: number;
    };
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: TooltipPayload[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
        <div className="bg-white rounded-xl border border-[#E0E6EB] shadow-lg px-4 py-3 font-manrope min-w-[120px]">
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#635BFF]" />
                <span className="text-[13px] font-semibold text-[#29343D]">{d.active}h</span>
            </div>
            <div className="flex items-center justify-between gap-6">
                <span className="text-[12px] font-semibold text-[#29343D]">Total</span>
                <span className="text-[12px] text-[#9CA3AF]">100</span>
            </div>
        </div>
    );
};

export default function FollowersActiveChart() {
    return (
        <div className="bg-white rounded-xl mt-6 px-6 pt-6 pb-4 font-manrope">
            <h3 className="text-[16px] font-bold text-[#29343D] font-manrope mb-6">
                Followers Active by Hour/Day
            </h3>

            <ResponsiveContainer width="100%" height={320}>
                <BarChart
                    data={DATA}
                    barCategoryGap="20%"
                    margin={{ top: 8, right: 8, left: -10, bottom: 0 }}
                >
                    <CartesianGrid
                        vertical={false}
                        stroke="#F0F2F8"
                        strokeDasharray="0"
                    />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Manrope" }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "Manrope" }}
                        ticks={[0, 3, 6, 9, 12, 15, 18, 21]}
                        tickFormatter={(v) => `${v}h`}
                        domain={[0, MAX]}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={false}
                    />
                    <Bar
                        dataKey="active"
                        maxBarSize={80}
                        shape={<ActiveBar />}
                        background={<BackgroundBar />}
                        radius={[10, 10, 10, 10]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}