import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import CardListData from '@/component/card/CardListData.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import { apiPropertyReviews } from '@/service/api/property.api.ts'
import ReviewRating from '@/common/misc/ReviewRating.tsx'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import { OCPropertyReviewDetail } from '@/config/offCanvas.config.ts'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import PreElement from '@/component/general/PreElement.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'

const PropertyReview = ({
    isDetailProperty = false,
    api = {
        list: (passSearch) => {},
    },
}: {
    isDetailProperty?: boolean
    api?: {
        list?: any
    }
}) => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: api.list,
        advancedSearch: {
            page: 1,
        },
    })

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralRemove, false),
        },
    })

    const {
        __data: dataForDetail,
        __handleChooseAndNextStep: _handleChooseDetail,
        __setData: _handleSetDataForDetail,
    } = useChooseData({
        action: {
            nextStep: () => actionOffCanvas(OCPropertyReviewDetail, false),
        },
    })

    return (
        <>
            <CardListData
                title="Property Reviews"
                // componentAction={
                //     <BtnPrimary onClick={() => __handleToAdd()}>
                //         Add New
                //     </BtnPrimary>
                // }
            >
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    isDateRange={false}
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <div className="row overflow-y position-relative">
                    <div className="col-md-12 table-responsive-md">
                        <TableThemeLogic
                            isLoading={__isLoading}
                            isNoWrap
                            ths={[
                                'Reviewer',
                                { content: 'Review', className: 'max-w-200px' },
                                'Rating',
                                'Status Active',
                                'Created At',
                            ]}
                            tds={__list}>
                            {__list.map((vm, index) => {
                                return (
                                    <tr
                                        key={index}
                                        title="Preview Detail"
                                        className="cursor-pointer"
                                        onClick={() => {
                                            _handleChooseDetail(vm)
                                        }}>
                                        <td>
                                            <TblLineFirstPrimary
                                                value={vm?.name || '-'}
                                                className="mb-1 fw-500"
                                                isUseDefaultMargin={false}
                                            />
                                        </td>
                                        <td>
                                            <PreElement>{vm.review}</PreElement>
                                        </td>
                                        <td>
                                            <ReviewRating
                                                rating={
                                                    vm.rating
                                                        ? Number(vm.rating)
                                                        : 0
                                                }
                                            />
                                        </td>

                                        <td>
                                            <TextTrueOrFalse
                                                value={vm.isActive}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {vm?.createdAt || '-'}
                                            </TblLineSecond>
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
                    id={MDGeneralRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiPropertyReviews.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <OffCanvasGeneral
                    id={OCPropertyReviewDetail}
                    title="Detailed Review"
                    width={580}
                    isCloseAnywhere>
                    <HorizontalLoopDataLogic
                        config={{
                            contentColumn: 'col-md-9',
                        }}
                        list={[
                            objectListDetail('Name', dataForDetail?.name || ''),
                            objectListDetail(
                                'Rating',
                                <ReviewRating
                                    rating={
                                        dataForDetail.rating
                                            ? Number(dataForDetail.rating)
                                            : 0
                                    }
                                />,
                            ),
                            objectListDetail(
                                'Status Active',
                                <TextTrueOrFalse
                                    value={dataForDetail.isActive}
                                />,
                            ),
                            objectListDetail(
                                'Created At',
                                dataForDetail?.createdAt || '',
                            ),
                            objectListDetail(
                                'Review',
                                dataForDetail?.review ? (
                                    <PreElement>
                                        {dataForDetail.review}
                                    </PreElement>
                                ) : (
                                    '-'
                                ),
                            ),
                        ]}
                    />
                </OffCanvasGeneral>
            </CreatePortalLayout>
        </>
    )
}

export default PropertyReview
