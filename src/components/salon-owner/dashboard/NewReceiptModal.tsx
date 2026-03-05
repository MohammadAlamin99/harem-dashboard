"use client";

import { X, Search, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function NewReceiptModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-[#29343D] font-manrope">
              New Receipt
            </h2>
            <p className="text-sm text-[#98A4AE] font-manrope font-normal">
              Select an appointment or create an independent receipt
            </p>
          </div>

          <button onClick={onClose} className="cursor-pointer">
            <X size={18} color="#29343D" />
          </button>
        </div>

        {/* Independent Receipt */}
        <Link href="/salon-owner/dashboard/checkout">
          <div className="bg-[#F1F2FE] rounded-xl p-6 flex items-center justify-between mb-6 cursor-pointer hover:bg-[#e8e9fd] transition-colors">
            <div className="flex items-center gap-4">
              <div className="bg-[#DDDBFF] p-3 rounded-lg">
                <Plus color="#635BFF" />
              </div>
              <div>
                <h4 className="text-sm text-[#29343D] font-semibold font-manrope mb-1">
                  Create Independent Receipt
                </h4>
                <p className="text-sm text-[#98A4AE] font-manrope font-normal">
                  Not linked to any appointment
                </p>
              </div>
            </div>
            <ChevronRight size={24} color="#635BFF" />
          </div>
        </Link>

        {/* Search */}
        <p className="text-[15px] text-[#29343D] font-manrope font-semibold mb-4">
          Or select specific appointment
        </p>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search an appointment"
            className="w-full font-manrope border border-[#E0E6EB] rounded-[4px] px-4 py-2 pl-3 text-sm focus:outline-none"
          />
          <Search
            className="absolute right-3 top-2.5 text-gray-400"
            size={16}
          />
        </div>

        {/* Appointment List */}
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between p-4 border shadow-sm border-[#E0E6EB] rounded-xl mb-3 cursor-pointer hover:bg-[#F8F9FA] transition-colors"
          >
            <div className="flex items-center gap-4">
              <Image
                src="/images/avator.png"
                alt="Client"
                width={48}
                height={48}
                className="rounded-[12px]"
              />
              <div>
                <h4 className="font-semibold text-[#29343D] font-manrope">
                  Maria Rodriguez • 11:00
                </h4>
                <p className="text-sm text-[#999] font-manrope font-normal">
                  Service: Haircut
                </p>
                <p className="text-sm text-[#999] font-manrope font-normal">
                  Team Member: Maria
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-[#999] font-manrope font-normal">
                Estimated
              </p>
              <p className="text-[#635BFF] font-medium font-manrope text-xl">
                € 350
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
