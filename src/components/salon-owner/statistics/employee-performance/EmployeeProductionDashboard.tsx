"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import {
    ChevronDown,
    Wallet,
    Target,
    BarChart3,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

// --- Mock Data ---
const productionData = [
    { name: "Jan", below: 1000, above: 400 },
    { name: "Feb", below: 1100, above: 600 },
    { name: "Mar", below: 950, above: 300 },
    { name: "Apr", below: 1100, above: 800 },
    { name: "Jun", below: 1200, above: 300 },
    { name: "Jul", below: 1100, above: 900 },
];

const THRESHOLD_VALUE = 2000;

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number | string | number[] }>;
}

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-xl rounded-[16px] border border-gray-50 font-manrope min-w-[200px] flex flex-col gap-2">
                <p className="text-[12px] text-gray-400 mb-1">April, 2025</p>
                <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-800 tracking-tight">Total Production</span>
                    <span className="text-[12px] font-medium text-gray-400">€ 1,7k</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00CFE8]" />
                        <span className="text-[12px] font-bold text-[#00CFE8]">Threshold</span>
                    </div>
                    <span className="text-[12px] font-medium text-gray-400">€ 1,7k</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF5E7E]" />
                        <span className="text-[12px] font-bold text-[#FF5E7E]">Above Threshold</span>
                    </div>
                    <span className="text-[12px] font-medium text-gray-400">€ 1,7k</span>
                </div>
            </div>
        );
    }
    return null;
};

const EmployeeProductionDashboard = () => {
    const axisStyle = {
        fill: "#98A4AE",
        fontSize: 12,
        fontFamily: "Manrope, sans-serif",
        fontWeight: 500,
    };

    return (
        <div className="flex flex-col gap-6 p-[30px] bg-white font-manrope mt-6 rounded-[16px] border border-[#E0E6EB]">
            <h1 className="text-[20px] font-bold text-[#29343D]">Production</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="p-6 rounded-[16px] bg-[#F4F6FF] border border-transparent">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#635BFF] rounded-[12px] flex items-center justify-center text-white">
                            <Wallet size={20} />
                        </div>
                        <span className="text-[13px] font-bold text-[#29343D]">Monthly Turnover</span>
                    </div>
                    <p className="text-[28px] font-bold text-[#29343D]">€ 8,500</p>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-[16px] bg-[#FFF9E5] border border-transparent">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#FFCF40] rounded-[12px] flex items-center justify-center text-white">
                            <Target size={20} />
                        </div>
                        <span className="text-[13px] font-bold text-[#29343D]">Target Threshold</span>
                    </div>
                    <p className="text-[28px] font-bold text-[#29343D]">€ 6,400</p>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-[16px] bg-[#E5F9F6] border border-transparent flex flex-col justify-between">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#00CFE8] rounded-[12px] flex items-center justify-center text-white">
                            <BarChart3 size={20} />
                        </div>
                        <span className="text-[13px] font-bold text-[#29343D]">Performance</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-[28px] font-bold text-[#29343D]">133%</p>
                        <span className="bg-[#36C76C] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Goal Achieved
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Chart Container */}
            <div className="bg-white p-8 rounded-[16px] border border-[#E0E6EB] mt-4">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-[16px] font-bold text-[#29343D]">Daily Production (Monthly)</h3>
                        <div className="mt-4">
                            <p className="text-[12px] text-[#98A4AE] mb-1 font-semibold">Production Status</p>
                            <span className="bg-[#EBFAF0] text-[#36C76C] text-[12px] font-bold px-3 py-1 rounded-full">
                                Above Threshold
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-[8px] text-[12px] font-bold text-[#29343D]">
                            Monthly <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        <div className="text-right">
                            <p className="text-[24px] font-bold text-[#36C76C]">€ 12,500</p>
                            <p className="text-[12px] text-[#98A4AE] font-medium">Threshold: € 9,000</p>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={productionData}
                            barGap={-12}
                            margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                        >
                            <CartesianGrid vertical={false} stroke="#F1F5F9" />
                            <XAxis
                                dataKey="name"
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
                                tickFormatter={(v) => `€ ${v / 1000}k`}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />

                            <ReferenceLine y={THRESHOLD_VALUE} stroke="#635BFF" strokeOpacity={0.2} strokeWidth={1} />

                            {/* Pink Capsule (Bottom) */}
                            <Bar
                                dataKey={(d: { below: number }) => [THRESHOLD_VALUE - 40, THRESHOLD_VALUE - d.below]}
                                fill="#FF6692"
                                barSize={16}
                                radius={[10, 10, 10, 10]}
                            />

                            {/* Teal Capsule (Top) */}
                            <Bar
                                dataKey={(d: { above: number }) => [THRESHOLD_VALUE + 40, THRESHOLD_VALUE + d.above]}
                                fill="#16CDC7"
                                barSize={16}
                                radius={[10, 10, 10, 10]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Footer info & Pixel Perfect Buttons */}
                <div className="flex justify-between items-end mt-6">
                    <div className="text-[13px] text-[#98A4AE] font-medium space-y-1">
                        <p>Threshold Calculation: Turnover x 0.2 = € 2,500</p>
                        <p>Monthly Salary: € 4,500</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="w-10 h-10 rounded-full border border-[#DDDBFF] flex items-center justify-center opacity-30 cursor-not-allowed">
                            <ChevronLeft size={20} strokeWidth={2.5} color="#DDDBFF" />
                        </button>
                        <button className="w-10 h-10 rounded-full border border-[#DDDBFF] flex items-center justify-center bg-white hover:shadow-md active:scale-95 transition-all">
                            <ChevronRight size={20} strokeWidth={2.5} color="#635BFF" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeProductionDashboard;