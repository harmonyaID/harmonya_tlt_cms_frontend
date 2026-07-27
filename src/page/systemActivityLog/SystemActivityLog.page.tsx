import TabDataTable from '@/common/dataFeature/tabDataTable/TabDataTable.tsx'
import Card from '@/component/card/Card.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import {
    TblLineFirst,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import LoadingSpinner from '@/component/loading/LoadingSpinner.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiStaff } from '@/service/api/staff.api.ts'
import { getLogActivity } from '@/service/api/systemManagement.api.ts'

const SystemActivityLogPage = () => {
    const ACTIVITY = 'Activity Log'

    const SETTING_ACTION = 'Setting Action'

    const SETTING_TYPE = 'Setting Type'

    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionUpdate,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: getLogActivity,
        advancedSearch: {
            page: 1,
            limit: 50,
            typeIds: [],
            categoryIds: [],
        },
    })

    return (
        <>
            <Card title={ACTIVITY}>
                {__isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="vstack gap-3">
                            {__list.map((vm, index) => {
                                return (
                                    <div
                                        className="card card-body border-neutral-500"
                                        key={index}>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <TblPointData title="Type">
                                                    <span className="badge text-bg-tint-400 fw-medium fs-12 text-capitalize">
                                                        {vm.type}
                                                    </span>
                                                </TblPointData>
                                            </div>
                                            <div className="col-md">
                                                <TblPointData
                                                    title="Description"
                                                    isUseDefaultMargin={false}>
                                                    <PreElement classNameFs="fs-12 fw-400">
                                                        {vm.description}
                                                    </PreElement>
                                                </TblPointData>
                                            </div>

                                            <div className="col-md-1">
                                                <TblPointData
                                                    title="Action"
                                                    classNameValue="text-capitalize"
                                                    value={vm.action}
                                                />
                                            </div>
                                            <div className="col-md-2">
                                                <TblPointData
                                                    title="Caused By Name"
                                                    value={
                                                        vm?.causedByName || '-'
                                                    }
                                                />
                                            </div>

                                            <div className="col-md-1">
                                                <TblPointData title="Created At">
                                                    {vm.createdAt}
                                                </TblPointData>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {isShowPagination(__isLoading, __list, __pagination) ? (
                            <Pagination
                                onMove={(step) => __actionPagination(step)}
                                className="mt-2"
                                pagination={configDefaultPagination(
                                    __pagination,
                                    'totalPage',
                                )}
                            />
                        ) : null}
                    </>
                )}

                {/*<TabDataTable*/}
                {/*    api={{ list: getLogActivity }}*/}
                {/*    ths={[*/}
                {/*        'Action',*/}
                {/*        'Description',*/}
                {/*        'Type',*/}
                {/*        'Caused By Name',*/}
                {/*        'Created At',*/}
                {/*    ]}*/}
                {/*    content={{*/}
                {/*        tr: (data) => {*/}
                {/*            return (*/}
                {/*                <tr key={data.key}>*/}
                {/*                    <td>*/}
                {/*                        <TblLineFirst className="text-capitalize">*/}
                {/*                            {data.action}*/}
                {/*                        </TblLineFirst>*/}
                {/*                    </td>*/}
                {/*                    <td>*/}
                {/*                        <TblLineSecond>*/}
                {/*                            {data.description}*/}
                {/*                        </TblLineSecond>*/}
                {/*                    </td>*/}
                {/*                    <td>*/}
                {/*                        <TblLineSecond>*/}
                {/*                            {data.type}*/}
                {/*                        </TblLineSecond>*/}
                {/*                    </td>*/}
                {/*                    <td>*/}
                {/*                        <TblLineSecond>*/}
                {/*                            {data.causedByName}*/}
                {/*                        </TblLineSecond>*/}
                {/*                    </td>*/}
                {/*                    <td>*/}
                {/*                        <TblLineSecond>*/}
                {/*                            {data.createdAt}*/}
                {/*                        </TblLineSecond>*/}
                {/*                    </td>*/}
                {/*                </tr>*/}
                {/*            )*/}
                {/*        },*/}
                {/*    }}*/}
                {/*/>*/}
            </Card>

            {/*<CardNavTab*/}
            {/*    tabs={[*/}
            {/*        objectTab(ACTIVITY, 'tabActivity'),*/}
            {/*        // objectTab(SETTING_ACTION, 'tabSettingAction'),*/}
            {/*        // objectTab(SETTING_TYPE, 'tabSettingType'),*/}
            {/*    ]}*/}
            {/*    tabContents={[*/}
            {/*        objectTabContent(*/}
            {/*            '',*/}
            {/*            <TabDataTable*/}
            {/*                title={ACTIVITY}*/}
            {/*                api={{ list: getLogActivity }}*/}
            {/*                ths={[*/}
            {/*                    'Action',*/}
            {/*                    'Description',*/}
            {/*                    'Type',*/}
            {/*                    'Caused By Name',*/}
            {/*                    'Created At',*/}
            {/*                ]}*/}
            {/*                content={{*/}
            {/*                    tr: (data) => {*/}
            {/*                        return (*/}
            {/*                            <tr key={data.key}>*/}
            {/*                                <td>*/}
            {/*                                    <TblLineFirst className="text-capitalize">*/}
            {/*                                        {data.action}*/}
            {/*                                    </TblLineFirst>*/}
            {/*                                </td>*/}
            {/*                                <td>*/}
            {/*                                    <TblLineSecond>*/}
            {/*                                        {data.description}*/}
            {/*                                    </TblLineSecond>*/}
            {/*                                </td>*/}
            {/*                                <td>*/}
            {/*                                    <TblLineSecond>*/}
            {/*                                        {data.type}*/}
            {/*                                    </TblLineSecond>*/}
            {/*                                </td>*/}
            {/*                                <td>*/}
            {/*                                    <TblLineSecond>*/}
            {/*                                        {data.causedByName}*/}
            {/*                                    </TblLineSecond>*/}
            {/*                                </td>*/}
            {/*                                <td>*/}
            {/*                                    <TblLineSecond>*/}
            {/*                                        {data.createdAt}*/}
            {/*                                    </TblLineSecond>*/}
            {/*                                </td>*/}
            {/*                            </tr>*/}
            {/*                        )*/}
            {/*                    },*/}
            {/*                }}*/}
            {/*            />,*/}
            {/*        ),*/}
            {/*        // objectTabContent(*/}
            {/*        //     '',*/}
            {/*        //     <TabDataTable*/}
            {/*        //         title={SETTING_ACTION}*/}
            {/*        //         api={{ list: getLogActivitySettingAction }}*/}
            {/*        //         ths={['Name', 'Code']}*/}
            {/*        //         content={{*/}
            {/*        //             tr: (data) => {*/}
            {/*        //                 return (*/}
            {/*        //                     <tr key={data.key}>*/}
            {/*        //                         <td>*/}
            {/*        //                             <TblLineFirst className="text-capitalize">*/}
            {/*        //                                 {data.name}*/}
            {/*        //                             </TblLineFirst>*/}
            {/*        //                         </td>*/}
            {/*        //                         <td>*/}
            {/*        //                             <TblLineSecond>*/}
            {/*        //                                 {data.code}*/}
            {/*        //                             </TblLineSecond>*/}
            {/*        //                         </td>*/}
            {/*        //                     </tr>*/}
            {/*        //                 )*/}
            {/*        //             },*/}
            {/*        //         }}*/}
            {/*        //     />,*/}
            {/*        // ),*/}
            {/*        // objectTabContent(*/}
            {/*        //     '',*/}
            {/*        //     <TabDataTable*/}
            {/*        //         title={SETTING_TYPE}*/}
            {/*        //         api={{ list: getLogActivitySettingType }}*/}
            {/*        //         ths={['Name', 'Code']}*/}
            {/*        //         isPagination={false}*/}
            {/*        //         content={{*/}
            {/*        //             tr: (data) => {*/}
            {/*        //                 return (*/}
            {/*        //                     <tr key={data.key}>*/}
            {/*        //                         <td>*/}
            {/*        //                             <TblLineFirst className="text-capitalize">*/}
            {/*        //                                 {data.name}*/}
            {/*        //                             </TblLineFirst>*/}
            {/*        //                         </td>*/}
            {/*        //                         <td>*/}
            {/*        //                             <TblLineSecond>*/}
            {/*        //                                 {data.code}*/}
            {/*        //                             </TblLineSecond>*/}
            {/*        //                         </td>*/}
            {/*        //                     </tr>*/}
            {/*        //                 )*/}
            {/*        //             },*/}
            {/*        //         }}*/}
            {/*        //     />,*/}
            {/*        // ),*/}
            {/*    ]}*/}
            {/*/>*/}
        </>
    )
}

export default SystemActivityLogPage
