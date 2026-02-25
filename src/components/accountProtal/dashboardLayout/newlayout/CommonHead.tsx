
export default function CommonHead({ text }: { text: string }) {
    return (
        <>
            <div className='px-8 py-4 rounded-xl bg-white
             shadow-[0_2px_4px_-1px_rgba(175,182,201,0.20)] font-manrope text-[16px] font-semibold text-[#29343D]'>
                <h2>{text}</h2>
            </div>
        </>
    )
}
