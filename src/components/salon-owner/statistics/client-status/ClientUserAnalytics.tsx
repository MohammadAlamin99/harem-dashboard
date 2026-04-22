"use client";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

// --- Data for Age Group ---
const ageData = [
    { name: "18-25", value: 15, color: "#635BFF" },
    { name: "26-33", value: 25, color: "#4CC9F0" },
    { name: "34-41", value: 20, color: "#FFCF40" },
    { name: "42-49", value: 20, color: "#00CFE8" },
    { name: "50-57", value: 10, color: "#FF5E7E" },
    { name: ">58", value: 10, color: "#36C76C" },
];

// --- Data for Visit Frequency ---
const visitData = [
    { day: "Sun", visits: 5, active: false },
    { day: "Mon", visits: 4, active: false },
    { day: "Tue", visits: 4, active: false },
    { day: "Wed", visits: 5, active: true },
    { day: "Thu", visits: 6, active: false },
    { day: "Fri", visits: 3, active: false },
    { day: "Sat", visits: 4, active: false },
];

//  Custom Tooltip for Bar Chart 
interface VisitTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number | string }>;
}

const VisitTooltip = ({ active, payload }: VisitTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-xl rounded-xl border border-gray-50 font-manrope min-w-[120px]">
                <p className="text-[11px] font-bold text-gray-500 mb-1">Mar 03, 2025</p>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#635BFF]" />
                        <span className="text-[12px] font-bold text-gray-800">Total Visits</span>
                    </div>
                    <span className="text-[12px] font-medium text-gray-400">{payload[0].value}</span>
                </div>
            </div>
        );
    }
    return null;
};

const UserAnalytics = () => {
    const axisStyle = {
        fill: "#98A4AE",
        fontSize: 12,
        fontFamily: "Manrope, sans-serif",
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 font-manrope">

            {/* 1. Age Group Card */}
            <div className="flex-1 bg-white p-8 rounded-[16px]">
                <h3 className="text-[18px] font-bold text-[#29343D] mb-4">Age Group</h3>
                <div className="h-[250px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={ageData}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                {ageData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Grid Legend */}
                <div className="grid grid-cols-3 gap-y-4 mt-6">
                    {ageData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[13px] font-medium text-[#29343D]">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. Visit Frequency Card */}
            <div className="flex-1 bg-white p-8 rounded-[16px]">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[18px] font-bold text-[#29343D]">Visit Frequency</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-[#EFF4FA] rounded-[8px] text-[12px] font-bold text-[#29343D]">
                        Daily <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={visitData} margin={{ bottom: 20 }}>
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={axisStyle}
                                dy={15}
                            />
                            <Tooltip
                                content={<VisitTooltip />}
                                cursor={{ fill: 'transparent' }}
                                position={{ y: 0 }}
                            />
                            <Bar
                                dataKey="visits"
                                barSize={32}
                                radius={[4, 4, 4, 4]}
                                background={{ fill: '#F1F5F9', radius: 4 }}
                            >
                                {visitData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.active ? "#635BFF" : "transparent"}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default UserAnalytics;