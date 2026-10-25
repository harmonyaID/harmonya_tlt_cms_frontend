import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import useBoatInquiryMain from '@/page/boatInquiry/hook/useBoatInquiryMain.hook.ts'
import { apiBoatContactForm } from '@/service/api/boatManage.api.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import BoatInquiryTable from '@/page/boatInquiry/component/BoatInquiryTable.tsx'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import {
    MDBoatInquiryRead,
    MDBoatInquiryUpdateStatus,
    MDGeneralRemove,
} from '@/config/modal.config.ts'
import useIslandGuideAreaDetailOffCanvasHook from '@/page/islandGuideArea/hook/useIslandGuideAreaDetailOffCanvas.hook.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiIslandGuideArea } from '@/service/api/contentManageSetting.api.ts'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import useBoatInquiryDetailOffCanvasHook from '@/page/boatInquiry/hook/useBoatInquiryDetailOffCanvas.hook.ts'
import { OCGeneralPreviewDetail } from '@/config/offCanvas.config.ts'
import { isEmpty } from 'lodash'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import ModalConfirm from '@/component/modal/ModalConfirm.tsx'
import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { TextIconLoading } from '@/component/general/TextDefault.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import BoatInquiryStatus from '@/page/boatInquiry/component/BoatInquiryStatus.tsx'

const BoatInquiryMainList = ({ title }: { title: string }) => {
    const {
        __list,
        __handleToAdd,
        __actionChange,
        __search,
        __actionPagination,
        __pagination,
        __isLoading,
        __actionRemove,
        __actionClear,
        __handleConfirmUpdateStatus,
        __handleUpdateStatus,
        __handleConfirmRead,
        __handleRead,
        __handleChangeStatus,
        __isLoadingUpdate,
        __formRequestStatus,
    } = useBoatInquiryMain({
        urlAPI: apiBoatContactForm.list,
    })

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = useBoatInquiryDetailOffCanvasHook()

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralRemove, false),
        },
    })

    return (
        <>
            <CardListData
                title={title}
                componentAction={
                    <div className="hstack gap-2">
                        <BtnPrimary onClick={() => __handleToAdd()}>
                            Add New
                        </BtnPrimary>
                    </div>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    // isDateRange
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <BoatInquiryTable
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __handleChooseRemove: _handleChooseRemove,
                        __actionPagination: __actionPagination,
                        __handleChooseDetail: __handleChooseDetail,
                        __handleUpdateStatus: __handleConfirmUpdateStatus,
                        __handleRead: __handleConfirmRead,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDGeneralRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiBoatContactForm.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalConfirm
                    id={MDBoatInquiryRead}
                    title="Read Inquiry"
                    titleButton="Read"
                    isLoading={__isLoadingUpdate}
                    actions={{
                        handleSubmit: __handleRead,
                        handleCancel: () => {
                            actionModal(MDBoatInquiryRead, true)
                        },
                    }}>
                    <p>Are you sure to mark this inquiry as Read?</p>
                </ModalConfirm>

                <ModalMiddle
                    id={MDBoatInquiryUpdateStatus}
                    title="Update Status">
                    <FormWrap
                        actions={{
                            handleSubmit: __handleUpdateStatus,
                        }}>
                        <WrapFormContext
                            formRequest={__formRequestStatus}
                            actions={{ change: __handleChangeStatus }}>
                            <FormRadioButtonMulti
                                name="statusId"
                                checkBoxs={[
                                    {
                                        defaultValue: 1,
                                        label: 'Pending',
                                    },
                                    {
                                        defaultValue: 2,
                                        label: 'Follow Up',
                                    },
                                    {
                                        defaultValue: 3,
                                        label: 'Closed',
                                    },
                                ]}
                            />
                        </WrapFormContext>

                        <div className="row">
                            <div className="col-md-12">
                                <BtnPrimary
                                    isOutline
                                    disabled={__isLoadingUpdate}
                                    handle={() =>
                                        actionModal(
                                            MDBoatInquiryUpdateStatus,
                                            true,
                                        )
                                    }
                                    className="btn-sm me-2">
                                    Cancel
                                </BtnPrimary>

                                <BtnPrimary
                                    type="submit"
                                    disabled={__isLoadingUpdate}
                                    className="btn-sm">
                                    <TextIconLoading
                                        name="Update"
                                        isAction={__isLoadingUpdate}
                                    />
                                </BtnPrimary>
                            </div>
                        </div>
                    </FormWrap>
                </ModalMiddle>

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
                                        'Boat',
                                        __detail.boat?.name || '-',
                                    ),
                                    objectListDetail(
                                        'Ticket Type',
                                        __detail.ticketType || '-',
                                    ),
                                    objectListDetail(
                                        'Status',
                                        <BoatInquiryStatus
                                            status={__detail?.status}
                                        />,
                                    ),
                                    objectListDetail(
                                        'Read',
                                        <TextTrueOrFalse
                                            value={__detail?.isRead}
                                        />,
                                    ),
                                    objectListDetail(
                                        'Departure Date',
                                        __detail.departureDate || '-',
                                    ),
                                    objectListDetail(
                                        'Departure Time',
                                        __detail.departureTime || '-',
                                    ),
                                    objectListDetail(
                                        'Return Date',
                                        __detail.returnDate || '-',
                                    ),
                                    objectListDetail(
                                        'Return Time',
                                        __detail.returnTime || '-',
                                    ),
                                    objectListDetail(
                                        'Adult Count',
                                        __detail.adultCount || '-',
                                    ),
                                    objectListDetail(
                                        'Child Count',
                                        __detail.childCount || '-',
                                    ),
                                    objectListDetail(
                                        'Infant Count',
                                        __detail.infantCount || '-',
                                    ),

                                    objectListDetail('', null),

                                    objectListDetail(
                                        'Name',
                                        __detail.name || '-',
                                    ),
                                    objectListDetail(
                                        'Email',
                                        __detail.email || '-',
                                    ),
                                    objectListDetail(
                                        'Phone',
                                        __detail.phone || '-',
                                    ),

                                    objectListDetail('', null),

                                    objectListDetail(
                                        'Need Land Transport',
                                        <TextTrueOrFalse
                                            value={
                                                __detail.needLandTransport ||
                                                '-'
                                            }
                                        />,
                                    ),
                                    objectListDetail(
                                        'Departure Pickup Point',
                                        __detail.departurePickupPoint || '-',
                                    ),
                                    objectListDetail(
                                        'Flight Number',
                                        __detail.departurePickupFlightNumber ||
                                            '-',
                                    ),
                                    objectListDetail(
                                        'Arrival Time',
                                        __detail.departurePickupArrivalTime ||
                                            '-',
                                    ),
                                    objectListDetail(
                                        'Departure Drop Off Point',
                                        __detail.departureDropOffPoint || '-',
                                    ),
                                    objectListDetail(
                                        'Departure Drop Off Location',
                                        __detail.departureDropOffLocation ||
                                            '-',
                                    ),
                                    objectListDetail(
                                        'Arrival Time',
                                        __detail.departureDropArrivalTime ||
                                            '-',
                                    ),
                                    objectListDetail(
                                        'Return Pickup Point',
                                        __detail.returnPickupPoint || '-',
                                    ),
                                    objectListDetail(
                                        'Return Pickup Location',
                                        __detail.returnPickupLocation || '-',
                                    ),
                                    objectListDetail(
                                        'Checkout Time',
                                        __detail.returnPickupCheckoutTime ||
                                            '-',
                                    ),
                                    objectListDetail(
                                        'Return Drop Off Point',
                                        __detail.returnDropOffPoint || '-',
                                    ),
                                    objectListDetail(
                                        'Return Drop Off Location',
                                        __detail.returnDropOffLocation || '-',
                                    ),

                                    objectListDetail('', null),

                                    objectListDetail(
                                        'Booked Through TLT',
                                        <TextTrueOrFalse
                                            value={
                                                __detail.bookedThroughTlt || '-'
                                            }
                                        />,
                                    ),
                                    objectListDetail(
                                        'TLT Booking Ref Name',
                                        __detail.tltBookingRefName || '-',
                                    ),

                                    objectListDetail(
                                        'Has Surfboard',
                                        <TextTrueOrFalse
                                            value={__detail.hasSurfboard}
                                        />,
                                    ),
                                    objectListDetail(
                                        'Message',
                                        __detail.message || '-',
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

export default BoatInquiryMainList
