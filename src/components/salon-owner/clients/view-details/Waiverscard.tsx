import Image from "next/image";
import { useState } from "react";
import IFile from "./IFile";
import { Eye, RefreshCcw } from "lucide-react";

export default function Waiverscard() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div>
      <div className="p-5 sm:p-[30px] bg-white rounded-xl">
        <h2 className="text-[20px] sm:text-[22px] font-semibold font-manrope mb-5 sm:mb-[30px]">
          Waivers
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#E9EAEB] p-4 rounded-xl gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Image src="/images/fb.svg" alt="fb" width={28} height={28} />
              <Image
                src="/images/insta.svg"
                alt="insta"
                width={28}
                height={28}
              />
              <span className="text-[#635BFF] font-manrope text-sm sm:text-base font-medium break-words">
                Marketing consent
              </span>
            </div>

            {/* Toggle */}
            <div
              className="relative bg-[#DDDBFF] rounded-[8px] w-[36px] h-6 cursor-pointer transition-colors duration-300 self-end sm:self-auto"
              onClick={() => setIsOn(!isOn)}
            >
              <div
                className={`bg-[#635BFF] rounded-[6px] w-4 h-4 absolute top-1 transition-all duration-300 ${
                  isOn ? "right-0.5" : "left-0.5"
                }`}
              ></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#E9EAEB] p-4 rounded-xl gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <IFile />
              <span className="text-[#635BFF] font-manrope text-sm sm:text-base font-medium break-words">
                Social media posting
              </span>
            </div>

            <button className="text-[#16CDC7] bg-[#ECFDFD] font-manrope text-sm sm:text-base font-medium px-4 py-2.5 rounded-lg self-start sm:self-auto">
              Sign Now
            </button>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border border-[#E9EAEB] p-4 rounded-xl gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <IFile />
              <span className="text-[#635BFF] font-manrope text-sm sm:text-base font-medium break-words">
                Social media posting
              </span>

              <button className="text-[#16CDC7] bg-[#ECFDFD] font-manrope text-[11px] sm:text-[12px] px-2 py-1 rounded-2xl ml-1">
                Sign Now
              </button>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <div className="bg-[#F1F2FE] rounded-[8px] px-3 sm:px-4 py-2.5 cursor-pointer">
                <Eye
                  size={22}
                  className="sm:w-[26px] sm:h-[26px]"
                  fill="#635BFF"
                  color="#F1F2FE"
                />
              </div>
              <div className="bg-[#FFF9E5] rounded-[8px] px-3 sm:px-4 py-2.5 cursor-pointer">
                <RefreshCcw
                  size={20}
                  className="sm:w-[24px] sm:h-[24px]"
                  color="#FFD648"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
