"use client";

import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

const allServiceData = [
    { name: "Haircut", value: 1600 }, { name: "Haircut", value: 1800 },
    { name: "Haircut", value: 2100 }, { name: "Haircut", value: 2100 },
    { name: "Haircut", value: 2100 }, { name: "Haircut", value: 2200 },
    { name: "Haircut", value: 2800 },
    { name: "Shave", value: 1200 }, { name: "Shave", value: 1500 },
];

const ITEMS_PER_PAGE = 7;

const RevenuePerService = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const startIndex = currentPage * ITEMS_PER_PAGE;
    const visibleData = allServiceData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(allServiceData.length / ITEMS_PER_PAGE);

    const isPrevDisabled = currentPage === 0;
    const isNextDisabled = currentPage >= totalPages - 1;

    const axisStyle = {
        fill: '#98A4AE',
        fontSize: 12,
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 500,
    };

    return (
        <div className="w-full bg-white p-8 rounded-[12px] border border-[#E0E6EB] font-manrope">
            <h3 className="text-base font-bold text-[#29343D] mb-7">Revenue per service</h3>
            <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={visibleData}
                        margin={{ top: 0, right: 0, left: -20, bottom: 40 }}
                    >
                        <CartesianGrid vertical={false} stroke="transparent" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={axisStyle}
                            dy={10} 
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={axisStyle}
                            domain={[0, 4000]}
                            ticks={[1000, 1500, 2000, 2500, 3000, 3500, 4000]}
                            tickFormatter={(value) => `€ ${value.toLocaleString()}`}
                        />
                        <Tooltip cursor={{ fill: 'transparent' }} />
                        <Bar
                            dataKey="value"
                            fill="#635BFF"
                            radius={[16, 16, 16, 16]}
                            barSize={60}
                            background={{ fill: '#F8F9FB', radius: 16 }}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Pixel Perfect Buttons */}
            <div className="flex justify-end gap-4 mt-2">
                <button
                    onClick={() => !isPrevDisabled && setCurrentPage(currentPage - 1)}
                    disabled={isPrevDisabled}
                    className="cursor-pointer w-10 h-10 rounded-full border border-[#DDDBFF] flex items-center justify-center bg-white transition-all disabled:opacity-50 active:scale-90"
                >
                    <ChevronLeft
                        size={22}
                        strokeWidth={2.5}
                        color={isPrevDisabled ? "#DDDBFF" : "#635BFF"}
                    />
                </button>

                <button
                    onClick={() => !isNextDisabled && setCurrentPage(currentPage + 1)}
                    disabled={isNextDisabled}
                    className="cursor-pointer w-10 h-10 rounded-full border border-[#DDDBFF] flex items-center justify-center bg-white transition-all disabled:opacity-50 active:scale-90"
                >
                    <ChevronRight
                        size={22}
                        strokeWidth={2.5}
                        color={isNextDisabled ? "#DDDBFF" : "#635BFF"}
                    />
                </button>
            </div>
        </div>
    );
};

export default RevenuePerService;