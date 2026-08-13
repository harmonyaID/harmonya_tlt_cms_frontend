import { isEmpty } from 'lodash'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
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
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import TabInquiryForm from '@/page/contentExperience/container/TabInquiryForm.tsx'
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
                <div className="vstack gap-3">
                    <Card>
                        <div className="row gy-3">
                            <div className="col-md-3 col-lg-2">
                                <div className="position-relative ">
                                    <div className="overflow-hidden max-h-148px rounded position-relative">
                                        <div
                                            className="wp-img-preview"
                                            onClick={() => {}}>
                                            <Image
                                                src={__detail?.thumbnail}
                                                alt="Preview File"
                                                fallback={ImgGeneralDefault}
                                                className="data-img data-img-contain w-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9">
                                <h5 className="text-primary">
                                    {__detail?.name}{' '}
                                    <div className="ms-2 badge text-bg-tint-500 fs-12 rounded-pill">
                                        {__detail?.type?.name}
                                    </div>
                                </h5>

                                {/*<div className="hstack gap-2 flex-wrap">*/}
                                {/*    {__detail?.tags*/}
                                {/*        ? __detail?.tags.map((tag) => {*/}
                                {/*            return (*/}
                                {/*                <BadgeStatusGeneral*/}
                                {/*                    key={tag.name}*/}
                                {/*                    value={tag.name}*/}
                                {/*                    className="text-bg-neutral-500"*/}
                                {/*                    inTable*/}
                                {/*                />*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*        : ''}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </Card>

                    <CardNavTab
                        tabs={[
                            objectTab(
                                'Experience Information',
                                'tabExpInformation',
                            ),
                            objectTab('General', 'tabGeneral'),
                            objectTab('Photos', 'tabPhotos'),
                            objectTab('Photos Promotion', 'tabPhotoPromotion'),
                            objectTab('Inquiry Form', 'tabInquiryForm'),
                            objectTab('SEO Information', 'tabSEOInformation'),
                        ]}
                        tabContents={[
                            objectTabContent(
                                'Experience Information',
                                <>
                                    <div className="row">
                                        <div className="col-md-9">
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
                                                        __detail?.type?.name ||
                                                            '-',
                                                    ),
                                                    objectListDetail(
                                                        'Area',
                                                        __detail?.area?.name ||
                                                            '-',
                                                    ),
                                                    objectListDetail(
                                                        'Open Hours',
                                                        __detail?.openHours ||
                                                            '-',
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
                                        </div>
                                    </div>
                                </>,
                            ),
                            objectTabContent(
                                'General',
                                <>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <HorizontalLoopDataLogic
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
                                                        formatDateTimeByTlt(
                                                            __detail?.createdAt,
                                                        ),
                                                    ),
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </>,
                            ),
                            objectTabContent(
                                'Photos',
                                <>
                                    {!isEmpty(__detail.photos) ? (
                                        <>
                                            <PreviewFileModalMultiLogic
                                                dataFiles={__detail.photos}
                                                classNameColumnPreview="col-md-3"
                                                dataBy="photo"
                                                isDescription={false}
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
                                    {!isEmpty(__detail.promoPhotos) ? (
                                        <>
                                            <PreviewFileModalMultiLogic
                                                dataFiles={__detail.promoPhotos}
                                                classNameColumnPreview="col-md-3"
                                                dataBy="file"
                                                isDescription={false}
                                                classNameWrapImg="max-h-120-px"
                                            />
                                        </>
                                    ) : (
                                        <NotAvailable />
                                    )}
                                </>,
                            ),
                            objectTabContent(
                                'Inquiry Form',
                                <TabInquiryForm experienceId={__detail.id} />,
                            ),
                            objectTabContent(
                                'SEO Information',
                                <SectionPreviewSEOInformation
                                    isTitle={false}
                                    classNameColumn="col-md-9"
                                    seo={__detail.seo}
                                />,
                            ),
                        ]}
                    />
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentExperienceDetailPage
