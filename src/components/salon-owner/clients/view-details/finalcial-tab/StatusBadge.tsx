import { GiftCardStatus } from "@/@types/salon-owner/GiftCardStatus.type";


const statusStyles: Record<GiftCardStatus, string> = {
    Used: "bg-[#E8F8EF] text-[#36C76C]",
    "No-Used": "bg-[#FFF9E5] text-[#FFD648]",
    Active: "border border-[#16CDC7] text-[#16CDC7]",
};

export default function StatusBadge({ status }: { status: GiftCardStatus }) {
    return (
        <span
            className={`text-xs font-medium px-3 py-1 rounded-full font-manrope ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}