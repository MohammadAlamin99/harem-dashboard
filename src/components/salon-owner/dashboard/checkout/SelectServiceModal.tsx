import { Service } from "@/@types/salon-owner/service.type";
import { ChevronRight, Search, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
export default function SelectServiceModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: (services: Service[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Service[]>([]);
  const recentServices: Service[] = [
    {
      id: 1,
      name: "Haircut",
      date: "02/08/2025",
      price: 170,
      startTime: "11:00",
      duration: "15 min",
      employee: "Maria Rodriguez",
      employeeAvatar: "/images/service.svg",
    },
    {
      id: 2,
      name: "Makeup",
      date: "02/08/2025",
      price: 170,
      startTime: "11:15",
      duration: "45 min",
      employee: "Maria Rodriguez",
      employeeAvatar: "/images/service.svg",
    },
    {
      id: 3,
      name: "Coloring",
      date: "02/08/2025",
      price: 200,
      startTime: "12:00",
      duration: "30 min",
      employee: "Maria Rodriguez",
      employeeAvatar: "/images/service.svg",
    },
    {
      id: 4,
      name: "Treatment",
      date: "02/08/2025",
      price: 300,
      startTime: "13:00",
      duration: "60 min",
      employee: "Maria Rodriguez",
      employeeAvatar: "/images/service.svg",
    },
  ];
  const filtered = recentServices.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (service: Service) => {
    setSelected((prev) =>
      prev.find((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service],
    );
  };

  const isSelected = (id: number) => selected.some((s) => s.id === id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 z-10 mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold font-manrope text-[#29343D]">
            Search a Service
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <X size={18} className="text-[#29343D]" />
          </button>
        </div>
        <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-xl px-4 py-2.5 mb-5">
          <Search size={18} className="text-[#29343D]" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm font-manrope text-[#29343D] outline-none placeholder:text-[#98A4AE]"
          />
        </div>
        <p className="text-sm font-semibold font-manrope text-[#29343D] mb-3">
          Recent research
        </p>
        <div className="space-y-3 mb-6">
          {filtered.map((service) => {
            const active = isSelected(service.id);
            return (
              <button
                key={service.id}
                onClick={() => toggle(service)}
                className={`w-full flex items-center justify-between p-4 border rounded-xl transition-all cursor-pointer ${
                  active
                    ? "border-[#635BFF] bg-[#F5F4FF]"
                    : "border-[#EFF4FA] hover:bg-[#F8F9FA]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EEEEFF] flex items-center justify-center flex-shrink-0">
                    <Image
                      src={service.employeeAvatar}
                      alt={service.employee}
                      width={35}
                      height={35}
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold font-manrope text-[#29343D]">
                      {service.name}
                    </p>
                    <p className="text-xs font-manrope text-[#98A4AE]">
                      {service.duration}
                    </p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className="text-xs font-manrope text-[#98A4AE]">
                      Estimated
                    </p>
                    <p className="text-base font-semibold font-manrope text-[#635BFF]">
                      € {service.price}
                    </p>
                  </div>
                  <ChevronRight color="#635BFF" size={20} />
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              if (selected.length > 0) {
                onConfirm(selected);
                onClose();
              }
            }}
            disabled={selected.length === 0}
            className={`px-5 py-2.5 text-sm font-semibold font-manrope rounded-[8px] transition-colors cursor-pointer ${
              selected.length > 0
                ? "bg-[#635BFF] hover:bg-[#4f49e0] text-white"
                : "bg-[#EFF4FA] text-[#98A4AE] cursor-not-allowed"
            }`}
          >
            Add {selected.length > 0 ? `${selected.length} ` : ""}Service
            {selected.length > 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
