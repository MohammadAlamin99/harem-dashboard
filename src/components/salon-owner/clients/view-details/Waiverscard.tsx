import Image from "next/image";
import { useState } from "react";
import IFile from "./IFile";
import { Eye, RefreshCcw } from "lucide-react";

export default function Waiverscard() {
  const [isOn, setIsOn] = useState(false); // toggle state

  return (
    <div>
      <div className="p-[30px] bg-white rounded-xl">
        <h2 className="text-[22px] font-semibold font-manrope mb-[30px]">
          Waivers
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between border border-[#E9EAEB] p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <Image src="/images/fb.svg" alt="fb" width={32} height={32} />
              <Image
                src="/images/insta.svg"
                alt="insta"
                width={32}
                height={32}
              />
              <span className="text-[#635BFF] font-manrope text-base font-medium">
                Marketing consent
              </span>
            </div>

            {/* Toggle */}
            <div
              className={`relative bg-[#DDDBFF] rounded-[8px] w-[36px] h-6 cursor-pointer transition-colors duration-300`}
              onClick={() => setIsOn(!isOn)}
            >
              <div
                className={`bg-[#635BFF] rounded-[6px] w-4 h-4 absolute top-1 transition-all duration-300 ${
                  isOn ? "right-0.5" : "left-0.5"
                }`}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between border border-[#E9EAEB] p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <IFile />
              <span className="text-[#635BFF] font-manrope text-base font-medium">
                Social media posting
              </span>
            </div>
            <button className="text-[#16CDC7] bg-[#ECFDFD] font-manrope text-base font-medium px-4 py-2.5 rounded-lg">
              Sign Now
            </button>
          </div>
          <div className="flex items-center justify-between border border-[#E9EAEB] p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <IFile />
              <span className="text-[#635BFF] font-manrope text-base font-medium">
                Social media posting
              </span>
              <button className="text-[#16CDC7] bg-[#ECFDFD] font-manrope  text-[12px] px-2 py-1 rounded-2xl ml-1">
                Sign Now
              </button>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-[#F1F2FE] rounded-[8px] px-4 py-2.5 cursor-pointer">
                <Eye size={26} fill="#635BFF" color="#F1F2FE" />
              </div>
              <div className="bg-[#FFF9E5] rounded-[8px] px-4 py-2.5 cursor-pointer">
                <RefreshCcw color="#FFD648"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
