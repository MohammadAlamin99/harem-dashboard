import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ISales from "@/app/account-protal/svg/ISales";
import ITex from "@/app/account-protal/svg/ITex";
import IBudget from "@/app/account-protal/svg/IBudget";
import IDeadline from "@/app/account-protal/svg/IDeadline";
import Image from "next/image";
import Card from "../Card";

const pagelineData = [
  { name: "Jan", value: 15000 },
  { name: "Feb", value: 18000 },
  { name: "Feb", value: 16000 },
  { name: "Feb", value: 17000 },
  { name: "Mar", value: 18000 },
  { name: "Apr", value: 16000 },
  { name: "Jun", value: 17000 },
  { name: "Jul", value: 16000 },
  { name: "Sep", value: 15000 },
];

const barData = [
  { name: "Salaries", Budget: 35000, Expense: 28000 },
  { name: "Taxes", Budget: 20000, Expense: 12000 },
  { name: "Supplies", Budget: 40000, Expense: 35000 },
  { name: "Marketing", Budget: 25000, Expense: 8000 },
  { name: "Utilities", Budget: 15000, Expense: 12000 },
];

const salonData = [
  {
    id: 1,
    name: "Glamour Beauty",
    icon: "💄",
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "Over Budget",
    statusColor: "bg-[#FF6692]",
  },
  {
    id: 2,
    name: "Style Studio",
    icon: "✂️",
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "On Track",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    name: "Chic Hair & Beauty",
    icon: "💇",
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "On Track",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    name: "Glamour Beauty",
    icon: "💄",
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "Over Budget",
    statusColor: "bg-pink-100 text-pink-700",
  },
];

const activityData = [
  {
    id: 1,
    title: "Salary declined for Jane Doe",
    company: "Glamour Beauty",
    reason: "Reason: Incorrect gross amount calculation",
    time: "Oct 28, 10:01 AM",
    icon: "/images/glamour-beauty.png",
    status: "High",
    statusColor: "bg-[#FF6692]",
  },
  {
    id: 2,
    title: "Tax document approved",
    company: "Style Studio",
    reason: "VAT Q3 2025 has been approved by owner",
    time: "Oct 28, 10:01 AM",
    icon: "/images/style-studio.png",
    status: "Low",
    statusColor: "bg-[#36C76C]",
  },
  {
    id: 3,
    title: "Budget exceeded",
    company: "Glamour Beauty",
    reason: "Monthly budget exceeded by 15%",
    time: "Oct 28, 10:01 AM",
    icon: "/images/glamour-beauty.png",
    status: "Medium",
    statusColor: "bg-[#FFD648]",
  },
];

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

export default function Dashboard() {
  return (
    <div className="min-h-screen p-1 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="h-[54px] px-4 flex items-center text-left text-sm md:text-[16px] font-bold text-gray-900 rounded-xl bg-[#FFFFFF]">
          Dashboard
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-6 w-full">
        {stats.map((stat, index) => (
          <Card key={index} {...stat} />
        ))}
      </div>

      {/* Middle Section - Activity and Salon Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg p-6 border border-gray-200 font-manrope">
          <div className="flex place-content-between">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[16px] font-semibold text-[#29343D]">
                Recent Activity
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-[10px] mb-6 flex-wrap font-manrope">
              <button className="px-3 py-1 rounded-md text-[12px] border-1 border-[#635BFF] text-[#635BFF] font-medium">
                All
              </button>
              <button className="px-3 py-1 rounded-md text-[12px] text-[#0A2540] border-1 border-[#EFF4FA] font-medium hover:bg-gray-100">
                High
              </button>
              <button className="px-3 py-1 rounded-md text-[12px] text-[#0A2540] border-1 border-[#EFF4FA] font-medium hover:bg-gray-100">
                Medium
              </button>
              <button className="px-3 py-1 rounded-md text-[12px] text-[#0A2540] border-1 border-[#EFF4FA] font-medium hover:bg-gray-100">
                Low
              </button>
            </div>
          </div>

          {/* Activity Items */}
          <div className="space-y-4">
            {activityData.map((item) => (
              <div
                key={item.id}
                className="flex border-1 border-[#E0E6EB] gap-4 p-6 rounded-xl hover:bg-gray-50"
              >
                <div className="mt-2">
                  <Image
                    src={item.icon}
                    alt="Activity Icon"
                    width={56} // Set your image width
                    height={56} // Set your image height
                    className="object-contain" // Optional: ensures the image scales properly
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-[16px] text-[#29343D]">
                        {item.title}
                      </p>
                      <p className="text-sm text-[#635BFF]">{item.company}</p>
                      <p className="text-sm text-[#526B7A] mt-1">
                        {item.reason}
                      </p>
                    </div>

                    <div className="text-right gap-2">
                      <span
                        className={`px-2 py-1 p-2 rounded-full text-white text-[12px] font-medium flex-shrink-0 ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                      <p className="text-[14px] text-[#526B7A] mt-4">
                        {item.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salon Overview */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-semibold text-gray-900">
              Salon Overview
            </h2>
            <button className="px-4 py-2 rounded-md border-1 border-[#635BFF] text-[#635BFF] text-[12px] font-medium hover:bg-purple-50">
              View All
            </button>
          </div>

          {/* Salon Items */}
          <div className="space-y-4">
            {salonData.map((salon) => (
              <div
                key={salon.id}
                className="flex items-center justify-between p-6 border-1 border-[#E0E6EB] bg-gray-50 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="flex gap-2 text-center">
                    {/* Salon Icon */}
                    <div className="text-2xl">{salon.icon}</div>

                    <div>
                      {/* Salon Name */}
                      <p className="font-medium text-gray-900">{salon.name}</p>
                    </div>
                  </div>
                  <div className="flex gap-8 ml-24">
                    {/* Pending Salaries and Pending Taxes */}
                    <div className="flex flex-col text-center">
                      <span>{salon.pendingSalaries}</span>
                      <span>Pending Salaries</span>
                    </div>

                    <div className="flex flex-col text-center">
                      <span>{salon.pendingTaxes}</span>
                      <span>Pending Taxes</span>
                    </div>
                  </div>

                </div>

                {/* Status Label (e.g., Over Budget) */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${salon.statusColor}`}
                >
                  {salon.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payroll Over Time */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Payroll Over Time
              </h2>
              <p className="text-sm text-gray-500">Last 12 Months</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">
                Monthly
              </button>
              <button className="px-4 py-2 rounded-lg border border-purple-200 text-purple-600 text-sm font-medium hover:bg-purple-50">
                Export Data
              </button>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pagelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense vs Budget */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Expense vs Budget
              </h2>
              <p className="text-sm text-gray-500">Last 12 Months</p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-purple-200 text-purple-600 text-sm font-medium hover:bg-purple-50">
              Export Data
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Bar dataKey="Budget" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Expense" fill="#ec4899" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
