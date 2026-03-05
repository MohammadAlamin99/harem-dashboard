import { ChevronRight, Search, X } from "lucide-react";
import { useState } from "react";

import Image from "next/image";
import { Client } from "@/@types/salon-owner/Client.type";
export default function SelectClientModal({
  onClose,
  onSelect,
}: {
  onClose: () => void;
  onSelect: (c: Client) => void;
}) {
  const recentClients: Client[] = [
    {
      id: 1,
      name: "Maria Fernandez",
      email: "maria@gmail.com",
      phone: "+39 345 678 9123",
      avatar: "/images/avator.png",
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      email: "rodriguez@gmail.com",
      phone: "+39 345 678 9123",
      avatar: "/images/avator.png",
    },
    {
      id: 3,
      name: "Sofia Martinez",
      email: "sofia@gmail.com",
      phone: "+39 345 678 9123",
      avatar: "/images/avator.png",
    },
    {
      id: 4,
      name: "Luna Rossi",
      email: "luna@gmail.com",
      phone: "+39 345 678 9123",
      avatar: "/images/avator.png",
    },
  ];

  const [search, setSearch] = useState("");
  const filtered = recentClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 z-10 mx-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold font-manrope text-[#29343D]">
            Search a Client
          </h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:opacity-70 transition-opacity"
          >
            <X size={18} className="text-[#29343D]" />
          </button>
        </div>
        <div className="flex items-center gap-2 border border-[#E0E6EB] rounded-xl px-4 py-2.5 mb-5">
          <Search size={16} className="text-[#29343D]" />
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
          {filtered.map((client) => (
            <button
              key={client.id}
              onClick={() => {
                onSelect(client);
                onClose();
              }}
              className="w-full shadow flex items-center justify-between p-4 border border-[#E0E6EB] rounded-xl hover:bg-[#F8F9FA] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={client.avatar}
                  alt={client.name}
                  className="w-11 h-11 rounded-xl object-cover bg-[#EFF4FA]"
                  width={40}
                  height={40}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold font-manrope text-[#29343D]">
                    {client.name}
                  </p>
                  <p className="text-xs font-manrope text-[#98A4AE]">
                    {client.phone}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#635BFF]" />
            </button>
          ))}
        </div>
        <div className="flex justify-end">
          <button className="bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-medium font-manrope px-5 py-2.5 rounded-[8px] cursor-pointer">
            Add Client
          </button>
        </div>
      </div>
    </div>
  );
}
