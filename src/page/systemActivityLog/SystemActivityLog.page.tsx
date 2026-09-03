import { Fragment, useMemo, useState } from 'react'
import { capitalize, isEmpty, upperCase } from 'lodash'
import Card from '@/component/card/Card.tsx'
import { AvatarInTable } from '@/component/general/Avatar.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { LOG_ACTION_BADGE, LOG_ACTION_ICON } from '@/config/systemActivityLog.config.ts'
import { actionFormatDateStrict, oneTypeFormatDate } from '@/helper/actionFormatDate.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { getLogActivity } from '@/service/api/systemManagement.api.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import SelectOptionRows from '@/common/dataForm/SelectOptionRows.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'

const SystemActivityLogPage = () => {
    const ACTIVITY = 'Activity Log'

    const [formRequest, setFormRequest] = useState({
        page: 1,
        limit: 50,
        typeIds: [],
        categoryIds: [],
    })

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
        advancedSearch: { ...formRequest },
    })

    const grouped = useMemo(() => {
        return Object.values(
            __list.reduce((acc, log) => {
                const date = log.createdAt.split(' ')[0]

                if (!acc[date]) {
                    acc[date] = {
                        date: upperCase(actionFormatDateStrict(date, 'dddd, D MMMM YYYY')),
                        logs: [],
                    }
                }

                acc[date].logs.push(log)

                return acc
            }, {}),
        )
    }, [__list])

    return (
        <>
            <Card title={ACTIVITY}>
                <div className="mb-3">
                    <FilterBarBasic
                        formRequest={__search}
                        searchTextPlaceholder="e.g D'Stars Fast Ferry"
                        isDateRange={false}
                        actions={{
                            change: __actionChange,
                            pagination: __actionPagination,
                            clear: __actionClear,
                        }}>
                        <div className="col-md-2">
                            <SelectOptionRows
                                name="limit"
                                label="Rows"
                                className="mb-0"
                            />
                        </div>
                    </FilterBarBasic>
                </div>

                {__isLoading || isEmpty(__list) ? (
                    <LoadingNotAvailable isLoading={__isLoading} />
                ) : (
                    <>
                        {grouped.map((log: any, index) => (
                            <Fragment key={index}>
                                <p className="fw-medium text-neutral-300 fs-13">
                                    {log.date}
                                </p>

                                <div className="vstack gap-3 pb-2">
                                    {log.logs.map((vm, idx) => {
                                        const Icon = LOG_ACTION_ICON[vm.action]

                                        return (
                                            <div
                                                className="card card-body border-0 shadow-subtle"
                                                key={index + '_' + idx}>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <span
                                                            className={joinClassNameHelper(
                                                                'size-35 rounded-3 d-flex justify-content-center align-items-center',
                                                                LOG_ACTION_BADGE[
                                                                    vm.action
                                                                ],
                                                            )}>
                                                            <Icon
                                                                variant="Bulk"
                                                                size={20}
                                                            />
                                                        </span>
                                                    </div>
                                                    <div className="col-md">
                                                        <div className="vstack gap-2">
                                                            <div className="d-flex justify-content-between align-items-start">
                                                                <span
                                                                    className={joinClassNameHelper(
                                                                        'w-fit-content badge rounded-2 fw-bold fs-12 text-capitalize',
                                                                        LOG_ACTION_BADGE[
                                                                            vm
                                                                                .action
                                                                        ],
                                                                    )}>
                                                                    {upperCase(
                                                                        vm.action,
                                                                    )}
                                                                </span>

                                                                <AvatarInTable
                                                                    isSmall
                                                                    title={
                                                                        vm?.causedByName ||
                                                                        '-'
                                                                    }
                                                                    subTitle={
                                                                        vm?.createdAt ? oneTypeFormatDate(vm.createdAt, 'D MMMM YYYY') :
                                                                        '-'
                                                                    }
                                                                />
                                                            </div>
                                                            <PreElement
                                                                classNameFs="fs-12 fw-400"
                                                                className="bg-neutral-600">
                                                                <p className="mb-2 text-neutral-400 text-capitalize">
                                                                    {vm.type.replaceAll(
                                                                        '_',
                                                                        ' ',
                                                                    )}
                                                                </p>
                                                                {vm.description}
                                                            </PreElement>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <hr className="border-neutral-400" />
                            </Fragment>
                        ))}

                        {isShowPagination(__isLoading, __list, __pagination) ? (
                            <Pagination
                                onMove={(step) => __actionPagination(step)}
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
