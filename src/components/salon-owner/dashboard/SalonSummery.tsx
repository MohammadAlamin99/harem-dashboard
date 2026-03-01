import { EllipsisVertical } from "lucide-react";
import SummeyBox from "./SummeyBox";
import ReceptSummer from "./ReceptSummer";

export default function SalonSummery() {
  const summaryData = [
    {
      id: 1,
      text: "Total received",
      value: "€ 2,300",
      color: "text-[#635BFF]",
    },
    { id: 2, text: "Receipts issued", value: "12", color: "text-[#36C76C]" },
    {
      id: 3,
      text: "Last receipt",
      value: "#R-2025-0098",
      color: "text-[#16CDC7]",
    },
  ];
  return (
    <>
      <div className="p-6 bg-white rounded-[12px]">
        <div className="flex justify-between items-center max-[992px]:flex-col items-start">
          <h2 className="text-[16px] text-[#29343D] font-manrope font-semibold">
            Daily Summary
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 font-manrope text-[#FF6692] bg-[#FFE5ED] w-fit px-2.5 py-1.5 rounded-2xl">
              <div className="w-2 h-2 bg-[#FF6692] rounded-full"></div>
              Cash Register Closed
            </div>
            <div className="px-4 py-2.5 bg-[#EFF4FA] rounded-[8px]">
              <EllipsisVertical />
            </div>
          </div>
        </div>
        {/* summer box */}
        <div className="mt-6 grid grid-cols-1 max-[1220px]:grid-cols-2 max-[992px]:grid-cols-1 gap-4">
          {summaryData.map((item) => (
            <SummeyBox
              key={item.id}
              text={item.text}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        {/* recept summary */}
        <div className="bg-[#635BFF] p-6 mt-5 rounded-xl">
          <ReceptSummer />
        </div>
      </div>
    </>
  );
}
