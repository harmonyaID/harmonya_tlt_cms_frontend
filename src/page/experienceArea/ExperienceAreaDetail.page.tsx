import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import experienceAreaPath from '@/path/experienceArea.path.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import Card from '@/component/card/Card.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import RenderHtml from '@/component/general/RenderHtml.tsx'

const ExperienceAreaDetailPage = () => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => apiExperienceArea.detail(id),
        isCallAPI: true,
        triggerBy: id,
    })

    const { __handleToAdd, __handleToEdit, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: experienceAreaPath,
            pathFromKey: experienceAreaPath.detail(id),
            search: restored.dataSearch,
        })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Experience Area',
                        actions: {
                            url: experienceAreaPath.main,
                            state: { ...restored },
                        },
                    },
                    { name: 'Detail' },
                ]}
            />

            <div className="row mb-4 g-3 align-items-md-center">
                <div className="col">
                    <PageTitle title="Experience Detail" />
                </div>

                <div className="col-auto">
                    <div className="hstack gap-2 flex-wrap">
                        {__detail?.id ? (
                            <BtnPrimary
                                isOutline
                                onClick={() =>
                                    __handleToEdit(__detail.id, {
                                        parentId: __detail.id,
                                    })
                                }>
                                Edit
                            </BtnPrimary>
                        ) : null}

                        <BtnPrimary
                            isOutline
                            onClick={() => __handleToMain(restored)}>
                            Back
                        </BtnPrimary>
                    </div>
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__detail}>
                <div className="vstack gap-4">
                    <CardDropdown
                        title="Main Information"
                        id="section-main-information"
                        isShow>
                        <VerticalLoopDataLogic
                            list={[
                                objectListDetail('Name', __detail.name),
                                objectListDetail(
                                    'Type',
                                    __detail?.type?.name || '-',
                                ),
                                objectListDetail(
                                    'Properties',
                                    __detail?.properties?.length > 0 ? (
                                        <ul>
                                            {__detail?.properties?.map((vm) => (
                                                <li key={vm.id}>
                                                    {vm.nickname}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        '-'
                                    ),
                                ),
                                objectListDetail(
                                    'Blogs',
                                    __detail?.blogs?.length > 0 ? (
                                        <ul>
                                            {__detail?.blogs?.map((vm) => (
                                                <li key={vm.id}>{vm.title}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        '-'
                                    ),
                                ),
                                objectListDetail(
                                    'Experience Section 1',
                                    __detail?.experienceSection1?.length > 0 ? (
                                        <ul>
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
                                    __detail?.experienceSection2?.length > 0 ? (
                                        <ul>
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
                                        <div className="vstack gap-3 w-50">
                                            {__detail.customInformations.map(
                                                (group, index) => {
                                                    return (
                                                        <>
                                                            <p className="mb-1">
                                                                {group.name}
                                                            </p>
                                                            {group?.customInformations?.map(
                                                                (info) => (
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
                                    ) : (
                                        '-'
                                    ),
                                ),
                                objectTabContent(
                                    'Featured Image',
                                    __detail?.featuredImage ? (
                                        <PreviewFileModalLogic
                                            dataUrl={__detail?.featuredImage?.toString()}
                                            dataBy="file"
                                            dataFile={__detail?.featuredImage}
                                            classNameWidth="w-50 max-h-120-px"
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
                                            classNameWidth="w-50 max-h-120-px"
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
                                            classNameWidth="w-50 max-h-120-px"
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
                                            className="bg-neutral-500 py-2 px-3 rounded-2 text-break w-50"
                                            html={__detail.description}
                                        />
                                    ) : (
                                        '-'
                                    ),
                                ),
                            ]}
                        />
                    </CardDropdown>

                    <CardDropdown
                        title="SEO Information"
                        id="section-seo-information"
                        isShow>
                        <SectionPreviewSEOInformation
                            isTitle={false}
                            classNameColumn="col-md-9"
                            seo={__detail?.seo || {}}
                        />
                    </CardDropdown>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ExperienceAreaDetailPage
