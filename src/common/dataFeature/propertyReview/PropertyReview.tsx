import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import ReviewRating from '@/common/misc/ReviewRating.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove, BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import { OCPropertyReviewDetail } from '@/config/offCanvas.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import {
    apiPropertyReviews,
    permanentDeleteProperty, permanentDeletePropertyReviews,
    restoreProperty, restorePropertyReviews,
} from '@/service/api/property.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'
import { useEffect, useState } from 'react'
import TrashActionButtons from '@/common/dataFeature/trash/TrashActionButtons.tsx'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'

const PropertyReview = ({
    title="Property Reviews",
    isDetailProperty = false,
    isTab = false,
    isTrash = false,
    api = {
        list: (passSearch) => {},
        trash: (passSearch) => {},
        main: (passSearch) => {},
    },
    actions = {
        main: () => {},
        add: () => {},
        edit: () => {},
        trash: () => {},
    },
}: {
    title?: string
    isDetailProperty?: boolean
    isTab?: boolean
    isTrash?: boolean
    api?: {
        list?: any
        trash?: any
        main?: any
    }
    actions?: {
        main?: () => void
        add?: () => void
        edit?: (pass?: any) => void
        trash?: () => void

    }
}) => {
    const [isShowTrash, setShowTrash] = useState(false)
    const [urlAPI, setUrlAPI] = useState(
        isTrash ? () => api.trash : () => api.list)

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
        urlAPI: urlAPI,
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

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restorePropertyReviews,
        urlAPIPermanentRemove: permanentDeletePropertyReviews,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    const _handleToTrash = () => {
        if(isTab){
            setShowTrash(true)
            setUrlAPI(() => api.trash)
            return
        }

        actions.trash()
    }

    const _handleBack = () => {
        if(isTab){
            setShowTrash(false)
            setUrlAPI(() => api.list)
            return
        }

        actions.main()
    }

    useEffect(() => {
        __actionPagination(1)
    }, [isShowTrash])

    return (
        <>
            <CardListData
                title={title}
                className={isDetailProperty ? 'p-0' : ''}
                componentAction={
                    isTrash || isShowTrash ? (
                        <BtnPrimary isOutline handle={() => _handleBack()}>
                            Back
                        </BtnPrimary>
                    ) : (
                        <div className="hstack gap-2">
                            <BtnDanger
                                isOutline
                                handle={() => _handleToTrash()}>
                                Trash
                            </BtnDanger>
                            <BtnPrimary onClick={() => actions.add()}>
                                Add New
                            </BtnPrimary>
                        </div>
                    )
                }>
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
                                '',
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
                                            {/*<TblLineSecond value={vm.rating} />*/}
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
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
                                                {isTrash || isShowTrash ? (
                                                    <TrashActionButtons
                                                        selected={vm}
                                                        actions={{
                                                            restore:
                                                                __handleChooseRestore,
                                                            permanentRemove:
                                                                __handleChoosePermanentRemove,
                                                        }}
                                                    />
                                                ) : (
                                                    <>
                                                        <BtnCircleRemove
                                                            actions={{
                                                                remove: (e) => {
                                                                    e.stopPropagation()
                                                                    _handleChooseRemove(
                                                                        vm,
                                                                    )
                                                                },
                                                            }}
                                                        />

                                                        <BtnCircleEdit
                                                            title="Edit Data"
                                                            actions={{
                                                                edit: (e) => {
                                                                    e.stopPropagation()
                                                                    actions.edit(
                                                                        vm.id,
                                                                    )
                                                                },
                                                            }}
                                                        />
                                                    </>
                                                )}
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

                <TrashConfirmModals
                    name={__dataRestore?.name || __dataPermanentRemove?.name}
                    isLoading={__isLoadingTrash}
                    actions={{
                        handleRestore: __handleRestore,
                        handlePermanentRemove: __handlePermanentRemove,
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default PropertyReview
