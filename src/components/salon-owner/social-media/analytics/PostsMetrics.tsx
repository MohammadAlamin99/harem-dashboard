"use client";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import LikeIcon from './LikeIcon';
import LoveReactIcon from './LoveReactIcon';
import WowIcon from './WowIcon';
import HahaIcon from './HahaIcon';
import SadIcon from './SadIcon';
import AngeryIcon from './AngeryIcon';

interface ReactionData {
    name: string;
    value: number;
    label: string;
    emoji: React.ReactNode;
}

const reactionData: ReactionData[] = [
    { name: 'Like', value: 250, label: 'Like', emoji: <LikeIcon /> },
    { name: 'Love', value: 250, label: 'Love', emoji: <LoveReactIcon /> },
    { name: 'Wow', value: 250, label: 'Wow', emoji: <WowIcon /> },
    { name: 'Haha', value: 250, label: 'Haha', emoji: <HahaIcon /> },
    { name: 'Sad', value: 250, label: 'Sad', emoji: <SadIcon /> },
    { name: 'Angry', value: 250, label: 'Angry', emoji: <AngeryIcon /> },
];

export default function PostsMetrics() {
    return (
        <div className="bg-white p-6 rounded-xl mt-6 font-manrope">
            <h3 className="text-lg font-bold text-[#29343D] mb-7">
                Posts Metrics
            </h3>

            <div className="p-7 border border-[#E0E6EB] rounded-xl">
                <p className="text-base font-bold text-[#29343D] mb-8">
                    Post Reactions
                </p>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={reactionData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
                            barGap={0}
                        >
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={<CustomXAxisTick />}
                                interval={0}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#98A4AE', fontSize: 12, fontWeight: 500 }}
                                domain={[0, 800]}
                                ticks={[100, 200, 300, 400, 500, 600, 700, 800]}
                            />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                content={<CustomTooltip />}
                            />
                            <Bar
                                dataKey="value"
                                fill="#635BFF"
                                radius={[10, 10, 10, 10]}
                                barSize={100}
                                background={{ fill: '#F4F7FB', radius: 10 }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

// --- Custom X Axis Tick ---
interface CustomXAxisTickProps {
    x?: number;
    y?: number;
    payload?: {
        value: string;
    };
}

const CustomXAxisTick = (props: CustomXAxisTickProps) => {
    const { x = 0, y = 0, payload } = props;
    const item = payload
        ? reactionData.find((d) => d.label === payload.value)
        : null;

    return (
        <g transform={`translate(${x},${y + 20})`}>
            {/* Wrap both icon + text centered */}
            <foreignObject x={-30} y={-10} width={60} height={40}>
                <div className="flex items-center justify-center gap-2 md:flex-row flex-col">
                    <div className="flex items-center justify-center">
                        {item?.emoji}
                    </div>
                    <span className="text-[11px] text-[#98A4AE] font-medium leading-none">
                        {payload?.value}
                    </span>
                </div>
            </foreignObject>
        </g>
    );
};

// --- Custom Tooltip ---
interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: {
            name: string;
        };
    }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 shadow-xl rounded-lg border border-[#E0E6EB] font-manrope">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#635BFF]"></div>
                    <p className="text-xs font-bold text-[#29343D]">
                        {payload[0].payload.name}
                    </p>
                </div>
                <div className="flex justify-between gap-4">
                    <p className="text-[11px] font-medium text-[#526B7A]">
                        Total
                    </p>
                    <p className="text-[11px] font-bold text-[#29343D]">
                        {payload[0].value}
                    </p>
                </div>
            </div>
        );
    }
    return null;
};