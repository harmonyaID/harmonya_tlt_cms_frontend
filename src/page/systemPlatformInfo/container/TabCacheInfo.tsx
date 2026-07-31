import { BtnPrimary } from '@/component/general/Button.tsx'
import useHandleCache from '@/page/systemPlatformInfo/hook/useHandleCache.hook.ts'
import {
    runCacheClearSI,
    runCacheInfoClearSI,
    runCacheOptimizeClearSI,
    runCacheOptimizeSI,
    runCacheQueueRestartSI,
    runCacheRouteClearSI,
    runCacheViewClearSI,
} from '@/service/api/systemManagement.api.ts'

const CardBox = ({ desc, titleBtn, dataAPI }) => {
    const { __isLoading, __handleSubmit } = useHandleCache({
        dataAPI,
    })

    return (
        <div className="card card-body mb-0">
            <div className="hstack gap-3">
                <div className="">
                    <p className="fs-14 fw-500 mb-0">{desc}</p>
                </div>
                <div className="ms-auto">
                    <BtnPrimary
                        isLoading={__isLoading}
                        isDisabled={__isLoading}
                        onClick={() => __handleSubmit()}>
                        {titleBtn}
                    </BtnPrimary>
                </div>
            </div>
        </div>
    )
}

const TabCacheInfo = () => {
    return (
        <>
            <div className="vstack gap-3">
                <CardBox
                    desc="Clear cache"
                    titleBtn="Clear Cache"
                    dataAPI={runCacheClearSI}
                />
                <CardBox
                    desc="Clear system log config cache"
                    titleBtn="Clear Config Cache"
                    dataAPI={runCacheInfoClearSI}
                />
                <CardBox
                    desc="You might need to refresh the config caching when you change something on production environment."
                    titleBtn="Optimize Clear"
                    dataAPI={runCacheOptimizeSI}
                />
                <CardBox
                    desc="Clear CMS caching: database caching, static blocks, etc. Run this command when you don't see the changes after"
                    titleBtn="Clear All CMS Cache"
                    dataAPI={runCacheOptimizeClearSI}
                />
                <CardBox
                    desc="Clear queue system input."
                    titleBtn="Clear Queue Cache"
                    dataAPI={runCacheQueueRestartSI}
                />
                <CardBox
                    desc="Clear system log route."
                    titleBtn="Clear Route Cache"
                    dataAPI={runCacheRouteClearSI}
                />
                <CardBox
                    desc="Clear cache views"
                    titleBtn="Clear Views Cache"
                    dataAPI={runCacheViewClearSI}
                />
            </div>
        </>
    )
}

export default TabCacheInfo
