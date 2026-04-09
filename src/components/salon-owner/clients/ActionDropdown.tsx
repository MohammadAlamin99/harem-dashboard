"use client";

import ICalaender from "@/app/account-protal/svg/ICalaender";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export default function ActionDropdown({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on any scroll
  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const actions = [
    {
      label: "View Details",
      icon: <Eye size={20} className="text-[#635BFF]" />,
      href: `/salon-owner/clients/${clientId}`,
    },
    {
      label: "Book now",
      icon: <ICalaender color="#36C76C" size={20} />,
      href: `#`,
    },
    {
      label: "Edit",
      icon: <Pencil size={16} className="text-[#46CAEB]" />,
      href: `#`,
    },
    {
      label: "Delete",
      icon: <Trash2 size={16} className="text-[#FF6692]" />,
      danger: true,
      onClick: () => {
        console.log("Delete client:", clientId);
      },
    },
  ];

  const handleOpen = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownHeight = actions.length * 44 + 16;
      const spaceBelow = window.innerHeight - rect.bottom;

      setPos({
        top:
          spaceBelow < dropdownHeight
            ? rect.top - dropdownHeight - 6  // flip upward
            : rect.bottom + 6,              // show below
        left: rect.right - 176,
      });
    }
    setOpen((o) => !o);
  };

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
      className="bg-white border border-[#E8ECF0] rounded-2xl shadow-2xl py-2 w-44 overflow-hidden"
    >
      {actions.map((a) => (
        <button
          key={a.label}
          onClick={() => {
            setOpen(false);
            if (a.href) router.push(a.href);
            if (a.onClick) a.onClick();
          }}
          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-manrope transition-colors cursor-pointer ${a.danger
            ? "text-[#29343D] hover:bg-red-50"
            : "text-[#29343D] hover:bg-[#F4F6FA]"
            }`}
        >
          {a.icon}
          {a.label}
        </button>
      ))}
    </div>
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors cursor-pointer"
      >
        <MoreVertical size={17} className="text-[#29343D]" />
      </button>

      {typeof window !== "undefined" && createPortal(dropdown, document.body)}
    </>
  );
}