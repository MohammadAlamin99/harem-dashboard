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
} from "lucide-react";
import Image from "next/image";
import PageHeader from "../../common-component/PageHeader";
import ClientProfile from "./ClientProfile";

/* ─── Types ─── */
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

/* ─── Static Data ─── */
const TABS = [
  { id: "basic", label: "Basic Data", icon: LayoutGrid },
  { id: "appointments", label: "Appointments", icon: Calendar },
  { id: "financial", label: "Financial Information", icon: CreditCard },
  { id: "notes", label: "Notes & Attachments", icon: Paperclip },
  { id: "medical", label: "Medical", icon: Stethoscope },
  { id: "communication", label: "Communication Log", icon: MessageSquare },
];

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
  const [marketingToggle, setMarketingToggle] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [ippOpen, setIppOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(HISTORY.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedHistory = HISTORY.slice(start, start + itemsPerPage);

  

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/* ── Breadcrumb bar ── */}
      <PageHeader
        title="Maria Rodriguez"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Cllients", active: true }]}
      />

      <div className="py-5 flex flex-col gap-4 max-w-[700px] mx-auto lg:max-w-none">
        {/* ── Profile Card ── */}
        <ClientProfile />


        {/* ── Overview ── */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] p-5">
          <h2 className="text-sm font-bold text-[#29343D] mb-4">Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "Total Sales",
                value: "€ 23,850",
                iconBg: "#EEEDFE",
                icon: "💜",
              },
              {
                label: "Appointments",
                value: "18",
                iconBg: "#E1F5EE",
                icon: "🟢",
              },
              { label: "Canceled", value: "1", iconBg: "#FCEBEB", icon: "🔴" },
              { label: "No-Show", value: "0", iconBg: "#FAEEDA", icon: "🟡" },
            ].map((item) => (
              <div
                key={item.label}
                className="border border-[#EEF2F8] rounded-xl p-4"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base mb-3"
                  style={{ background: item.iconBg }}
                >
                  {item.icon}
                </div>
                <p className="text-xs text-[#98A4AE] font-semibold mb-1">
                  {item.label}
                </p>
                <p className="text-xl font-bold text-[#29343D]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Personal Data + Full Address ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Data */}
          <div className="bg-white rounded-2xl border border-[#EEF2F8] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#29343D]">
                Personal data
              </h2>
              <button className="text-xs font-semibold text-[#635BFF] bg-[#EEEDFE] hover:bg-[#e0defe] px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    Date of birth
                  </p>
                  <p className="text-xs font-semibold text-[#29343D]">
                    November 7, 1992
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    Age
                  </p>
                  <p className="text-xs font-semibold text-[#29343D]">
                    33 years old
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                  Gender
                </p>
                <p className="text-xs font-semibold text-[#29343D]">Female</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    Telephone
                  </p>
                  <p className="text-xs font-semibold text-[#29343D]">
                    +39 336 789 012
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    Email
                  </p>
                  <p className="text-xs font-semibold text-[#29343D] break-all">
                    anna@bellavista.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="bg-white rounded-2xl border border-[#EEF2F8] p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-[#29343D]">Full Address</h2>
              <button className="text-xs font-semibold text-[#635BFF] bg-[#EEEDFE] hover:bg-[#e0defe] px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                  Address
                </p>
                <p className="text-xs font-semibold text-[#29343D]">
                  Independence Street 567
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    City
                  </p>
                  <p className="text-xs font-semibold text-[#29343D]">
                    Bologna
                  </p>
                </div>
                <div />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    District
                  </p>
                  <p className="text-xs font-semibold text-[#29343D]">
                    Bologna (BO)
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-[#98A4AE] font-semibold mb-0.5">
                    Zip Code
                  </p>
                  <p className="text-xs font-semibold text-[#29343D]">40126</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Waivers ── */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] p-5">
          <h2 className="text-sm font-bold text-[#29343D] mb-4">Waivers</h2>

          {/* Row 1 — Marketing consent + Social media posting */}
          <div className="flex items-center gap-4 pb-4 border-b border-[#EEF2F8] flex-wrap">
            {/* Marketing consent */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Facebook size={18} className="text-[#1877F2] shrink-0" />
              <Instagram size={18} className="text-[#E1306C] shrink-0" />
              <span className="text-xs font-semibold text-[#635BFF]">
                Marketing consent
              </span>
              {/* Toggle */}
              <button
                onClick={() => setMarketingToggle((v) => !v)}
                className={`ml-2 relative w-[34px] h-[20px] rounded-full transition-colors cursor-pointer shrink-0 ${
                  marketingToggle ? "bg-[#635BFF]" : "bg-[#E0E6EB]"
                }`}
              >
                <span
                  className={`absolute top-[3px] w-[14px] h-[14px] bg-white rounded-full transition-all ${
                    marketingToggle ? "left-[17px]" : "left-[3px]"
                  }`}
                />
              </button>
            </div>
            {/* Social media posting */}
            <div className="flex items-center gap-2 flex-1 min-w-0 justify-between">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#98A4AE] shrink-0" />
                <span className="text-xs font-semibold text-[#29343D]">
                  Social media posting
                </span>
              </div>
              <button className="text-xs font-semibold text-[#1D9E75] border border-[#1D9E75] hover:bg-[#E1F5EE] px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0">
                Sign Now
              </button>
            </div>
          </div>

          {/* Pending signature label */}
          <div className="flex justify-center py-2 border-b border-[#EEF2F8]">
            <span className="text-[11px] font-semibold text-[#B8860B] bg-[#FFF9E6] px-3 py-1 rounded-full">
              Pending Signature
            </span>
          </div>

          {/* Row 2 — Social Media signed */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-[#98A4AE]" />
              <span className="text-xs font-semibold text-[#29343D]">
                Social Media
              </span>
              <span className="text-[10px] font-semibold text-[#085041] bg-[#E1F5EE] px-2 py-0.5 rounded-full">
                Signed
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E0E6EB] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
                <Eye size={13} className="text-[#526B7A]" />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#E0E6EB] hover:bg-[#F4F6FA] transition-colors cursor-pointer">
                <Download size={13} className="text-[#526B7A]" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Preferences & Behavior ── */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] p-5">
          <h2 className="text-sm font-bold text-[#29343D] mb-1">
            Preferences & Behavior
          </h2>
          <p className="text-xs text-[#98A4AE] font-semibold mb-4">
            Preferred stylist/employee
          </p>

          {/* Staff grid */}
          <div className="flex gap-3 overflow-x-auto pb-2 mb-5 scrollbar-hide">
            {STAFF.map((s) => (
              <div
                key={s.id}
                className="relative shrink-0 w-[130px] border border-[#EEF2F8] rounded-xl p-4 text-center"
              >
                <button className="absolute top-2.5 right-2.5 text-[#F09595] hover:text-[#E24B4A] cursor-pointer">
                  <Trash2 size={13} />
                </button>
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2.5 flex items-center justify-center text-xl"
                  style={{ background: s.bgColor }}
                >
                  👩
                </div>
                <p className="text-xs font-bold text-[#29343D]">{s.name}</p>
                <p className="text-[10px] text-[#98A4AE] mt-0.5">{s.role}</p>
              </div>
            ))}
          </div>

          {/* Services + Preferred days */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Services */}
            <div>
              <p className="text-xs text-[#98A4AE] font-semibold mb-3">
                Services most frequently booked
              </p>
              <div className="space-y-2">
                {SERVICES.map((svc, i) => (
                  <div
                    key={svc}
                    className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl px-4 py-3"
                  >
                    <span className="w-[22px] h-[22px] rounded-full bg-[#635BFF] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-[#29343D]">
                      {svc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferred days */}
            <div>
              <p className="text-xs text-[#98A4AE] font-semibold mb-3">
                Preferred days/times
              </p>
              <div className="space-y-0">
                {PREFERRED_DAYS.map((d, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-[#EEF2F8] last:border-b-0"
                  >
                    <span className="text-xs font-semibold text-[#29343D]">
                      {d.time}
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full border-2"
                        style={{ borderColor: d.color, background: d.bg }}
                      />
                      <span className="text-xs font-semibold text-[#29343D]">
                        {d.day}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── History of Edit ── */}
        <div className="bg-white rounded-2xl border border-[#EEF2F8] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EEF2F8]">
            <h2 className="text-sm font-bold text-[#29343D]">
              History of edit
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-[#F8F9FB]">
                  {[
                    "Date / Time",
                    "Field Changed",
                    "Previous Value",
                    "New Value",
                    "Edited By",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold text-[#526B7A] border-b border-[#EEF2F8] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedHistory.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#EEF2F8] last:border-b-0 hover:bg-[#FAFAFE]"
                  >
                    <td className="px-4 py-3 text-[11px] text-[#526B7A] whitespace-nowrap">
                      {row.dateTime}
                    </td>
                    <td className="px-4 py-3 text-[11px] font-semibold text-[#29343D]">
                      {row.fieldChanged}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-[#29343D]">
                      {row.previousValue}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-[#29343D]">
                      {row.newValue}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-[#29343D] whitespace-nowrap">
                      {row.editedBy}
                    </td>
                    <td className="px-4 py-3">
                      <ActionBadge action={row.action} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 flex items-center justify-end gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-[#526B7A]">
              <span>Items per page:</span>
              <div className="relative">
                <button
                  onClick={() => setIppOpen((o) => !o)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#E0E6EB] rounded-lg text-xs font-semibold text-[#29343D] hover:border-[#635BFF] bg-white cursor-pointer transition-colors"
                >
                  {itemsPerPage}
                  <ChevronDown
                    size={11}
                    className={`text-[#98A4AE] transition-transform ${ippOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {ippOpen && (
                  <div className="absolute bottom-full mb-1 left-0 bg-white rounded-xl shadow-lg border border-[#EEF2F8] py-1 z-10 w-16">
                    {[5, 10, 20].map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setItemsPerPage(n);
                          setCurrentPage(1);
                          setIppOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs cursor-pointer transition-colors ${itemsPerPage === n ? "bg-[#F0EEFF] font-semibold" : "hover:bg-[#F4F6FA]"}`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <span className="text-xs text-[#526B7A]">
              {start + 1}–{Math.min(start + itemsPerPage, HISTORY.length)} of{" "}
              {HISTORY.length}
            </span>
            <div className="flex items-center gap-0.5">
              {[
                {
                  icon: <ChevronFirst size={13} />,
                  action: () => setCurrentPage(1),
                  disabled: currentPage === 1,
                },
                {
                  icon: <ChevronLeft size={13} />,
                  action: () => setCurrentPage((p) => p - 1),
                  disabled: currentPage === 1,
                },
                {
                  icon: <ChevronRight size={13} />,
                  action: () => setCurrentPage((p) => p + 1),
                  disabled: currentPage === totalPages,
                },
                {
                  icon: <ChevronLast size={13} />,
                  action: () => setCurrentPage(totalPages),
                  disabled: currentPage === totalPages,
                },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  disabled={btn.disabled}
                  className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${btn.disabled ? "text-[#C4CDD5] cursor-not-allowed" : "text-[#526B7A] hover:bg-[#F4F6FA]"}`}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
