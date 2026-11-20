import { getDashboardAnalytics } from '@/service/api/dashboard.api.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import { Analytics } from '@/page/analytics/type/analytics.type.ts'
import TopBlogViewsCard from '@/page/analytics/component/TopBlogViewsCard.tsx'
import TopPropertyViewsCard from '@/page/analytics/component/TopPropertyViewsCard.tsx'
import TopBoatInquiriesCard from '@/page/analytics/component/TopBoatInquiriesCard.tsx'
import PropertyRatedCard from '@/page/analytics/component/PropertyRatedCard.tsx'

const AnalyticsPage = () => {
    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: getDashboardAnalytics,
    })

    const analytics: Analytics = __detail as Analytics

    return (
        <>
            <div className="row g-4">
                <div className="col-12 col-md-4">
                    <TopPropertyViewsCard
                        properties={analytics.topPropertyViews}
                    />
                </div>
                <div className="col-12 col-md-4">
                    <TopBlogViewsCard blogs={analytics.topBlogViews} />
                </div>
                <div className="col-12 col-md-4">
                    <TopBoatInquiriesCard
                        inquiries={analytics.topBoatInquiries}
                    />
                </div>
                <div className="col-12 col-md-4">
                    <PropertyRatedCard
                        properties={analytics.lowestRatedProperties}
                        title="Lowest Review Property"
                    />
                </div>
                <div className="col-12 col-md-4">
                    <PropertyRatedCard
                        properties={analytics.highestRatedProperties}
                        title="Highest Review Property "
                    />
                </div>
            </div>
            {/*<div className="mt-4">*/}
            {/*    <BarChart />*/}
            {/*</div>*/}
            {/*<div className="mt-4">*/}
            {/*    <LineChart />*/}
            {/*</div>*/}
        </>
    )
}

export default AnalyticsPage
