"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface DataItem {
    name: string;
    value: number;
    color: string;
}

interface ConsumptionCardProps {
    title: string;
    value: string;
    trend: string;
    isUp: boolean;
    trendLabel?: string;
    data: DataItem[];
}

const mockData: DataItem[] = [
    { name: 'Photo', value: 400, color: '#FFD646' },
    { name: 'Link', value: 300, color: '#59E2FB' },
    { name: 'Video', value: 300, color: '#2DD4BF' },
    { name: 'View More', value: 200, color: '#635BFF' },
    { name: 'Type 5', value: 150, color: '#FF7594' },
    { name: 'Type 6', value: 500, color: '#3CD856' },
];

export default function ConsumptionMetrics() {
    return (
        <div className="bg-white p-6 rounded-xl mt-6 font-manrope">
            <h3 className="text-lg font-bold text-[#29343D] mb-7">Consumption Metrics</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ConsumptionCard
                    title="Consumptions by Type"
                    value="8.924"
                    trend="+9%"
                    isUp={false}
                    data={mockData}
                />
                <ConsumptionCard
                    title="Unique Consumptions by Type"
                    value="6.431"
                    trend="+12.5%"
                    isUp={true}
                    trendLabel="last month"
                    data={mockData}
                />
            </div>
        </div>
    );
}

function ConsumptionCard({ title, value, trend, isUp, trendLabel, data }: ConsumptionCardProps) {
    return (
        <div className="p-7 border border-[#E0E6EB] rounded-xl flex flex-col justify-between">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left Side: Text Data */}
                <div className="flex-1 text-center md:text-left">
                    <p className="text-base font-bold text-[#29343D] mb-6">{title}</p>
                    <h4 className="text-[32px] font-bold text-[#29343D] mb-2">{value}</h4>

                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[13px] font-bold ${isUp ? 'text-[#00C2A0] bg-[#E6F9F6]' : 'text-[#FF5B5B] bg-[#FFF0F0]'}`}>
                            <span>{isUp ? '↑' : '↓'}</span>
                            {trend}
                        </div>
                        {trendLabel && <span className="text-xs text-[#98A4AE] font-medium">{trendLabel}</span>}
                    </div>
                </div>

                {/* Right Side: Donut Chart */}
                <div className="w-50 h-50">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom: Custom Legend */}
            <div className="flex items-center justify-between mt-8">
                {data.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-semibold text-[#526B7A] whitespace-nowrap">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}