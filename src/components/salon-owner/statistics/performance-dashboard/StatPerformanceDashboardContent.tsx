import { Download, Wallet } from "lucide-react";
import PageHeaderWithButton from "../../common-component/PageHeaderWithButton";
import Card from "@/components/accountProtal/Card";
import IDollar from "../../appointment/add-appointment/IDollar";
import ITex from "@/app/account-protal/svg/ITex";
import ChartDashboard from "./ChartDashboard";
import RevenuePerService from "./RevenuePerService";
import RevenueStats from "./RevenueStats";
import CostsVsSalaries from "./CostsVsSalaries";

export default function StatPerformanceDashboardContent() {
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
        {
            icon: <IDollar color="#fff" />,
            title: "Average Ticket",
            value: "€100",
            iconBg: "bg-[#16CDC7]",
            gradientFrom: "#FAFAFF",
            gradientTo: "#E1F9F8",
        },
    ];
    return (
        <div>
            <PageHeaderWithButton
                title="Performance Dashboard"
                buttons={[
                    {
                        icon: <Download size={16} color="#635BFF" />,
                        label: "Export Statistics",
                        variant: "secondary",
                    },
                ]}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full">
                {data.map((stat, index) => (
                    <Card key={index} {...stat} />
                ))}
            </div>
            <div className="mt-6">
                <ChartDashboard />
            </div>
            <div className="mt-6">
                <RevenuePerService />
            </div>
            <div className="mt-6">
                <RevenueStats />
            </div>
            <div className="mt-6">
                <CostsVsSalaries />
            </div>

        </div>
    )
}
