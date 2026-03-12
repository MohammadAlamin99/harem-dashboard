"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Client } from "@/@types/salon-owner/Client.type";

const RECENT_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Maria Fernandez",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
  {
    id: "c2",
    name: "Virgie Sutton",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
  {
    id: "c3",
    name: "Virgie Sutton",
    phone: "+39 345 678 9123",
    avatar: "/images/avator.png",
  },
  {
    id: "c4",
    name: "Lois Gregory",
    phone: "Staff",
    avatar: "/images/avator.png",
    isStaff: true,
  },
];

function WalkInIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle
        cx="19"
        cy="7"
        r="4"
        stroke="#635BFF"
        strokeWidth="2.2"
        fill="none"
      />
      {/* Body / walking figure */}
      <path
        d="M13 16.5c1.8-2 4-3 6-3s3.5 1 4.5 2.5L25 20l3.5 5"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Left leg */}
      <path
        d="M19 25l-3 6.5"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Right leg */}
      <path
        d="M22 22l2 7"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Left arm */}
      <path
        d="M14 22l4-5"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AddClientIcon() {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <circle
        cx="15"
        cy="9"
        r="4.5"
        stroke="#635BFF"
        strokeWidth="2.2"
        fill="none"
      />
      {/* Body */}
      <path
        d="M6 30c0-5 4-9 9-9s9 4 9 9"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Plus arm raised */}
      <line
        x1="28"
        y1="14"
        x2="28"
        y2="24"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line
        x1="23"
        y1="19"
        x2="33"
        y2="19"
        stroke="#635BFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AddAppontClinetSection({
  selectedClient,
  onSelectClient,
}: {
  selectedClient: string | null;
  onSelectClient: (id: string) => void;
}) {
  const [clientSearch, setClientSearch] = useState("");

  const filteredClients = RECENT_CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(clientSearch.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-2xl border border-[#EBEBEB] px-8 py-7 w-full font-manrope">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-lg font-bold text-[#29343D] font-manrope">
          Client
        </h2>

        {/* Search bar — full width on right */}
        <div className="w-[316px] flex items-center gap-2.5 px-4 py-2.5 border border-[#E0E6EB] rounded-[10px] bg-white">
          <Search size={18} className="text-[#29343D] shrink-0" />
          <input
            type="text"
            placeholder="Search"
            value={clientSearch}
            onChange={(e) => setClientSearch(e.target.value)}
            className="flex-1 text-sm font-manrope text-[#29343D] placeholder-[#AFAFAF] outline-none bg-transparent"
          />
        </div>
      </div>

      {/* ── Walk-In + Add New Client ── */}
      <div className="flex flex-wrap gap-[30px] mb-8">
        {/* Walk-In */}
        <button className="w-[255px] h-[174px] flex flex-col items-center justify-center gap-4 border border-[#E8ECF0] rounded-2xl hover:border-[#635BFF] hover:bg-[#FAFAFE] transition-all cursor-pointer group">
          <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center group-hover:bg-[#E0DEFF] transition-colors">
            <WalkInIcon />
          </div>
          <span className="text-[18px] font-semibold text-[#29343D]">
            Walk-In
          </span>
        </button>

        {/* Add New Client */}
        <button className="w-[255px] h-[174px] flex flex-col items-center justify-center gap-4 border border-[#E8ECF0] rounded-2xl hover:border-[#635BFF] hover:bg-[#FAFAFE] transition-all cursor-pointer group">
          <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center group-hover:bg-[#E0DEFF] transition-colors">
            <AddClientIcon />
          </div>
          <span className="text-[18px] font-semibold text-[#29343D]">
            Add New Client
          </span>
        </button>
      </div>

      {/* ── Recently Scheduled Clients ── */}
      <div>
        <p className="text-sm font-semibold text-[#29343D] mb-4">
          Recently Scheduled Clients
        </p>

        <div className="grid gap-[30px] grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {filteredClients.map((client) => {
            const isSelected = selectedClient === client.id;
            return (
              <button
                key={client.id}
                onClick={() => onSelectClient(client.id as string)}
                className={`flex flex-col items-center justify-center gap-3 py-8 border-2 rounded-xl transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#635BFF] bg-[#F1F2FE]"
                    : "border-[#EBEBEB] bg-white hover:border-[#635BFF] hover:bg-[#FAFAFE]"
                }`}
              >
                {/* Avatar */}
                <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name + phone */}
                <div className="text-center px-2">
                  <p
                    className={`text-[18px] font-bold leading-snug text-[#29343D]`}
                  >
                    {client.name}
                  </p>
                  <p className="text-sm text-[#98A4AE] mt-1 font-normal">
                    {client.phone}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
