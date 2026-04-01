"use client"

import { useState } from "react"
import { X, Search, ArrowRight, ArrowDown, ArrowUp, Plus, ChevronRight, ChevronDown, Check } from "lucide-react"
import Image from "next/image"
import InventoryIcon from "@/app/account-protal/svg/InventoryIcon"
type Product = {
    id: number
    name: string
    sku: string
    barcode: string
    brand: string
    currentStock: number
    image?: string
}

type Step = 1 | 2 | "associate" | "success"
type MovementType = "stock-in" | "stock-out"

// Mock Data 
const mockProducts: Product[] = [
    { id: 1, image: "/images/product.svg", name: "Curology Face wash", sku: "PSKUROD-2025-001", barcode: "7891234567895", brand: "Curology", currentStock: 45 },
    { id: 2, image: "/images/product.svg", name: "Curology Face wash", sku: "PSKUROD-2025-001", barcode: "7891234567895", brand: "Curology", currentStock: 45 },
    { id: 3, image: "/images/product.svg", name: "Curology Face wash", sku: "PSKUROD-2025-001", barcode: "7891234567895", brand: "Curology", currentStock: 45 },
    { id: 4, image: "/images/product.svg", name: "Curology Face wash", sku: "PSKUROD-2025-001", barcode: "7891234567895", brand: "Curology", currentStock: 45 },
]

// Stepper 
function Stepper({ currentStep }: { currentStep: 1 | 2 }) {
    return (
        <div className="flex justify-center mb-6 w-[345px] mx-auto">
            <div className="relative flex items-center gap-20">

                {/* Line */}
                <div className="absolute top-[33%] left-1/2 h-[1px] w-[180px] bg-[#E0E6EB] -translate-x-1/2 z-0" />

                {/* Step 1 */}
                <div className="flex flex-col items-center relative z-10">
                    <div className="w-7 h-7 rounded-full bg-[#635BFF] flex items-center justify-center text-sm text-white">
                        1
                    </div>
                    <span className="text-xs mt-1 text-[#98A4AE] whitespace-nowrap">
                        Search by Barcode
                    </span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center relative z-10">
                    <div className="w-7 h-7 rounded-full bg-[#526B7A] flex items-center justify-center text-sm text-white">
                        2
                    </div>
                    <span className="text-xs mt-1 text-[#98A4AE] whitespace-nowrap">
                        Add movement
                    </span>
                </div>

            </div>
        </div>
    )
}
// Product Row 

function ProductRow({
    product,
    onClick,
    showSku = true,
}: {
    product: Product
    onClick: () => void
    showSku?: boolean
}) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 border border-[#E0E6EB] rounded-[8px] hover:bg-[#FAFBFF] transition-colors text-left"
        >
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3F3FF] overflow-hidden">
                    {product.image && (
                        <Image src={product.image} alt={product.name} width={48} height={48} className="w-full h-full object-cover" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-semibold text-[#29343D]">{product.name}</p>
                    {showSku && (
                        <p className="text-xs text-[#98A4AE]">
                            SKU: {product.sku} | Barcode: {product.barcode}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
                <div className="text-right">
                    <p className="text-xs text-[#98A4AE]">Curret Stock</p>
                    <p className="text-[#6366F1] font-bold text-lg leading-tight">{product.currentStock}</p>
                </div>
                <ChevronRight size={16} className="text-[#6366F1]" />
            </div>
        </button>
    )
}

// Step 1: Search 

function SearchStep({
    onSelect,
    onAssociate,
}: {
    onSelect: (product: Product) => void
    onAssociate: () => void
}) {
    const [query, setQuery] = useState("")

    const hasQuery = query.trim().length > 0
    const filtered = hasQuery
        ? mockProducts.filter(
            p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.sku.toLowerCase().includes(query.toLowerCase()) ||
                p.barcode.includes(query)
        )
        : []
    const hasResults = filtered.length > 0

    return (
        <>
            <Stepper currentStep={1} />

            <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#29343D]" />
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search by barcode, name or SKU"
                    className="w-full pl-9 pr-4 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm text-[#29343D] placeholder:text-[#98A4AE] outline-none focus:border-[#6366F1]"
                />
            </div>

            {hasQuery && hasResults && (
                <>
                    <p className="text-sm font-semibold text-[#29343D] mb-3">Search Results</p>
                    <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto">
                        {filtered.map((product, i) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                onClick={() => onSelect(product)}
                                showSku={i !== 0}
                            />
                        ))}
                    </div>
                </>
            )}

            {hasQuery && !hasResults && (
                <div className="border border-[#E0E6EB] rounded-[8px] py-10 flex flex-col items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                        <path d="M36.3483 7.89256L41.015 10.3415C46.0355 12.9762 48.5458 14.2935 49.9397 16.6607C51.3337 19.0279 51.3337 21.9735 51.3337 27.8648V28.1378C51.3337 34.0291 51.3337 36.9747 49.9397 39.3419C48.5458 41.7091 46.0355 43.0264 41.015 45.6611L36.3483 48.11C32.2519 50.2598 30.2036 51.3346 28.0003 51.3346C25.797 51.3346 23.7488 50.2598 19.6523 48.11L14.9857 45.6611C9.96512 43.0264 7.45484 41.7091 6.06092 39.3419C4.66699 36.9747 4.66699 34.0291 4.66699 28.1378V27.8648C4.66699 21.9735 4.66699 19.0279 6.06092 16.6607C7.45484 14.2935 9.96512 12.9762 14.9857 10.3415L19.6523 7.89256C23.7488 5.74283 25.797 4.66797 28.0003 4.66797C30.2036 4.66797 32.2519 5.74283 36.3483 7.89256Z" stroke="#526B7A" stroke-width="3.5" stroke-linecap="round" />
                        <path d="M49 17.5L39.6667 22.1667M28 28L7 17.5M28 28V50.1667M28 28C28 28 34.3995 24.8003 38.5 22.75C38.9556 22.5222 39.6667 22.1667 39.6667 22.1667M39.6667 22.1667V30.3333M39.6667 22.1667L17.5 10.5" stroke="#526B7A" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                    <div className="text-center">
                        <p className="text-base font-semibold text-[#29343D] mb-1">No Results Found</p>
                        <p className="text-sm text-normal text-[#999]">
                            Would you like to add a new product or associate with an existing one?
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                        <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#EBFAF0] text-[#36C76C] text-sm font-semibold rounded-[8px] hover:opacity-80 transition-opacity">
                            <Plus size={14} color="#36C76C" />
                            Add New
                        </button>
                        <button
                            onClick={onAssociate}
                            className="px-4 py-2.5 bg-[#DDDBFF] text-[#635BFF] text-sm font-semibold rounded-[8px] hover:opacity-80 transition-opacity"
                        >
                            Associate to Existing
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

// ─── Associate Step ───────────────────────────────────────────────────────────

function AssociateStep({
    onSelect,
    onClose,
}: {
    onSelect: (product: Product) => void
    onClose: () => void
}) {
    const [query, setQuery] = useState("curology")

    const filtered = mockProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <>
            <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-[#29343D]">Associate Barcode</h2>
                <button onClick={onClose} className="text-[#98A4AE] hover:text-[#29343D] transition-colors">
                    <X size={18} />
                </button>
            </div>
            <p className="text-xs text-[#98A4AE] mb-4">
                Select an existing product to associate with  barcode:curology
            </p>

            <div className="relative mb-4">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A4AE]" />
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="curology"
                    className="w-full pl-9 pr-4 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm text-[#29343D] placeholder:text-[#98A4AE] outline-none focus:border-[#6366F1]"
                />
            </div>

            <p className="text-sm font-semibold text-[#29343D] mb-3">Search Results</p>
            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto">
                {filtered.map((product, i) => (
                    <ProductRow
                        key={product.id}
                        product={product}
                        onClick={() => onSelect(product)}
                        showSku={i !== 0}
                    />
                ))}
            </div>
        </>
    )
}

// ─── Step 2: Add Movement ─────────────────────────────────────────────────────

function AddMovementStep({
    product,
    onBack,
    onSave,
}: {
    product: Product
    onBack: () => void
    onSave: () => void
}) {
    const [movementType, setMovementType] = useState<MovementType | null>(null)
    const [quantity, setQuantity] = useState("")
    const [staff, setStaff] = useState("")
    const [note, setNote] = useState("")

    const qty = parseInt(quantity) || 0
    const newStock =
        movementType === "stock-out"
            ? product.currentStock - qty
            : product.currentStock + qty
    const diffLabel = qty > 0 ? `+${qty}` : ""

    return (
        <>
            <Stepper currentStep={2} />

            {/* Product info card */}
            <div className="flex items-center gap-3 bg-[#F1F2FE] rounded-[12px] border border-[#DDDBFF] p-4 mb-3">
                {product.image && (
                    <Image src={product.image} alt={product.name} width={48} height={48} className="object-cover" />
                )}
                <div className="flex flex-wrap gap-x-5 gap-y-1 items-center">
                    <p className="text-sm font-bold text-[#29343D] w-full">{product.name}</p>
                    <p className="text-xs text-[#999]">
                        SKU: <span className="font-bold text-[#999]">{product.sku}</span>
                    </p>
                    <p className="text-xs text-[#999]">
                        Barcode: <span className="font-bold text-[#999]">{product.barcode}</span>
                    </p>
                    <p className="text-xs text-[#999]">
                        Brand: <span className="font-bold text-[#999]">{product.brand}</span>
                    </p>
                </div>
            </div>

            {/* Stock preview */}
            <div className="flex items-center justify-center gap-8 bg-[#F6F7F9] border border-[#E0E6EB] rounded-[8px] px-6 py-4 mb-3">
                <div className="text-center">
                    <p className="text-xs text-[#98A4AE] mb-1">Current Stock</p>
                    <p className="text-[28px] font-bold text-[#29343D]">{product.currentStock}</p>
                </div>
                <ArrowRight size={18} className="text-[#98A4AE]" />
                <div className="text-center">
                    <p className="text-xs text-[#98A4AE] mb-1">
                        New Stock{" "}
                        {diffLabel && <span className="text-[#36C76C] font-semibold">{diffLabel}</span>}
                    </p>
                    <p className="text-[28px] font-bold text-[#6366F1]">{newStock}</p>
                </div>
            </div>

            {/* Stock In / Stock Out toggle */}
            <div className="grid grid-cols-2 gap-6 mb-4">
                <button
                    onClick={() => setMovementType("stock-in")}
                    className={`flex flex-col items-center justify-center gap-2 py-6 rounded-[8px] border transition-all cursor-pointer
                        ${movementType === "stock-in"
                            ? "border-[#36C76C] bg-[#EBFAF0]"
                            : "border-[#E0E6EB] bg-white"}`}
                >
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                        ${movementType === "stock-in" ? "bg-[#36C76C]" : "bg-[#98A4AE]"}`}
                    >
                        <ArrowDown size={18} className="text-white" />
                    </div>
                    <span
                        className={`text-sm font-semibold ${movementType === "stock-in" ? "text-[#36C76C]" : "text-[#98A4AE]"}`}
                    >
                        Stock In
                    </span>
                </button>

                <button
                    onClick={() => setMovementType("stock-out")}
                    className={`flex flex-col items-center justify-center gap-2 py-6 rounded-[8px] border transition-all cursor-pointer
                        ${movementType === "stock-out"
                            ? "border-[#FF6692] bg-[#FFE5ED]"
                            : "border-[#E0E6EB] bg-white"}`}
                >
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all
                        ${movementType === "stock-out" ? "bg-[#FF6692]" : "bg-[#98A4AE]"}`}
                    >
                        <ArrowUp size={18} className="text-white" />
                    </div>
                    <span
                        className={`text-sm font-semibold ${movementType === "stock-out" ? "text-[#FF6692]" : "text-[#98A4AE]"}`}
                    >
                        Stock Out
                    </span>
                </button>
            </div>

            {/* Quantity */}
            <div className="mb-6">
                <label className="text-sm font-semibold text-[#29343D] mb-1.5 block">
                    Quantity *
                </label>
                <input
                    type="text"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-4 py-2.5 border border-[#E0E6EB] rounded-[4px] text-sm text-[#29343D] placeholder:text-[#29343D] outline-none focus:border-[#6366F1]"
                />
            </div>

            {/* Responsible user */}
            <div className="mb-6">
                <label className="text-sm font-semibold text-[#29343D] mb-1.5 block">
                    Responsible user *
                </label>
                <div className="relative">
                    <select
                        value={staff}
                        onChange={e => setStaff(e.target.value)}
                        className="w-full px-4 py-2.5 border border-[#E0E6EB] rounded-[4px] text-sm text-[#98A4AE] outline-none focus:border-[#6366F1] appearance-none bg-white"
                    >
                        <option value="" disabled>Select staff</option>
                        <option value="staff1">Staff 1</option>
                        <option value="staff2">Staff 2</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#98A4AE] pointer-events-none" />
                </div>
            </div>

            {/* Note */}
            <div className="mb-6">
                <label className="text-sm font-semibold text-[#29343D] mb-1.5 block">Note (Optional)</label>
                <textarea
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Enter a note"
                    rows={4}
                    className="w-full px-4 py-2.5 border border-[#E0E6EB] rounded-[4px] text-sm text-[#29343D] placeholder:text-[#29343D] outline-none focus:border-[#6366F1] resize-y"
                />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3">
                <button
                    onClick={onBack}
                    className="px-4 py-2.5 bg-[#EFF4FA] rounded-[8px] text-sm font-semibold text-[#29343D] hover:bg-[#F3F3FF] transition-colors cursor-pointer"
                >
                    Back
                </button>
                <button
                    onClick={onSave}
                    className="px-4 py-2.5 bg-[#635BFF] text-white text-sm font-semibold rounded-[8px] hover:bg-[#4F46E5] transition-colors cursor-pointer"
                >
                    Save Movement
                </button>
            </div>
        </>
    )
}

// ─── Success ──────────────────────────────────────────────────────────────────

function SuccessStep({
    onClose,
    onCreateMovement,
}: {
    onClose: () => void
    onCreateMovement: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center py-12 gap-5">
            <div className="w-20 h-20 rounded-full bg-[#E0FAF8] flex items-center justify-center">
                <Check width={42} height={32} strokeWidth={3.8} stroke="#16CDC7" />
            </div>
            <div className="text-center">
                <p className="text-lg font-bold text-[#29343D] mb-1">Sucess!</p>
                <p className="text-sm text-[#98A4AE]">Product has been added successfully.</p>
            </div>
            <div className="flex items-center gap-4 mt-2">
                <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-[#F3F3FF] text-[#29343D] text-sm font-semibold rounded-[8px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                    Close
                </button>
                <button
                    onClick={onCreateMovement}
                    className="px-6 py-2.5 bg-[#DDDBFF] text-[#6366F1] text-sm font-semibold rounded-[8px] hover:opacity-80 transition-opacity cursor-pointer"
                >
                    Create Movement for This Product
                </button>
            </div>
        </div>
    )
}

// ─── Root Modal ───────────────────────────────────────────────────────────────

export default function AddMovementModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<Step>(1)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product)
        setStep(2)
    }

    const handleClose = () => {
        setStep(1)
        setSelectedProduct(null)
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="bg-white rounded-[16px] w-full max-w-[746px] p-6 max-h-[90vh] overflow-y-auto font-manrope">

                {/* Header — hidden on associate & success screens */}
                {step !== "associate" && step !== "success" && (
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-[#29343D] font-manrope">Add  Movement</h2>
                        <button onClick={handleClose} className="text-[#29343D] cursor-pointer">
                            <X size={24} className="cursor-pointer" />
                        </button>
                    </div>
                )}

                {step === 1 && (
                    <SearchStep
                        onSelect={handleSelectProduct}
                        onAssociate={() => setStep("associate")}
                    />
                )}

                {step === "associate" && (
                    <AssociateStep
                        onSelect={handleSelectProduct}
                        onClose={handleClose}
                    />
                )}

                {step === 2 && selectedProduct && (
                    <AddMovementStep
                        product={selectedProduct}
                        onBack={() => setStep(1)}
                        onSave={() => setStep("success")}
                    />
                )}

                {step === "success" && (
                    <SuccessStep
                        onClose={handleClose}
                        onCreateMovement={() => {
                            if (selectedProduct) setStep(2)
                        }}
                    />
                )}
            </div>
        </div>
    )
}
