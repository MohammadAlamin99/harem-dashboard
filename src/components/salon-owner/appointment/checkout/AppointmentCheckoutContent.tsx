"use client";
import { ChevronDown, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import PageHeader from "../../common-component/PageHeader";
import CashIcon from "../../dashboard/checkout/CashIcon";
import GiftCardIcon from "../../dashboard/checkout/GiftCardIcon";
import CardIcon from "../../dashboard/checkout/CardIcon";
import QRIcon from "../../dashboard/checkout/QRIcon";

interface ServiceRow {
  name: string;
  price: number;
  date?: string;
  startTime?: string;
  duration?: string;
  employee?: string;
}

const paymentMethods = [
  { id: "cash", label: "Cash", icon: <CashIcon /> },
  { id: "gift", label: "Gift Card", icon: <GiftCardIcon /> },
  { id: "card", label: "Card Terminal", icon: <CardIcon /> },
  { id: "qr", label: "QR Code", icon: <QRIcon /> },
];

const defaultServices: ServiceRow[] = [
  {
    name: "Haircut",
    date: "02/08/2025",
    price: 170,
    startTime: "11:00",
    duration: "15 min",
    employee: "Maria Rodriguez",
  },
];

interface CheckoutPageProps {
  onBack?: () => void;
  onSave?: () => void;
}

export default function AppointmentCheckoutContent({
  onBack,
  onSave,
}: CheckoutPageProps) {
  const total = defaultServices.reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope flex flex-col">
      {/* Top Bar */}
      <PageHeader
        title="Checkout"
        onBack={() => console.log("Go Back")}
        breadcrumb={[{ label: "Dashboard", active: true }]}
      />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto mt-6 space-y-4">
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
                className="flex flex-col items-center justify-center py-6 rounded-xl border transition-all cursor-pointer border-[#EFF4FA]"
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

        {/* Services — always shows the table */}
        <div className="bg-white rounded-xl p-[30px] border border-[#EFF4FA]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-semibold text-[#29343D]">Services</h3>
          </div>

          {/* Service table — always visible */}
          <div className="rounded-xl mb-4 overflow-hidden">
            {/* Header */}
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
                  className="text-sm font-manrope text-[#29343D] font-semibold"
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {defaultServices.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-6 items-center px-4 py-5 border-b border-[#EFF4FA] last:border-0"
              >
                <span className="text-sm font-semibold font-manrope text-[#29343D]">
                  {s.name}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  {s.date ?? "—"}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  € {s.price}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  {s.startTime ?? "—"}
                </span>
                <span className="text-sm font-manrope font-normal text-[#29343D]">
                  {s.duration ?? "—"}
                </span>
                {/* employee */}
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 bg-[#F4F6FA] rounded-[10px] w-fit">
                  <Image
                    src="/images/avator.png"
                    alt={s.employee ?? "Employee"}
                    width={48}
                    height={48}
                    className="rounded-[8px] object-cover flex-shrink-0"
                  />
                  <span className="text-sm flex items-center gap-4 font-semibold font-manrope text-[#29343D] truncate">
                    {s.employee ?? "—"}
                    <ChevronDown strokeWidth={1.5} size={20} color="#29343D" />
                  </span>
                </div>
              </div>
            ))}
          </div>

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
          <div className="bg-white py-4 flex items-center justify-between mt-2">
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
