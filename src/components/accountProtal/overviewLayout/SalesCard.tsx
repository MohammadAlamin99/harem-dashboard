import Image from 'next/image';
export default function SalesCard({name, image, salon, declinedReason, time}: {name: string, image: string, salon: string, declinedReason: string, time: string}) {
    return (
        <div>
            <div className='p-7 border border-[#E0E6EB] rounded-xl flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Image src={image} alt="Declined Salaries" width={56} height={56} />
                    <div>
                        <h4 className='text-[#29343D] font-manrope font-semibold text-[16px]'>{name}</h4>
                        <h5 className='text-[#635BFF] text-[14px] font-normal font-manrope leading-5'>{salon}</h5>
                        <h5 className='text-[#FF6692] text-[14px] font-normal font-manrope leading-5'>{declinedReason}</h5>
                    </div>
                </div>
                <h5 className='text-[#526B7A] text-[14px] font-normal font-manrope leading-5'>{time}</h5>
            </div>
        </div>
    )
}
