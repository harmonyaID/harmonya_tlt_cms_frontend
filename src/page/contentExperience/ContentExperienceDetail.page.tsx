import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import PreviewFileModalMultiLogic from '@/common/misc/PreviewFileModalMulti.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import { NotAvailable } from '@/component/general/TextDefault.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import useContentExDetail from '@/page/contentExperience/hook/useContentExDetail.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'

const ContentExperienceDetailPage = () => {
    const {
        __id,
        __detail,
        __isLoading,
        __pageStateDataSearch,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
    } = useContentExDetail()

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Experience',
                        actions: {
                            url: contentExperiencePath.main,
                            state: { ...__pageStateDataSearch },
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
                            onClick={() =>
                                __handleToMain(__pageStateDataSearch)
                            }>
                            Back
                        </BtnPrimary>
                    </div>
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__detail}>
                <div className="row">
                    <div className="col-lg-8">
                        <div className="vstack gap-4">
                            <Card title="Experience">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Name',
                                            __detail?.name || '-',
                                        ),
                                        objectListDetail(
                                            'Type',
                                            __detail?.type?.name || '-',
                                        ),
                                        objectListDetail(
                                            'Area',
                                            __detail?.area?.name || '-',
                                        ),
                                        objectListDetail(
                                            'Open Hours',
                                            __detail?.openHours || '-',
                                        ),
                                        objectListDetail(
                                            'Description',
                                            __detail.description ? (
                                                <div
                                                    className="p-3 bg-neutral-600 rounded-2 border-neutral-500"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            __detail?.description ||
                                                            '-',
                                                    }}
                                                />
                                            ) : (
                                                '-'
                                            ),
                                        ),
                                    ]}
                                />
                            </Card>

                            <CardDropdown title="SEO Information" isShow>
                                <SectionPreviewSEOInformation
                                    isTitle={false}
                                    seo={__detail.seo}
                                />
                            </CardDropdown>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="vstack gap-4">
                            <CardDropdown title="Other Information" isShow>
                                <div className="pb-3">
                                    <p className="mb-2 text-neutral-100">
                                        Thumbnail
                                    </p>

                                    <PreviewFileModalLogic
                                        dataUrl={__detail?.thumbnail?.toString()}
                                        dataBy="file"
                                        dataFile={__detail.thumbnail}
                                        classNameWidth="w-100 max-h-148px"
                                    />
                                </div>

                                <CardNavTab
                                    classNameTabPane="px-0"
                                    tabs={[
                                        objectTab('General', 'tabGeneral'),
                                        objectTab('Photos', 'tabPhotos'),
                                        objectTab(
                                            'Photos Promotion',
                                            'tabPhotoPromotion',
                                        ),
                                    ]}
                                    tabContents={[
                                        objectTabContent(
                                            'General',
                                            <>
                                                <VerticalLoopDataLogic
                                                    list={[
                                                        objectListDetail(
                                                            'Map Image',
                                                            __detail?.mapImage ? (
                                                                <>
                                                                    <PreviewFileModalLogic
                                                                        dataUrl={__detail?.mapImage?.toString()}
                                                                        dataBy="file"
                                                                        dataFile={
                                                                            __detail.mapImage
                                                                        }
                                                                        classNameWidth="w-100 max-h-148px"
                                                                    />
                                                                </>
                                                            ) : (
                                                                '-'
                                                            ),
                                                        ),
                                                        objectListDetail(
                                                            'Status Active',
                                                            <TextTrueOrFalse
                                                                value={
                                                                    __detail.isActive
                                                                }
                                                            />,
                                                        ),
                                                        objectListDetail(
                                                            'Show Inquiry',
                                                            <TextTrueOrFalse
                                                                value={
                                                                    __detail.showInquiry
                                                                }
                                                            />,
                                                        ),
                                                        objectListDetail(
                                                            'Whatsapp',
                                                            __detail?.whatsapp ||
                                                                '-',
                                                        ),
                                                        objectListDetail(
                                                            'Instagram',
                                                            __detail?.instagram ||
                                                                '-',
                                                        ),
                                                        objectListDetail(
                                                            'Website',
                                                            __detail?.website ? (
                                                                <a
                                                                    href={
                                                                        __detail.website
                                                                    }
                                                                    target="_blank">
                                                                    {
                                                                        __detail?.website
                                                                    }
                                                                </a>
                                                            ) : (
                                                                '-'
                                                            ),
                                                        ),
                                                        objectListDetail(
                                                            'Map Location Url',
                                                            __detail?.mapLocationUrl ? (
                                                                <a
                                                                    href={
                                                                        __detail.mapLocationUrl
                                                                    }
                                                                    target="_blank">
                                                                    {
                                                                        __detail?.mapLocationUrl
                                                                    }
                                                                </a>
                                                            ) : (
                                                                '-'
                                                            ),
                                                        ),
                                                        objectListDetail(
                                                            'Created At',
                                                            __detail?.createdAt ||
                                                                '-',
                                                        ),
                                                    ]}
                                                />
                                            </>,
                                        ),
                                        objectTabContent(
                                            'Photos',
                                            <>
                                                {!isEmpty(__detail.photos) ? (
                                                    <>
                                                        <PreviewFileModalMultiLogic
                                                            dataFiles={
                                                                __detail.photos
                                                            }
                                                            dataBy="photo"
                                                            isDescription={
                                                                false
                                                            }
                                                            classNameWrapImg="max-h-120-px"
                                                        />
                                                    </>
                                                ) : (
                                                    <NotAvailable />
                                                )}
                                            </>,
                                        ),
                                        objectTabContent(
                                            'Photos Promotion',
                                            <>
                                                {!isEmpty(
                                                    __detail.promoPhotos,
                                                ) ? (
                                                    <>
                                                        <PreviewFileModalMultiLogic
                                                            dataFiles={
                                                                __detail.promoPhotos
                                                            }
                                                            dataBy="file"
                                                            isDescription={
                                                                false
                                                            }
                                                            classNameWrapImg="max-h-120-px"
                                                        />
                                                    </>
                                                ) : (
                                                    <NotAvailable />
                                                )}
                                            </>,
                                        ),
                                    ]}
                                />
                            </CardDropdown>
                        </div>
                    </div>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentExperienceDetailPage
