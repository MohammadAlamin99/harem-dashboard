"use client";

import ICalaender from "@/app/account-protal/svg/ICalaender";
import { Eye, MoreVertical, KeyRound, PauseCircle, Clock4 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Action = {
    label: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
};

export default function MemberActionDropdown({ clientId }: { clientId: string }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

    return (
        <div ref={ref} className="relative flex justify-center">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
                <MoreVertical size={17} className="text-[#29343D]" />
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#E8ECF0] rounded-2xl shadow-2xl z-30 py-2 w-44 overflow-hidden">
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
            )}
        </div>
    );
}