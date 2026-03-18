"use client";
import { Ban } from "lucide-react";
import PageHeader from "../../common-component/PageHeader";
import ClientProfile from "./ClientProfile";
import IListIcon from "../../appointment/add-appointment/IListIcon";
import ICalaender from "@/app/account-protal/svg/ICalaender";
import IIncome from "@/app/account-protal/svg/IIncome";
import IDeadline from "@/app/account-protal/svg/IDeadline";
import ITex from "@/app/account-protal/svg/ITex";
import OverviewCard from "../../common-component/OverviewCard";
import INoShow from "./INoShow";
import PersonalDataCard from "../../common-component/Personaldatacard";
import router from "next/router";
import WaiversCard from "./Waiverscard";
import PreferencesBehavior from "./Preferencesbehavior";
import ClientHistoryOfEdit from "./ClientHistoryEdit";

const OverviewData = [
  {
    title: "Total Sales",
    value: "€ 23,850",
    icon: <ITex />,
    bgGradient: "from-[#FAFAFF] to-[#EBEAFF]",
    iconBg: "bg-[#635BFF]",
    // extra: ["3 overdue", "+18.5% from last month"],
  },
  {
    title: "Appointments",
    value: 18,
    icon: <IDeadline />,
    bgGradient: "from-[#F8FDFD] to-[#E1F9F8]",
    iconBg: "bg-[#16CDC7]",
    // extra: ["1 overdue", "-10% from last month"],
  },
  {
    title: "Canceled",
    value: 1,
    icon: <Ban />,
    bgGradient: "from-[#FFFAFB] to-[#FFEBF1]",
    iconBg: "bg-[#FF6692]",
    // extra: ["Next 14 days"],
  },
  {
    title: "No-Show",
    value: 0,
    icon: <INoShow />,
    bgGradient: "from-[#FEFDF7] to-[#FEF7DF]",
    iconBg: "bg-[#F8C20A]",
    // extra: ["Salons over budget", "+50% from last month"],
  },
];

export default function VewDetailsContent() {
  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/*  Breadcrumb bar  */}
      <PageHeader
        title="Maria Rodriguez"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Cllients", active: true }]}
      />

      <div className="py-5 flex flex-col gap-[30px] max-w-[700px] mx-auto lg:max-w-none">
        <div className="bg-white rounded-xl">
          {/*  Profile Card  */}
          <ClientProfile />
          {/* tabs */}
          <div className="bg-[#DDDBFF] mt-4 overflow-x-auto rounded-[0px_0px_12px_12px]">
            <div className="flex items-center md:justify-center gap-2 md:gap-4 min-w-max px-2">
              {/* Tab */}
              <div className="flex items-center gap-2 p-3 cursor-pointer border-b-2 border-[#635BFF] whitespace-nowrap">
                <IListIcon color="#635BFF" />
                <h4 className="font-manrope text-[#635BFF] text-sm font-medium">
                  Basic Data
                </h4>
              </div>

              <div className="flex items-center gap-2 p-3 cursor-pointer whitespace-nowrap">
                <ICalaender color="#29343D" />
                <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                  Appointments
                </h4>
              </div>

              <div className="flex items-center gap-2 p-3 cursor-pointer whitespace-nowrap">
                <IIncome color="#29343D" />
                <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                  Financial Information
                </h4>
              </div>

              <div className="flex items-center gap-2 p-3 cursor-pointer whitespace-nowrap">
                <IListIcon color="#29343D" />
                <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                  Notes & Attachments
                </h4>
              </div>

              <div className="flex items-center gap-2 p-3 cursor-pointer whitespace-nowrap">
                <IListIcon color="#29343D" />
                <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                  Medical
                </h4>
              </div>

              <div className="flex items-center gap-2 p-3 cursor-pointer whitespace-nowrap">
                <IListIcon color="#29343D" />
                <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                  Communication Log
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/*  Overview */}
        <div className="p-[20px] lg:p-[30px] bg-white rounded-xl">
          <h2 className="font-manrope text-[22px] font-semibold text-[#29343D] mb-[30px]">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {OverviewData.map((item, index) => (
              <OverviewCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* Personal Data + Full Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {/* Personal Data */}
          <PersonalDataCard
            title="Personal data"
            onEdit={() => router.push("/edit")}
            fields={[
              { label: "Date of birth", value: "November 7, 1992" },
              { label: "Age", value: "33 years old" },
              { label: "Gender", value: "Female", fullWidth: true },
              { label: "Telephone", value: "+39 336 789 012" },
              { label: "Email", value: "anna@bellavista.com" },
            ]}
          />
          {/* Full Address */}
          <PersonalDataCard
            title="Full Address"
            onEdit={() => router.push("/edit")}
            fields={[
              { label: "Address", value: "Independence Street 567" },
              { label: "City", value: "Bologna" },
              { label: "Province", value: "Bologna (BO)", fullWidth: false },
              { label: "CAP", value: "+40126" },
            ]}
          />
        </div>
        {/* Waivers */}
        <WaiversCard />
        {/*Preferences & Behavior */}
        <PreferencesBehavior />
        {/* History of Edit*/}
        <ClientHistoryOfEdit />
      </div>
    </div>
  );
}
