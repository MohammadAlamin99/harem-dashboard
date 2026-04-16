
import AnalyticsHeader from './Analyticsheader'
import AnalyticsStats from './Analyticsstats'
import AudienceAnalytics from './Audienceanalytics'
import FollowersActiveChart from './Followersactivechart'

export default function AnalyticsContent() {
    return (
        <div>
            <AnalyticsHeader />
            <AnalyticsStats />
            <AudienceAnalytics />
            <FollowersActiveChart />
        </div>
    )
}
