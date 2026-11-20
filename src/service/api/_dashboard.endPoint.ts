const baseAPI: any = String(import.meta.env.VITE_BASE_API)

export const SrvDashboardMetricsEndPoint = baseAPI + '/dashboard/metrics'

export const SrvDashboardAnalyticsEndPoint = baseAPI + '/dashboard/analytics'
