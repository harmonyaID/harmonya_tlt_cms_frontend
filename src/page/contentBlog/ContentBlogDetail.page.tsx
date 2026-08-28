import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import PreviewJson from '@/component/general/PreviewJson.tsx'
import SEOPreviewPublic from '@/component/general/SEOPreviewPublic.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import TinyMCERenderer from '@/component/general/TinyMCERenderer.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import useContentBlogDetail from '@/page/contentBlog/hook/useContentBlogDetail.hook.ts'
import boatPath from '@/path/boat.path.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'

const ContentBlogDetailPage = () => {
    const {
        __id,
        __detail,
        __isLoading,
        __pageStateDataSearch,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
        __handleToPreview,
    } = useContentBlogDetail()

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Boat',
                        actions: {
                            url: contentBlogPath.main,
                            state: { ...__pageStateDataSearch },
                        },
                    },
                    { name: 'Detail' },
                ]}
            />

            <div className="row mb-4 g-3 align-items-md-center">
                <div className="col">
                    <PageTitle title="Boat Detail" />
                </div>

                <div className="col-auto">
                    <div className="hstack gap-2 flex-wrap">
                        <BtnPrimary
                            isOutline
                            onClick={() => __handleToPreview(__detail.id)}>
                            Preview
                        </BtnPrimary>

                        <BtnPrimary
                            isOutline
                            onClick={() =>
                                __handleToEdit(__detail.id, {
                                    parentId: __detail.id,
                                })
                            }>
                            Edit
                        </BtnPrimary>

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
                            <Card title="Blog Information">
                                <HorizontalLoopDataLogic
                                    list={[
                                        objectListDetail(
                                            'Title',
                                            __detail?.title || '-',
                                        ),
                                        objectListDetail(
                                            'Slug',
                                            __detail?.slug || '-',
                                        ),
                                        objectListDetail(
                                            'Excerpt',
                                            __detail.excerpt ? (
                                                <div className="p-3 bg-neutral-600 rounded-2 border-neutral-500">
                                                    <TinyMCERenderer
                                                        content={
                                                            __detail.excerpt
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                '-'
                                            ),
                                        ),
                                    ]}
                                />

                                <VerticalLoopDataLogic
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            __detail.content ? (
                                                <div className="p-3 bg-neutral-600 rounded-2 border-neutral-500">
                                                    <TinyMCERenderer
                                                        content={
                                                            __detail.content
                                                        }
                                                    />
                                                </div>
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
                                    seo={__detail?.seo || {}}
                                />
                            </CardDropdown>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="vstack gap-4">
                            {/*<Card title="Other Information">*/}
                            {/*    <div className="pb-3">*/}
                            {/*        <p className="mb-2 text-neutral-100">*/}
                            {/*            Thumbnail*/}
                            {/*        </p>*/}

                            {/*        <PreviewFileModalLogic*/}
                            {/*            dataUrl={__detail?.thumbnail?.toString()}*/}
                            {/*            dataBy="file"*/}
                            {/*            dataFile={__detail.thumbnail}*/}
                            {/*            classNameWidth="w-100 max-h-148px"*/}
                            {/*        />*/}
                            {/*    </div>*/}

                            {/*    <VerticalLoopDataLogic*/}
                            {/*        list={[*/}
                            {/*            objectListDetail(*/}
                            {/*                'Status Active',*/}
                            {/*                <TextTrueOrFalse*/}
                            {/*                    value={__detail.isActive}*/}
                            {/*                />,*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Category',*/}
                            {/*                __detail?.category?.name || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Tags',*/}
                            {/*                __detail?.tags &&*/}
                            {/*                    __detail?.tags.length ? (*/}
                            {/*                    <div className="d-inline-flex gap-2">*/}
                            {/*                        {__detail?.tags?.map(*/}
                            {/*                            (tag, index) => (*/}
                            {/*                                <BadgeStatusGeneral*/}
                            {/*                                    value={*/}
                            {/*                                        tag?.name ||*/}
                            {/*                                        '-'*/}
                            {/*                                    }*/}
                            {/*                                    className="text-bg-neutral-300 fw-normal"*/}
                            {/*                                    key={index}*/}
                            {/*                                />*/}
                            {/*                            ),*/}
                            {/*                        ) || '-'}*/}
                            {/*                    </div>*/}
                            {/*                ) : (*/}
                            {/*                    '-'*/}
                            {/*                ),*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Author',*/}
                            {/*                __detail?.author || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Created At',*/}
                            {/*                __detail?.createdAt || '-',*/}
                            {/*            ),*/}
                            {/*        ]}*/}
                            {/*    />*/}
                            {/*</Card>*/}

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

                                <VerticalLoopDataLogic
                                    list={[
                                        objectListDetail(
                                            'Status Active',
                                            <TextTrueOrFalse
                                                value={__detail.isActive}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Category',
                                            __detail?.category?.name || '-',
                                        ),
                                        objectListDetail(
                                            'Tags',
                                            __detail?.tags &&
                                                __detail?.tags.length ? (
                                                <div className="d-inline-flex gap-2">
                                                    {__detail?.tags?.map(
                                                        (tag, index) => (
                                                            <BadgeStatusGeneral
                                                                value={
                                                                    tag?.name ||
                                                                    '-'
                                                                }
                                                                className="text-bg-neutral-300 fw-normal"
                                                                key={index}
                                                            />
                                                        ),
                                                    ) || '-'}
                                                </div>
                                            ) : (
                                                '-'
                                            ),
                                        ),
                                        objectListDetail(
                                            'Author',
                                            __detail?.author || '-',
                                        ),
                                        objectListDetail(
                                            'Created At',
                                            __detail?.createdAt || '-',
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            {/*<Card title="SEO Information">*/}
                            {/*    <div className="pb-3">*/}
                            {/*        <p className="mb-2 text-neutral-100">*/}
                            {/*            Meta Image*/}
                            {/*        </p>*/}

                            {/*        <PreviewFileModalLogic*/}
                            {/*            dataUrl={__detail?.seo?.thumbnail?.toString()}*/}
                            {/*            dataBy="file"*/}
                            {/*            dataFile={__detail.seo?.thumbnail}*/}
                            {/*            classNameWidth="w-100 max-h-148px"*/}
                            {/*        />*/}
                            {/*    </div>*/}

                            {/*    <SEOPreviewPublic*/}
                            {/*        title={__detail?.seo?.title || ''}*/}
                            {/*        description={*/}
                            {/*            __detail?.seo?.description || ''*/}
                            {/*        }*/}
                            {/*        className="mb-3"*/}
                            {/*    />*/}

                            {/*    <VerticalLoopDataLogic*/}
                            {/*        list={[*/}
                            {/*            objectListDetail(*/}
                            {/*                'Title',*/}
                            {/*                __detail?.seo?.title || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Slug',*/}
                            {/*                __detail?.seo?.slug || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Canonical Url',*/}
                            {/*                __detail?.seo?.canonicalUrl || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Description',*/}
                            {/*                __detail?.seo?.description || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Meta Keyword',*/}
                            {/*                __detail?.seo?.metaKeyword || '-',*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Robot Follow',*/}
                            {/*                <TextTrueOrFalse*/}
                            {/*                    value={*/}
                            {/*                        __detail?.seo?.robotFollow*/}
                            {/*                    }*/}
                            {/*                />,*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Robot Index',*/}
                            {/*                <TextTrueOrFalse*/}
                            {/*                    value={*/}
                            {/*                        __detail?.seo?.robotIndex*/}
                            {/*                    }*/}
                            {/*                />,*/}
                            {/*            ),*/}
                            {/*            objectListDetail(*/}
                            {/*                'Schema Markup',*/}
                            {/*                __detail?.seo?.schemaMarkup ? (*/}
                            {/*                    <PreviewJson*/}
                            {/*                        value={*/}
                            {/*                            __detail?.seo*/}
                            {/*                                .schemaMarkup*/}
                            {/*                        }*/}
                            {/*                    />*/}
                            {/*                ) : (*/}
                            {/*                    '-'*/}
                            {/*                ),*/}
                            {/*            ),*/}
                            {/*        ]}*/}
                            {/*    />*/}
                            {/*</Card>*/}
                        </div>
                    </div>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentBlogDetailPage
