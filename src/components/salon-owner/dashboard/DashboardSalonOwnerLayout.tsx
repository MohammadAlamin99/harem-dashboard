import Card from "@/components/accountProtal/Card";
import CommonHeadSalonOwner from "./CommonHeadSalonOwner";
import IBudget from "@/app/account-protal/svg/IBudget";
import IDeadline from "@/app/account-protal/svg/IDeadline";
import ITex from "@/app/account-protal/svg/ITex";
import IUser from "@/app/account-protal/svg/IUser";
import SalonSummery from "./SalonSummery";
import ClientGraph from "./ClientGraph";
import TrandGraph from "./TrandGraph";
import OnlinePaymentCard from "./OnlinePaymentGraph";
import AppointmentGraph from "./AppointmentGraph";
import AgendaAppointments from "./AgendaAppointments";

export default function DashboardSalonOwnerLayout() {
  const stats = [
    {
      icon: <ITex />,
      title: "Monthly Processed Sales",
      value: "€ 23,850",
      lines: ["+12.5% from last month"],
      iconBg: "bg-[#635BFF]",
      gradientFrom: "rgba(99, 91, 255, 0.12)",
      gradientTo: "rgba(99, 91, 255, 0.03)",
    },
    {
      icon: <IDeadline />,
      title: "Appointments",
      value: 23,
      lines: ["+18.5% from last month"],
      iconBg: "bg-[#F8C20A]",
      gradientFrom: "#FEFDF7",
      gradientTo: "#FEF7DF",
    },
    {
      icon: <IUser />,
      title: "Clients",
      value: 44,
      lines: ["+10% from last month"],
      iconBg: "bg-[#16CDC7]",
      gradientFrom: "#FAFAFF",
      gradientTo: "#E1F9F8",
    },
    {
      icon: <IBudget />,
      title: "Team Members",
      value: 10,
      lines: [""],
      iconBg: "bg-[#36C76C]",
      gradientFrom: "#FAFAFF",
      gradientTo: "#E1F9F8",
    },
  ];

  const data = [
    { month: "Jan", completed: 70, cancelled: 28 },
    { month: "Feb", completed: 55, cancelled: 36 },
    { month: "Mar", completed: 80, cancelled: 48 },
    { month: "Apr", completed: 58, cancelled: 25 },
    { month: "May", completed: 28, cancelled: 48 },
    { month: "Jun", completed: 28, cancelled: 48 },
    { month: "Jul", completed: 28, cancelled: 48 },
    { month: "Aug", completed: 28, cancelled: 48 },
    { month: "Sep", completed: 28, cancelled: 48 },
    { month: "Oct", completed: 28, cancelled: 48 },
    { month: "Nov", completed: 28, cancelled: 48 },
    { month: "Dec", completed: 28, cancelled: 48 },
  ];

  return (
    <>
      <CommonHeadSalonOwner />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 w-full">
        {stats.map((stat, index) => (
          <Card key={index} {...stat} />
        ))}
      </div>
      {/* graph client */}
      <div className="mt-6 grid grid-cols-2 max-[992px]:grid-cols-1 gap-6">
        <SalonSummery />
        <ClientGraph />
      </div>
      {/* Trand graph */}
      <div className="mt-6 grid grid-cols-2 max-[992px]:grid-cols-1 gap-6">
        <TrandGraph />
        <OnlinePaymentCard
          toConfirm={4}
          overdue={4}
          lastCheckDate="25 February"
        />
      </div>
      {/* appointment graph */}
      <div className="mt-6 grid grid-cols-2 max-[992px]:grid-cols-1 gap-6">
        <AppointmentGraph data={data} />
        <AgendaAppointments
          appointments={[
            {
              id: "1",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            },
            {
              id: "2",
              name: "Maria Rodriguez",
              phone: "+39 345 678 9123",
              time: "12:00 AM - 12:15 AM",
              status: "Booked",
            },
          ]}
        />
      </div>
    </>
  );
}
