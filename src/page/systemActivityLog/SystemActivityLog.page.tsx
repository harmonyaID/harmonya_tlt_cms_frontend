import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { getWebConfig } from '@/service/api/systemManagement.api.ts'
import CardListData from '@/component/card/CardListData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'

const SystemActivityLogPage = () => {
    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => getWebConfig(),
    })

    return (
        <>
            <CardListData title="Activity Log">
                <h5 className="">Coming Soon</h5>
                {/*<div className="row g-4">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <div className="card card-body mb-0">*/}
                {/*            <HorizontalLoopDataLogic*/}
                {/*                list={[*/}
                {/*                    objectListDetail(*/}
                {/*                        'Title',*/}
                {/*                        __detail.title || '-',*/}
                {/*                    ),*/}
                {/*                    objectListDetail(*/}
                {/*                        'Email',*/}
                {/*                        __detail.email || '-',*/}
                {/*                    ),*/}
                {/*                    objectListDetail(*/}
                {/*                        'Phone',*/}
                {/*                        __detail.phone || '-',*/}
                {/*                    ),*/}
                {/*                    objectListDetail(*/}
                {/*                        'Fax',*/}
                {/*                        __detail.fax || '-',*/}
                {/*                    ),*/}
                {/*                    objectListDetail(*/}
                {/*                        'Whatsapp',*/}
                {/*                        __detail.whatsapp || '-',*/}
                {/*                    ),*/}
                {/*                ]}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </CardListData>
        </>
    )
}

export default SystemActivityLogPage
