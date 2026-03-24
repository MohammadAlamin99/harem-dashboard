import Image from 'next/image'

export default function ViewGiftCardGallary() {
    return (
        <div className="bg-white rounded-xl p-4 sm:p-6 md:p-7 font-manrope">
            <h2 className="text-[#29343D] font-semibold text-[16px] sm:text-[18px] mb-5">
                Preview
            </h2>

            <div className='flex flex-col items-center gap-6'>

                {/* Front Card */}
                <div className="
                    relative 
                    w-full max-w-[548px] 
                    aspect-[548/304] 
                    lg:w-[548px] lg:h-[304px]
                    rounded-2xl overflow-hidden
                ">
                    {/* Background Image */}
                    <Image
                        src="/images/gift-front.png"
                        alt="Gift Card Front Background"
                        fill
                        className="object-contain"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-around p-4 sm:p-6 md:p-8">
                        {/* Logo */}
                        <div className="flex items-center gap-2"></div>

                        {/* Amount */}
                        <div>
                            <p className="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
                                € 200
                            </p>
                        </div>
                    </div>
                </div>

                {/* Back Card */}
                <div className="
                    relative 
                    w-full max-w-[548px] 
                    aspect-[548/304] 
                    lg:w-[548px] lg:h-[304px]
                    rounded-2xl overflow-hidden
                ">
                    {/* Background Image */}
                    <Image
                        src="/images/edit-gift-02.png"
                        alt="Gift Card Back Background"
                        fill
                        className="object-contain"
                    />

                    {/* Overlay Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 md:p-8">

                        {/* From / To */}
                        <div className="flex flex-col gap-2 sm:gap-3">
                            <div>
                                <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-widest">
                                    From
                                </p>
                                <p className="text-white text-sm sm:text-lg md:text-xl font-semibold">
                                    Gifter Name
                                </p>
                            </div>
                            <div>
                                <p className="text-white/70 text-[10px] sm:text-xs uppercase tracking-widest">
                                    To
                                </p>
                                <p className="text-white text-sm sm:text-lg md:text-xl font-semibold">
                                    Receiver Name
                                </p>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-end justify-between gap-3">
                            <p className="text-white/60 text-[10px] sm:text-xs max-w-[150px] sm:max-w-[220px] leading-relaxed">
                                Lorem ipsum is simply dummy text of the printing and typesetting industry.
                            </p>

                            <div className="text-right">
                                <p className="text-white font-bold text-[10px] sm:text-sm tracking-wide">
                                    CDJ HAREM ACCONCIATURE
                                </p>
                                <p className="text-white/70 text-[9px] sm:text-xs mt-1">
                                    Via Redpuglia 44/A - MASSAFRA (TA)
                                </p>
                                <p className="text-white/70 text-[9px] sm:text-xs">
                                    www.degradepellimassafra.it
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}