
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{ value: number | string }>;
    label?: string;
}
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            // Added font-manrope here
            <div className="bg-white p-3 shadow-lg rounded-xl border border-gray-50 font-manrope">
                <p className="text-[12px] font-bold text-gray-800 mb-1">{label}</p>
                <p className="text-[12px] font-semibold text-[#36C76C]">
                    Appointments: <span className="text-gray-400 ml-4">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

const weeklyData = [
    { name: "Monday", appointments: 45 },
    { name: "Tuesday", appointments: 52 },
    { name: "Wednesday", appointments: 40 },
    { name: "Thursday", appointments: 70 },
    { name: "Friday", appointments: 65 },
    { name: "Saturday", appointments: 130 },
    { name: "Sunday", appointments: 115 },
];

export default function WeeklyAppointmentChart() {
    const axisStyle = {
        fill: '#98A4AE',
        fontSize: 12,
        fontFamily: 'Manrope, sans-serif',
    };
    return (
        <div>
            <div className="flex-1 bg-white p-6 rounded-2xl border border-[#E0E6EB] font-manrope">
                <h3 className="text-[16px] font-bold text-[#29343D] mb-8 ">Weekly Appointments</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={weeklyData}>
                            <defs>
                                <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#36C76C" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#36C76C" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke="#F1F5F9" />
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
                                ticks={[0, 35, 70, 105, 140]}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area
                                type="monotone"
                                dataKey="appointments"
                                stroke="#36C76C"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorGreen)"
                                dot={{ r: 0 }}
                                activeDot={{ r: 4, strokeWidth: 0, fill: '#36C76C' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
