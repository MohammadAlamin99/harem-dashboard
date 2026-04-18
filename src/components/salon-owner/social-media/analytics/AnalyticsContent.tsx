"use client";
import { useState, ReactNode } from "react";
import AnalyticsHeader from "./Analyticsheader";
import AnalyticsStats from "./Analyticsstats";
import AudienceAnalytics from "./Audienceanalytics";
import FollowersActiveChart from "./Followersactivechart";
import PostsTable, { TableColumn } from "./Poststable";
import Image from "next/image";
import InstaIcon from "./InstaIcon";
import { AnalyticsBadge } from "./AnalyticsBadge";

// --- Interfaces for Type Safety ---
type Tab = "Account" | "Posts" | "Reels" | "Story";

type BaseData = { id: number; text: string; date: string; reached: string; }
type PostData = BaseData & { type: "Link" | "Photo" | "Gif" | "Carousel" | "Video"; views: string; interactions: string; likes: string; }
type ReelData = BaseData & { views: string; likes: string; comments: string; saves: string; shares: string; }
type StoryData = BaseData & { impressions: string; forwardTaps: string; backTaps: string; replies: string; exits: string; }

export default function AnalyticsContent() {
    const [activeTab, setActiveTab] = useState<Tab>("Account");

    // Shared row renderer for the first column
    const renderPostInfo = (item: BaseData): ReactNode => (
        <div className="flex items-center gap-3 min-w-[280px]">
            <div className="relative w-[64px] h-[64px]">
                <Image
                    src="/images/media01.jpg"
                    alt="post"
                    fill
                    className="rounded-xl object-cover"
                />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug line-clamp-2 text-[#29343D]">{item.text}</p>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-[#98A4AE]">{item.date}</span>
                    <InstaIcon />
                </div>
            </div>
        </div>
    );

    // --- Column Definitions ---
    const POST_COLUMNS: TableColumn<PostData>[] = [
        { header: "Posts", width: "35%", render: renderPostInfo },
        { header: "Type", render: (item) => <AnalyticsBadge type={item.type} /> },
        { header: "Views", render: (item) => item.views },
        { header: "Reached", render: (item) => item.reached },
        { header: "Total interactions", subHeader: "(likes + comments + saves + shares)", render: (item) => item.interactions },
        { header: "Likes", render: (item) => item.likes },
    ];

    const REEL_COLUMNS: TableColumn<ReelData>[] = [
        { header: "Reels", width: "35%", render: renderPostInfo },
        { header: "Views", render: (item) => item.views },
        { header: "Reached", render: (item) => item.reached },
        { header: "Likes", render: (item) => item.likes },
        { header: "Comments", render: (item) => item.comments },
        { header: "Saves", render: (item) => item.saves },
        { header: "Shares", render: (item) => item.shares },
    ];

    const STORY_COLUMNS: TableColumn<StoryData>[] = [
        { header: "Stories", width: "35%", render: renderPostInfo },
        { header: "Reached", render: (item) => item.reached },
        { header: "Impressions", render: (item) => item.impressions },
        { header: "Forward Taps", render: (item) => item.forwardTaps },
        { header: "Back Taps", render: (item) => item.backTaps },
        { header: "Replies", render: (item) => item.replies },
        { header: "Exits", render: (item) => item.exits },
    ];

    return (
        <div>
            <AnalyticsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {activeTab === "Account" && (
                <div className="space-y-6 mt-6">
                    <AnalyticsStats />
                    <AudienceAnalytics />
                    <FollowersActiveChart />
                </div>
            )}

            {activeTab === "Posts" && (
                <div className="mt-6">
                    <PostsTable<PostData>
                        data={MOCK_POSTS}
                        columns={POST_COLUMNS}
                        filterKey="type"
                        filterOptions={["All Post Types", "Photo", "Video", "Carousel"]}
                    />
                </div>
            )}

            {activeTab === "Reels" && (
                <div className="mt-6">
                    <PostsTable<ReelData> data={MOCK_REELS} columns={REEL_COLUMNS} />
                </div>
            )}

            {activeTab === "Story" && (
                <div className="mt-6">
                    <PostsTable<StoryData> data={MOCK_STORIES} columns={STORY_COLUMNS} />
                </div>
            )}
        </div>
    );
}

// --- Mock Data ---
const MOCK_POSTS: PostData[] = Array.from({ length: 10 }, (_, i) => ({
    id: i, text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ", date: "Wed, 12 Oct at 11:01",
    type: "Carousel", views: "2.1k", reached: "1.2k", interactions: "1.5k", likes: "900"
}));

const MOCK_REELS: ReelData[] = Array.from({ length: 8 }, (_, i) => ({
    id: i, text: "Trending Reel Video content...", date: "Thu, 13 Oct at 09:45",
    views: "15.4k", reached: "12.1k", likes: "1.2k", comments: "450", saves: "800", shares: "1.1k"
}));

const MOCK_STORIES: StoryData[] = Array.from({ length: 6 }, (_, i) => ({
    id: i, text: "Daily Story update...", date: "Fri, 14 Oct at 14:20",
    reached: "800", impressions: "1.1k", forwardTaps: "650", backTaps: "120", replies: "15", exits: "40"
}));