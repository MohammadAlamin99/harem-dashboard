"use client"

import Image from "next/image"
import Table, { Column, CATEGORY_STYLES } from "../common-component/Table"
import ServiceHead from "./ServiceHead"
import { Eye, Pencil, Trash2 } from "lucide-react"

type Service = {
    id: number
    name: string
    image: string
    category: string
    duration: string
    postBreak: string
    price: string
    vat: string
}

const data: Service[] = [
    {
        id: 1,
        name: "Haircut",
        image: "/images/servicekaci.svg",
        category: "Category 1",
        duration: "45 min",
        postBreak: "45 min",
        price: "€270",
        vat: "€70",
    },
    {
        id: 2,
        name: "Haircut",
        image: "/images/servicekaci.svg",
        category: "Category 2",
        duration: "45 min",
        postBreak: "45 min",
        price: "€270",
        vat: "€70",
    },
    {
        id: 3,
        name: "Haircut",
        image: "/images/servicekaci.svg",
        category: "Category 3",
        duration: "45 min",
        postBreak: "45 min",
        price: "€270",
        vat: "€70",
    },
    {
        id: 4,
        name: "Haircut",
        image: "/images/servicekaci.svg",
        category: "Category 3",
        duration: "45 min",
        postBreak: "45 min",
        price: "€270",
        vat: "€70",
    },
    {
        id: 5,
        name: "Haircut",
        image: "/images/servicekaci.svg",
        category: "Category 3",
        duration: "45 min",
        postBreak: "45 min",
        price: "€270",
        vat: "€70",
    },
]

const columns: Column<Service>[] = [
    {
        key: "name",
        label: "Name",
        render: (item) => (
            <div className="flex items-center gap-3">
                <div className="p-2 bg-[#F1F2FE] rounded-lg">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                    />
                </div>
                <span className="font-medium text-[#29343D]">
                    {item.name}
                </span>
            </div>
        ),
    },
    {
        key: "category",
        label: "Category",
        render: (item) => (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_STYLES[item.category]}`}
            >
                {item.category}
            </span>
        ),
    },
    { key: "duration", label: "Default Duration" },
    { key: "postBreak", label: "Post-break Min" },
    { key: "price", label: "Price" },
    { key: "vat", label: "VAT" },
    {
        key: "id",
        label: "Actions",
        render: (item) => (
            <div className="flex items-center gap-4">
                <button className="px-4 py-2.5 rounded-lg bg-[#F1F2FE] hover:bg-[#ccf4ff] transition-colors">
                    <Eye size={16} className="text-[#635BFF]" />
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-[#ECFDFD] hover:bg-[#ccf4ff] transition-colors">
                    <Pencil size={16} className="text-[#16CDC7]" />
                </button>
                <button className="px-4 py-2.5 rounded-lg bg-[#FFE5ED] hover:bg-[#ffd6e3] transition-colors">
                    <Trash2 size={16} className="text-[#FF6692]" />
                </button>
            </div>
        ),
    },
]

export default function ServicesContant() {
    return (
        <div>
            <ServiceHead handleOptionClick={() => { }} />

            <Table
                data={data}
                columns={columns}
                tableTitle="Services"
            />
        </div>
    )
}