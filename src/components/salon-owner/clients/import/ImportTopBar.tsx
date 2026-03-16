import { ChevronDown, Download, Filter, Plus } from "lucide-react";
import Link from "next/link";

export default function ImportTopBar({
  setAddClientOpen,
  setActiveYear,
  activeYear,
  setActiveReg,
  activeReg,
  lastAppt,
}: {
  setAddClientOpen: (open: boolean) => void;
  setActiveYear: (year: string) => void;
  activeYear: string;
  setActiveReg: (reg: string) => void;
  activeReg: string;
  lastAppt: string;
}) {
  return (
    <div>
      <div className="bg-white rounded-2xl border border-[#EEF2F8] px-4 md:px-6 py-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-base font-bold text-[#29343D]">Clients</h1>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={"/salon-owner/clients/import"}>
              <button className="flex items-center cursor-pointer gap-2 px-4 py-2.5 border border-[#635BFF] text-[#635BFF] text-sm font-semibold rounded-[8px] hover:bg-[#F0EEFF] transition-colors">
                Import Clients
              </button>
            </Link>

            <button className="cursor-pointer flex items-center gap-2.5 px-4 py-2.5 border border-[#DDDBFF] text-[#635BFF] text-sm font-semibold rounded-[8px] hover:bg-[#F4F6FA] transition-colors bg-[#F8FAFC]">
              <Download size={15} />
              Export Data
            </button>

            <button
              onClick={() => setAddClientOpen(true)}
              className="cursor-pointer flex items-center gap-2.5 px-4 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] text-white text-sm font-semibold rounded-[8px] transition-colors"
            >
              <Plus size={15} />
              Add Client
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end gap-6 lg:gap-8">
          {/* Client Since */}
          <div>
            <p className="text-xs font-semibold text-[#98A4AE] mb-2 flex items-center gap-1">
              Client Since
              <Filter size={12} className="text-[#98A4AE]" />
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {["All Years", "2025", "2024", "2023"].map((y) => (
                <button
                  key={y}
                  onClick={() => setActiveYear(y)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                    activeYear === y
                      ? "border-[#635BFF] text-[#635BFF] bg-white"
                      : "border-[#EFF4FA] text-[#526B7A] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Registration */}
          <div>
            <p className="text-xs text-[#98A4AE] font-semibold mb-2">
              Registration
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {["All", "Imported", "Manual"].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveReg(r)}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg border transition-colors ${
                    activeReg === r
                      ? "border-[#635BFF] text-[#635BFF] bg-white"
                      : "border-[#EFF4FA] text-[#526B7A] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Sales */}
          <div>
            <p className="text-xs text-[#98A4AE] font-semibold mb-2">Sales</p>

            <div className="flex items-center gap-2">
              <span className="px-4 py-2.5 text-xs text-[#526B7A] border border-[#E0E6EB] rounded-lg bg-white">
                € 0
              </span>

              <span className="text-xs text-[#98A4AE]">-</span>

              <span className="px-4 py-2.5 text-xs text-[#526B7A] border border-[#E0E6EB] rounded-lg bg-white">
                € 200
              </span>
            </div>
          </div>

          {/* Last Appointment */}
          <div>
            <p className="text-xs text-[#98A4AE] font-semibold mb-2">
              Last Appointment
            </p>

            <button className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#526B7A] border border-[#E0E6EB] rounded-lg bg-white hover:border-[#635BFF] transition-colors">
              {lastAppt}

              <ChevronDown size={13} className="text-[#98A4AE]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
