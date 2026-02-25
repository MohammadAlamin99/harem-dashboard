
export default function Card({
    icon,
    title,
    value,
    lines = [],
    iconBg = "bg-gray-500",
    gradientFrom = "#ffffff",
    gradientTo = "#f9fafb",
}: {
    icon: React.ReactElement;
    title: string;
    value: number | string;
    lines?: string[];
    iconBg?: string;
    gradientFrom?: string;
    gradientTo?: string;
}) {
    return (
        <div
            className="w-full p-6 rounded-lg font-manrope"
            style={{
                background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
            }}
        >
            <div className="flex items-center space-x-4">
                <div
                    className={`w-[40px] h-[40px] ${iconBg} rounded-xl flex items-center justify-center text-white text-xl`}
                >
                    {icon}
                </div>
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            </div>

            <div className="mt-4 text-[28px] font-semibold text-gray-800">
                {value}
            </div>

            {lines.length > 0 && (
                <div className="mt-2 text-[13px] text-[#29343D] font-semibold">
                    {lines.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
            )}
        </div>
    );
}
