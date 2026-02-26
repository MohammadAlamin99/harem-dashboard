import ISales from '@/app/account-protal/svg/ISales';
import Card from '../Card'
import CommonHead from '../dashboardLayout/newlayout/CommonHead'
import ITex from '@/app/account-protal/svg/ITex';
import IDeadline from '@/app/account-protal/svg/IDeadline';
import IBudget from '@/app/account-protal/svg/IBudget';
import Image from 'next/image';
import SalesCard from './SalesCard';
export default function OverviewContant() {
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
        </>
    )
}
