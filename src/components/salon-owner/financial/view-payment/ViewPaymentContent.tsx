"use client";
import { useRouter } from "next/navigation";
import PageHeader from "../../common-component/PageHeader";
import { Eye, Printer } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PrintReceiptModal from "./PrintReceiptModalProps";


export default function ViewPaymentContent() {
    const router = useRouter();
    const [printReceiptModal, setPrintReceiptModal] = useState(false);
    return (
        <div>
            <PageHeader title="View Sale"
                onBack={() => router.back()}
                breadcrumb={[
                    { label: "Sales", active: true },
                ]}
                HomeIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.915 0H4.00167C4.75 0 5.375 3.72529e-08 5.87 0.0666667C6.39333 0.136667 6.86583 0.291667 7.245 0.670833C7.625 1.05083 7.78 1.52333 7.85 2.04583C7.91667 2.54167 7.91667 3.16667 7.91667 3.915V13.1683C7.91667 13.9175 7.91667 14.5417 7.85 15.0367C7.78 15.56 7.625 16.0325 7.245 16.4117C6.86583 16.7917 6.39333 16.9467 5.87 17.0167C5.375 17.0833 4.75 17.0833 4.00167 17.0833H3.915C3.16667 17.0833 2.54167 17.0833 2.04667 17.0167C1.52333 16.9467 1.05083 16.7917 0.671667 16.4117C0.291667 16.0325 0.136667 15.56 0.0666667 15.0367C3.72529e-08 14.5417 0 13.9175 0 13.1683V3.915C0 3.16667 3.72529e-08 2.54167 0.0666667 2.04667C0.136667 1.52333 0.291667 1.05083 0.670833 0.671667C1.05083 0.291667 1.52333 0.136667 2.04583 0.0666667C2.54167 3.72529e-08 3.16667 0 3.915 0ZM2.2125 1.30583C1.82833 1.3575 1.66333 1.44667 1.555 1.55583C1.44667 1.665 1.3575 1.82833 1.305 2.2125C1.25167 2.615 1.25 3.155 1.25 3.95833V13.125C1.25 13.9283 1.25167 14.4683 1.30583 14.8708C1.3575 15.255 1.44667 15.42 1.55583 15.5283C1.665 15.6367 1.82833 15.7258 2.2125 15.7783C2.615 15.8317 3.155 15.8333 3.95833 15.8333C4.76167 15.8333 5.30167 15.8317 5.70417 15.7775C6.08833 15.7258 6.25333 15.6367 6.36167 15.5275C6.47 15.4183 6.55917 15.255 6.61167 14.8708C6.665 14.4683 6.66667 13.9283 6.66667 13.125V3.95833C6.66667 3.155 6.665 2.615 6.61083 2.2125C6.55917 1.82833 6.47 1.66333 6.36083 1.555C6.25167 1.44667 6.08833 1.3575 5.70417 1.305C5.30167 1.2525 4.76167 1.25 3.95833 1.25C3.155 1.25 2.615 1.25167 2.2125 1.30583ZM13.0817 7.5H13.1683C13.9175 7.5 14.5417 7.5 15.0367 7.56667C15.56 7.63667 16.0325 7.79167 16.4117 8.17167C16.7917 8.55083 16.9467 9.02333 17.0167 9.54667C17.0833 10.0417 17.0833 10.6667 17.0833 11.415V13.1683C17.0833 13.9175 17.0833 14.5417 17.0167 15.0367C16.9467 15.56 16.7917 16.0325 16.4117 16.4117C16.0325 16.7917 15.56 16.9467 15.0367 17.0167C14.5417 17.0833 13.9175 17.0833 13.1683 17.0833H13.0817C12.3333 17.0833 11.7083 17.0833 11.2133 17.0167C10.69 16.9467 10.2175 16.7917 9.83833 16.4117C9.45833 16.0325 9.30333 15.56 9.23333 15.0367C9.16667 14.5417 9.16667 13.9175 9.16667 13.1683V11.415C9.16667 10.6658 9.16667 10.0417 9.23333 9.54667C9.30333 9.02333 9.45833 8.55083 9.83833 8.17167C10.2175 7.79167 10.69 7.63667 11.2133 7.56667C11.7083 7.5 12.3325 7.5 13.0817 7.5ZM11.3792 8.805C10.995 8.8575 10.83 8.94667 10.7217 9.055C10.6133 9.16333 10.5242 9.32833 10.4717 9.71333C10.4183 10.115 10.4167 10.655 10.4167 11.4583V13.125C10.4167 13.9283 10.4183 14.4683 10.4717 14.8708C10.5242 15.255 10.6133 15.42 10.7217 15.5283C10.83 15.6367 10.995 15.7258 11.38 15.7783C11.7817 15.8317 12.3217 15.8333 13.125 15.8333C13.9283 15.8333 14.4683 15.8317 14.8708 15.7775C15.255 15.7258 15.42 15.6367 15.5283 15.5275C15.6367 15.4183 15.7258 15.255 15.7783 14.8708C15.8317 14.4683 15.8333 13.9283 15.8333 13.125V11.4583C15.8333 10.655 15.8317 10.115 15.7775 9.7125C15.7258 9.32833 15.6367 9.16333 15.5275 9.055C15.4183 8.94667 15.255 8.8575 14.8708 8.805C14.4683 8.75167 13.9283 8.75 13.125 8.75C12.3217 8.75 11.7817 8.75167 11.3792 8.805ZM12.2708 0C11.9 0 11.5908 -1.5522e-08 11.3375 0.0166666C11.0785 0.027097 10.8231 0.0806075 10.5817 0.175C10.3035 0.290075 10.0508 0.458811 9.8379 0.671572C9.625 0.884334 9.45609 1.13695 9.34083 1.415C9.24083 1.65667 9.20167 1.90667 9.18417 2.17083C9.16667 2.42417 9.16667 2.73333 9.16667 3.10417V3.14583C9.16667 3.51667 9.16667 3.82583 9.18333 4.07917C9.20167 4.34333 9.24167 4.59333 9.34167 4.835C9.45674 5.11312 9.62548 5.36586 9.83824 5.57876C10.051 5.79167 10.3036 5.96057 10.5817 6.07583C10.8233 6.17583 11.0733 6.215 11.3375 6.2325C11.5908 6.25 11.9 6.25 12.2708 6.25H13.9792C14.35 6.25 14.6592 6.25 14.9125 6.23333C15.1715 6.2229 15.4269 6.16939 15.6683 6.075C15.9465 5.95992 16.1992 5.79119 16.4121 5.57843C16.625 5.36567 16.7939 5.11305 16.9092 4.835C17.0092 4.59333 17.0483 4.34333 17.0658 4.07917C17.0833 3.82583 17.0833 3.51667 17.0833 3.14583V3.10417C17.0833 2.73333 17.0833 2.42417 17.0667 2.17083C17.0562 1.91184 17.0027 1.6564 16.9083 1.415C16.7933 1.13687 16.6245 0.884143 16.4118 0.671239C16.199 0.458334 15.9464 0.289428 15.6683 0.174167C15.4267 0.0741667 15.1767 0.035 14.9125 0.0175C14.6592 2.32831e-08 14.35 0 13.9792 0H12.2708ZM11.06 1.32917C11.1242 1.3025 11.2217 1.27833 11.4225 1.26417C11.6283 1.25 11.895 1.25 12.2917 1.25H13.9583C14.355 1.25 14.6217 1.25 14.8275 1.26417C15.0283 1.27833 15.1258 1.3025 15.19 1.32917C15.4458 1.435 15.6483 1.6375 15.7542 1.89333C15.7808 1.9575 15.805 2.055 15.8192 2.25583C15.8333 2.46167 15.8333 2.72833 15.8333 3.125C15.8333 3.52167 15.8333 3.78833 15.8192 3.99417C15.805 4.195 15.7808 4.2925 15.7542 4.35667C15.7018 4.48316 15.625 4.5981 15.5282 4.6949C15.4314 4.79171 15.3165 4.86848 15.19 4.92083C15.1258 4.9475 15.0283 4.97167 14.8275 4.98583C14.6217 5 14.355 5 13.9583 5H12.2917C11.895 5 11.6283 5 11.4225 4.98583C11.2217 4.97167 11.1242 4.9475 11.06 4.92083C10.9335 4.86848 10.8186 4.79171 10.7218 4.6949C10.625 4.5981 10.5482 4.48316 10.4958 4.35667C10.4692 4.2925 10.445 4.195 10.4308 3.99417C10.4172 3.70466 10.4125 3.4148 10.4167 3.125C10.4167 2.72833 10.4167 2.46167 10.4308 2.25583C10.445 2.055 10.4692 1.9575 10.4958 1.89333C10.6017 1.6375 10.8042 1.435 11.06 1.32917Z" fill="#98A4AE" />
                    </svg>
                }
            />

            {/* view details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-manrope bg-[#F8FAFC] mt-6">

                {/* Basic Details Card */}
                <div className="bg-white rounded-xl p-[15px] md:p-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.04)]">
                    <h2 className="text-lg font-semibold text-[#29343D] mb-8">Basic Details</h2>

                    <div className="grid grid-cols-2 gap-y-7">
                        {/* ID */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5">ID</p>
                            <p className="text-base font-semibold text-[#29343D]">#000</p>
                        </div>

                        {/* Payment Date */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5">Payment Date</p>
                            <p className="text-base font-semibold text-[#29343D]">5 Aug 2025, 12:30</p>
                        </div>

                        {/* Method */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5">Method</p>
                            <span className="inline-block bg-[#EBFAF0] text-[#36C76C] text-[11px] font-bold px-3 py-1 rounded-md">
                                Cash
                            </span>
                        </div>

                        {/* Payment Status */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5">Payment Status</p>
                            <span className="inline-block bg-[#36C76C] text-white text-[12px] font-medium leading-4 px-2 py-1 rounded-lg">
                                Fully Paid
                            </span>
                        </div>

                        {/* Receipt Issue */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5">Receipt Issue</p>
                            <span className="inline-block border border-[#FFD648] text-[#FFD648] text-[12px] font-medium leading-4 px-2 py-1 rounded-lg">
                                Half Printed
                            </span>
                        </div>
                    </div>

                    {/* Client & Issuer Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-7">
                        {/* Client */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5 mb-2">Client</p>
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/images/avator.png"
                                    className="w-[48px] h-[48px] rounded-xl bg-[#F0EFFF] object-cover"
                                    alt="Client Avatar"
                                    width={48}
                                    height={48}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-semibold text-[#29343D]">Maria Rodriguez</span>
                                    <span className="text-[12px] text-[#98A4AE]">maria@beautywellness.com</span>
                                </div>
                            </div>
                        </div>

                        {/* Receipt Issued By */}
                        <div>
                            <p className="text-[12px] font-normal text-[#999] leading-5 mb-2">Rceipt Issued By</p>
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/images/avator.png"
                                    className="w-[48px] h-[48px] rounded-xl bg-[#F0EFFF] object-cover"
                                    alt="Client Avatar"
                                    width={48}
                                    height={48}
                                />
                                <div className="flex flex-col">
                                    <span className="text-[15px] font-semibold text-[#29343D]">Maria Rodriguez</span>
                                    <span className="text-[12px] text-[#98A4AE]">maria@beautywellness.com</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Activity Card */}
                <div className="bg-white rounded-xl p-[15px] md:p-[30px] shadow-[0px_10px_30px_rgba(0,0,0,0.04)]">
                    <h2 className="text-lg font-semibold text-[#29343D] mb-7">Activity</h2>

                    <div className="flex flex-col">
                        {/* Timeline Item 1 */}
                        <div className="flex gap-4">
                            <div className="text-sm font-semibold text-[#29343D] min-w-[100px] pt-0.5">Today at 14:34</div>

                            {/* Timeline Graphic */}
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full border-2 border-[#FF6692] bg-white z-10" />
                                <div className="w-[1px] h-20 bg-[#E0E6EB] -my-1" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-[#29343D]">€ 10 refunded by cash</p>
                                <p className="text-[12px] text-[#98A4AE] mt-2">Completed by Maria Fernandez</p>
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                        <div className="flex gap-4">
                            <div className="text-sm font-semibold text-[#29343D] min-w-[100px] pt-0.5">Today at 14:34</div>

                            {/* Timeline Graphic */}
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full border-2 border-[#635BFF] bg-white z-10" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <p className="text-sm font-bold text-[#29343D]">Sale 1 created</p>
                                <p className="text-[12px] text-[#98A4AE] mt-2">Completed by Maria Fernandez</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* recived  */}

            <div className="bg-white rounded-xl p-[15px] md:p-[30px] font-manrope shadow-[0px_10px_30px_rgba(0,0,0,0.04)] mt-6">

                {/* HEADER SECTION */}
                <div className="mb-7">
                    <h1 className="text-lg font-semibold text-[#29343D]">Sale #000</h1>
                    <p className="text-base text-[#29343D] mt-2 font-normal leading-5">5 Aug 2025, 12:30</p>
                </div>

                {/* SERVICE TABLE */}
                <div className="mb-7 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-[#E0E6EB]">
                                <th className="p-2.5 text-base font-semibold text-[#29343D]">Service</th>
                                <th className="p-2.5 text-base font-semibold text-[#29343D]">Employee</th>
                                <th className="p-2.5 text-base font-semibold text-[#29343D]">Start Time</th>
                                <th className="p-2.5 text-base font-semibold text-[#29343D]">Date</th>
                                <th className="p-2.5 text-base font-semibold text-[#29343D]">Duration</th>
                                <th className="p-2.5 text-base font-semibold text-[#29343D] text-right">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-7 px-2.5 text-base font-semibold text-[#29343D]">Haircut</td>
                                <td className="py-7 px-2.5 text-base font-normal text-[#29343D]">Maria Rodriguez</td>
                                <td className="py-7 px-2.5 text-base font-normal text-[#29343D]">12:00</td>
                                <td className="py-7 px-2.5 text-base font-normal text-[#29343D]">5 Aug 2025</td>
                                <td className="py-7 px-2.5 text-base font-normal text-[#29343D]">15 min</td>
                                <td className="py-7 px-2.5 text-base font-normal text-[#29343D] text-right">€ 170</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ORDER SUMMARY CARD */}
                <div className="bg-white border border-[#E0E6EB] rounded-xl mb-6 overflow-hidden p-[15px] md:p-[30px]">
                    <div className="">
                        <h2 className="text-base font-bold text-[#29343D] mb-3">Order Summary</h2>

                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#29343D] text-base font-normal">Subtotal</span>
                                <span className="text-[#29343D] text-base font-normal">€ 170</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold pb-3">
                                <span className="text-[#29343D] text-base font-bold">Total</span>
                                <span className="text-[#29343D] text-lg font-bold">€ 170</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment History Segment */}
                    <div className="border-t border-[#E0E6EB] bg-[#FCFDFF]/50">
                        <div className="flex justify-between items-start text-sm">
                            <div className="flex flex-col">
                                <span className="text-[#29343D] text-base font-normal mt-3">Paid with Cash</span>
                                <span className="text-base text-[#29343D] mt-2 pb-2">5 Aug 2025, 12:30</span>
                            </div>
                            <span className="text-[#29343D] text-base font-normal">€ 10</span>
                        </div>
                    </div>

                    {/* Balance Segment */}
                    <div className="border-t border-[#E0E6EB] pt-3">
                        <div className="flex justify-between items-center">
                            <span className="text-base font-bold text-[#29343D]">Balance</span>
                            <span className="text-lg font-semibold text-[#29343D]">€ 160</span>
                        </div>
                    </div>
                </div>

                {/* RECEIPT STATUS CARD */}
                <div className="bg-white border border-[#E0E6EB] rounded-xl p-[15px] md:p-[30px] flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col gap-5">
                        <h2 className="text-lg font-bold text-[#29343D]">Receipt Status</h2>

                        <div className="flex flex-col gap-4">
                            {/* Status 1 */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-[#29343D] min-w-[110px]">Cash</span>
                                <span className="border border-[#36C76C] text-[#36C76C] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                    Printed
                                </span>
                            </div>

                            {/* Status 2 */}
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-[#29343D] min-w-[110px]">Online payment</span>
                                <span className="border border-[#FFD648] text-[#FFD648] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                    To be printed
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        <button className="cursor-pointer flex items-center justify-center gap-2.5 bg-[#F0EFFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#e4e2ff] transition-colors">
                            <Eye size={16} /> View Receipt
                        </button>
                        <button
                        onClick={()=> setPrintReceiptModal(true) }
                            className="cursor-pointer flex items-center justify-center gap-2.5 bg-[#635BFF] text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-[#5249e0] transition-colors shadow-sm">
                            <Printer size={16} /> Print Receipt
                        </button>
                    </div>
                </div>

            </div >

            {/* footer */}
            < div className="bg-white rounded-xl md:p-[30px] p-[15px] font-manrope shadow-[0px_10px_30px_rgba(0,0,0,0.04)] mt-6" >

                {/* HEADER SECTION */}
                < div className="mb-7" >
                    <h1 className="text-xl font-semibold text-[#29343D]">Refund #1</h1>
                    <p className="text-base text-[#29343D] mt-2.5 font-medium">5 Aug 2025, 12:30</p>
                </div >

                {/* REFUND SUMMARY CARD */}
                < div className="bg-white border border-[#E0E6EB] md:p-[30px] p-[15px] rounded-xl overflow-hidden" >

                    {/* Row 1: Accidental Charge */}
                    < div className="flex justify-between items-center py-3 border-b border-[#E0E6EB]" >
                        <span className="text-base font-normal text-[#29343D]">Accidental Charge</span>
                        <span className="text-base font-normal text-[#29343D]">€ 170</span>
                    </div >

                    {/* Row 2: Refund Amount */}
                    < div className="flex justify-between items-center py-3 border-b border-[#E0E6EB]" >
                        <span className="text-base font-normal text-[#29343D]">Refund Amount</span>
                        <span className="text-base font-normal text-[#29343D]">- € 10</span>
                    </div >

                    {/* Row 3: Subtotal */}
                    < div className="flex justify-between items-center py-3 border-b border-[#E0E6EB]" >
                        <span className="text-sm font-medium text-[#29343D]">Subtotal</span>
                        <span className="text-base font-normal text-[#29343D]">- € 10</span>
                    </div >

                    {/* Row 4: Total (Bold) */}
                    < div className="flex justify-between items-center py-3 border-b border-[#E0E6EB] bg-[#FCFDFF]/30" >
                        <span className="text-base font-semibold text-[#29343D]">Total</span>
                        <span className="text-base font-semibold text-[#29343D]">- € 10</span>
                    </div >

                    {/* Row 5: Refunded with Cash */}
                    < div className="flex justify-between items-start py-3" >
                        <div className="flex flex-col gap-1">
                            <span className="text-base font-semibold text-[#29343D]">Refunded with Cash</span>
                            <span className="text-base font-normal text-[#29343D]">Refund Amount</span>
                        </div>
                        <span className="text-base font-semibold text-[#29343D]">- € 10</span>
                    </div >

                </div >
            </div >

            { 
                printReceiptModal && (
                    <PrintReceiptModal
                        open={printReceiptModal}
                        onClose={() => setPrintReceiptModal(false)}
                        onConfirm={() => setPrintReceiptModal(false)}
                    />
                )
            }
        </div >
    )
}
