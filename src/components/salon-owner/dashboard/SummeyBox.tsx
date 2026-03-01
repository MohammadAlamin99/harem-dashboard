export default function SummeyBox({
  text,
  value,
  color,
}: {
  text: string;
  value: string;
  color: string;
}) {
  return (
    <>
      <div className="w-full rounded-[12px] px-4 py-8 border border-[#E0E6EB]">
        <h3 className="text-[#29343D] text-[18px] font-semibold font-manrope">
          {value}
        </h3>
        <h4 className={`${color} font-manrope text-[12px] font-normal`}>
          {text}
        </h4>
      </div>
    </>
  );
}
