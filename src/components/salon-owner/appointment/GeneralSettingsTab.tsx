import { useState } from "react";
import ReusableCheckbox from "./ReusableCheckbox";
import SectionCard from "./SectionCard";
import Select from "./Select";

export default function GeneralSettingsTab() {
  const [displaySecondary, setDisplaySecondary] = useState(false);
  const [requestLocation, setRequestLocation] = useState(true);
  const [showWeekends, setShowWeekends] = useState(true);
  const [showCancelled, setShowCancelled] = useState(false);
  const [showCompleted, setShowCompleted] = useState(true);

  return (
    <div className="py-6 space-y-4">
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

      <SectionCard title="Events">
        <div className="w-1/2 pr-2">
          <label className="block text-xs font-manrope text-[#29343D] mb-1.5">
            Default Duration <span className="text-red-400">*</span>
          </label>
          <Select value="15 minutes" />
        </div>
      </SectionCard>

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

      <div className="flex justify-end pb-4">
        <button className="bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope px-5 py-2.5 rounded-[8px] cursor-pointer">
          Save Settings
        </button>
      </div>
    </div>
  );
}
