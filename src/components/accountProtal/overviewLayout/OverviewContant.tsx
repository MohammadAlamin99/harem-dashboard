'use client'
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";

import ISales from "@/app/account-protal/svg/ISales";
import ITex from "@/app/account-protal/svg/ITex";
import IDeadline from "@/app/account-protal/svg/IDeadline";
import IBudget from "@/app/account-protal/svg/IBudget";

import Card from "../Card";
import CommonHead from "../dashboardLayout/newlayout/CommonHead";
import SalesCard from "./SalesCard";
export default function OverviewContant() {
    const [payrollOpen, setPayrollOpen] = useState(false);
    const [expenseOpen, setExpenseOpen] = useState(false);
    const [payrollMonth, setPayrollMonth] = useState("Monthly");
    const [expenseMonth, setExpenseMonth] = useState("Monthly");
    const stats = [
        {
            icon: <ISales />,
            title: "Salaries Pending Approval",
            value: 12,
            lines: ["3 overdue"],
            iconBg: "bg-yellow-400",
            gradientFrom: "#FEFDF7",
            gradientTo: "#FEF7DF",
        },
        {
            icon: <ITex />,
            title: "Taxes Pending Approval",
            value: 5,
            lines: ["1 overdue"],
            iconBg: "bg-[#16CDC7]",
            gradientFrom: "#F8FDFD",
            gradientTo: "#E1F9F8",
        },
        {
            icon: <IDeadline />,
            title: "Upcoming Deadlines",
            value: 8,
            lines: ["Next 14 days"],
            iconBg: "bg-[#635BFF]",
            gradientFrom: "#FAFAFF",
            gradientTo: "#EBEAFF",
        },
        {
            icon: <IBudget />,
            title: "Budget Warnings",
            value: 3,
            lines: ["Salons over budget"],
            iconBg: "bg-[#FF6692]",
            gradientFrom: "#FFFAFB",
            gradientTo: "#FFEBF1",
        },
    ];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const barData = [
        { name: "Salaries", Budget: 20000, Expense: 5000 },
        { name: "Taxes", Budget: 22000, Expense: 10000 },
        { name: "Supplies", Budget: 41000, Expense: 20000 },
        { name: "Marketing", Budget: 20000, Expense: 2000 },
        { name: "Utilities", Budget: 5000, Expense: 20000 },
    ];

    const lineData = [
        { name: "Jan", value: 3000 },
        { name: "Feb", value: 12000 },
        { name: "Mar", value: 10000 },
        { name: "Apr", value: 8000 },
        { name: "May", value: 15000 },
        { name: "Jun", value: 10000 },
        { name: "Jul", value: 6000 },
        { name: "Aug", value: 9000 },
        { name: "Sep", value: 11000 },
        { name: "Oct", value: 13000 },
        { name: "Nov", value: 7000 },
        { name: "Dec", value: 16000 },
    ];
    return (
        <>
            <CommonHead text="New Salary Upload" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 w-full">
                {stats.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <div className='p-8 border border-[#E0E6EB] rounded-xl mt-6 bg-white mb-6'>
                <div className='flex items-center justify-between'>
                    <h2 className='text-[#29343D] font-manrope font-semibold text-[16px]'>Recently Declined Salaries</h2>
                    <button className='text-[#635BFF] font-medium font-manrope text-[12px] border border-[#E0E6EB] rounded-xl px-4 py-2.5'>View All</button>
                </div>
                <div className='mt-7 flex flex-col gap-4'>
                    <SalesCard
                        name="Jane Doe"
                        image="/images/avator.png"
                        salon="Glamour Beauty"
                        declinedReason="Missing Tax Info"
                        time="2 days ago"
                    />
                    <SalesCard
                        name="John Smith"
                        image="/images/avator.png"
                        salon="Style Studio"
                        declinedReason="Reason: Missing TFR calculation"
                        time="5 days ago"
                    />
                    <SalesCard
                        name="Maria Garcia"
                        image="/images/avator.png"
                        salon="Chic Hair"
                        declinedReason="Monthly budget exceeded by 15%"
                        time="1 week ago"
                    />
                </div>
            </div>


            {/* graph and chart */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 mt-6">
                {/* Payroll Over Time */}
                <div className="bg-white shadow-[0_2px_4px_-1px_rgba(175,182,201,0.20)] rounded-xl p-4  font-manrope">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
                        <div>
                            <h2 className="text-[16px] font-semibold text-[#29343D]">
                                Payroll Over Time
                            </h2>
                            <p className="text-sm text-[#98A4AE]">Last 12 Months</p>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <button
                                    onClick={() => setPayrollOpen(!payrollOpen)}
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
                                >
                                    {payrollMonth}
                                    <ChevronDown size={16} className="text-[#0A2540]" />
                                </button>
                                {payrollOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border-1 border-[#EFF4FA] rounded-lg z-10">
                                        {months.map((month) => (
                                            <button
                                                key={month}
                                                onClick={() => {
                                                    setPayrollMonth(month);
                                                    setPayrollOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm font-md text-[#0A2540] hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className="px-4 py-2 rounded-lg border border-[#635BFF] text-indigo-600 text-sm font-medium hover:bg-indigo-50 whitespace-nowrap">
                                Export Data
                            </button>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData}>
                                <CartesianGrid
                                    stroke="#F6F7F9"
                                    height={1}
                                    vertical={false}
                                />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "0.5rem",
                                    }}
                                />
                                <Legend wrapperStyle={{ paddingTop: "1rem" }} />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                    dot={false}
                                    name="Total"
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* Expense vs Budget */}
                <div className="bg-white rounded-xl p-4 md:p-6 ">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
                        <div>
                            <h2 className="text-[16px] font-semibold text-[#29343D]">
                                Expense vs Budget
                            </h2>
                            <p className="text-sm text-[#98A4AE]">Last 12 Months</p>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <button
                                    onClick={() => setExpenseOpen(!expenseOpen)}
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
                                >
                                    {expenseMonth}
                                    <ChevronDown size={16} />
                                </button>
                                {expenseOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-[#EFF4FA] rounded-lg z-10">
                                        {months.map((month) => (
                                            <button
                                                key={month}
                                                onClick={() => {
                                                    setExpenseMonth(month);
                                                    setExpenseOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <button className="px-4 py-2 rounded-lg border border-[#635BFF] text-indigo-600 text-sm font-medium hover:bg-indigo-50 whitespace-nowrap">
                                Export Data
                            </button>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid
                                    stroke="#F6F7F9"
                                    vertical={false}
                                />
                                <XAxis dataKey="name" stroke="#9ca3af" />
                                <YAxis stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        border: "1px solid #e5e7eb",
                                        borderRadius: "0.5rem",
                                    }}
                                />
                                <Bar
                                    dataKey="Budget"
                                    fill="#635BFF"
                                    radius={[9, 9, 0, 0]}
                                    barSize={10}
                                    isAnimationActive={false}
                                />
                                <Bar
                                    dataKey="Expense"
                                    fill="#FF6692"
                                    radius={[8, 8, 0, 0]}
                                    barSize={10}
                                    isAnimationActive={false}
                                />

                                <Legend
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="left"
                                    wrapperStyle={{ paddingTop: "1rem", borderRadius: '50%' }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    )
}
