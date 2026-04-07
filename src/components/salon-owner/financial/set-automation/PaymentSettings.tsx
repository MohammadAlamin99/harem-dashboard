"use client";

import Image from "next/image";
import { useState } from "react";
import { NotificationCard } from "./NotificationCard";
import { Mail } from "lucide-react";

type PaymentTab = "Cash Payment" | "Card Payments" | "Online Payments";
const WhatsAppIcon = () => (
  <Image src="/images/whatsupIcon.svg" alt="icon" width={40} height={40} />
);

const EmailIcon = () => (
  <div className="p-2.5 bg-[#635BFF] rounded-full w-10 h-10 flex items-center justify-center">
    <Mail size={26} color="white" />
  </div>
);

const PhoneIcon = () => (
  <div className="p-2">
    <Image src="/images/messageicon.svg" alt="icon" width={24} height={24} />
  </div>
);

export default function PaymentSettings() {
  const [activeTab, setActiveTab] = useState<PaymentTab>("Card Payments");
  const tabs: PaymentTab[] = [
    "Cash Payment",
    "Card Payments",
    "Online Payments",
  ];

  return (
    <div className="font-manrope bg-white p-[15px] md:p-[30px] rounded-[12px] mt-7">
      {/* Tabs Navigation */}
      <div className="flex border-b border-[#E0E6EB] mb-7 overflow-x-auto no-scrollbar gap-2.5 w-full sm:w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-[12px] sm:pb-[14px] px-3 sm:px-4 cursor-pointer text-sm sm:text-lg font-semibold whitespace-nowrap transition-all relative ${
              activeTab === tab
                ? "text-[#635BFF]"
                : "text-[#29343D] hover:text-[#635BFF]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6366f1] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NotificationCard
          icon={<WhatsAppIcon />}
          iconBg="bg-[#25D366]"
          title="Send whatsapp message with receipt"
          buttonText="Personalize Whatsapp Message"
        />
        <NotificationCard
          icon={<EmailIcon />}
          iconBg="bg-[#5865F2]"
          title="Send email with receipt"
          buttonText="Personalize Email"
        />
        <NotificationCard
          icon={<PhoneIcon />}
          iconBg="bg-[#FFC107]"
          title="Send phone message with receipt"
          buttonText="Personalize Phone Message"
        />
      </div>
    </div>
  );
}
