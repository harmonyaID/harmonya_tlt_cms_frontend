import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import {
    BtnCircleDetail,
    BtnCircleRemove,
} from '@/component/general/Button.tsx'
import HyperLink from '@/component/general/HyperLink.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import { MDExCategoryRemove } from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import { OCPropertyInquiryDetail } from '@/config/offCanvas.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import {
    formatDateByTlt,
    formatDateTimeByTlt,
} from '@/helper/actionFormatDate.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { viewData } from '@/helper/condition.helper.ts'
import usePropertyInquiryMainHook from '@/page/propertyInquiry/hook/usePropertyInquiryMain.hook.ts'
import propertyPath from '@/path/property.path.ts'
import { apiPropertyInquiryCRUD } from '@/service/api/property.api.ts'
import currencyHelper from '@/helper/currency.helper.ts'

const PropertyInquiryPage = () => {
    const {
        // List
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,

        // Remove
        __dataForRemove,
        __handleChooseRemove,
        __handleSetDataForRemove,

        // Detail
        __detail,
        __isLoadingDetail,
        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = usePropertyInquiryMainHook()

    return (
        <>
            <CardListData title="Property Inquiry">
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <div className="row overflow-y position-relative">
                    <div className="col-md-12">
                        <TableThemeLogic
                            isLoading={__isLoading}
                            isNoWrap
                            ths={[
                                'Full Name',
                                'Email',
                                'Phone',
                                'Date',
                                'Total Guest',
                                'Status',
                                'Created',
                                '',
                            ]}
                            tds={__list}>
                            {__list.map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <TblLineFirstPrimary
                                                value={vm?.name || ''}
                                            />
                                            <TblPointData title="Property">
                                                {vm?.property?.nickname ? (
                                                    <HyperLink
                                                        isOpenNewTab
                                                        className="fs-13"
                                                        url={propertyPath.detail(
                                                            vm.property.id ||
                                                                '#',
                                                        )}>
                                                        {vm.property.nickname}
                                                    </HyperLink>
                                                ) : (
                                                    '-'
                                                )}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TblLineSecond
                                                value={vm?.email || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond
                                                value={vm?.mobileNumber || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {formatDateByTlt(
                                                    vm?.checkInDate,
                                                )}{' '}
                                                -{' '}
                                                {formatDateByTlt(
                                                    vm?.checkOutDate,
                                                )}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.adultCount}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            {vm?.status?.name ? (
                                                <BadgeStatusGeneral
                                                    value={vm?.status.name}
                                                    className="bg-neutral-300"
                                                    inTable
                                                />
                                            ) : (
                                                '-'
                                            )}
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {formatDateTimeByTlt(
                                                    vm?.createdAt,
                                                )}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
                                                <BtnCircleRemove
                                                    actions={{
                                                        remove: (e) => {
                                                            e.stopPropagation()
                                                            __handleChooseRemove(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />

                                                {/*<BtnCircleEdit*/}
                                                {/*    title="Edit Data"*/}
                                                {/*    actions={{*/}
                                                {/*        edit: (e) => {*/}
                                                {/*            e.stopPropagation()*/}
                                                {/*            __handleToEdit(*/}
                                                {/*                vm.id,*/}
                                                {/*            )*/}
                                                {/*        },*/}
                                                {/*    }}*/}
                                                {/*/>*/}

                                                <BtnCircleDetail
                                                    actions={{
                                                        onClick: (e) => {
                                                            e.stopPropagation()
                                                            __handleChooseDetail(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </TableThemeLogic>
                    </div>
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
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDExCategoryRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiPropertyInquiryCRUD.delete(__dataForRemove.id),
                        callBack: () => {
                            __actionRemove(__dataForRemove.id)
                        },
                        emptySelect: () => {
                            __handleSetDataForRemove({})
                        },
                    }}
                />

                <OffCanvasGeneral
                    id={OCPropertyInquiryDetail}
                    title="Detail Information"
                    width="600px"
                    closeAction={() => __handleCloseDetail()}
                    isCloseAnywhere>
                    {__isLoadingDetail || isEmpty(__detail) ? (
                        <LoadingNotAvailable isLoading={__isLoadingDetail} />
                    ) : (
                        <div className="vstack gap-4">
                            <HorizontalLoopDataLogic
                                list={[
                                    objectListDetail(
                                        'Full Name',
                                        viewData(__detail?.name),
                                    ),
                                    objectListDetail(
                                        'Checkin Date',
                                        formatDateByTlt(__detail?.checkInDate),
                                    ),
                                    objectListDetail(
                                        'Checkout Date',
                                        formatDateByTlt(__detail?.checkOutDate),
                                    ),
                                    objectListDetail(
                                        'Phone',
                                        viewData(__detail?.mobileNumber),
                                    ),
                                    objectListDetail(
                                        'Email',
                                        viewData(__detail?.email),
                                    ),
                                    objectListDetail(
                                        'Guest',
                                        __detail?.adultCount,
                                    ),
                                    objectListDetail(
                                        'Total',
                                        viewData(__detail?.quote?.total),
                                    ),
                                    objectListDetail(
                                        'Status',
                                        __detail?.status?.name ? (
                                            <BadgeStatusGeneral
                                                value={__detail?.status.name}
                                                className="bg-neutral-300"
                                                inTable
                                            />
                                        ) : (
                                            '-'
                                        ),
                                    ),

                                    objectListDetail(
                                        'Created At',
                                        formatDateTimeByTlt(__detail.createdAt),
                                    ),
                                ]}
                            />
                        </div>
                    )}
                </OffCanvasGeneral>
            </CreatePortalLayout>
        </>
    )
}

export default PropertyInquiryPage
