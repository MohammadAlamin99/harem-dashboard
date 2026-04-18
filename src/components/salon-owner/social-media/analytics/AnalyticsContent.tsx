"use client";
import { useState } from "react";
import AnalyticsHeader from "./Analyticsheader";
import AnalyticsStats from "./Analyticsstats";
import AudienceAnalytics from "./Audienceanalytics";
import FollowersActiveChart from "./Followersactivechart";
import PostsTable from "./Poststable";

type Tab = "Account" | "Posts" | "Reels" | "Story";

export default function AnalyticsContent() {
    const [activeTab, setActiveTab] = useState<Tab>("Account");

    return (
        <div>
            {/* Header */}
            <AnalyticsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* ── Account Tab ── */}
            {activeTab === "Account" && (
                <>
                    <AnalyticsStats />
                    <AudienceAnalytics />
                    <FollowersActiveChart />
                </>
            )}

            {/* ── Posts Tab ── */}
            {activeTab === "Posts" && (
                <div className="mt-6">
                    <PostsTable />
                </div>
            )}

            {/* ── Reels Tab ── */}
            {activeTab === "Reels" && (
                <div className="mt-6">
                    <PostsTable />
                </div>
            )}

            {/* ── Story Tab ── */}
            {activeTab === "Story" && (
                <div className="mt-6">
                    <PostsTable />
                </div>
            )}
        </div>
    );
}