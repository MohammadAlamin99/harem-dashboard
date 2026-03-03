import ICash from "@/app/account-protal/svg/ICash";

interface Props {
  next: () => void;
}

export default function CashRegisterSettings({ next }: Props) {
  return (
    <div className="text-center">
      <h2 className="text-lg font-semibold font-manrope text-[18px] mb-6 text-left">
        Cash Register Settings
      </h2>

      <div className="border border-[#E0E6EB] p-[30px] rounded-[12px]">
        <div className="flex items-center justify-center mb-4">
          <ICash />
        </div>
        <h2 className="text-[#29343D] font-manrope text-[15px] font-semibold">
          No cash register connected
        </h2>
        <p className="text-[#98A4AE] text-sm font-manrope font-normal mt-2">
          Connect your cash register easily.
        </p>
        <button
          onClick={next}
          className="bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 font-manrope font-medium rounded-lg mt-4 cursor-pointer"
        >
          Connect Cash Register
        </button>
      </div>
    </div>
  );
}
