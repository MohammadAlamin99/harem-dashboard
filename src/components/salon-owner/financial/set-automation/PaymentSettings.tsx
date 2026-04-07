"use client";

import React, { useState } from "react";

type PaymentTab = "Cash Payment" | "Card Payments" | "Online Payments";

interface NotificationCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  buttonText: string;
}

// --- Icons (SVG implementations) ---
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <circle cx="9" cy="10" r="1" fill="currentColor" />
    <circle cx="12" cy="10" r="1" fill="currentColor" />
    <circle cx="15" cy="10" r="1" fill="currentColor" />
  </svg>
);

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`${
        enabled ? "bg-indigo-600" : "bg-[#e2e8f0]"
      } relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
    >
      <span
        aria-hidden="true"
        className={`${
          enabled ? "translate-x-5" : "translate-x-0"
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
};

// --- Sub-Component: Card ---
const NotificationCard: React.FC<NotificationCardProps> = ({
  icon,
  iconBg,
  title,
  buttonText,
}) => {
  return (
    <div className="bg-[#f8f9fb] p-6 rounded-2xl flex flex-col justify-between min-h-[220px]">
      <div className="flex justify-between items-start">
        <div className={`${iconBg} text-white p-2.5 rounded-full`}>{icon}</div>
        <Toggle />
      </div>

      <div className="mt-4">
        <h3 className="text-[#1a1c1e] text-[17px] font-semibold leading-tight pr-4">
          {title}
        </h3>
      </div>

      <div className="mt-6">
        <button className="bg-[#eef2ff] text-[#6366f1] px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#e0e7ff] transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// --- Main Component ---
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
      <div className="flex border-b border-gray-100 mb-10 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-6 text-[17px] font-semibold whitespace-nowrap transition-all relative ${
              activeTab === tab
                ? "text-[#6366f1]"
                : "text-gray-600 hover:text-gray-900"
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
