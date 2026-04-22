"use client";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", salaries: 1400, costs: 3200 },
    { name: "Feb", salaries: 1650, costs: 3000 },
    { name: "Mar", salaries: 1800, costs: 2350 },
    { name: "Apr", salaries: 1950, costs: 2300 },
    { name: "May", salaries: 1850, costs: 1800 },
    { name: "Jun", salaries: 1700, costs: 1400 },
    { name: "Jul", salaries: 1650, costs: 1500 },
    { name: "Aug", salaries: 1750, costs: 1550 },
    { name: "Sep", salaries: 1900, costs: 1450 },
    { name: "Oct", salaries: 2050, costs: 1350 },
    { name: "Nov", salaries: 1900, costs: 1350 },
    { name: "Dec", salaries: 1850, costs: 1300 },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-4 shadow-xl rounded-[12px] border border-gray-50 font-manrope min-w-[180px] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#00CFE8]" />
                        <span className="text-[13px] font-bold text-[#29343D]">Salaries</span>
                    </div>
                    <span className="text-[13px] font-medium text-[#98A4AE]">
                        € {payload[0].value.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#635BFF]" />
                        <span className="text-[13px] font-bold text-[#29343D]">Costs</span>
                    </div>
                    <span className="text-[13px] font-medium text-[#98A4AE]">
                        € {payload[1].value.toLocaleString()}
                    </span>
                </div>
            </div>
        );
    }
    return null;
};

const CostsVsSalaries = () => {
    const axisStyle = {
        fill: '#98A4AE',
        fontSize: 12,
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 500,
    };

    return (
        <div className="w-full bg-white p-8 rounded-xl font-manrope">
            <h3 className="text-[18px] font-bold text-[#29343D] mb-10">Costs vs Salaries</h3>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    {/* FIXED: Changed left from -15 to 20, and bottom from 0 to 30 */}
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 20, bottom: 30 }}>
                        <defs>
                            <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#635BFF" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#635BFF" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorSalaries" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00CFE8" stopOpacity={0.05} />
                                <stop offset="95%" stopColor="#00CFE8" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="0" vertical={true} stroke="#F8F9FB" />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={axisStyle}
                            padding={{ left: 20, right: 20 }}
                            dy={15}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={axisStyle}
                            domain={[1000, 3500]}
                            ticks={[1000, 1500, 2000, 2500, 3000, 3500]}
                            tickFormatter={(val) => `€ ${val.toLocaleString()}`}
                        />

                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            type="monotone"
                            dataKey="salaries"
                            stroke="#00CFE8"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorSalaries)"
                            activeDot={{ r: 4, strokeWidth: 0, fill: '#00CFE8' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="costs"
                            stroke="#635BFF"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCosts)"
                            activeDot={{ r: 4, strokeWidth: 0, fill: '#635BFF' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CostsVsSalaries;