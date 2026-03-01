import { Logs, Play, Plus } from "lucide-react";

export default function ReceptSummer() {
  return (
    <>
      <div className="grid grid-cols-3 max-[1220px]:grid-cols-2 max-[992px]:grid-cols-3 max-[600px]:grid-cols-1 gap-4">
        {/* count 1 */}
        <div className="py-[22px] px-[16px] bg-white rounded-[12px]">
          <div className="bg-[#635BFF] w-fit p-2 rounded-full">
            <Plus color="white" />
          </div>
          <h4 className="text-[#29343D] font-manrope font-semibold text-[16px]">
            New Receipt
          </h4>
          <h5 className="text-[#98A4AE] font-manrope font-normal text-[12px]">
            Create a new receipt
          </h5>
        </div>
        {/* count 2 */}
        <div className="py-[22px] px-[16px] bg-[rgba(255,255,255,0.17)] rounded-[12px]">
          <div className="bg-[rgba(255,255,255,0.71)] w-fit p-2 rounded-full">
            <Logs color="#635BFF" />
          </div>
          <h4 className="text-white font-manrope font-semibold text-[16px]">
            Receipt History
          </h4>
          <h5 className="text-white font-manrope font-normal text-[12px]">
            Create a new receipt
          </h5>
        </div>
        {/* count 3 */}
        <div className="py-[22px] px-[16px] bg-[rgba(255,255,255,0.17)] rounded-[12px]">
          <div className="bg-[rgba(255,255,255,0.71)] w-fit p-2 rounded-full">
            <Play color="#635BFF" />
          </div>
          <h4 className="text-white font-manrope font-semibold text-[16px]">
            Open New Cash Register
          </h4>
        </div>
      </div>
    </>
  );
}
