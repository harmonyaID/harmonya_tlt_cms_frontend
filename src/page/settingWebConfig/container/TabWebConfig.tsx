import { BtnPrimary } from '@/component/general/Button.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import { getWebConfig } from '@/service/api/systemManagement.api.ts'

const TabWebConfig = () => {
    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => getWebConfig(),
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Website Information</h5>
                </div>
            </div>

            <div className="row g-4 pt-2">
                <div className="col-md-6">
                    <div className="card card-body mb-0">
                        <HorizontalLoopDataLogic
                            list={[
                                objectListDetail(
                                    'Title',
                                    __detail.title || '-',
                                ),
                                objectListDetail(
                                    'Address',
                                    __detail.address || '-',
                                ),
                                objectListDetail(
                                    'Postal Code',
                                    __detail.postalCode || '-',
                                ),
                                objectListDetail(
                                    'Country',
                                    __detail?.country?.name || '-',
                                ),
                                objectListDetail(
                                    'Email',
                                    __detail.email || '-',
                                ),
                                objectListDetail('Fax', __detail.fax || '-'),
                                objectListDetail(
                                    'Map Embed',
                                    __detail.mapEmbed || '-',
                                ),
                                objectListDetail(
                                    'Phone',
                                    __detail.phone || '-',
                                ),
                                objectListDetail(
                                    'Whatsapp',
                                    __detail.whatsapp || '-',
                                ),
                                objectListDetail('Social Media', '-'),
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default TabWebConfig
