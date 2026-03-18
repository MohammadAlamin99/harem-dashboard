import { BookedService } from "./Preferencesbehavior";

export default function ServiceRowComponent({
  service,
}: {
  service: BookedService;
}) {
  return (
    <div className="flex items-center gap-4 bg-[#F3F5FB] rounded-xl p-6">
      <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center">
        <span className="text-white text-[14px] font-manrope font-bold">
          {service.rank}
        </span>
      </div>
      <span className="text-[14px] font-semibold font-manrope text-[#29343D]">
        {service.label}
      </span>
    </div>
  );
}
