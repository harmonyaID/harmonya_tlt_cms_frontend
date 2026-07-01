import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { getWebConfig } from '@/service/api/systemManagement.api.ts'
import CardListData from '@/component/card/CardListData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'

const SettingWebConfigPage = () => {
    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => getWebConfig(),
    })

    return (
        <>
            <CardListData title="Website Configuration">
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
                                    objectListDetail(
                                        'Fax',
                                        __detail.fax || '-',
                                    ),
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
            </CardListData>
        </>
    )
}

export default SettingWebConfigPage
