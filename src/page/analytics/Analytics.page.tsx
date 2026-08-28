import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import TopTenCard from '@/page/analytics/component/TopTenCard.tsx'
import BarChart from '@/page/analytics/component/BarChart.tsx'
import LineChart from '@/page/analytics/component/LineChart.tsx'

const AnalyticsPage = () => {
    return (
        <>
            <div className="row g-4">
                <div className="col-12 col-md-4">
                    <TopTenCard title="Top 10 Property view" />
                </div>
                <div className="col-12 col-md-4">
                    <TopTenCard title="Top 10 Blog view" />
                </div>
                <div className="col-12 col-md-4">
                    <TopTenCard title="Top 10 Boat Inquiry" />
                </div>
                <div className="col-12 col-md-4">
                    <TopTenCard title="10 Lowest Review Property" />
                </div>
                <div className="col-12 col-md-4">
                    <TopTenCard title="10 Highest Review Property " />
                </div>
            </div>
            <div className="mt-4">
                <BarChart />
            </div>
            <div className="mt-4">
                <LineChart />
            </div>
        </>
    )
}

export default AnalyticsPage
