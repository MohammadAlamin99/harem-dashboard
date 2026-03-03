"use client";

import { useState } from "react";
import { ChevronDown, ChevronLeft, House } from "lucide-react";

// ── Reusable Select ──────────────────────────────────────────────
function Select({
  value,
  placeholder,
  disabled,
}: {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between border border-[#E2E8F0] rounded-[8px] px-3 py-2.5 bg-white text-sm font-manrope cursor-pointer ${
        disabled ? "bg-[#F4F6FA] text-[#B9C3CC]" : "text-[#29343D]"
      }`}
    >
      <span className={value ? "text-[#29343D]" : "text-[#B9C3CC]"}>
        {value || placeholder}
      </span>
      <ChevronDown size={16} className="text-[#B9C3CC]" />
    </div>
  );
}

// ── Reusable Checkbox ────────────────────────────────────────────
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-[4px] flex items-center justify-center border transition-colors ${
          checked
            ? "bg-[#635BFF] border-[#635BFF]"
            : "bg-white border-[#B9C3CC]"
        }`}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l2.5 2.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm font-manrope text-[#29343D]">{label}</span>
    </label>
  );
}

// ── Section Card ─────────────────────────────────────────────────
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[12px] p-6 border border-[#EFF4FA]">
      <h3 className="text-[14px] font-semibold font-manrope text-[#29343D] mb-5">
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────────
const TABS = ["General Settings", "Notifications & Communication", "Employees"];

// ── Main Component ───────────────────────────────────────────────
export default function AppoinmentContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [displaySecondary, setDisplaySecondary] = useState(false);
  const [requestLocation, setRequestLocation] = useState(true);
  const [showWeekends, setShowWeekends] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-manrope">
      {/* Top Bar */}
      <div className="bg-white px-6 py-3 flex items-center justify-between rounded-tl-xl rounded-tr-xl">
        <div className="flex items-center gap-2 text-sm font-manrope text-[#29343D]">
          <ChevronLeft size={16} className="text-[#635BFF]" />
          <span className="font-semibold">General Settings</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-manrope text-[#98A4AE]">
          <House size={16} />
          <span className="text-[#29343D]">/</span>
          <span className="text-[#635BFF] font-medium bg-[#EEEEFF] px-2 py-0.5 rounded-md">
            Appointments
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-[#EFF4FA] px-6] rounded-bl-xl rounded-br-xl">
        <div className="flex gap-0 flex-wrap">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3.5 text-sm font-manrope font-medium transition-colors relative cursor-pointer ${
                activeTab === i
                  ? "text-[#635BFF]"
                  : "text-[#98A4AE] hover:text-[#29343D]"
              }`}
            >
              {tab}
              {activeTab === i && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#635BFF] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="py-6 space-y-4">
        {/* Language and Region */}
        <SectionCard title="Language and Region">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
                Language <span className="text-red-400">*</span>
              </label>
              <Select value="English (US)" />
            </div>
            <div>
              <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
                Country <span className="text-red-400">*</span>
              </label>
              <Select value="United States" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
                Date Format <span className="text-red-400">*</span>
              </label>
              <Select value="12/31/2025" />
            </div>
            <div>
              <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
                Time Format <span className="text-red-400">*</span>
              </label>
              <Select value="1:05 PM" />
            </div>
          </div>
        </SectionCard>

        {/* Time Zone */}
        <SectionCard title="Time Zone">
          <div className="mb-4">
            <Checkbox
              label="Display secondary time zone"
              checked={displaySecondary}
              onChange={() => setDisplaySecondary((p) => !p)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
                Main Time Zone <span className="text-red-400">*</span>
              </label>
              <Select value="English (US)" />
            </div>
            <div>
              <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
                Secondary Time Zone <span className="text-red-400">*</span>
              </label>
              <Select placeholder="None" disabled />
            </div>
          </div>
          <Checkbox
            label="Request to update primary time zone based on current location"
            checked={requestLocation}
            onChange={() => setRequestLocation((p) => !p)}
          />
        </SectionCard>

        {/* Events — Default Duration */}
        <SectionCard title="Events">
          <div className="w-1/2 pr-2">
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Default Duration <span className="text-red-400">*</span>
            </label>
            <Select value="15 minutes" />
          </div>
        </SectionCard>

        {/* Events — Display Options */}
        <SectionCard title="Events">
          <div className="space-y-3 mb-5">
            <Checkbox
              label="Show weekends"
              checked={showWeekends}
              onChange={() => setShowWeekends((p) => !p)}
            />
            <Checkbox
              label="Show cancelled events"
              checked={showCancelled}
              onChange={() => setShowCancelled((p) => !p)}
            />
            <Checkbox
              label="Show completed events"
              checked={showCompleted}
              onChange={() => setShowCompleted((p) => !p)}
            />
          </div>
          <div className="w-1/2 pr-2">
            <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
              Start of the weekend <span className="text-red-400">*</span>
            </label>
            <Select value="Sunday" />
          </div>
        </SectionCard>

        {/* Save Button */}
        <div className="flex justify-end pb-4">
          <button className="bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope px-5 py-2.5 rounded-[8px] cursor-pointer">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
