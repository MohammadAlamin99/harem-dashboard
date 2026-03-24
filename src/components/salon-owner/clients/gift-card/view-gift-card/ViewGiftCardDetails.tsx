export default function ViewGiftCardDetails() {
    return (
        <div className="bg-white rounded-xl p-5 md:p-7 font-manrope">
            <h2 className="text-[#29343D] font-bold text-lg mb-7">
                Gift Card Details
            </h2>

            {/* Row 1: Quantity + Amount */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 mb-6">
                <div>
                    <p className="text-[#999] text-xs mb-1">
                        How many gift cards do you want to create?
                    </p>
                    <p className="text-[#1A1A2E] font-semibold text-sm md:text-[15px]">
                        1
                    </p>
                </div>

                <div className="flex flex-wrap items-start gap-3 md:gap-4">
                    <div>
                        <p className="text-[#9CA3AF] text-xs mb-1">Ammount</p>
                        <p className="text-[#29343D] font-semibold text-sm md:text-[15px]">
                            € 200
                        </p>
                    </div>

                    <span className="mt-1 border border-[#E879A0] text-[#E879A0] text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap">
                        Hidden
                    </span>
                </div>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 2: Salon Name + Website */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 mb-6">
                <div className="md:min-w-[160px]">
                    <p className="text-[#9CA3AF] text-xs mb-1">Salon Name</p>
                    <p className="text-[#29343D] font-semibold text-sm md:text-[15px] break-words">
                        CDJ HAREM ACCONCIATURE
                    </p>
                </div>

                <div>
                    <p className="text-[#9CA3AF] text-xs mb-1">Website</p>
                    <p className="text-[#29343D] font-semibold text-sm md:text-[15px] break-words">
                        www.degradejoellemassafra.it
                    </p>
                </div>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 3: Address */}
            <div className="mb-6">
                <p className="text-[#9CA3AF] text-xs mb-1">Address</p>
                <p className="text-[#29343D] font-semibold text-sm md:text-[15px] break-words">
                    Via Redipuglia 44/A - MASSAFRA (TA)
                </p>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 4: Date of Issue + Expiration */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 mb-6">
                <div className="md:min-w-[160px]">
                    <p className="text-[#9CA3AF] text-xs mb-1">Date of Issue</p>
                    <p className="text-[#29343D] font-semibold text-sm md:text-[15px]">
                        02/09/2025
                    </p>
                </div>

                <div>
                    <p className="text-[#9CA3AF] text-xs mb-1">
                        Date of Expiration
                    </p>
                    <p className="text-[#29343D] font-semibold text-sm md:text-[15px]">
                        02/20/2025
                    </p>
                </div>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 5: Usage Limit */}
            <div className="mb-6">
                <p className="text-[#9CA3AF] text-xs mb-1">Usage Limit</p>
                <p className="text-[#29343D] font-semibold text-sm md:text-[15px]">
                    1
                </p>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 6: Eligible Services */}
            <div className="mb-6">
                <p className="text-[#9CA3AF] text-xs mb-2">
                    Eligible Services
                </p>
                <div className="flex flex-wrap gap-2">
                    {["Haircut", "Haircut", "Haircut", "Haircut"].map(
                        (service, i) => (
                            <span
                                key={i}
                                className="bg-[#EEF2FF] text-[#6366F1] text-xs font-medium px-4 py-1.5 rounded-full"
                            >
                                {service}
                            </span>
                        )
                    )}
                </div>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 7: Receiver + Gifter */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-16 mb-6">
                <div className="md:min-w-[160px]">
                    <p className="text-[#9CA3AF] text-xs mb-1">
                        Receiver Name
                    </p>
                    <p className="text-[#29343D] font-semibold text-sm md:text-[15px] break-words">
                        Receiver Name
                    </p>
                </div>

                <div>
                    <p className="text-[#9CA3AF] text-xs mb-1">Gifter Name</p>
                    <p className="text-[#29343D] font-semibold text-sm md:text-[15px] break-words">
                        Gifter Name
                    </p>
                </div>
            </div>

            <div className="border-t border-[#F3F4F6] mb-6" />

            {/* Row 8: Note */}
            <div>
                <p className="text-[#9CA3AF] text-xs mb-1">Address</p>
                <p className="text-[#1A1A2E] font-semibold text-sm md:text-[15px] leading-relaxed break-words">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry&apos;s
                    standard dummy text ever since the 1500s.
                </p>
            </div>
        </div>
    );
}