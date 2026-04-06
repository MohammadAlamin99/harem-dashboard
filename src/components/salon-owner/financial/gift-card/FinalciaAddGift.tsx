"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ImportIcon from "../../dashboard/import-appointment/ImportIcon";
import Image from "next/image";
import Link from "next/link";

export default function FinalciaAddGift() {
    const [isStandalone, setIsStandalone] = useState(false);
    const [hideAmount, setHideAmount] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(1);

    return (
        <div className="bg-white rounded-xl md:p-[30px] p-[15px] font-manrope shadow-[0px_10px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-lg font-semibold text-[#29343D] mb-6">Basic Details</h2>

            {/* Gift Card Type Banner */}
            <div className="bg-[#F6F7F9] rounded-lg p-6 flex justify-between items-center mb-7">
                <div>
                    <h4 className="text-base font-bold text-[#29343D]">Gift Card Type</h4>
                    <p className="text-sm text-[#526B7A] mt-1 font-medium">
                        Client-linked cards are tied to customer accounts
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsStandalone(!isStandalone)}
                        className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${isStandalone ? 'bg-[#635BFF]' : 'bg-[#DDE2FF]'}`}
                    >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isStandalone ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                    <span className="text-sm font-semibold text-[#29343D]">Standalone</span>
                </div>
            </div>

            {/* Form Inputs Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-7">
                {/* Client Selection */}
                <div>
                    <label className="block text-sm font-bold text-[#29343D] mb-2">Client *</label>
                    <div className="relative">
                        <select className="w-full border border-[#E0E6EB] rounded-[4px] p-3 text-sm font-manrope appearance-none outline-none focus:border-[#635BFF] bg-white text-[#98A4AE]">
                            <option>Select client</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A4AE]" size={18} />
                    </div>
                </div>

                {/* Quantity */}
                <div>
                    <label className="block text-sm font-bold text-[#29343D] mb-2">How many gift cards do you want to create? *</label>
                    <input
                        type="number"
                        defaultValue={1}
                        className="w-full border border-[#E0E6EB] rounded-[4px] p-3 text-sm font-manrope outline-none focus:border-[#635BFF]"
                    />
                </div>

                {/* Amount */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-bold text-[#29343D]">Amount *</label>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setHideAmount(!hideAmount)}
                                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${hideAmount ? 'bg-[#635BFF]' : 'bg-[#DDE2FF]'}`}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full transform transition-transform duration-300 ${hideAmount ? 'translate-x-4' : 'translate-x-0'}`} />
                            </button>
                            <span className="text-xs font-semibold text-[#7D8FB3]">Hide amount</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <input
                            placeholder="Enter amount"
                            className="flex-1 border border-[#E0E6EB] rounded-[4px] p-3 text-sm font-manrope outline-none focus:border-[#635BFF]"
                        />
                        <div className="relative w-16">
                            <select className="w-full border border-[#E0E6EB] rounded-[4px] p-3 text-sm font-manrope appearance-none outline-none focus:border-[#635BFF] bg-white text-[#29343D] font-bold">
                                <option>€</option>
                                <option>$</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#98A4AE]" size={14} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Template Selection Area */}
            <div className="p-0.5 mb-10">
                <div className="">
                    <h3 className="text-[15px] font-semibold text-[#29343D] mb-4">Select Template</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Template 1 (Selected) */}
                        <div
                            onClick={() => setSelectedTemplate(1)}
                            className={`p-6 border rounded-xl cursor-pointer transition-all ${selectedTemplate === 1 ? 'border-[#635BFF] bg-[#F0EEFF]/10' : 'border-[#E0E6EB]'}`}
                        >
                            <div className="aspect-[1.6/1] rounded-xl mb-4 overflow-hidden shadow-lg">
                                <Image src="/images/gift01.png" alt="Template" width={315} height={190} className="w-full h-full object-cover" />
                            </div>
                            <h5 className="text-base font-semibold text-[#29343D] mb-1">Template Name</h5>
                            <p className="text-[12px] text-[#98A4AE] leading-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>

                        {/* Template 2 */}
                        <div
                            onClick={() => setSelectedTemplate(2)}
                            className={`p-6 border rounded-xl cursor-pointer transition-all ${selectedTemplate === 2 ? 'border-[#635BFF] bg-[#F0EEFF]/10' : 'border-[#E0E6EB]'}`}
                        >
                            <div className="aspect-[1.6/1] rounded-xl mb-4 overflow-hidden shadow-lg border border-slate-100">
                                <Image src="/images/gift02.png" alt="Template" width={315} height={190} className="w-full h-full object-cover" />
                            </div>
                            <h5 className="text-base font-semibold text-[#29343D] mb-1">Template Name</h5>
                            <p className="text-[12px] text-[#98A4AE] leading-5">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        </div>

                        {/* Upload Custom Template */}
                        <div className="border border-[#635BFF]/30 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <div className="w-14 h-14 bg-[#F0EEFF] rounded-xl flex items-center justify-center mb-4">
                                <ImportIcon />
                            </div>
                            <span className="text-sm font-bold text-[#635BFF]">Upload Custom Gift Card</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end">
                <Link href="/salon-owner/financial/gift-card/create">
                    <button className="bg-[#635BFF] text-white cursor-pointer px-4 py-2.5 rounded-lg font-bold text-sm hover:bg-[#5249e0] transition-colors shadow-sm">
                        Next
                    </button>
                </Link>
            </div>
        </div>
    );
}