"use client";

import { useState } from "react";
import {
  ChevronLeft,
  Home,
  Calendar,
  Hash,
  Users,
  CreditCard,
  Paperclip,
  Stethoscope,
  MessageSquare,
  LayoutGrid,
  Edit2,
  Facebook,
  Instagram,
  FileText,
  Eye,
  Download,
  Trash2,
  ChevronDown,
  ChevronFirst,
  ChevronLast,
  ChevronRight,
  Ban,
} from "lucide-react";
import PageHeader from "../../common-component/PageHeader";
import ClientProfile from "./ClientProfile";
import IListIcon from "../../appointment/add-appointment/IListIcon";
import ICalaender from "@/app/account-protal/svg/ICalaender";
import ICash from "@/app/account-protal/svg/ICash";
import IIncome from "@/app/account-protal/svg/IIncome";
import IBudget from "@/app/account-protal/svg/IBudget";
import IDeadline from "@/app/account-protal/svg/IDeadline";
import ITex from "@/app/account-protal/svg/ITex";
import ISales from "@/app/account-protal/svg/ISales";
import OverviewCard from "../../common-component/OverviewCard";
import INoShow from "./INoShow";
import PersonalDataCard from "../../common-component/Personaldatacard";
import router from "next/router";
import WaiversCard from "./Waiverscard";
import PreferencesBehavior from "./Preferencesbehavior";
import Historyofedit from "./Historyofedit";
interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bgColor: string;
}

interface EditHistoryRow {
  id: string;
  dateTime: string;
  fieldChanged: string;
  previousValue: string;
  newValue: string;
  editedBy: string;
  action: "Update" | "Creation";
}

const STAFF: StaffMember[] = [
  {
    id: "1",
    name: "Lola Ortega",
    role: "Staff",
    avatar: "/images/staff1.png",
    bgColor: "#F4C0D1",
  },
  {
    id: "2",
    name: "Virgie Sutton",
    role: "Staff",
    avatar: "/images/staff2.png",
    bgColor: "#D3D1C7",
  },
  {
    id: "3",
    name: "Lois Gregory",
    role: "Staff",
    avatar: "/images/staff3.png",
    bgColor: "#9FE1CB",
  },
];

const SERVICES = ["Haircuts", "Coloring", "Treatments"];

const PREFERRED_DAYS = [
  { time: "09:45 AM", day: "Monday", color: "#1D9E75", bg: "#E1F5EE" },
  { time: "10:00 AM", day: "Tuesday", color: "#1D9E75", bg: "#E1F5EE" },
  { time: "12:00 AM", day: "Thursday", color: "#1D9E75", bg: "#E1F5EE" },
  { time: "09:30 AM", day: "Friday", color: "#EF9F27", bg: "#FAEEDA" },
  { time: "09:30 AM", day: "Saturday", color: "#EF9F27", bg: "#FAEEDA" },
];
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

const HISTORY: EditHistoryRow[] = [
  {
    id: "1",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Phone",
    previousValue: "+39 336 789 012",
    newValue: "+39 336 789 012",
    editedBy: "Virgie Sutton",
    action: "Update",
  },
  {
    id: "2",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Address",
    previousValue: "Independence Street 567",
    newValue: "Independence Street 567",
    editedBy: "Virgie Sutton",
    action: "Update",
  },
  {
    id: "3",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Email",
    previousValue: "anna@bellavista.com",
    newValue: "anna@gmail.com",
    editedBy: "Lola Ortega",
    action: "Update",
  },
  {
    id: "4",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Email",
    previousValue: "anna@gmail.com",
    newValue: "anna@bellavista.com",
    editedBy: "Lola Ortega",
    action: "Update",
  },
  {
    id: "5",
    dateTime: "5 Aug 2025 09:45 AM",
    fieldChanged: "Profile Created",
    previousValue: "–",
    newValue: "–",
    editedBy: "Lois Gregory",
    action: "Creation",
  },
];

/* ─── Sub-components ─── */
function ActionBadge({ action }: { action: "Update" | "Creation" }) {
  if (action === "Update") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#EEEDFE] text-[#635BFF]">
        Update
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#E1F5EE] text-[#085041]">
      Creation
    </span>
  );
}

/* ─── Main Component ─── */
export default function VewDetailsContent() {
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [ippOpen, setIppOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(HISTORY.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = HISTORY.slice(start, start + itemsPerPage);

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
          <div
            className="bg-[#DDDBFF] flex items-center justify-center gap-4 flex-wrap mt-4"
            style={{ borderRadius: "0 0 12px 12px" }}
          >
            <div className="flex items-center gap-2 p-3 cursor-pointer border-b-2 border-[#635BFF]">
              <IListIcon color="#635BFF" />
              <h4 className="font-manrope text-[#635BFF] text-sm font-medium">
                Basic Data
              </h4>
            </div>
            <div className="flex items-center gap-2 p-3 cursor-pointer">
              <ICalaender color="#29343D" />
              <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                Appointments
              </h4>
            </div>
            <div className="flex items-center gap-2 p-3 cursor-pointer">
              <IIncome color="#29343D" />
              <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                Financial Information
              </h4>
            </div>
            <div className="flex items-center gap-2 p-3 cursor-pointer">
              <IListIcon color="#29343D" />
              <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                Notes & Attachments
              </h4>
            </div>
            <div className="flex items-center gap-2 p-3 cursor-pointer">
              <IListIcon color="#29343D" />
              <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                Medical{" "}
              </h4>
            </div>
            <div className="flex items-center gap-2 p-3 cursor-pointer">
              <IListIcon color="#29343D" />
              <h4 className="font-manrope text-[#29343D] text-sm font-medium">
                Communication Log
              </h4>
            </div>
          </div>
        </div>
        {/*  Overview */}
        <div className="p-[30px] bg-white rounded-xl">
          <h2 className="font-manrope text-[22px] font-semibold text-[#29343D] mb-[30px]">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {OverviewData.map((item, index) => (
              <OverviewCard key={index} {...item} />
            ))}
          </div>
        </div>

        {/* ── Personal Data + Full Address ── */}
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

        {/* ── Waivers ── */}
        <WaiversCard />

        {/* ── Preferences & Behavior ── */}
        <PreferencesBehavior />

        {/* ── History of Edit ── */}
        <Historyofedit />
      </div>
    </div>
  );
}
