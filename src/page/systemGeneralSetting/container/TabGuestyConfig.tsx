import { useState } from 'react'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import { BadgeYesOrNo } from '@/component/general/Badge.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import {
    getGuestyConfig,
    testGuestyConfig,
} from '@/service/api/systemManagement.api.ts'

const initFormMap = (pass) => ({
    clientId: '',
    clientSecret: '',
    authUrl: '',
    baseUrl: '',
    isActive: pass.isActive || false,
})

const TabGuestyConfig = () => {
    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: getGuestyConfig,
    })

    const [isLoadingTest, setIsLoadingTest] = useState(false)

    const _handleTestConnect = () => {
        setIsLoadingTest(true)
        testGuestyConfig().then((res) => {
            setIsLoadingTest(false)
        })
    }

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Guesty Configuration</h5>
                </div>
                <div className="col-auto hstack gap-3">
                    <BtnPrimary
                        onClick={() => _handleTestConnect()}
                        isOutline
                        isLoading={isLoadingTest}
                        isDisabled={isLoadingTest}>
                        Test Connect
                    </BtnPrimary>

                    <BtnPrimary onClick={() => {}}>Edit</BtnPrimary>
                </div>
            </div>

            <HorizontalLoopDataLogic
                list={[
                    objectTabContent('Key', __detail.key),
                    objectTabContent(
                        'Configured',
                        <TextTrueOrFalse value={__detail.isConfigured} />,
                    ),
                    objectTabContent(
                        'Status Active',
                        <TextTrueOrFalse value={__detail.isActive} />,
                    ),
                    objectTabContent(
                        'Credentials',
                        __detail?.credentials?.length
                            ? __detail?.credentials?.map((vm, index) => (
                                  <p className="fs-12" key={index}>
                                      {vm}
                                  </p>
                              ))
                            : '-',
                    ),
                ]}
            />
        </>
    )
}

export default TabGuestyConfig
