"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const categoryData = [
    { name: "Category 1", value: 15, color: "#635BFF" },
    { name: "Category 2", value: 12, color: "#4CC9F0" },
    { name: "Category 3", value: 10, color: "#FFCF40" },
    { name: "Category 4", value: 18, color: "#00CFE8" },
    { name: "Category 5", value: 10, color: "#FF5E7E" },
    { name: "Category 6", value: 10, color: "#36C76C" },
    { name: "Category 7", value: 15, color: "#29343D" },
];

const topServices = [
    { id: 1, name: "Cut and Fold", value: 25 },
    { id: 2, name: "Cut and Fold", value: 25 },
    { id: 3, name: "Cut and Fold", value: 25 },
];

const RevenueStats = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 font-manrope">

            {/* Left Card: Revenue per Category */}
            <div className="flex-1 bg-white p-8 rounded-xl relative">
                <h3 className="text-[18px] font-bold text-[#29343D] mb-4">Revenue per Category</h3>

                <div className="h-[220px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="100%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={130}
                                outerRadius={140}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                                cornerRadius={12}
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text Labels */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pb-4">
                        <p className="text-[32px] font-bold text-[#29343D]">€ 10,000</p>
                        <p className="text-[14px] font-medium text-[#98A4AE]">Total Revenue</p>
                    </div>
                </div>

                {/* Custom Legend Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 mt-8">
                    {categoryData.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[13px] font-medium text-[#29343D] whitespace-nowrap">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Card: Top 3 Services */}
            <div className="flex-1 bg-white p-8 rounded-[16px]">
                <h3 className="text-[18px] font-bold text-[#29343D] mb-8">Top 3 Services</h3>

                <div className="flex flex-col gap-4">
                    {topServices.map((service) => (
                        <div
                            key={service.id}
                            className="flex items-center justify-between p-5 bg-[#F4F6FF] rounded-[16px]"
                        >
                            <div className="flex items-center gap-4">
                                {/* Rank Icon Box */}
                                <div className="w-8 h-8 flex items-center justify-center bg-[#635BFF] text-white text-[14px] font-bold rounded-[6px]">
                                    {service.id}
                                </div>
                                <span className="text-[15px] font-bold text-[#29343D]">{service.name}</span>
                            </div>
                            <span className="text-[15px] font-semibold text-[#29343D]">{service.value}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default RevenueStats;