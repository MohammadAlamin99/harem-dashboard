import Card from "@/components/accountProtal/Card";
import PageHeader from "@/components/salon-owner/common-component/PageHeader";
import { Calendar, ChartLine, ChevronDown, Clock, Home, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Table, { Column } from "@/components/salon-owner/common-component/Table";
import AddShiftModal from "./Addshiftmodal";


export default function ViewWorkedShiftContent() {
    const router = useRouter();
    const [month, setMonth] = useState("December")
    const [year, setYear] = useState("2024")
    const [shiftModalOpen, setShiftModalOpen] = useState(false)
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const YEARS = ["2022", "2023", "2024", "2025", "2026"]
    const stats = [
        {
            icon: <Clock />,
            title: "Total Hours",
            value: "165h",
            iconBg: "bg-[#635BFF]",
            gradientFrom: "rgba(99, 91, 255, 0.12)",
            gradientTo: "rgba(99, 91, 255, 0.03)",
        },
        {
            icon: <Calendar />,
            title: "Days Worked",
            value: 21,
            iconBg: "bg-[#16CDC7]",
            gradientFrom: "#FAFAFF",
            gradientTo: "#E1F9F8",
        },
        {
            icon: <ChartLine />,
            title: "Avg Hour/Day",
            value: "7.5h",
            iconBg: "bg-[#36C76C]",
            gradientFrom: "#FAFAFF",
            gradientTo: "#E1F9F8",
        },
    ];

    type ShiftData = {
        id: number
        date: string
        dayOfWeek: string
        shifts: number
        timeIn: string
        timeOut: string
        hoursWorked: string
        dailyTotal: string
    }

    const shiftColumns: Column<ShiftData>[] = [
        {
            key: "date",
            label: "Date",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.date}</span>
            ),
        },
        {
            key: "dayOfWeek",
            label: "Day of Week",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.dayOfWeek}</span>
            ),
        },
        {
            key: "shifts",
            label: "Shifts",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#635BFF] inline-block flex-shrink-0" />
                    <span className="text-sm font-medium text-[#29343D]">{item.shifts}</span>
                </div>
            ),
        },
        {
            key: "timeIn",
            label: "Time In",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.timeIn}</span>
            ),
        },
        {
            key: "timeOut",
            label: "Time Out",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.timeOut}</span>
            ),
        },
        {
            key: "hoursWorked",
            label: "Hours Worked",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.hoursWorked}</span>
            ),
        },
        {
            key: "dailyTotal",
            label: "Daily Total",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.dailyTotal}</span>
            ),
        },
        {
            key: "id",
            label: "Actions",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <button className="px-3 py-2 rounded-lg bg-[#E6FAFF] hover:bg-[#ccf4ff] transition-colors">
                        <Pencil size={14} className="text-[#46CAEB]" />
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-[#FFF1F5] hover:bg-[#ffd6e3] transition-colors">
                        <Trash2 size={14} className="text-[#FF6692]" />
                    </button>
                </div>
            ),
        },
    ]

    const shiftData: ShiftData[] = [
        { id: 1, date: "Dec 01, 2024", dayOfWeek: "Sunday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hoursWorked: "8h", dailyTotal: "8h" },
        { id: 2, date: "Dec 01, 2024", dayOfWeek: "Monday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hoursWorked: "8h", dailyTotal: "8h" },
        { id: 3, date: "Dec 01, 2024", dayOfWeek: "Tuesday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hoursWorked: "8h", dailyTotal: "8h" },
        { id: 4, date: "Dec 01, 2024", dayOfWeek: "Wednesday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hoursWorked: "8h", dailyTotal: "8h" },
        { id: 5, date: "Dec 01, 2024", dayOfWeek: "Thursday", shifts: 1, timeIn: "09:00", timeOut: "18:00", hoursWorked: "8h", dailyTotal: "8h" },
    ]

    return (
        <>
            <PageHeader
                title="View Worked Shift"
                onBack={() => router.back()}
                breadcrumb={[{ label: "Worked Shifts", active: true }]}
                HomeIcon={<Home size={18} />}
            />

            <div className="border border-[#E0E6EB] rounded-xl md:p-[30px] p-[15px] bg-white mt-[24px]">
                {/* Member header */}
                <div className="flex items-center justify-between bg-[#F6F7F9] p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                        <Image src="/images/avator.png" alt="member" width={56} height={56} className="rounded-lg" />
                        <div>
                            <h3 className="text-base font-semibold text-[#29343D] font-manrope">John Doe</h3>
                            <p className="text-sm text-[#98A4AE] font-manrope">maria@gmail.com</p>
                        </div>
                    </div>
                    <button className="px-4 py-2.5 rounded-lg text-white cursor-pointer bg-[#635BFF] font-medium"
                        onClick={() => setShiftModalOpen(true)}
                    >
                        Add Shift
                    </button>
                </div>

                {/* Shift stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
                    {stats.map((stat, index) => (
                        <Card key={index} {...stat} />
                    ))}
                </div>
            </div>

            {/* Period + Custom Range filter */}
            <div className="bg-white rounded-[8px] px-6 py-4 flex flex-wrap items-end gap-8 font-manrope mt-6">
                <div className="flex flex-col gap-1.5">
                    <span className="text-[#98A4AE] text-xs font-semibold">Period</span>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="appearance-none border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 pr-8 text-sm font-medium text-[#0A2540] cursor-pointer hover:border-[#6366F1] transition-colors bg-white focus:outline-none"
                            >
                                {MONTHS.map((m) => <option key={m}>{m}</option>)}
                            </select>
                            <ChevronDown size={14} className="text-[#98A4AE] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        <div className="relative">
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="appearance-none border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 pr-8 text-sm font-medium text-[#0A2540] cursor-pointer hover:border-[#6366F1] transition-colors bg-white focus:outline-none"
                            >
                                {YEARS.map((y) => <option key={y}>{y}</option>)}
                            </select>
                            <ChevronDown size={14} className="text-[#98A4AE] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5">
                    <span className="text-[#98A4AE] text-xs font-semibold">Custom Range</span>
                    <button className="flex items-center gap-2 border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 hover:border-[#6366F1] transition-colors">
                        <span className="text-sm font-medium text-[#98A4AE]">Select dates</span>
                        <Calendar size={15} className="text-[#98A4AE]" strokeWidth={1.8} />
                    </button>
                </div>
            </div>

            {/* Table */}

            <Table columns={shiftColumns} data={shiftData} tableTitle={"Daily Shifts - December 2024"} showPagination={false} showBottomStatusBar={true} />

            <AddShiftModal
                isOpen={shiftModalOpen}
                onClose={() => setShiftModalOpen(false)}
                onSave={(data) => {
                    console.log(data)
                    setShiftModalOpen(false)
                }}
            />
        </>
    )
}