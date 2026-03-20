"use client";
import Image from "next/image";
// ─── Types ────────────────────────────────────────────────────────────────────

interface Employee {
  id: number;
  name: string;
  avatar: string;
  totalEarned: string;
}

interface ServiceType {
  id: number;
  name: string;
  totalEarned: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const employees: Employee[] = [
  {
    id: 1,
    name: "Barney",
    avatar: "/images/avator.png",
    totalEarned: "1,700",
  },
  {
    id: 2,
    name: "Barney",
    avatar: "/images/avator.png",
    totalEarned: "1,700",
  },
  {
    id: 3,
    name: "Barney",
    avatar: "/images/avator.png",
    totalEarned: "1,700",
  },
  {
    id: 4,
    name: "Barney",
    avatar: "/images/avator.png",
    totalEarned: "1,700",
  },
  {
    id: 5,
    name: "Barney",
    avatar: "/images/avator.png",
    totalEarned: "1,700",
  },
  {
    id: 6,
    name: "Barney",
    avatar: "/images/avator.png",
    totalEarned: "1,700",
  },
];

const serviceTypes: ServiceType[] = [
  { id: 1, name: "Haircuts", totalEarned: "1,700" },
  { id: 2, name: "Coloring", totalEarned: "1,700" },
  { id: 3, name: "Treatments", totalEarned: "1,700" },
];

// ─── Employee Card ────────────────────────────────────────────────────────────

function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <div className="flex items-center justify-between border border-[#E0E6EB] rounded-xl px-4 py-3 bg-white">
      <div className="flex items-center gap-3">
        <Image
          src={employee.avatar}
          alt={employee.name}
          className="w-11 h-11 rounded-full object-cover bg-[#F4F6FA]"
          width={40}
          height={40}
        />
        <span className="text-[#29343D] font-semibold font-manrope text-base">
          {employee.name}
        </span>
      </div>
      <div className="text-right">
        <p className="text-[#36C76C] font-bold font-manrope text-[20px]">
          € {employee.totalEarned}
        </p>
        <p className="text-[#9CA3AF] text-xs font-manrope">Total Earned</p>
      </div>
    </div>
  );
}

// ─── Service Row ──────────────────────────────────────────────────────────────

function ServiceRow({ service }: { service: ServiceType }) {
  return (
    <div className="flex items-center justify-between bg-[#F4F6FA] rounded-xl px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-[#635BFF] flex items-center justify-center text-white text-sm font-semibold font-manrope flex-shrink-0">
          {service.id}
        </div>
        <span className="text-[#29343D] font-medium font-manrope text-sm">
          {service.name}
        </span>
      </div>
      <div className="text-right">
        <p className="text-[#36C76C] font-bold font-manrope text-[20px]">
          € {service.totalEarned}
        </p>
        <p className="text-[#9CA3AF] text-xs font-manrope">Total Earned</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ClientFinancialBreakdown() {
  return (
    <div className="bg-white font-manrope flex flex-col gap-8">
      {/* ── Breakdown by Employee ── */}
      <div>
        <h2 className="text-[#29343D] font-semibold text-lg font-manrope mb-4">
          Breakdown by Employee
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {employees.map((emp) => (
            <EmployeeCard key={emp.id} employee={emp} />
          ))}
        </div>
      </div>

      {/* ── Breakdown by Service Type ── */}
      <div>
        <h2 className="text-[#29343D] font-semibold text-lg font-manrope mb-4">
          Breakdown by Service Type
        </h2>
        <div className="flex flex-col gap-3">
          {serviceTypes.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
