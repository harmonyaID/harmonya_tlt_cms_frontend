import { Fragment, useMemo } from 'react'
import { capitalize, isEmpty, upperCase } from 'lodash'
import Card from '@/component/card/Card.tsx'
import { AvatarInTable } from '@/component/general/Avatar.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { LOG_ACTION_BADGE, LOG_ACTION_ICON } from '@/config/systemActivityLog.config.ts'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { getLogActivity } from '@/service/api/systemManagement.api.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'

const SystemActivityLogPage = () => {
    const ACTIVITY = 'Activity Log'

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
                {__isLoading || isEmpty(__list) ? (
                    <LoadingNotAvailable isLoading={__isLoading} />
                ) : (
                    <>
                        <WrapFormContext formRequest={{}}>
                            <div className="row mb-2">
                                <div className="col-md-3">
                                    <FormInput
                                        placeholder="Search"
                                        name="search"
                                    />
                                </div>
                            </div>
                        </WrapFormContext>

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
                                                className="card card-body border-neutral-500"
                                                key={index + '_' + idx}>
                                                <div className="row">
                                                    <div className="col-auto">
                                                        <span
                                                            className={joinClassNameHelper(
                                                                'size-35 rounded-2 d-flex justify-content-center align-items-center',
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
                                                                        'w-fit-content badge rounded-1 fw-medium fs-12 text-capitalize',
                                                                        LOG_ACTION_BADGE[
                                                                            vm
                                                                                .action
                                                                        ],
                                                                    )}>
                                                                    {upperCase(
                                                                        vm.action,
                                                                    )}
                                                                </span>

                                                                <p className="m-0">
                                                                    {
                                                                        vm.createdAt
                                                                    }
                                                                </p>
                                                            </div>
                                                            <AvatarInTable
                                                                isSmall
                                                                title={
                                                                    vm?.causedByName ||
                                                                    '-'
                                                                }
                                                            />
                                                            <PreElement
                                                                classNameFs="fs-12 fw-400"
                                                                className="bg-neutral-600">
                                                                <span className="fw-bold text-capitalize">
                                                                    {vm.type.replaceAll(
                                                                        '_',
                                                                        ' ',
                                                                    )}
                                                                    :
                                                                </span>{' '}
                                                                {vm.description}
                                                            </PreElement>
                                                        </div>
                                                    </div>

                                                    {/*<div className="col-md-1">*/}
                                                    {/*    <TblPointData*/}
                                                    {/*        title="Action"*/}
                                                    {/*        classNameValue="text-capitalize"*/}
                                                    {/*        value={vm.action}*/}
                                                    {/*    />*/}
                                                    {/*</div>*/}
                                                    {/*<div className="col-md-2">*/}
                                                    {/*    <TblPointData*/}
                                                    {/*        title="Caused By Name"*/}
                                                    {/*        value={*/}
                                                    {/*            vm?.causedByName ||*/}
                                                    {/*            '-'*/}
                                                    {/*        }*/}
                                                    {/*    />*/}
                                                    {/*</div>*/}

                                                    {/*<div className="col-md-1">*/}
                                                    {/*    <TblPointData title="Created At">*/}
                                                    {/*       */}
                                                    {/*    </TblPointData>*/}
                                                    {/*</div>*/}
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
