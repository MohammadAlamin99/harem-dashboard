import { Hash } from "lucide-react";
import Image from "next/image";
import ICalaender from "@/app/account-protal/svg/ICalaender";

interface Tag {
  label: string;
  variant: "vip" | "new" | "warning";
}

interface ProfileHeaderProps {
  name?: string;
  location?: string;
  createdAt?: string;
  clientId?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  tags?: Tag[];
}
const tagStyles: Record<string, string> = {
  vip: "bg-[#16CDC7] text-white",
  new: "bg-[#EBFAF0] text-[#36C76C]",
  warning: "border border-[#FF6692] text-[#FF6692] bg-transparent",
};

const ClientProfile = ({
  name = "Maria Rodriguez",
  location = "Bologna, Italy",
  createdAt = "Aug 8, 2024",
  clientId = "000000",
  tags = [
    { label: "VIP", variant: "vip" },
    { label: "New Client", variant: "new" },
    { label: "Frequent Canceler", variant: "warning" },
  ],
}: ProfileHeaderProps) => {
  return (
    <div className="w-full bg-white max-w-5xl mx-auto overflow-hidden rounded-xl">
      {/* Banner */}
      <div
        className="relative h-56 w-full overflow-hidden"
        style={{ height: "330px" }}
      >
        <Image
          src={"/images/bannerProfile.jpg"}
          alt="Profile Banner"
          fill={true}
          priority={true}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Avatar - centered, overlapping banner */}
      <div className="relative flex justify-center">
        <div
          className="rounded-full border-2 border-white"
          style={{ marginTop: "-45px" }}
        >
          <div className="h-20 w-20 overflow-hidden rounded-full outline-primary/30 -outline-offset-1">
            <Image
              src={"/images/avator.png"}
              alt={name}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-[30px] py-[30px] pt-5">
        <div className="grid grid-cols-3 flex-wrap items-center justify-between gap-4">
          <div className="flex gap-8">
            <div className="flex flex-col items-center gap-1">
              <div className="mb-2">
                <ICalaender color="#29343D" size={24} />
              </div>
              <span className="text-[22px] font-semibold font-manrope text-[#29343D]">
                {createdAt}
              </span>
              <span className="text-[14px] font-manrope text-[#98A4AE]">
                Created At
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              {/* <Hash className="h-5 w-5 text-muted-foreground" /> */}
              <div className="mb-2">
                <Hash color="#29343D" size={24} />
              </div>
              <span className="text-[22px] font-semibold font-manrope text-[#29343D]">
                {clientId}
              </span>
              <span className="text-[14px] font-manrope text-[#98A4AE]">
                Client ID
              </span>
            </div>
          </div>

          {/* Center identity */}
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-[18px] font-manrope font-semibold tracking-tight text-[#29343D]">
              {name}
            </h1>
            <div className="flex items-center gap-1.5 text-sm font-manrope text-[#98A4AE]">
              {location}
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.label}
                  className={`rounded-full px-3 py-1 text-xs font-medium ${tagStyles[tag.variant]}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right action */}
          <div className="ml-auto w-fit">
            <button className="rounded-lg bg-[#635BFF] cursor-pointer font-manrope px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 active:scale-[0.97] transition-all">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
