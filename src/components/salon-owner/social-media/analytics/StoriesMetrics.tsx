"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// --- Interfaces ---
interface GaugeDataItem {
    name: string;
    value: number;
    color: string;
}

interface GaugeCardProps {
    title: string;
    totalValue: number;
    totalLabel: string;
    data: GaugeDataItem[];
}

// --- Mock Data ---
const storiesData: GaugeDataItem[] = [
    { name: "Shares", value: 70, color: "#635BFF" },
    { name: "Comments", value: 15, color: "#FFD648" },
    { name: "Mentions", value: 20, color: "#16CDC7" },
    { name: "Category", value: 15, color: "#FF6692" },
    { name: "Category 5", value: 15, color: "#36C76C" },
    { name: "Category 6", value: 20, color: "#29343D" },
];

const storytellersData: GaugeDataItem[] = [
    { name: "Category 1", value: 70, color: "#635BFF" },
    { name: "Category 2", value: 15, color: "#FFD648" },
    { name: "Category 3", value: 20, color: "#16CDC7" },
    { name: "Category 4", value: 15, color: "#FF6692" },
    { name: "Category 5", value: 15, color: "#36C76C" },
    { name: "Category 6", value: 20, color: "#29343D" },
];

export default function StoriesMetrics() {
    return (
        <div className="bg-white p-6 rounded-xl mt-6 font-manrope">
            <h3 className="text-lg font-bold text-[#29343D] mb-7">Stories Metrics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GaugeCard
                    title="Stories by Type"
                    totalValue={324}
                    totalLabel="Total Stories"
                    data={storiesData}
                />
                <GaugeCard
                    title="Storytellers by Type"
                    totalValue={500}
                    totalLabel="Total Storytellers"
                    data={storytellersData}
                />
            </div>
        </div>
    );
}

function GaugeCard({ title, totalValue, totalLabel, data }: GaugeCardProps) {
    return (
        <div className="p-7 border border-[#E0E6EB] rounded-xl flex flex-col items-center">
            <div className="w-full">
                <p className="text-base font-bold text-[#29343D] mb-2">{title}</p>
            </div>

            <div className="relative w-full h-[220px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="80%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={110}
                            outerRadius={120}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={4}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Label Text */}
                <div className="absolute bottom-[20%] text-center">
                    <h4 className="text-[36px] font-bold text-[#29343D] leading-none mb-1">
                        {totalValue}
                    </h4>
                    <p className="text-[13px] font-medium text-[#98A4AE]">
                        {totalLabel}
                    </p>
                </div>
            </div>

            {/* Custom Grid Legend */}
            <div className="grid grid-cols-4 gap-y-4 gap-x-2 w-full mt-4">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm font-semibold text-[#29343D] whitespace-nowrap">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}