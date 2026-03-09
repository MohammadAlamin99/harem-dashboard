"use client";

import IUser from "@/app/account-protal/svg/IUser";
import {
  ChevronLeft,
  House,
  BookOpen,
  EllipsisVertical,
  ChevronDown,
  Plus,
} from "lucide-react";
import { useState } from "react";
import SelectClientModal from "./SelectClientModal";
import { Client } from "@/@types/salon-owner/Client.type";
import CashIcon from "./CashIcon";
import GiftCardIcon from "./GiftCardIcon";
import CardIcon from "./CardIcon";
import QRIcon from "./QRIcon";
import { Service } from "@/@types/salon-owner/service.type";
import SelectServiceModal from "./SelectServiceModal";
import DividePaymentModal from "./DividePaymentModel";
import SuccessModal from "./SuccessModal";
import Image from "next/image";
import PageHeader from "../../common-component/PageHeader";

const paymentMethods = [
  {
    id: "cash",
    label: "Cash",
    icon: <CashIcon />,
  },
  {
    id: "gift",
    label: "Gift Card",
    icon: <GiftCardIcon />,
  },
  {
    id: "card",
    label: "Card Terminal",
    icon: <CardIcon />,
  },
  {
    id: "qr",
    label: "QR Code",
    icon: <QRIcon />,
  },
];

interface CheckoutPageProps {
  onBack?: () => void;
  onSave?: () => void;
}

export default function DashbordCheckoutContent({
  onBack,
  onSave,
}: CheckoutPageProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showDivideModal, setShowDivideModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const total = selectedServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col">
      {/* Modals */}
      {showClientModal && (
        <SelectClientModal
          onClose={() => setShowClientModal(false)}
          onSelect={setSelectedClient}
        />
      )}
      {showServiceModal && (
        <SelectServiceModal
          onClose={() => setShowServiceModal(false)}
          onConfirm={(services) =>
            setSelectedServices((prev) => [...prev, ...services])
          }
        />
      )}
      {showDivideModal && (
        <DividePaymentModal
          total={total || 170}
          onClose={() => setShowDivideModal(false)}
          onConfirm={() => {
            setShowDivideModal(false);
            setShowSuccessModal(true);
          }}
        />
      )}
      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}

      {/* Top Bar */}
      <PageHeader
        title="Checkout"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Dashboard", active: true }]}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto mt-6 space-y-4">
        {/* Basic Informations */}
        <div className="bg-white rounded-xl p-[30px] border border-[#E0E6EB]">
          <h3 className="text-sm font-semibold text-[#29343D] mb-4">
            Basic Informations
          </h3>
          {selectedClient ? (
            <div>
              <p className="text-xs font-manrope text-[#98A4AE] mb-2">Client</p>
              <div className="flex items-center justify-between bg-[#F6F7F9] rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={selectedClient.avatar}
                    alt={selectedClient.name}
                    width={56}
                    height={56}
                    className="rounded-xl object-cover bg-[#EFF4FA]"
                  />
                  <div>
                    <p className="text-[16px] font-semibold font-manrope text-[#29343D]">
                      {selectedClient.name}
                    </p>
                    <p className="text-sm font-manrope text-[#98A4AE]">
                      {selectedClient.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowClientModal(true)}
                  className="text-sm font-manrope text-[#635BFF] bg-[#EEEEFF] hover:bg-[#e0deff] transition-colors px-4 py-2.5 rounded-[6px] cursor-pointer"
                >
                  View Profile
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-manrope text-[#98A4AE] mb-1">
                    Date
                  </p>
                  <p className="text-sm font-semibold font-manrope text-[#29343D]">
                    02/08/2025
                  </p>
                </div>
                <div>
                  <p className="text-xs font-manrope text-[#98A4AE] mb-1">
                    Time
                  </p>
                  <p className="text-sm font-semibold font-manrope text-[#29343D]">
                    11:00 - 11:15
                  </p>
                </div>
                <div>
                  <p className="text-xs font-manrope text-[#98A4AE] mb-1">
                    Status
                  </p>
                  <div className="flex items-center gap-1 bg-[#EEEEFF] text-[#635BFF] text-xs font-manrope px-2.5 py-1 rounded-full w-fit cursor-pointer">
                    Booked <ChevronDown size={12} />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-[#EFF4FA] rounded-xl flex flex-col items-center justify-center py-12">
              <IUser color="#526B7A" width="56" height="56" />
              <p className="text-sm text-[#29343D] mt-4 mb-4">
                No client registred
              </p>
              <button
                onClick={() => setShowClientModal(true)}
                className="text-sm text-[#635BFF] bg-[#DDDBFF] hover:bg-[#e0deff] transition-colors px-4 py-2.5 rounded-[8px] cursor-pointer"
              >
                Select Client
              </button>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl p-[30px] border border-[#E0E6EB]">
          <h3 className="text-sm font-semibold text-[#29343D] mb-2">
            Payment Methods
          </h3>
          <p className="text-xs font-manrope text-[#98A4AE] mb-4">
            Select one or more methods.
          </p>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => {
                  setSelectedPayment(method.id);
                  setShowDivideModal(true);
                }}
                className={`flex flex-col items-center justify-center py-6 rounded-xl border transition-all cursor-pointer ${
                  selectedPayment === method.id
                    ? "border-[#635BFF] bg-[#F5F4FF]"
                    : "border-[#EFF4FA] hover:border-[#635BFF] hover:bg-[#F5F4FF]"
                }`}
              >
                <div className="w-20 h-20 rounded-full bg-[#DDDBFF] flex items-center justify-center mb-3">
                  {method.icon}
                </div>
                <span className="text-sm font-medium text-[#29343D]">
                  {method.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl p-[30px] border border-[#EFF4FA]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-semibold text-[#29343D]">Services</h3>
            {selectedServices.length > 0 && (
              <button
                onClick={() => setShowServiceModal(true)}
                className="flex items-center gap-1.5 text-xs font-manrope text-[#635BFF] bg-[#EEEEFF] hover:bg-[#e0deff] transition-colors px-3 py-1.5 rounded-[8px] cursor-pointer"
              >
                <Plus size={12} /> Add Service
              </button>
            )}
          </div>

          {selectedServices.length === 0 ? (
            <div className="border border-[#EFF4FA] rounded-xl flex flex-col items-center justify-center py-12 mb-4">
              <BookOpen
                size={52}
                strokeWidth={1.2}
                className="text-[#526B7A] mb-3"
              />
              <p className="text-sm text-[#29343D] mb-3">No services added</p>
              <button
                onClick={() => setShowServiceModal(true)}
                className="text-sm text-[#635BFF] bg-[#EEEEFF] hover:bg-[#e0deff] transition-colors px-4 py-1.5 rounded-[8px] cursor-pointer"
              >
                Select Services
              </button>
            </div>
          ) : (
            <div className="rounded-xl mb-4 overflow-hidden">
              <div className="grid grid-cols-6 px-4 py-2.5 border-b border-[#EFF4FA]">
                {[
                  "Service",
                  "Date",
                  "Price",
                  "Start Time",
                  "Duration",
                  "Employee",
                ].map((h) => (
                  <span
                    key={h}
                    className="text-[16px] font-semibold font-manrope text-[#29343D]"
                  >
                    {h}
                  </span>
                ))}
              </div>
              {selectedServices.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-6 items-center px-4 py-7 border-b border-[#EFF4FA] last:border-0"
                >
                  <span className="text-sm font-manrope text-[#29343D]">
                    {s.name}
                  </span>
                  <span className="text-sm font-manrope text-[#29343D]">
                    {s.date}
                  </span>
                  <span className="text-sm font-manrope text-[#29343D]">
                    € {s.price}
                  </span>
                  <span className="text-sm font-manrope text-[#29343D]">
                    {s.startTime}
                  </span>
                  <span className="text-sm font-manrope text-[#29343D]">
                    {s.duration}
                  </span>
                  <div className="flex items-center gap-4 p-1 bg-[#EFF4FA] rounded-xl">
                    <Image
                      src="/images/avator.png"
                      alt={s.employee}
                      width={48}
                      height={48}
                      className="rounded-xl bg-[#EFF4FA]"
                    />
                    <span className="text-[16px] font-semibold font-manrope text-[#29343D] truncate">
                      {s.employee}
                    </span>
                    <ChevronDown
                      size={24}
                      color="#29343D"
                      className="text-[#98A4AE] flex-shrink-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Summary */}
          <div className="border border-[#EFF4FA] rounded-xl p-4">
            <p className="text-sm font-semibold text-[#29343D] mb-3">
              Order Summary
            </p>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm text-[#526B7A]">
                <span>Tax</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm text-[#526B7A]">
                <span>Discount</span>
                <span>0</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#29343D] pt-2.5">
                <span>Total</span>
                <span>€ {total}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white py-4 flex items-center justify-between">
            <button
              onClick={onBack}
              className="px-5 py-2.5 border border-[#E0E6EB] rounded-[8px] text-sm font-medium text-[#29343D] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer"
            >
              Back
            </button>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 flex items-center justify-center border border-[#E0E6EB] rounded-[8px] bg-white hover:bg-[#F4F6FA] transition-colors cursor-pointer">
                <EllipsisVertical size={18} className="text-[#29343D]" />
              </button>
              <button
                onClick={onSave}
                className="px-5 py-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold rounded-[8px] cursor-pointer"
              >
                Save and Leave
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
