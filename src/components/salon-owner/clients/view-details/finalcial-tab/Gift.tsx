import { GiftCard } from "@/@types/salon-owner/GiftCardStatus.type";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import StatusBadge from "./StatusBadge";
import Image from "next/image";

export function Gift({ card }: { card: GiftCard }) {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    return (
        <div className="bg-white border border-[#E0E6EB] rounded-xl p-6 flex flex-col md:gap-[30px] gap-[15px] relative">
            {/* Top row: amount + menu */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[#29343D] font-semibold font-manrope text-[18px]">
                        {card.amount}
                    </p>
                    <p className="text-[#9CA3AF] text-[14px] font-manrope">{card.code}</p>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu((p) => !p)}
                        className="text-[#9CA3AF] hover:text-[#29343D] transition-colors p-1 cursor-pointer"
                    >
                        <MoreVertical color="#29343D" className="w-4 h-4" />
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-[#E0E6EB] py-1 z-30 min-w-[120px]">
                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
                            >
                                <Eye className="w-4 h-4 text-[#635BFF]" />
                                View
                            </button>
                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#29343D] hover:bg-[#F4F6FA] transition-colors"
                            >
                                <Pencil className="w-4 h-4 text-[#635BFF]" />
                                Edit
                            </button>
                            <button
                                onClick={() => setShowMenu(false)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-[#FFF0F0] transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Gift*/}
            <Image src={card.image} alt="Gift Card" width={500} height={180} className="object-contain" />

            {/* Status badges */}
            <div className="flex items-center gap-2 flex-wrap">
                {card.statuses.map((s) => (
                    <StatusBadge key={s} status={s} />
                ))}
            </div>
        </div>
    );
}
