import { Minus, Pencil, Plus } from 'lucide-react'

export default function LeftCard({ stockAmount, setStockAmount, minStockAmount, setMinStockAmount, setIsAddBarcodesModalOpen }: { stockAmount: number, setStockAmount: (amount: number) => void, minStockAmount: number, setMinStockAmount: (amount: number) => void, setIsAddBarcodesModalOpen: (open: boolean) => void }) {
    return (
        <div>
            <div className="bg-white rounded-xl p-[15px] md:p-[30px] shadow-sm flex flex-col justify-between">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-lg font-semibold text-[#29343D]">Curology Face wash</h1>
                        <button className="px-4 py-2.5 bg-[#EFF4FA] rounded-lg cursor-pointer">
                            <Pencil size={16} color='#46CAEB' />
                        </button>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                        {/* SKU */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">SKU</p>
                            <p className="text-base font-semibold text-[#29343D]">PROD-2025-001</p>
                        </div>

                        {/* Barcodes */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider">Barcodes</p>
                                <button
                                    onClick={() => setIsAddBarcodesModalOpen(true)}
                                    className="text-[#635BFF] cursor-pointer text-sm font-bold flex items-center gap-1 hover:underline">
                                    <Plus size={14} strokeWidth={3} /> Add
                                </button>
                            </div>
                            <p className="text-base font-semibold text-[#29343D]">7891234567895</p>
                        </div>

                        {/* Category */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">Category</p>
                            <p className="text-base font-semibold text-[#29343D]">Category 1</p>
                        </div>

                        {/* Brand */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">Brand</p>
                            <p className="text-base font-semibold text-[#29343D]">Brand Name</p>
                        </div>

                        {/* Stock Amount */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-2">Stock Amount</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center border border-[#E0E6EB] rounded-lg bg-white">
                                    <button onClick={() => setStockAmount(Math.max(0, stockAmount - 1))} className="p-2 text-[#7D8FB3] hover:text-[#635BFF]">
                                        <Minus size={16} />
                                    </button>
                                    <span className="px-3 py-1 font-semibold text-[#29343D] border-x border-[#E0E6EB] min-w-[40px] text-center">
                                        {stockAmount}
                                    </span>
                                    <button onClick={() => setStockAmount(stockAmount + 1)} className="p-2 text-[#7D8FB3] hover:text-[#635BFF]">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className="bg-[#22C55E] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                                    Priority: Low
                                </span>
                            </div>
                        </div>

                        {/* Minimum Stock Amount */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-2">Minimum Stock Amount</p>
                            <div className="flex items-center border border-[#E0E6EB] rounded-lg bg-white w-fit">
                                <button onClick={() => setMinStockAmount(Math.max(0, minStockAmount - 1))} className="p-2 text-[#7D8FB3] hover:text-[#635BFF]">
                                    <Minus size={16} />
                                </button>
                                <span className="px-3 py-1 font-semibold text-[#29343D] border-x border-[#E0E6EB] min-w-[40px] text-center">
                                    {minStockAmount}
                                </span>
                                <button onClick={() => setMinStockAmount(minStockAmount + 1)} className="p-2 text-[#7D8FB3] hover:text-[#635BFF]">
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Mensuare */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">Mensuare</p>
                            <p className="text-base font-semibold text-[#29343D]">Milliliters (ml)</p>
                        </div>

                        {/* Ammount */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">Ammount</p>
                            <p className="text-base font-semibold text-[#29343D]">100 ml</p>
                        </div>

                        {/* Purchase Price */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">Purchase Price (VAT excluded)</p>
                            <p className="text-base font-semibold text-[#29343D]">€ 270</p>
                        </div>

                        {/* Sale Price */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">Sale Price</p>
                            <p className="text-base font-semibold text-[#29343D]">€ 300</p>
                        </div>

                        {/* VAT */}
                        <div>
                            <p className="text-xs font-medium text-[#7D8FB3] uppercase tracking-wider mb-1">VAT</p>
                            <p className="text-base font-semibold text-[#29343D]">€ 30</p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-12">
                    <button className="bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-[#cfd6ff] transition-colors">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}
