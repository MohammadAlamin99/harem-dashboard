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
import WeeklyAppointmentChart from "./WeeklyAppointmentChart";

const ticketData = [
    { name: "Jan", value: 65 },
    { name: "Feb", value: 50 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 55 },
    { name: "May", value: 25 },
    { name: "Jun", value: 25 },
    { name: "Jul", value: 25 },
    { name: "Aug", value: 25 },
    { name: "Sep", value: 25 },
    { name: "Oct", value: 25 },
    { name: "Nov", value: 25 },
    { name: "Dec", value: 25 },
];


const ChartDashboard = () => {
    const axisStyle = {
        fill: '#98A4AE',
        fontSize: 12,
        fontFamily: 'Manrope, sans-serif',
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#F8FAFC] font-manrope">
            {/* Weekly Appointments Card */}
            <WeeklyAppointmentChart />

            {/* Average Ticket Card */}
            <div className="flex-1 bg-white p-6 rounded-xl border border-[#E0E6EB]">
                <h3 className="text-[16px] font-bold text-[#29343D] mb-8">Average Ticket</h3>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ticketData}>
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
                                ticks={[20, 40, 60, 80]}
                                domain={[0, 90]}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                contentStyle={{ fontFamily: 'Manrope, sans-serif' }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#635BFF"
                                radius={[4, 4, 0, 0]}
                                barSize={8}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default ChartDashboard;