import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import useBoatInquiryMain from '@/common/dataFeature/boatInquiry/hook/useBoatInquiryMain.hook.ts'
import { apiBoatContactForm } from '@/service/api/boatManage.api.ts'
import { boatInquiryPath } from '@/path/boatInquiry.path.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import BoatInquiryTable from '@/common/dataFeature/boatInquiry/component/BoatInquiryTable.tsx'
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
import useBoatInquiryDetailOffCanvasHook from '@/common/dataFeature/boatInquiry/hook/useBoatInquiryDetailOffCanvas.hook.ts'
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
import BoatInquiryStatus from '@/common/dataFeature/boatInquiry/component/BoatInquiryStatus.tsx'

const BoatInquiryMainList = ({
    title,
    basePath,
}: {
    title: string
    basePath: any
}) => {
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
        basePath: basePath,
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
                                        'Name',
                                        __detail.name || '-',
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
                                        'Email',
                                        __detail.email || '-',
                                    ),
                                    objectListDetail(
                                        'Phone',
                                        __detail.phone || '-',
                                    ),
                                    objectListDetail(
                                        'Ticket Type',
                                        __detail.ticketType || '-',
                                    ),
                                    objectListDetail(
                                        'Bali Land Location',
                                        __detail.baliLandLocation || '-',
                                    ),
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
                                    objectListDetail(
                                        'Departure Date from Bali',
                                        `${__detail.departureDateFromBali} ${__detail.departureTimeFromBali}`,
                                    ),
                                    objectListDetail(
                                        'Pick Up Location Bali',
                                        __detail.pickUpLocationBali || '-',
                                    ),
                                    objectListDetail(
                                        'Flight Number',
                                        __detail.flightNumber || '-',
                                    ),
                                    objectListDetail(
                                        'Arrival Time',
                                        __detail.arrivalTime || '-',
                                    ),
                                    objectListDetail(
                                        'Hotel Name Bali',
                                        __detail.hotelNameBali || '-',
                                    ),
                                    objectListDetail(
                                        'Hotel Contact Bali',
                                        __detail.hotelContactBali || '-',
                                    ),
                                    objectListDetail(
                                        'Departure Date from Lembongan',
                                        `${__detail.departureDateFromLembongan} ${__detail.departureTimeFromLembongan}`,
                                    ),
                                    objectListDetail(
                                        'Drop Off Location Bali',
                                        __detail.dropOffLocationBali || '-',
                                    ),
                                    objectListDetail(
                                        'Flight Time',
                                        __detail.flightTime || '-',
                                    ),
                                    objectListDetail(
                                        'Hotel Name Lembongan',
                                        __detail.hotelNameLembongan || '-',
                                    ),
                                    objectListDetail(
                                        'Accommodation Lembongan',
                                        __detail.accommodationLembongan || '-',
                                    ),
                                    objectListDetail(
                                        'Passenger Names',
                                        __detail.passengerNames || '-',
                                    ),
                                    objectListDetail(
                                        'Has Surfboard',
                                        <TextTrueOrFalse
                                            value={__detail.hasSurfboard}
                                        />,
                                    ),
                                    objectListDetail(
                                        'Hear About Us',
                                        __detail.hearAboutUs || '-',
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
