"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    ChevronLeft,
    ChevronRight,
    Wallet,
    Briefcase,
    Layers
} from "lucide-react";

// --- Mock Data ---
const paymentsData = [
    { year: "2020", value: 1600, total: "12,400", mean: "1,050" },
    { year: "2021", value: 1800, total: "14,200", mean: "1,180" },
    { year: "2022", value: 2100, total: "15,800", mean: "1,310" },
    { year: "2023", value: 2100, total: "16,500", mean: "1,375" },
    { year: "2024", value: 2200, total: "18,900", mean: "1,575" },
    { year: "2025", value: 2800, total: "12,400", mean: "1,050" },
];


// --- Custom Tooltip ---
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ payload: { total: string; mean: string } }>;
    label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-4 shadow-xl rounded-[16px] border border-gray-50 font-manrope min-w-[200px] flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#635BFF]" />
                    <span className="text-[12px] font-bold text-gray-800">{label}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">Total</span>
                    <span className="text-[13px] font-bold text-gray-800">€ {data.total}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-gray-500 uppercase tracking-tight">Monthly mean</span>
                    <span className="text-[13px] font-bold text-gray-800">€ {data.mean}</span>
                </div>
            </div>
        );
    }
    return null;
};

const RemunerationDashboard = () => {

    const axisStyle = {
        fill: "#98A4AE",
        fontSize: 12,
        fontFamily: "Manrope, sans-serif",
        fontWeight: 500,
    };

    return (
        <div className="flex flex-col gap-6 p-8 bg-white font-manrope min-h-screen">
            <h1 className="text-[22px] font-bold text-[#29343D]">Remuneration</h1>

            {/* 1. Summary Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Last Payslip */}
                <div className="bg-[#F4F6FF] p-6 rounded-[16px] flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#635BFF] rounded-[12px] flex items-center justify-center text-white">
                            <Wallet size={20} />
                        </div>
                        <span className="text-[13px] font-bold text-[#29343D]">Last Payslip</span>
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-[#29343D]">€ 1,700</p>
                        <p className="text-[12px] text-[#98A4AE] font-medium leading-5 mt-1">
                            Gross: €4,500.00 <br /> November 29, 2024
                        </p>
                    </div>
                </div>

                {/* Average Salary */}
                <div className="bg-[#E5F9F6] p-6 rounded-[16px] flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#00CFE8] rounded-[12px] flex items-center justify-center text-white">
                            <Briefcase size={20} />
                        </div>
                        <span className="text-[13px] font-bold text-[#29343D]">Average Salary</span>
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-[#29343D]">€ 2,200</p>
                        <p className="text-[12px] text-[#98A4AE] font-medium mt-1">Last 12 months</p>
                    </div>
                </div>

                {/* Accumulated TFR */}
                <div className="bg-[#FFF9E5] p-6 rounded-[16px] flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FFCF40] rounded-[12px] flex items-center justify-center text-white">
                            <Layers size={20} />
                        </div>
                        <span className="text-[13px] font-bold text-[#29343D]">Accumulated TFR</span>
                    </div>
                    <div>
                        <p className="text-[32px] font-bold text-[#29343D]">€ 5,500</p>
                    </div>
                </div>
            </div>

            {/* 2. Payments per Year Chart Card */}
            <div className="bg-white md:p-[30px] p-[15px] rounded-[16px] border border-[#E0E6EB] mt-2">
                <h3 className="text-[18px] font-bold text-[#29343D] mb-10">Payments per Year</h3>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={paymentsData}
                            margin={{ top: 0, right: 0, left: -20, bottom: 40 }}
                        >
                            <CartesianGrid vertical={false} stroke="transparent" />
                            <XAxis
                                dataKey="year"
                                axisLine={false}
                                tickLine={false}
                                tick={axisStyle}
                                dy={20}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={axisStyle}
                                domain={[1000, 4000]}
                                ticks={[1000, 1500, 2000, 2500, 3000, 3500, 4000]}
                                tickFormatter={(v) => `€ ${v.toLocaleString()}`}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ fill: 'transparent' }}
                                offset={-40}
                            />
                            <Bar
                                dataKey="value"
                                fill="#635BFF"
                                radius={[16, 16, 16, 16]}
                                barSize={70}
                                background={{ fill: '#F8F9FB', radius: 16 }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pixel Perfect Navigation Buttons */}
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        className="w-10 h-10 rounded-full border border-[#DDDBFF] flex items-center justify-center bg-white opacity-30 cursor-not-allowed"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} color="#DDDBFF" />
                    </button>
                    <button
                        className="w-10 h-10 rounded-full border border-[#DDDBFF] flex items-center justify-center bg-white hover:scale-105 transition-all"
                    >
                        <ChevronRight size={20} strokeWidth={2.5} color="#635BFF" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemunerationDashboard;