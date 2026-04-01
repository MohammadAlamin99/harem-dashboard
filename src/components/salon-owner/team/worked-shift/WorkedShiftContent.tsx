
import { useState } from 'react'
import PageHeaderWithButton from '../../common-component/PageHeaderWithButton'
import { Calendar, ChevronDown, Download, Eye, Search, Users } from 'lucide-react'
import Table, { Column } from '../../common-component/Table'
import Image from 'next/image'
import Link from 'next/link'
import BottomStatusBar from '../../common-component/BottomStatusBar'

interface TeamMemberData {
    id: number
    name: string
    uploadedBy: string
    role: string
    hours: string
    daysWorked: number
    avgHoursPerDay: string
    avatar: string
}

const teamData: TeamMemberData[] = [
    { id: 1, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 21, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 2, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 21, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 3, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 21, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 4, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 21, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 5, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Manager", hours: "165h", daysWorked: 20, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 6, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 20, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 7, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 20, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
    { id: 8, name: "Maria Rodriguez", uploadedBy: "Mario Rossi", role: "Staff", hours: "165h", daysWorked: 20, avgHoursPerDay: "Dec 01, 2024", avatar: "/images/avator.png" },
]

const columns: Column<TeamMemberData>[] = [
    {
        key: "name",
        label: "Team Member",
        render: (item) => (
            <div className="flex items-center gap-2">
                <Image src={item.avatar} alt={item.name} width={48} height={48} className="rounded-xl object-cover" />
                <div className="flex flex-col">
                    <span className="text-[#0A2540] font-semibold">{item.name}</span>
                    <span className="text-[#98A4AE] text-xs">Uploaded by: {item.uploadedBy}</span>
                </div>
            </div>
        ),
    },
    {
        key: "role",
        label: "Role",
        render: (item) => (
            <span className="text-[#FFD648] bg-[#FFF9E5] px-2 py-1 rounded-full text-sm font-medium">{item.role}</span>
        ),
    },
    {
        key: "hours",
        label: "Hours (December)",
        render: (item) => <span className="text-sm text-[#0A2540]">{item.hours}</span>,
    },
    {
        key: "daysWorked",
        label: "Days Worked",
        render: (item) => <span className="text-sm text-[#0A2540]">{item.daysWorked}</span>,
    },
    {
        key: "avgHoursPerDay",
        label: "AVG Hours / Day",
        render: (item) => <span className="text-sm text-[#0A2540]">{item.avgHoursPerDay}</span>,
    },
    {
        key: "actions",
        label: "Actions",
        render: (item) => (
            <Link href={`/salon-owner/team/worked-shift/view-worked-shift/${item.id}`}>
                <button className="px-4 py-2.5 rounded-lg bg-[#EEF2FF] cursor-pointer">
                    <Eye size={16} color='#635BFF' />
                </button>
            </Link>
        ),
    },
]
export default function WorkedShiftContent() {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const YEARS = ["2022", "2023", "2024", "2025", "2026"]
    const [member, setMember] = useState("All Team")
    console.log(setMember)
    const [month, setMonth] = useState("December")
    const [year, setYear] = useState("2024")
    const [search, setSearch] = useState("")

    const filtered = teamData.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    )


    return (
        <div>
            <div className='bg-white rounded-xl'>
                <PageHeaderWithButton
                    title="Worked Shift"
                    buttons={[
                        {
                            label: "Export Data",
                            variant: "secondary",
                            icon: <Download size={16} />,
                            onClick: () => { }
                        }
                    ]}
                />
                <div className="px-6 py-4 flex flex-wrap items-end gap-6 font-manrope">

                    {/* Member */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[#98A4AE] text-xs font-semibold">Member</span>
                        <div className="relative">
                            <div className="flex items-center gap-2 border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 cursor-pointer hover:border-[#6366F1] transition-colors min-w-[130px]">
                                <div className="w-6 h-6 rounded-full bg-[#DDDBFF] flex items-center justify-center">
                                    <Users size={12} className="text-[#6366F1]" />
                                </div>
                                <span className="text-[#0A2540] text-sm font-medium flex-1">{member}</span>
                                <ChevronDown size={14} className="text-[#98A4AE]" />
                            </div>
                        </div>
                    </div>

                    {/* Period */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[#98A4AE] text-xs font-semibold">Period</span>
                        <div className="flex items-center gap-2">
                            {/* Month dropdown */}
                            <div className="relative">
                                <select
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    className="appearance-none border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 pr-8 text-sm font-medium text-[#0A2540] cursor-pointer hover:border-[#6366F1] transition-colors bg-white focus:outline-none"
                                >
                                    {MONTHS.map((m) => (
                                        <option key={m}>{m}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="text-[#98A4AE] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>

                            {/* Year dropdown */}
                            <div className="relative">
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="appearance-none border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 pr-8 text-sm font-medium text-[#0A2540] cursor-pointer hover:border-[#6366F1] transition-colors bg-white focus:outline-none"
                                >
                                    {YEARS.map((y) => (
                                        <option key={y}>{y}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="text-[#98A4AE] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Custom Range */}
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[#98A4AE] text-xs font-semibold">Custom Range</span>
                        <button className="flex items-center gap-2 border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 hover:border-[#6366F1] transition-colors">
                            <span className="text-sm font-medium text-[#98A4AE]">Select dates</span>
                            <Calendar size={15} className="text-[#98A4AE]" strokeWidth={1.8} />
                        </button>
                    </div>

                    {/* Search */}
                    <div className="ml-auto">
                        <div className="flex items-center gap-2 border border-[#EFF4FA] rounded-[8px] px-3 py-2.5 min-w-[240px] focus-within:border-[#6366F1] transition-colors">
                            <Search size={15} className="text-[#29343D]" strokeWidth={2} />
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 text-sm font-medium text-[#0A2540] placeholder:text-[#98A4AE] bg-transparent focus:outline-none"
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* table */}
            <Table
                data={filtered}
                columns={columns}
            />
            <div className="flex justify-between w-full mt-4">
                <BottomStatusBar
                    stats={[
                        { label: "Total Company Hours", value: "840h" },
                        { label: "Average Hours per Employee", value: "168h" },
                    ]}
                />
            </div>
        </div>
    )
}
