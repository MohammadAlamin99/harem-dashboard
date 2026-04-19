import AnalyticsStats from "./Analyticsstats";
import ConsumptionMetrics from "./ConsumptionMetrics";
import PostsMetrics from "./PostsMetrics";

export default function AnalyticsFacebookContent() {
    return (
        <div>
            <AnalyticsStats />
            <ConsumptionMetrics />
            <PostsMetrics />
        </div>
    )
}
