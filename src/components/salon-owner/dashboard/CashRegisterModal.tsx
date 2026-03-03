"use client";

import { useState } from "react";
import Configuration from "./Configuration";
import SelectRegister from "./SelectRegister";
import SearchDevices from "./SearchDevices";
import { X } from "lucide-react";
import CashRegisterSettings from "./CashRegisterSettings";
import AgentVerificationModal from "./AgentVerificationModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CashRegisterModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CashRegisterSettings next={() => setStep(2)} />;
      case 2:
        return <AgentVerificationModal next={() => setStep(3)} />;
      case 3:
        return <SearchDevices next={() => setStep(4)} />;
      case 4:
        return <SelectRegister next={() => setStep(5)} />;
      case 5:
        return <Configuration close={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[638px] max-w-full rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 cursor-pointer z-10"
        >
          <X width={24} height={24} color="#29343D" />
        </button>

        {renderStep()}
      </div>
    </div>
  );
}
