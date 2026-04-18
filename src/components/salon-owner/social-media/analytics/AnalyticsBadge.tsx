

type PostType = "Link" | "Photo" | "Gif" | "Carousel" | "Video";

const BADGE_STYLES: Record<PostType | "default", string> = {
    Link: "bg-[#E6F4F7] text-[#46CAEB]",
    Photo: "bg-[#FFF9E5] text-[#FFD648]",
    Carousel: "bg-[#DDDBFF] text-[#635BFF]",
    Video: "bg-[#ECFDFD] text-[#16CDC7]",
    Gif: "bg-[#F6F7F9] text-[#29343D]",
    default: "bg-gray-100 text-gray-500",
};
export function AnalyticsBadge({ type }: { type: PostType }) {
    const cls = BADGE_STYLES[type] ?? BADGE_STYLES.default;
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[12px] font-medium font-manrope ${cls}`}>
            {type}
        </span>
    );
}