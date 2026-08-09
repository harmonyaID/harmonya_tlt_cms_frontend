import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import { BoxImage } from '@/component/general/Image.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import { MDExCategoryRemove } from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import { OCGeneralPreviewDetail } from '@/config/offCanvas.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useExpTypeDetailOffCanvasHook from '@/page/experienceType/hook/useExpTypeDetailOffCanvas.hook.ts'
import useExpTypeMainHook from '@/page/experienceType/hook/useExpTypeMain.hook.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'

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
    } = useExpTypeMainHook()

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = useExpTypeDetailOffCanvasHook()

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
                title="Type"
                componentAction={
                    <BtnPrimary onClick={() => __handleToAdd()}>
                        Add New
                    </BtnPrimary>
                }>
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
                                // {
                                //     content: 'Area',
                                //     className: 'max-w-200px',
                                // },
                                'Name',
                                'Featured Image',
                                'Banner',
                                // 'Description',
                                '',
                            ]}
                            tds={__list}>
                            {__list.map((vm, index) => {
                                return (
                                    <tr
                                        key={index}
                                        // onClick={(e) => {
                                        //     e.stopPropagation()
                                        //     __handleChooseDetail(vm)
                                        // }}
                                        // title="Preview Detail"
                                        // className="cursor-pointer"
                                    >
                                        <td>
                                            <TblLineFirstPrimary
                                                value={vm?.name || ''}
                                            />
                                        </td>
                                        <td>
                                            <BoxImage src={vm.featuredImage} />
                                        </td>
                                        <td>
                                            <BoxImage src={vm.banner} />
                                        </td>
                                        {/*<td>*/}
                                        {/*    {vm.description ? (*/}
                                        {/*        <RenderHtml*/}
                                        {/*            html={vm.description}*/}
                                        {/*        />*/}
                                        {/*    ) : (*/}
                                        {/*        '-'*/}
                                        {/*    )}*/}
                                        {/*</td>*/}
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

                                                <BtnCircleEdit
                                                    title="Edit Data"
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            __handleToEdit(
                                                                vm.id,
                                                            )
                                                        },
                                                    }}
                                                />

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
                    width="600px"
                    closeAction={() => __handleCloseDetail()}
                    isCloseAnywhere>
                    {__isLoadingDetail || isEmpty(__detail) ? (
                        <LoadingNotAvailable isLoading={__isLoadingDetail} />
                    ) : (
                        <div className="vstack gap-4">
                            <HorizontalLoopDataLogic
                                list={[
                                    objectListDetail('Name', __detail.name),
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
