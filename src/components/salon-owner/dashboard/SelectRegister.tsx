"use client";

import { useState } from "react";
import StepHeader from "./StepHeader";

interface Device {
  id: string;
  model: string;
  serial: string;
  ip: string;
}

interface Props {
  next: () => void;
}

export default function SelectRegister({ next }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [manualIP, setManualIP] = useState("");

  const devices: Device[] = [
    {
      id: "1",
      model: "Epson FP-81 II",
      serial: "EPI2345678",
      ip: "192.168.1.100",
    },
    {
      id: "2",
      model: "Epson FP-81 II",
      serial: "EPI2345679",
      ip: "192.168.1.101",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold font-manrope text-[18px] mb-6 text-left mr-auto">
        Cash Register Settings
      </h2>
      <StepHeader activeStep={3} />

      <div className="space-y-4 border border-[#E0E6EB] p-7 rounded-[12px]">
        <h3 className="font-semibold text-[#29343D] font-manrope text-[15px]">
          Select the cash register to configure
        </h3>

        {devices.map((device) => (
          <div
            key={device.id}
            onClick={() => setSelected(device.id)}
            className={`p-4 border rounded-xl cursor-pointer transition ${
              selected === device.id
                ? "border-[#635BFF] bg-[#F4F3FF]"
                : "border-gray-200"
            }`}
          >
            <p className="font-medium text-[#29343D] font-manrope text-sm">
              {device.model}
            </p>
            <p className="text-sm font-manrope font-bold text-[#999]">
              <span className="font-normal">Serial :</span> {device.serial}
            </p>
            <p className="text-sm font-manrope font-bold text-[#999]">
              <span className="font-normal">IP :</span> {device.ip}
            </p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-sm font-manrope font-semibold text-[#29343D] mb-2">
          Or enter the IP manually
        </p>
        <input
          value={manualIP}
          onChange={(e) => setManualIP(e.target.value)}
          placeholder="E.g. 192.168.1.100"
          className="w-full border border-[#E0E6EB] rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#635BFF]"
        />
      </div>
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2.5 bg-[#DDDBFF] text-[#635BFF] rounded-[8px] font-manrope cursor-pointer">
          Rescan
        </button>
        <button
          onClick={next}
          disabled={!selected && !manualIP}
          className="px-4 py-2.5 bg-[#635BFF] text-white rounded-[8px] disabled:opacity-50 cursor-pointer font-manrope"
        >
          Configure Device
        </button>
      </div>
    </div>
  );
}
