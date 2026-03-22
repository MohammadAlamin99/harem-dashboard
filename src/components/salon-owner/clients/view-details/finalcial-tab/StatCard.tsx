
// Stat Card 

interface StatCardProps {
    iconBg: string;
    icon: React.ReactNode;
    label: string;
    value: string;
}

export function StatCard({ iconBg, icon, label, value }: StatCardProps) {
    return (
        <div className="flex-1 border border-[#E0E6EB] rounded-xl px-6 py-4 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
                <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}
                >
                    {icon}
                </div>
                <span className="text-[#29343D] font-medium font-manrope text-[18px]">
                    {label}
                </span>
            </div>
            <p className="text-[#29343D] font-bold font-manrope text-[24px]">{value}</p>
        </div>
    );
}