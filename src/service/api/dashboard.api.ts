import { _shapeMethodGet } from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvDashboardAnalyticsEndPoint,
    SrvDashboardMetricsEndPoint,
} from '@/service/api/_dashboard.endPoint.ts'

export const getDashboardMetrics = () =>
    _shapeMethodGet(
        SrvDashboardMetricsEndPoint,
        'tcSrvDashboardMetricsEndPoint',
    )

export const getDashboardAnalytics = () =>
    _shapeMethodGet(
        SrvDashboardAnalyticsEndPoint,
        'tcSrvDashboardAnalyticsEndPoint',
    )
