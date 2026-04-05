"use client";

import PaginationClient from "@/components/salon-owner/clients/PaginationClient";
import Image from "next/image";
import { useState, useRef } from "react";
interface Product {
    id: number;
    name: string;
    image: string;
    inStock: boolean;
}

export default function ProductListingPage() {
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [ippOpen, setIppOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const ippRef = useRef<HTMLDivElement | null>(null);

    const ITEMS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
    const products: Product[] = Array.from({ length: 10 }).map((_, i) => ({
        id: i + 1,
        name: "Product",
        image: "/images/categoryimage.jpg",
        inStock: i % 2 === 0 || i === 0,
    }));

    const totalPages = Math.ceil(products.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const currentItems = products.slice(start, start + itemsPerPage);

    return (
        <div className="bg-white p-[15px] md:p-[30px] rounded-[12px] font-manrope mt-[24px]">
            <div className="">

                {/* Category Title */}
                <h1 className="text-xl font-bold text-[#29343D] mb-6">Category 1</h1>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
                    {currentItems.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-[0px_0px_30px_rgba(0,0,0,0.04)] cursor-pointer"
                        >
                            {/* Product Image Container */}
                            <div className="bg-[#F1F4F9] overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={255}
                                    height={264}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="p-[15px] md:p-[30px] flex flex-col gap-2">
                                <h3 className="text-base font-bold text-[#29343D]">{product.name}</h3>

                                {/* Stock Badge */}
                                <div>
                                    {product.inStock ? (
                                        <span className="inline-block bg-[#EBFAF0] text-[#36C76C] text-[12px] font-bold px-2 py-1 rounded-lg font-manrope">
                                            In Stock
                                        </span>
                                    ) : (
                                        <span className="inline-block bg-[#FFE5ED] text-[#FF6692] text-[12px] font-bold px-2 py-1 rounded-lg font-manrope">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Integrated Pagination Component */}
                <PaginationClient
                    ippRef={ippRef}
                    setIppOpen={setIppOpen}
                    itemsPerPage={itemsPerPage}
                    ippOpen={ippOpen}
                    ITEMS_PER_PAGE_OPTIONS={ITEMS_PER_PAGE_OPTIONS}
                    setItemsPerPage={setItemsPerPage}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    start={start}
                    filtered={products}
                    margin={false}
                    border={false}
                />

            </div>
        </div>
    );
}