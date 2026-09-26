import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import { MDExCategoryRemove } from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import { OCGeneralPreviewDetail } from '@/config/offCanvas.config.ts'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useExAreaDetailOffCanvasHook from '@/page/experienceArea/hook/useExAreaDetailOffCanvas.hook.ts'
import useExperienceAreaMain from '@/page/experienceArea/hook/useExpAreaMain.hook.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'
import ExperienceAreaTable from '@/page/experienceArea/component/ExperienceAreaTable.tsx'

const ExperienceAreaPage = () => {
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
        __handleToTrash,
    } = useExperienceAreaMain({ urlAPI: apiExperienceArea.list })

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = useExAreaDetailOffCanvasHook()

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
                title="Area"
                componentAction={
                    <div className="hstack gap-2">
                        <BtnDanger isOutline handle={() => __handleToTrash()}>
                            Trash
                        </BtnDanger>
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

                <ExperienceAreaTable
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __handleChooseRemove: _handleChooseRemove,
                        __actionPagination: __actionPagination,
                        __handleChooseDetail: __handleChooseDetail,
                        __handleToEdit: __handleToEdit,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDExCategoryRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiExperienceArea.delete(dataForRemove.id),
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
                    width="700px"
                    closeAction={() => __handleCloseDetail()}
                    isCloseAnywhere>
                    {__isLoadingDetail || isEmpty(__detail) ? (
                        <LoadingNotAvailable isLoading={__isLoadingDetail} />
                    ) : (
                        <div className="vstack gap-4">
                            <HorizontalLoopDataLogic
                                list={[
                                    objectListDetail('Name', __detail.name),
                                    objectListDetail(
                                        'Type',
                                        __detail?.type?.name || '-',
                                    ),
                                    objectListDetail(
                                        'Properties',
                                        __detail?.properties?.length > 0 ? (
                                            <ul className="p-0">
                                                {__detail?.properties?.map(
                                                    (vm) => (
                                                        <li key={vm.id}>
                                                            {vm.nickname}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                    objectListDetail(
                                        'Blogs',
                                        __detail?.blogs?.length > 0 ? (
                                            <ul className="p-0">
                                                {__detail?.blogs?.map((vm) => (
                                                    <li key={vm.id}>
                                                        {vm.title}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                    objectListDetail(
                                        'Experience Section 1',
                                        __detail?.experienceSection1?.length >
                                            0 ? (
                                            <ul className="p-0">
                                                {__detail?.experienceSection1?.map(
                                                    (vm) => (
                                                        <li key={vm.id}>
                                                            {vm.name}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                    objectListDetail(
                                        'Experience Section 2',
                                        __detail?.experienceSection2?.length >
                                            0 ? (
                                            <ul className="p-0">
                                                {__detail?.experienceSection2?.map(
                                                    (vm) => (
                                                        <li key={vm.id}>
                                                            {vm.name}
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                    objectListDetail(
                                        'Custom Informations',
                                        __detail?.customInformations?.length ? (
                                            <div className="pb-3 pt-4">
                                                <h5 className="fs-16 fw-500">
                                                    Custom Information
                                                </h5>

                                                <div className="vstack gap-3">
                                                    {__detail.customInformations.map(
                                                        (group, index) => {
                                                            return (
                                                                <>
                                                                    <p className="mb-1">
                                                                        {
                                                                            group.name
                                                                        }
                                                                    </p>
                                                                    {group?.customInformations?.map(
                                                                        (
                                                                            info,
                                                                        ) => (
                                                                            <div
                                                                                className="hstack gap-3 align-items-start pb-1 border-bottom border-neutral-500"
                                                                                key={
                                                                                    index
                                                                                }>
                                                                                <div className="fs-13">
                                                                                    {
                                                                                        info.order
                                                                                    }

                                                                                    .
                                                                                </div>
                                                                                <div className="w-100">
                                                                                    <label className="fs-12 text-neutral-300 pb-2">
                                                                                        {
                                                                                            info.name
                                                                                        }
                                                                                    </label>
                                                                                    <p className="fs-14 text-neutral-100 fw-semibold mb-0">
                                                                                        {
                                                                                            info.value
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        ),
                                                                    )}
                                                                </>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </div>
                                        ) : null,
                                    ),
                                    objectTabContent(
                                        'Featured Image',
                                        __detail?.featuredImage ? (
                                            <PreviewFileModalLogic
                                                dataUrl={__detail?.featuredImage?.toString()}
                                                dataBy="file"
                                                dataFile={
                                                    __detail?.featuredImage
                                                }
                                                classNameWidth="w-100 max-h-120-px Pmax-h-148px"
                                            />
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                    objectTabContent(
                                        'Banner',
                                        __detail?.banner ? (
                                            <PreviewFileModalLogic
                                                dataUrl={__detail?.banner?.toString()}
                                                dataBy="file"
                                                dataFile={__detail?.banner}
                                                classNameWidth="w-100 max-h-120-px Pmax-h-148px"
                                            />
                                        ) : (
                                            '-'
                                        ),
                                    ),

                                    objectTabContent(
                                        'Map Image',
                                        __detail?.mapImage ? (
                                            <PreviewFileModalLogic
                                                dataUrl={__detail?.mapImage?.toString()}
                                                dataBy="file"
                                                dataFile={__detail?.mapImage}
                                                classNameWidth="w-100 max-h-120-px Pmax-h-148px"
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
                                        'Description',
                                        __detail.description ? (
                                            <RenderHtml
                                                className="bg-neutral-500 py-2 px-3 rounded-2 text-break"
                                                html={__detail.description}
                                            />
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                ]}
                            />

                            <SectionPreviewSEOInformation
                                seo={__detail?.seo || {}}
                                classNameColumn="col-md-12"
                            />
                        </div>
                    )}
                </OffCanvasGeneral>
            </CreatePortalLayout>
        </>
    )
}

export default ExperienceAreaPage
