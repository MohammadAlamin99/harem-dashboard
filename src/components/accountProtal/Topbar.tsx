
import { Menu, Search } from "lucide-react";
import SalonSelect from "./dashboardLayout/SalonSelect";
import IBell from "@/app/account-protal/svg/IBell";
import Image from "next/image";

interface TopbarProps {
    onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {

    return (
        <header className="flex items-center justify-between bg-white px-6 py-4">
            {/* input */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden" onClick={onMenuClick}>
                    <Menu size={22} />
                </button>

                <div className="flex items-center relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2"><Search size={18} height={18} color="#29343D" /></div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 lg:w-[447px] md:w-max px-4 py-2 text-[#98A4AE] border border-[#E0E6EB] font-manrope font-normal rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    <SalonSelect />
                </div>
                <IBell />
                <Image src={'/images/profile.svg'} width={40} height={40} alt="avatar" className="rounded-full" />
            </div>
        </header>
    );
};

export default Topbar;