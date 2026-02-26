
import ISales from "@/app/account-protal/svg/ISales";
import ITex from "@/app/account-protal/svg/ITex";
import IBudget from "@/app/account-protal/svg/IBudget";
import IDeadline from "@/app/account-protal/svg/IDeadline";
import Image from "next/image";
import IHome from "@/app/account-protal/svg/IHome";
import { useState } from "react";
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
import { ChevronDown } from "lucide-react";

const lineData = [
  { name: "Jan", value: 3000 },
  { name: "Feb", value: 12000 },
  { name: "Feb", value: 10000 },
  { name: "Feb", value: 10000 },
  { name: "Mar", value: 12000 },
  { name: "Apr", value: 12000 },
  { name: "Jun", value: 10000 },
  { name: "Jul", value: 6000 },
  { name: "Sep", value: 11000 },
];

const barData = [
  { name: "Salaries", Budget: 20000, Expense: 5000 },
  { name: "Taxes", Budget: 22000, Expense: 10000 },
  { name: "Supplies", Budget: 41000, Expense: 20000 },
  { name: "Marketing", Budget: 20000, Expense: 2000 },
  { name: "Utilities", Budget: 5000, Expense: 20000 },
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

const salonData = [
  {
    id: 1,
    name: "Glamour Beauty",
    iconColor: "#FF6692", // icon color
    bgColor: "#FFE5ED", // background behind icon
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "On Track",
    statusColor: "#FFE5ED",
  },
  {
    id: 2,
    name: "Style Studio",
    iconColor: "#36C76C", // icon color
    bgColor: "#EBFAF0", // background behind icon
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "On Track",
    statusColor: "#EBFAF0",
  },
  {
    id: 3,
    name: "Chic Hair & Beauty",
    iconColor: "#36C76C", // icon color
    bgColor: "#EBFAF0", // background behind icon
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "On Track",
    statusColor: "#EBFAF0",
  },
  {
    id: 4,
    name: "Style Studio",
    iconColor: "#FF6692", // icon color
    bgColor: "#FFE5ED", // background behind icon
    pendingSalaries: 5,
    pendingTaxes: 2,
    status: "On Track",
    statusColor: "#FFE5ED",
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

export default function Dashboard() {
  const [payrollOpen, setPayrollOpen] = useState(false);
  const [expenseOpen, setExpenseOpen] = useState(false);
  const [payrollMonth, setPayrollMonth] = useState("Monthly");
  const [expenseMonth, setExpenseMonth] = useState("Monthly");

  return (
    <div className="min-h-screen p-1 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="h-[54px] px-4 flex items-center text-left text-sm md:text-[16px] font-bold text-gray-900 rounded-xl bg-[#FFFFFF]">
          Dashboard
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {/* Salaries Pending Approval */}
        <div className="w-full max-w-sm p-6 rounded-lg bg-gradient-to-t from-[#FEFDF7] to-[#FEF7DF] font-manrope">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="w-[40px] h-[40px] bg-yellow-400 rounded-xl flex items-center justify-center text-white text-xl">
              <ISales />
            </div>
            {/* Title */}
            <h3 className="text-lg font-medium text-gray-800">
              Salaries Pending Approval
            </h3>
          </div>
          {/* Main Number */}
          <div className="mt-4 text-[28px] font-semibold text-gray-800">12</div>
          {/* Additional Text */}
          <div className="mt-2 text-[13px] text-[#29343D] font-semibold">
            <p>3 overdue</p>
            <p>+18.5% from last month</p>
          </div>
        </div>

        {/* Taxes Pending Approval */}
        <div className="w-full max-w-sm p-6 rounded-lg bg-gradient-to-t from-[#F8FDFD] to-[#E1F9F8] font-manrope">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="w-[40px] h-[40px] bg-[#16CDC7] rounded-xl flex items-center justify-center text-white text-xl">
              <ITex />
            </div>
            {/* Title */}
            <h3 className="text-lg font-medium text-gray-800">
              Taxes Pending Approval
            </h3>
          </div>
          {/* Main Number */}
          <div className="mt-4 text-[28px] font-semibold text-gray-800">5</div>
          {/* Additional Text */}
          <div className="mt-2 text-[13px] text-[#29343D] font-semibold">
            <p>1 overdue</p>
            <p>-10% from last month</p>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="w-full max-w-sm p-6 rounded-lg bg-gradient-to-t from-[#FAFAFF] to-[#EBEAFF] font-manrope">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="w-[40px] h-[40px] bg-[#635BFF] rounded-xl flex items-center justify-center text-white text-xl">
              <IDeadline />
            </div>
            {/* Title */}
            <h3 className="text-lg font-medium text-gray-800">
              Upcoming Deadlines
            </h3>
          </div>
          {/* Main Number */}
          <div className="mt-4 text-[28px] font-semibold text-gray-800">8</div>
          {/* Additional Text */}
          <div className="mt-2 text-[13px] text-[#29343D] font-semibold">
            <p>Next 14 days</p>
          </div>
        </div>

        {/* Budget Warnings */}
        <div className="w-full max-w-sm p-6 rounded-lg bg-gradient-to-t from-[#FFFAFB] to-[#FFEBF1] font-manrope">
          <div className="flex items-center space-x-4">
            {/* Icon */}
            <div className="w-[40px] h-[40px] bg-[#FF6692] rounded-xl flex items-center justify-center text-white text-xl">
              <IBudget />
            </div>
            {/* Title */}
            <h3 className="text-lg font-medium text-gray-800">
              Budget Warnings
            </h3>
          </div>
          {/* Main Number */}
          <div className="mt-4 text-[28px] font-semibold text-gray-800">3</div>
          {/* Additional Text */}
          <div className="mt-2 text-[13px] text-[#29343D] font-semibold">
            <p>Salons over budget</p>
            <p>+50% from last month</p>
          </div>
        </div>
      </div>

      {/* Middle Section - Activity and Salon Overview */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 font-manrope">
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
                className="flex border border-[#E0E6EB] gap-4 p-6 rounded-xl hover:bg-gray-50"
              >
                <div className="mt-2">
                  <Image
                    src={item.icon}
                    alt="Activity Icon"
                    width={56}
                    height={56}
                    className="object-contain"
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
        <div className="bg-white rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[16px] font-semibold text-gray-900 font-manrope">
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
                className="grid grid-cols-3 items-center p-6 border-1 border-[#E0E6EB] bg-white rounded-xl font-manrope"
              >
                <div className="flex gap-2 text-center justify-start items-center">
                  {/* Salon Icon */}
                  <IHome
                    color={salon.iconColor}
                    bgColor={salon.bgColor}
                    className="rounded-[6px] h-8 w-8 p-1"
                  />

                  {/* Salon Name */}
                  <p className="font-semibold text-[14px] text-[#29343D]">
                    {salon.name}
                  </p>
                </div>
                <div className="flex items-center text-center gap-2">

                  <div className="flex gap-4 lg:gap-8">
                    {/* Pending Salaries and Pending Taxes */}
                    <div className="flex flex-col text-center">
                      <span className="text-[16px] font-semibold font-manrope">
                        {salon.pendingSalaries}
                      </span>
                      <span className="text-[12px] font-normal text-[#526B7A]">
                        Pending Salaries
                      </span>
                    </div>

                    <div className="flex flex-col text-center">
                      <span className="text-[16px] font-semibold font-manrope">
                        {salon.pendingTaxes}
                      </span>
                      <span className="text-[12px] font-normal text-[#526B7A]">
                        Pending Taxes
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className="w-fit inline-block ml-2 pt-1 pr-2 pb-1 pl-2 rounded-lg text-xs font-medium ml-auto"
                  style={{
                    backgroundColor: salon.statusColor,
                    color: salon.iconColor,
                  }}
                >
                  {salon.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        {/* Payroll Over Time */}
        <div className="bg-white rounded-xl p-4  font-manrope">
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
              <button className="px-4 py-2 rounded-lg border-1 border-[#635BFF] text-indigo-600 text-sm font-medium hover:bg-indigo-50 whitespace-nowrap">
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
                  <div className="absolute right-0 mt-2 w-48 bg-white border-1 border-[#EFF4FA] rounded-lg z-10">
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
              <button className="px-4 py-2 rounded-lg border-1 border-[#635BFF] text-indigo-600 text-sm font-medium hover:bg-indigo-50 whitespace-nowrap">
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
    </div>
  );
}
