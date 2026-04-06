"use client";

import { PlusIcon, Eye, Pencil, Trash2 } from "lucide-react";
import PageHeaderWithButton from "../../common-component/PageHeaderWithButton";
import Table, { Column } from "../../common-component/Table";
import { useRouter } from "next/navigation";

interface GiftCard {
    id: string;
    dateOfIssue: string;
    dateOfExpiration: string;
    amount: string;
    eligibleServices: string;
    usageLimit: number;
    status: "Used" | "No-Used";
    validityStatus?: "Active" | "Expired";
}

export default function FinalcialGiftCardContent() {
    const router = useRouter();
    // 1. Dummy Data
    const giftCards: GiftCard[] = [
        { id: "1", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "Used" },
        { id: "2", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "No-Used", validityStatus: "Active" },
        { id: "3", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "No-Used", validityStatus: "Expired" },
        { id: "4", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "Used" },
        { id: "5", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "Used" },
        { id: "6", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "No-Used", validityStatus: "Active" },
        { id: "7", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "No-Used", validityStatus: "Expired" },
        { id: "8", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "No-Used", validityStatus: "Active" },
        { id: "9", dateOfIssue: "5 Aug 2025", dateOfExpiration: "8 Aug 2025", amount: "€ 170", eligibleServices: "All", usageLimit: 1, status: "No-Used", validityStatus: "Expired" },
    ];

    // 2. Column Definitions
    const columns: Column<GiftCard>[] = [
        {
            key: "id",
            label: "ID",
            render: () => <span className="text-[#635BFF] font-semibold cursor-pointer">#000</span>,
        },
        { key: "dateOfIssue", label: "Date of Issue" },
        { key: "dateOfExpiration", label: "Date of Expiration" },
        { key: "amount", label: "Amount" },
        { key: "eligibleServices", label: "Eligible Services" },
        {
            key: "usageLimit",
            label: "Usage Limit",
            render: (item) => (
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F0EEFF] text-[#635BFF] text-xs font-bold">
                    {item.usageLimit}
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (item) => (
                <div className="flex items-center gap-2">
                    {item.status === "Used" ? (
                        <span className="bg-[#EBFAF0] text-[#36C76C] text-[12px] font-bold px-2 py-0.5 rounded-full">Used</span>
                    ) : (
                        <span className="bg-[#FFF9E5] text-[#FFD648] text-[12px] font-bold px-2 py-0.5 rounded-full">No-Used</span>
                    )}
                    {item.validityStatus === "Active" && (
                        <span className="border border-[#36C76C] text-[#36C76C] text-[12px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
                    )}
                    {item.validityStatus === "Expired" && (
                        <span className="border border-[#FF6692] text-[#FF6692] text-[12px] font-bold px-2 py-0.5 rounded-full uppercase">Expired</span>
                    )}
                </div>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item) => (
                <div className="flex items-center gap-2">
                    <button onClick={() => router.push(`/salon-owner/financial/gift-card/view-giftcard/${item.id}`)} className="px-4 py-2.5 bg-[#F1F2FE] text-[#635BFF] rounded-lg hover:bg-[#e1e0ff] transition-colors cursor-pointer">
                        <Eye size={16} />
                    </button>
                    <button className="px-4 py-2.5 bg-[#ECFDFD] text-[#16CDC7] rounded-lg hover:bg-[#d9fbfb] transition-colors cursor-pointer">
                        <Pencil size={16} />
                    </button>
                    <button className="px-4 py-2.5 bg-[#FFE5ED] text-[#FF6692] rounded-lg hover:bg-[#ffd1df] transition-colors cursor-pointer">
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <PageHeaderWithButton
                title="Gift Cards"
                buttons={[
                    {
                        label: "Create Gift Card",
                        variant: "primary",
                        icon: <PlusIcon size={18} />,
                        onClick: () => {
                            router.push("/salon-owner/financial/gift-card/add");
                        },
                    },
                ]}
            />

            <div className="mt-6">
                <Table
                    data={giftCards}
                    columns={columns}
                    perPageOptions={[5, 10, 25]}
                    defaultPerPage={9}
                />
            </div>
        </div>
    );
}