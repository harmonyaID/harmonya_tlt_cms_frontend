import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import {
    BtnDanger,
} from '@/component/general/Button.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import { MDExCategoryRemove } from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import { OCGeneralPreviewDetail } from '@/config/offCanvas.config.ts'
import {
    formatDateByTlt,
    formatDateTimeByTlt,
} from '@/helper/actionFormatDate.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { viewData } from '@/helper/condition.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useExpInquiryDetailOffCanvas from '@/page/experienceInquiryForm/hook/useExpInquiryDetailOffCanvas.hook.ts'
import useExpInquiryMainHook from '@/page/experienceInquiryForm/hook/useExpInquiryMain.hook.ts'
import { apiExpInquiryForm } from '@/service/api/contentManage.api.ts'
import ExpInquiryFormTable from '@/page/experienceInquiryForm/component/ExpInquiryFormTable.tsx'

const ExpInquiryFormPage = () => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,

        __handleToTrash,
    } = useExpInquiryMainHook({ urlAPI: apiExpInquiryForm.list })

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleCloseDetail,
    } = useExpInquiryDetailOffCanvas()

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDExCategoryRemove, false),
        },
    })

    return (
        <>
            <CardListData
                title="Inquiry Form">
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <ExpInquiryFormTable
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __handleChooseRemove: _handleChooseRemove,
                        __actionPagination: __actionPagination,
                        __handleChooseDetail: __handleChooseDetail,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDExCategoryRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiExpInquiryForm.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <OffCanvasGeneral
                    id={OCGeneralPreviewDetail}
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
                                        viewData(__detail?.fullName),
                                    ),
                                    objectListDetail(
                                        'Experience',
                                        viewData(__detail?.experience?.name),
                                    ),
                                    objectListDetail(
                                        'Phone',
                                        viewData(__detail?.phone),
                                    ),
                                    objectListDetail(
                                        'Email',
                                        viewData(__detail?.email),
                                    ),
                                    objectListDetail(
                                        'Total Guests',
                                        viewData(
                                            __detail?.totalGuests.toString(),
                                        ),
                                    ),
                                    objectListDetail(
                                        'Event Date',
                                        viewData(
                                            formatDateByTlt(
                                                __detail?.eventDate,
                                            ),
                                        ),
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

                                    objectListDetail(
                                        'Country Of Residence',
                                        <PreElement>
                                            {viewData(
                                                __detail?.countryOfResidence,
                                            )}
                                        </PreElement>,
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

export default ExpInquiryFormPage
