"use client";

import ICalaender from "@/app/account-protal/svg/ICalaender";
import { Eye, MoreVertical, KeyRound, PauseCircle, Clock4 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

type Action = {
    label: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
};

const ITEMS = 5;
const DROPDOWN_HEIGHT = ITEMS * 44 + 16;

export default function MemberActionDropdown({ clientId }: { clientId: string }) {
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

    const handleOpen = () => {
        if (btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;

            setPos({
                top:
                    spaceBelow < DROPDOWN_HEIGHT
                        ? rect.top - DROPDOWN_HEIGHT - 6  // flip upward
                        : rect.bottom + 6,               // show below
                left: rect.right - 176,
            });
        }
        setOpen((prev) => !prev);
    };

    const actions: Action[] = [
        {
            label: "View Details",
            icon: <Eye size={16} className="text-[#635BFF]" />,
            href: `#`,
        },
        {
            label: "Add Time Off",
            icon: <Clock4 size={16} className="text-[#635BFF]" />,
            href: `#`,
        },
        {
            label: "View Calendar",
            icon: <ICalaender color="#36C76C" size={16} />,
            href: `#`,
        },
        {
            label: "Reset Password",
            icon: <KeyRound size={16} className="text-[#526B7A]" />,
            href: `#`,
        },
        {
            label: "Suspend",
            icon: <PauseCircle size={16} className="text-[#FFD648]" />,
            href: `#`,
        },
    ];

    const dropdown = open ? (
        <div
            ref={dropdownRef}
            style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
            className="bg-white border border-[#E8ECF0] rounded-2xl shadow-2xl py-2 w-44 overflow-hidden"
        >
            {actions.map((action) => (
                <button
                    key={action.label}
                    onClick={() => {
                        setOpen(false);
                        if (action.href) router.push(action.href);
                        if (action.onClick) action.onClick();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-manrope text-[#29343D] hover:bg-[#F4F6FA] transition-colors cursor-pointer"
                >
                    {action.icon}
                    {action.label}
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