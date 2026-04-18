"use client";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatCard {
    title: string;
    value: string;
    trend: string;
    bars: number[]; // 0–100 relative heights
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS: StatCard[] = [
    { title: "Followers (Total)", value: "200", trend: "+9%", bars: [30, 50, 20, 60, 35, 100] },
    { title: "Accounts Reached in Period", value: "345", trend: "+9%", bars: [45, 25, 70, 40, 55, 100] },
    { title: "Profile Views", value: "3.345", trend: "+9%", bars: [20, 60, 35, 50, 30, 100] },
    { title: "Website Button Taps", value: "10k", trend: "+9%", bars: [55, 30, 65, 25, 45, 100] },
    { title: "Email Button Taps", value: "10k", trend: "+9%", bars: [40, 70, 30, 55, 20, 100] },
    { title: "Call Button Taps", value: "345", trend: "+9%", bars: [25, 45, 80, 35, 60, 100] },
    { title: "Text Button Taps", value: "3.345", trend: "+9%", bars: [60, 20, 50, 75, 40, 100] },
    { title: "Get Directions Taps", value: "10k", trend: "+9%", bars: [35, 65, 25, 45, 55, 100] },
];

// ─── Mini Bar Chart ───────────────────────────────────────────────────────────
const MiniBarChart = ({ bars }: { bars: number[] }) => {
    const chartH = 56;
    const barW = 8;
    const gap = 5;
    const totalW = bars.length * barW + (bars.length - 1) * gap;

    return (
        <svg width={totalW} height={chartH} viewBox={`0 0 ${totalW} ${chartH}`}>
            {bars.map((pct, i) => {
                const barH = (pct / 100) * chartH;
                const x = i * (barW + gap);
                const y = chartH - barH;
                const isLast = i === bars.length - 1;
                const radius = 3;

                return (
                    <rect
                        key={i}
                        x={x}
                        y={y}
                        width={barW}
                        height={barH}
                        rx={radius}
                        ry={radius}
                        fill={isLast ? "#16CDC7" : "#D0F5F4"}
                    />
                );
            })}
        </svg>
    );
};

// ─── Trend Icon (Instagram-style arrow) ──────────────────────────────────────
const TrendIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
            d="M7 17L17 7M17 7H7M17 7V17"
            stroke="#16CDC7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCardItem = ({ card }: { card: StatCard }) => (
    <div className="bg-white rounded-xl p-[15px] md:p-[30px] flex flex-col gap-3">

        {/* Title */}
        <p className="text-[16px] font-medium text-[#29343D] font-manrope leading-tight">
            {card.title}
        </p>

        {/* Value + Chart row */}
        <div className="flex items-end justify-between">
            <span className="text-[22px] font-semibold text-[#29343D] font-manrope leading-none">
                {card.value}
            </span>
            <MiniBarChart bars={card.bars} />
        </div>

        {/* Trend badge */}
        <div className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#EBFAF9]">
                <TrendIcon />
            </span>
            <span className="text-[12px] font-semibold text-[#16CDC7] font-manrope">
                {card.trend}
            </span>
        </div>

    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AnalyticsStats() {
    return (
        <div className="bg-[#F4F6FA] font-manrope mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((card, idx) => (
                    <StatCardItem key={idx} card={card} />
                ))}
            </div>
        </div>
    );
}