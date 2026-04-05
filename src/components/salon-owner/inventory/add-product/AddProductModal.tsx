"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import DropIcon from "../../clients/view-details/notes/DropIcon";

interface AddProductModalProps {
    open: boolean;
    onClose: () => void;
}

export default function AddProductModal({
    open,
    onClose,
}: AddProductModalProps) {
    // State for Dropdowns
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

    const [selectedMeasure, setSelectedMeasure] = useState<string>("Milliliters (ml)");
    const [isMeasureOpen, setIsMeasureOpen] = useState<boolean>(false);

    // Mock Data
    const categories: string[] = ["Skin Care", "Hair Care", "Fragrance", "Body Wash"];
    const measures: string[] = ["Milliliters (ml)", "Liters (l)", "Grams (g)", "Kilograms (kg)"];

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="bg-white w-full max-w-[746px] rounded-xl shadow-xl flex flex-col max-h-[95vh]">

                {/* HEADER */}
                <div className="flex justify-between items-center p-6 pb-4">
                    <h2 className="text-lg font-semibold font-manrope text-[#29343D]">
                        Add Product
                    </h2>
                    <button onClick={onClose} className="cursor-pointer text-[#29343D] hover:opacity-70 transition-opacity">
                        <X size={20} />
                    </button>
                </div>

                {/* FORM CONTENT (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-6 pb-6 pt-2">
                    <div className="flex flex-col gap-5">

                        {/* Product Name */}
                        <div>
                            <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">
                                Product Name *
                            </h4>
                            <input
                                type="text"
                                className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3] placeholder:font-manrope"
                                placeholder="Enter product name"
                            />
                        </div>

                        {/* SKU & Barcodes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">SKU *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter SKU" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Barcodes *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter barcodes" />
                            </div>
                        </div>

                        {/* Category & Brand */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Category *</h4>
                                <div
                                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                                    className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope flex justify-between items-center cursor-pointer bg-white"
                                >
                                    <span className={selectedCategory ? "text-[#29343D]" : "text-[#7D8FB3]"}>
                                        {selectedCategory || "Select Category"}
                                    </span>
                                    <ChevronDown size={18} className={`text-[#7D8FB3] transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isCategoryOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#E0E6EB] rounded-md shadow-lg max-h-40 overflow-y-auto">
                                        {categories.map((cat) => (
                                            <div
                                                key={cat}
                                                className="p-3 text-sm font-manrope hover:bg-[#F0EFFF] cursor-pointer text-[#29343D]"
                                                onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                                            >
                                                {cat}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Brand</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter brand" />
                            </div>
                        </div>

                        {/* Stock Amounts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Stock Amount *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter amount" />
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Minimum Stock Amount *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter amount" />
                            </div>
                        </div>

                        {/* Measure & Amount */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="relative">
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Mensuare *</h4>
                                <div
                                    onClick={() => setIsMeasureOpen(!isMeasureOpen)}
                                    className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope flex justify-between items-center cursor-pointer bg-white"
                                >
                                    <span className="text-[#29343D]">{selectedMeasure}</span>
                                    <ChevronDown size={18} className={`text-[#7D8FB3] transition-transform ${isMeasureOpen ? 'rotate-180' : ''}`} />
                                </div>
                                {isMeasureOpen && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-[#E0E6EB] rounded-md shadow-lg">
                                        {measures.map((m) => (
                                            <div
                                                key={m}
                                                className="p-3 text-sm font-manrope hover:bg-[#F0EFFF] cursor-pointer text-[#29343D]"
                                                onClick={() => { setSelectedMeasure(m); setIsMeasureOpen(false); }}
                                            >
                                                {m}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Ammount *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="00 ml" />
                            </div>
                        </div>

                        {/* Prices */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Purchase Price (VAT excluded) *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter price" />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-semibold font-manrope text-[#29343D]">Sale Price *</h4>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="accent-[#635BFF] w-4 h-4 rounded" defaultChecked />
                                        <span className="text-sm text-[#29343D] font-manrope">On Sale</span>
                                    </label>
                                </div>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter sale price" />
                            </div>
                        </div>

                        {/* VAT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">VAT *</h4>
                                <input type="text" className="w-full border border-[#E0E6EB] rounded-md p-3 text-sm font-manrope outline-none focus:border-[#635BFF] placeholder:text-[#7D8FB3]" placeholder="Enter VAT" />
                            </div>
                        </div>

                        {/* Product Photo */}
                        <div>
                            <h4 className="text-sm font-semibold font-manrope text-[#29343D] mb-2">Product Photo *</h4>
                            <div className="border-2 border-dashed border-[#635BFF]/30 rounded-xl p-8 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-[#F0EFFF]/20 transition-colors">
                                <div className="w-14 h-14 bg-[#F0EFFF] rounded-xl flex items-center justify-center mb-3">
                                    <DropIcon />
                                </div>
                                <p className="text-[#635BFF] font-semibold text-sm font-manrope">Drop here or click to browse</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="p-6 pt-3 flex justify-end">
                    <button className="bg-[#635BFF] text-white px-4 py-2.5 cursor-pointer rounded-lg font-manrope font-semibold text-sm hover:bg-[#5249e0] transition-colors shadow-sm">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}