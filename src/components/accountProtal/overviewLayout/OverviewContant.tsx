import ISales from '@/app/account-protal/svg/ISales';
import Card from '../Card'
import CommonHead from '../dashboardLayout/newlayout/CommonHead'
import ITex from '@/app/account-protal/svg/ITex';
import IDeadline from '@/app/account-protal/svg/IDeadline';
import IBudget from '@/app/account-protal/svg/IBudget';

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
        </>
    )
}
