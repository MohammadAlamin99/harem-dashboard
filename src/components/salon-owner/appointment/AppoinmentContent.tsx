"use client";

import { useState } from "react";
import { ChevronLeft, House } from "lucide-react";
import ReusableCheckbox from "./ReusableCheckbox";
import SectionCard from "./SectionCard";
import Select from "./Select";

// tabs
const TABS = ["General Settings", "Notifications & Communication", "Employees"];

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
            <ReusableCheckbox
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
          <ReusableCheckbox
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
            <ReusableCheckbox
              label="Show weekends"
              checked={showWeekends}
              onChange={() => setShowWeekends((p) => !p)}
            />
            <ReusableCheckbox
              label="Show cancelled events"
              checked={showCancelled}
              onChange={() => setShowCancelled((p) => !p)}
            />
            <ReusableCheckbox
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
