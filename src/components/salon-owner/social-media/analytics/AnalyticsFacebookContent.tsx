import AnalyticsStats from "./Analyticsstats";
import AudienceAnalytics from "./Audienceanalytics";
import ConsumptionMetrics from "./ConsumptionMetrics";
import FollowersActiveChart from "./Followersactivechart";
import PostsMetrics from "./PostsMetrics";
import StoriesMetrics from "./StoriesMetrics";
import VideosMetrics from "./VideosMetrics";

export default function AnalyticsFacebookContent() {
    return (
        <div>
            <AnalyticsStats />
            <ConsumptionMetrics />
            <PostsMetrics />
            <StoriesMetrics />
            <AudienceAnalytics />
            <FollowersActiveChart />
            <VideosMetrics />
        </div>
    )
}
