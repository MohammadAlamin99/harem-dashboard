"use client"

import { Download, Plus, Eye, Pencil, Search, Trash2 } from "lucide-react";
import PageHeaderWithButton from "../../common-component/PageHeaderWithButton";
import HeaderFilter from "../../common-component/HeaderFilter";
import { useState } from "react";
import Table, { Column, DropdownAction } from "../../common-component/Table";
import Image from "next/image";

interface Product {
    id: number;
    name: string;
    category: string;
    stock: number;
    priority: "Low" | "Medium" | "High";
    status: "In Stock" | "Out of Stock";
    price: number;
    image: string;
}

// Badge style maps
const PRIORITY_STYLES: Record<Product["priority"], string> = {
    Low: "bg-[#36C76C] text-white",
    Medium: "bg-[#FFD648] text-white",
    High: "bg-[#FF6692] text-white",
};

const STATUS_STYLES: Record<Product["status"], string> = {
    "In Stock": "bg-[#EBFAF0] text-[#36C76C]",
    "Out of Stock": "bg-[#FFE5ED] text-[#FF6692]",
};


export default function AddProductContent() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [priority, setPriority] = useState("all");
    const [selectedStock, setSelectedStock] = useState("all");

    //  data
    const data: Product[] = [
        {
            id: 1,
            name: "Curology Face wash",
            category: "Category 1",
            stock: 10,
            priority: "Low",
            status: "In Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 2,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 3,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 4,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 5,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 6,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 7,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 8,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 9,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
        {
            id: 10,
            name: "Body Lotion",
            category: "Category 2",
            stock: 0,
            priority: "High",
            status: "Out of Stock",
            price: 270,
            image: "/images/product.svg",
        },
    ];

    // columns
    const columns: Column<Product>[] = [
        {
            key: "name",
            label: "Product Name",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                    />
                    <span className="font-semibold text-[#29343D]">
                        {item.name}
                    </span>
                </div>
            ),
        },
        {
            key: "category",
            label: "Category",
            render: (item) => (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold`}>
                    {item.category}
                </span>
            ),
        },
        {
            key: "stock",
            label: "Stock Amount",
        },
        {
            key: "priority",
            label: "Priority",
            render: (item) => (
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${PRIORITY_STYLES[item.priority]}`}>
                    {item.priority}
                </span>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (item) => (
                <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${STATUS_STYLES[item.status]}`}>
                    {item.status}
                </span>
            ),
        },
        {
            key: "price",
            label: "Purchase Price (VAT excluded)",
            render: (item) => `€ ${item.price}`,
        },
    ];

    // actions with icons
    const actions: DropdownAction<Product>[] = [
        {
            label: "View Details",
            icon: <Eye size={16} className="text-[#635BFF] cursor-pointer" />,
            onClick: (item) => console.log(item),
        },
        {
            label: "Edit",
            icon: <Pencil size={16} className="text-[#46CAEB] cursor-pointer" />,
            onClick: (item) => console.log(item),
        },
        {
            label: "Delete",
            icon: <Trash2 size={16} className="text-[#FF6692] cursor-pointer" />,
            onClick: (item) => console.log(item),
        },
    ];

    return (
        <>
            <div className="bg-white rounded-xl pb-3">
                <div>
                    <PageHeaderWithButton
                        title="Add Product"
                        buttons={[
                            {
                                label: "Import Products",
                                onClick: () => console.log("Export clicked"),
                                variant: "outline",
                            },
                            {
                                label: "Export Data",
                                icon: <Download size={15} strokeWidth={2.5} />,
                                onClick: () => console.log("Add clicked"),
                                variant: "secondary",
                            },
                            {
                                label: "Import Product",
                                icon: <Plus size={15} strokeWidth={2.5} />,
                                onClick: () => console.log("Add clicked"),
                                variant: "primary",
                            },
                        ]}
                    />

                    <div className="flex flex-wrap gap-0">
                        <HeaderFilter
                            categories={[
                                { label: "All", value: "all" },
                                { label: "Categories1", value: "Categories1" },
                                { label: "Categories2", value: "Categories2" },
                                { label: "Categories3", value: "Categories3" },
                                { label: "Categories4", value: "Categories4" },
                            ]}
                            selected={selectedCategory}
                            onChange={(value) => setSelectedCategory(value)}
                            showFilterIcon={true}
                        />

                        <HeaderFilter
                            title="Priority"
                            categories={[
                                { label: "All", value: "all" },
                                { label: "Low", value: "Low" },
                                { label: "Medium", value: "Medium" },
                                { label: "High", value: "High" },
                            ]}
                            selected={priority}
                            onChange={(value) => setPriority(value)}
                            showFilterIcon={false}
                        />

                        <HeaderFilter
                            title="Status"
                            categories={[
                                { label: "All", value: "all" },
                                { label: "In Stock", value: "In Stock" },
                                { label: "Out of Stock", value: "Out of Stock" },
                            ]}
                            selected={selectedStock}
                            onChange={(value) => setSelectedStock(value)}
                            showFilterIcon={false}
                        />
                    </div>
                </div>


            </div>

            {/* table */}
            <div className="bg-white rounded-xl mt-6 pt-[30px]">
                <div className="flex items-center gap-2 px-4 py-2.5 border border-[#E0E6EB] rounded-lg bg-white w-full md:w-72 mx-[15px] md:mx-[30px]">
                    <Search size={15} className="text-[#29343D] shrink-0" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="flex-1 text-sm text-[#29343D] placeholder-[#C4CDD5] outline-none bg-transparent font-manrope"
                    />
                </div>
                <div className="mt-[-24px]">
                    <Table
                        data={data}
                        columns={columns}
                        dropdownActions={actions}
                    />
                </div>
            </div>
        </>
    );
}