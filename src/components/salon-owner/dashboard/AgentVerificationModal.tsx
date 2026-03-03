"use client";

import { useEffect, useState } from "react";
import StepHeader from "./StepHeader";

interface Props {
  next: () => void;
}

export default function AgentVerificationModal({ next }: Props) {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => next(), 600);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(timer);
  }, [next]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-lg font-semibold font-manrope text-[18px] mb-6 text-left mr-auto">
        Cash Register Settings
      </h2>
      <StepHeader activeStep={1} />
      <div className="relative w-28 h-28 mt-6">
        <svg className="w-28 h-28 -rotate-90">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="4"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#635BFF"
            strokeWidth="4"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <span className="absolute inset-0 flex items-center justify-center font-semibold text-gray-700">
          {progress}%
        </span>
      </div>

      <p className="text-[#29343D] font-semibold font-manrope text-[15px]">
        Checking if the local agent is active...
      </p>
    </div>
  );
}
