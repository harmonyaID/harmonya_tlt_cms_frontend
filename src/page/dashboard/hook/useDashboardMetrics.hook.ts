import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import { getDashboardMetrics } from '@/service/api/dashboard.api.ts'

const useDashboardMetrics = () => {
    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: getDashboardMetrics,
    })

    return {
        __detail,
        __isLoading,
    }
}

export default useDashboardMetrics
