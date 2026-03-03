// "use client";

// import StepHeader from "./StepHeader";

// interface Props {
//   close: () => void;
// }

// export default function Configuration({ close }: Props) {
//   return (
//     <div className="text-center space-y-6">
//       <h2 className="text-lg font-semibold font-manrope text-[18px] mb-6 text-left">
//         Cash Register Settings
//       </h2>

//       <StepHeader activeStep={4} />

//       <div className="flex flex-col items-center space-y-4">
//         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
//           <span className="text-green-600 text-2xl">✓</span>
//         </div>

//         <h3 className="text-lg font-semibold">Configuration completed!</h3>
//         <p className="text-gray-500">
//           The cash register has been successfully configured.
//         </p>

//         <div className="bg-[#F4F3FF] p-4 rounded-xl text-left w-full">
//           <p>
//             <strong>Brand:</strong> Epson
//           </p>
//           <p>
//             <strong>Model:</strong> FP-81 II
//           </p>
//           <p>
//             <strong>Serial:</strong> EPI2345678
//           </p>
//           <p>
//             <strong>Name:</strong> Register 1
//           </p>
//         </div>

//         <button
//           onClick={close}
//           className="bg-[#635BFF] text-white px-4 py-2 rounded-lg"
//         >
//           Test printer
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Check, Printer } from "lucide-react";
import StepHeader from "./StepHeader";

interface Props {
  close: () => void;
}

export default function Configuration({ close }: Props) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold font-manrope text-[#1a1a2e]">
          Cash Register Settings
        </h2>
      </div>

      <StepHeader activeStep={4} />

      {/* Success Icon */}
      <div className="flex flex-col items-center space-y-3 pt-2">
        <div className="w-20 h-20 bg-[#ECFDFD] rounded-full flex items-center justify-center">
          <Check color="#16CDC7" size={42} />
        </div>

        <h3 className="text-xl font-bold font-manrope text-[#1a1a2e]">
          Configuration completed!
        </h3>
        <p className="text-sm text-[#98A4AE] font-manrope">
          The cash register has been successfully configured.
        </p>
      </div>

      {/* Details Card */}
      <div className="bg-[#F1F2FE] rounded-2xl p-5 w-full">
        <p className="text-sm font-semibold font-manrope text-[#1a1a2e] mb-4">
          Cash Register Details
        </p>
        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <p className="text-xs text-[#98A4AE] font-manrope">Brand</p>
            <p className="text-sm font-semibold font-manrope text-[#1a1a2e]">
              Epson
            </p>
          </div>
          <div>
            <p className="text-xs text-[#98A4AE] font-manrope">Model</p>
            <p className="text-sm font-semibold font-manrope text-[#1a1a2e]">
              FP-81 II
            </p>
          </div>
          <div>
            <p className="text-xs text-[#98A4AE] font-manrope">Serial</p>
            <p className="text-sm font-semibold font-manrope text-[#1a1a2e]">
              EP12345678
            </p>
          </div>
          <div>
            <p className="text-xs text-[#98A4AE] font-manrope">Alias</p>
            <p className="text-sm font-semibold font-manrope text-[#1a1a2e]">
              Register 1
            </p>
          </div>
        </div>
      </div>

      {/* Test Print Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={close}
          className="flex items-center gap-2.5 bg-[#635BFF] hover:bg-[#4f49e0] transition-colors text-white text-sm font-semibold font-manrope px-5 py-3 rounded-xl cursor-pointer"
        >
          <Printer size={18} />
          Test print
        </button>
      </div>
    </div>
  );
}
