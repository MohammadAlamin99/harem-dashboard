"use client";
import Image from "next/image";
import Table, { Column } from "../../common-component/Table";
interface GiftCardUsage {
    id: number;
    client: {
        name: string;
        email: string;
        avatar: string;
    };
    code: string;
    amountUsed: string;
    date: string;
    responsibleAttendant: {
        name: string;
        email: string;
        avatar: string;
    };
}

export default function GiftCardUsageTable() {
    const data: GiftCardUsage[] = Array.from({ length: 9 }).map((_, i) => ({
        id: i + 1,
        client: {
            name: "Maria Rodriguez",
            email: "maria@beautywellness.com",
            avatar: "/images/avator.png",
        },
        code: "#000",
        amountUsed: "€ 170",
        date: "5 Aug 2025",
        responsibleAttendant: {
            name: "Maria Rodriguez",
            email: "maria@beautywellness.com",
            avatar: "/images/avator.png",
        },
    }));

    // 3. Define Column Configurations
    const columns: Column<GiftCardUsage>[] = [
        {
            key: "client",
            label: "Client",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="rounded-xl overflow-hidden bg-[#F0EFFF]">
                        <Image
                            src={item.client.avatar}
                            alt={item.client.name}
                            className="w-full h-full object-cover"
                            width={48}
                            height={48}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#29343D]">{item.client.name}</span>
                        <span className="text-[12px] text-[#98A4AE]">{item.client.email}</span>
                    </div>
                </div>
            ),
        },
        {
            key: "code",
            label: "Code",
            render: (item) => (
                <span className="text-sm font-semibold text-[#635BFF] cursor-pointer">
                    {item.code}
                </span>
            ),
        },
        {
            key: "amountUsed",
            label: "Amount Used",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.amountUsed}</span>
            ),
        },
        {
            key: "date",
            label: "Date",
            render: (item) => (
                <span className="text-sm font-medium text-[#29343D]">{item.date}</span>
            ),
        },
        {
            key: "responsibleAttendant",
            label: "Responsible Attendant",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <div className="rounded-xl overflow-hidden bg-[#F0EFFF]">
                        <Image
                            src={item.responsibleAttendant.avatar}
                            alt={item.responsibleAttendant.name}
                            className="w-full h-full object-cover"
                            width={48}
                            height={48}
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-[#29343D]">
                            {item.responsibleAttendant.name}
                        </span>
                        <span className="text-[12px] text-[#98A4AE]">
                            {item.responsibleAttendant.email}
                        </span>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="">
            <Table
                data={data}
                columns={columns}
                defaultPerPage={9}
                perPageOptions={[5, 10, 20]}
                showPagination={true}
            />
        </div>
    );
}