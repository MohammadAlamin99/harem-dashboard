"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import StepHeader from "./StepHeader";

interface Props {
  next: () => void;
}

export default function SearchDevices({ next }: Props) {
  const [progress, setProgress] = useState(10);
  const [found, setFound] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setFound(true);
          setTimeout(() => next(), 800);
          return 100;
        }
        return prev + 10;
      });
    }, 350);

    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <h2 className="text-lg font-semibold font-manrope text-[18px] mb-6 text-left mr-auto">
          Cash Register Settings
        </h2>
        <StepHeader activeStep={2} />
        <div className="p-[30px] border border-[#E0E6EB] rounded-[12px]">
          {/* Search Icon */}
          <div className="flex justify-center mb-4">
            <Search color="#526B7A" size={56} />
          </div>

          {/* Text */}
          <p className="text-[#29343D] font-manrope text-[15px] font-semibold text-center mb-4">
            Searching for connected cash registers...
          </p>

          {/* Progress Section */}
          <div className="flex flex-col items-center space-y-2">
            <div className="w-full max-w-[320px] h-[18px] bg-[#F6F7F9] rounded-full overflow-hidden">
              <div
                className="h-[18px] bg-[#635BFF] font-manrope font-normal text-[12px] rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="text-xs text-[#635BFF] font-medium">
              {progress}%
            </span>
          </div>
          {found && (
            <p className="text-[#36C76C] text-sm font-medium text-center pt-6 font-manrope">
              Found: Epson FP-81 II
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
