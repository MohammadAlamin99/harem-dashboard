import { Logs, Play, Plus } from "lucide-react";
import { useState } from "react";
import NewReceiptModal from "./NewReceiptModal";
import CashRegisterModal from "./CashRegisterModal";

export default function ReceptSummer() {
  const [openReceiptModal, setOpenReceiptModal] = useState(false);
  const [openCashModal, setOpenCashModal] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 max-[1220px]:grid-cols-2 max-[992px]:grid-cols-3 max-[600px]:grid-cols-1 gap-4">
        {/* New Receipt */}
        <div
          className="py-[22px] px-[16px] bg-white rounded-[12px] cursor-pointer"
          onClick={() => setOpenReceiptModal(true)}
        >
          <div className="bg-[#635BFF] w-fit p-2 rounded-full">
            <Plus color="white" />
          </div>
          <h4 className="text-[#29343D] font-semibold text-[16px]">
            New Receipt
          </h4>
          <h5 className="text-[#98A4AE] text-[12px]">Create a new receipt</h5>
        </div>

        {/* Receipt History */}
        <div className="py-[22px] px-[16px] bg-[rgba(255,255,255,0.17)] rounded-[12px]">
          <div className="bg-[rgba(255,255,255,0.71)] w-fit p-2 rounded-full">
            <Logs color="#635BFF" />
          </div>
          <h4 className="text-white font-semibold text-[16px]">
            Receipt History
          </h4>
        </div>

        {/* Open New Cash Register */}
        <div
          onClick={() => setOpenCashModal(true)}
          className="py-[22px] px-[16px] bg-[rgba(255,255,255,0.17)] rounded-[12px] cursor-pointer"
        >
          <div className="bg-[rgba(255,255,255,0.71)] w-fit p-2 rounded-full">
            <Play color="#635BFF" />
          </div>
          <h4 className="text-white font-semibold text-[16px]">
            Open New Cash <br /> Register
          </h4>
        </div>
      </div>

      {openReceiptModal && (
        <NewReceiptModal
          isOpen={openReceiptModal}
          onClose={() => setOpenReceiptModal(false)}
        />
      )}

      {openCashModal && (
        <CashRegisterModal
          isOpen={openCashModal}
          onClose={() => setOpenCashModal(false)}
        />
      )}
    </>
  );
}
