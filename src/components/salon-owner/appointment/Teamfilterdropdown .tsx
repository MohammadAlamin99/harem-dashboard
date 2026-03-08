"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Check } from "lucide-react";
import IAppoinUser from "./IAppoinUser";

const teamMembers = [
  { id: "all", name: "All Team", avatar: null },
  { id: "1", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "2", name: "Maria Rodriguez", avatar: "/images/avator.png" },
  { id: "3", name: "Maria Rodriguez", avatar: "/images/avator.png" },
];

export default function TeamFilterDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(["all", "1", "2", "3"]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const toggleMember = (id: string) => {
    if (id === "all") {
      // Toggle all
      if (selected.includes("all")) {
        setSelected([]);
      } else {
        setSelected(teamMembers.map((m) => m.id));
      }
      return;
    }
    const memberIds = teamMembers
      .filter((m) => m.id !== "all")
      .map((m) => m.id);
    let next: string[];
    if (selected.includes(id)) {
      next = selected.filter((s) => s !== id && s !== "all");
    } else {
      next = [...selected.filter((s) => s !== "all"), id];
      if (memberIds.every((mid) => next.includes(mid))) {
        next = [...next, "all"];
      }
    }
    setSelected(next);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 border border-[#E0E6EB] rounded-[8px] px-3 py-2 cursor-pointer hover:border-[#635BFF] transition-colors bg-white"
      >
        <div className="w-6 h-6 bg-[#EEEEFF] rounded-[6px] flex items-center justify-center">
          <IAppoinUser />
        </div>
        <span className="text-sm font-manrope font-medium text-[#29343D]">
          All Team
        </span>
        <ChevronDown size={18} color="#0A2540" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-50 bg-white rounded-[14px] shadow-[0px_12px_32px_rgba(0,0,0,0.12)] border border-[#EFF4FA] py-2 min-w-[230px]">
          {teamMembers.map((member) => {
            const isChecked = selected.includes(member.id);
            return (
              <div
                key={member.id}
                onClick={() => toggleMember(member.id)}
                className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#F4F6FA] cursor-pointer transition-colors mx-1 rounded-[8px]"
              >
                {/* Checkbox */}
                <div
                  className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center flex-shrink-0 transition-colors ${
                    isChecked
                      ? "bg-[#635BFF]"
                      : "border-2 border-[#E0E6EB] bg-white"
                  }`}
                >
                  {isChecked && (
                    <Check size={13} color="white" strokeWidth={3} />
                  )}
                </div>

                {/* Avatar */}
                <div className="w-[42px] h-[42px] rounded-[10px] flex-shrink-0 overflow-hidden bg-[#EEEEFF] flex items-center justify-center">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={42}
                      height={42}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#EEEEFF] flex items-center justify-center">
                      <IAppoinUser />
                    </div>
                  )}
                </div>

                {/* Name */}
                <span className="text-sm font-manrope font-semibold text-[#29343D] truncate">
                  {member.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
