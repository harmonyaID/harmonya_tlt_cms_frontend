import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import HyperLink from '@/component/general/HyperLink.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
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
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import { OCGeneralPreviewDetail } from '@/config/offCanvas.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import {
    formatDateByTlt,
    formatDateTimeByTlt,
} from '@/helper/actionFormatDate.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { viewData } from '@/helper/condition.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useExpInquiryDetailOffCanvas from '@/page/experienceInquiryForm/hook/useExpInquiryDetailOffCanvas.hook.ts'
import useExpInquiryMainHook from '@/page/experienceInquiryForm/hook/useExpInquiryMain.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import { apiExpInquiryForm } from '@/service/api/contentManage.api.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'

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

        __handleToAdd,
        __handleToEdit,
    } = useExpInquiryMainHook()

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
                title="Inquiry Form"
                // componentAction={
                //     <BtnPrimary onClick={() => __handleToAdd()}>
                //         Add New
                //     </BtnPrimary>
                // }
            >
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
                                'Event Date',
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
                                                value={vm?.fullName || ''}
                                            />
                                            <TblPointData title="Experience">
                                                {vm?.experience?.name ? (
                                                    <HyperLink
                                                        isOpenNewTab
                                                        className="fs-13"
                                                        url={contentExperiencePath.detail(
                                                            vm.experience.id ||
                                                                '#',
                                                        )}>
                                                        {vm.experience.name}
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
                                                value={vm?.phone || '-'}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {formatDateByTlt(vm?.eventDate)}
                                            </TblLineSecond>
                                        </td>
                                        <td>
                                            <TblLineSecond>
                                                {viewData(
                                                    vm?.totalGuests.toString(),
                                                )}
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
                                                            _handleChooseRemove(
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
