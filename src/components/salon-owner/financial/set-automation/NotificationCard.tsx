import { useState } from "react";

interface NotificationCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  buttonText: string;
}
export const NotificationCard: React.FC<NotificationCardProps> = ({
  icon,
  iconBg,
  title,
  buttonText,
}) => {
  const [isOn, setIsOn] = useState(false);
  return (
    <div className="bg-[#F6F7F9] p-6 rounded-xl flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <div className={`${iconBg} rounded-full`}>{icon}</div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[#29343D] max-w-[240px] text-base font-semibold">
          {title}
        </h3>
        {/* Toggle */}
        <div
          className={`relative ${isOn ? "bg-[#635BFF]" : "bg-[#E0E6EB]"} rounded-[8px] w-[36px] h-6 cursor-pointer transition-colors duration-300 self-end sm:self-auto`}
          onClick={() => setIsOn(!isOn)}
        >
          <div
            className={`${isOn ? "bg-[white]" : "bg-[white]"} rounded-[6px] w-4 h-4 absolute top-1 transition-all duration-300 ${
              isOn ? "right-0.5" : "left-0.5"
            }`}
          ></div>
        </div>
      </div>

      <button className="bg-[#DDDBFF] text-[#635BFF] px-4 py-2.5 rounded-lg text-[12px] md:text-sm font-semibold w-full md:w-fit cursor-pointer">
        {buttonText}
      </button>
    </div>
  );
};
