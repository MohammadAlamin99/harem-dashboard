import Card from "@/components/accountProtal/Card";
import EmployeeStatusHeader from "../employee-performance/EmployeeStatusHeader";
import WeeklyAppointmentChart from "../performance-dashboard/WeeklyAppointmentChart";
import ITex from "@/app/account-protal/svg/ITex";
import { Wallet } from "lucide-react";
import UserAnalytics from "./ClientUserAnalytics";
import LoyalCustomers from "./LoyalCustomers";


export default function ClientStatusContent() {
    const data = [
        {
            icon: <Wallet />,
            title: "Appointments Completed (last 30 days)",
            value: "45",
            iconBg: "bg-[#635BFF]",
            gradientFrom: "rgba(99, 91, 255, 0.12)",
            gradientTo: "rgba(99, 91, 255, 0.03)",
        },
        {
            icon: <ITex />,
            title: "Appointments Book Now (last 30 days)",
            value: 52,
            iconBg: "bg-[#16CDC7]",
            gradientFrom: "#FAFAFF",
            gradientTo: "#E1F9F8",
        },
    ];
    return (
        <div>
            <EmployeeStatusHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 w-full">
                {data.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <div className="mt-6">
                <WeeklyAppointmentChart />
            </div>
            <div className="mt-6">
                <UserAnalytics />
            </div>
            <div className="mt-6">
                <LoyalCustomers />
            </div>
        </div>
    )
}
