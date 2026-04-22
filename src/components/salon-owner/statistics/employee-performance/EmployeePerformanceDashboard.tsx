"use client";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

// --- Mock Data ---
const trendsData = [
    { year: "2019", value: 2200 },
    { year: "2020", value: 2400 },
    { year: "2021", value: 2200 },
    { year: "2022", value: 1600 },
    { year: "2023", value: 1800 },
    { year: "2024", value: 2800 },
    { year: "2025", value: 2600 },
];

const EmployeePerformanceDashboard = () => {
    const axisStyle = {
        fill: "#98A4AE",
        fontSize: 12,
        fontFamily: "Manrope, sans-serif",
    };

    return (
        <div className="flex flex-col gap-6 bg-white font-manrope p-[15px] md:p-[30px]">
            <div className="w-full bg-white p-8 rounded-[16px] border border-[#E0E6EB]">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-[18px] font-bold text-[#29343D]">Production Trends (Yearly)</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-[#EFF4FA] rounded-[8px] text-[12px] font-bold text-[#29343D]">
                        Yearly <ChevronDown size={14} className="text-gray-400" />
                    </button>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendsData} margin={{ left: -20 }}>
                            <defs>
                                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="30%" stopColor="#36C76C" />
                                    <stop offset="70%" stopColor="#FF5E7E" />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={true} stroke="#F8F9FB" />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tick={axisStyle}
                                dy={15}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={axisStyle}
                                domain={[1000, 3000]}
                                ticks={[1000, 1500, 2000, 2500, 3000]}
                                tickFormatter={(val) => `€ ${val / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="url(#lineGradient)"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#36C76C', strokeWidth: 0 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex gap-6 mt-8">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-[4px] bg-[#36C76C]" />
                        <span className="text-[13px] font-medium text-[#98A4AE]">Above Threshold</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-[4px] bg-[#FF5E7E]" />
                        <span className="text-[13px] font-medium text-[#98A4AE]">Below Threshold</span>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Two Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* 2. Performance Metrics Card */}
                <div className="bg-white p-8 rounded-[16px] border border-[#E0E6EB] flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="text-[18px] font-bold text-[#29343D] max-w-[200px]">Performance Metrics (Last Month)</h3>
                            <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-[8px] text-[12px] font-bold text-[#29343D]">
                                Select Month <ChevronDown size={14} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-[15px] font-medium text-[#29343D]">Target Threshold</span>
                                <span className="text-[15px] font-bold text-[#29343D]">€ 1,700</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[15px] font-medium text-[#29343D]">Monthly Salary</span>
                                <span className="text-[15px] font-bold text-[#29343D]">€ 3,200</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#F8F9FB]">
                                <span className="text-[15px] font-medium text-[#29343D]">Threshold Calculation (20%)</span>
                                <span className="text-[15px] font-bold text-[#29343D]">€ 1,700</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-6">
                        <span className="text-[15px] font-medium text-[#29343D]">Performance Status</span>
                        <span className="bg-[#00CFE8] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">Goal Achieved</span>
                    </div>
                </div>

                {/* 3. Operation Statics Card */}
                <div className="bg-white p-8 rounded-[16px] border border-[#E0E6EB]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-[18px] font-bold text-[#29343D]">Operation Statics</h3>
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-[8px] text-[12px] font-bold text-[#29343D]">
                            Last Month <ChevronDown size={14} className="text-gray-400" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-[15px] font-medium text-[#29343D]">Completed Appoitments</span>
                            <span className="text-[15px] font-bold text-[#29343D]">38</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[15px] font-medium text-[#29343D]">Revenue Appoitment</span>
                            <span className="text-[15px] font-bold text-[#29343D]">€ 223.68</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-[#F8F9FB]">
                            <span className="text-[15px] font-medium text-[#29343D]">Working Days</span>
                            <span className="text-[15px] font-bold text-[#29343D]">3</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-6">
                        <span className="text-[15px] font-medium text-[#29343D]">Performance Status</span>
                        <span className="text-[18px] font-bold text-[#29343D]">€ 2,833.33</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmployeePerformanceDashboard;