import useContentExDetail from '@/page/contentExperience/hook/useContentExDetail.hook.ts'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import PageTitle from '@/component/general/PageTitle.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import Card from '@/component/card/Card.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import PreElement from '@/component/general/PreElement.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'

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
                        <Card title="Experience">
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
                                            <PreElement
                                                children={__detail.excerpt}
                                            />
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
                                            <>
                                                <div
                                                    className="p-3 bg-neutral-600 rounded-2 border-neutral-500"
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            __detail?.content ||
                                                            '-',
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            '-'
                                        ),
                                    ),
                                ]}
                            />
                        </Card>
                    </div>
                    <div className="col-lg-4">
                        <Card title="Other Information">
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
                                                                tag?.name || '-'
                                                            }
                                                            className="text-bg-neutral-400 fw-normal"
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
                        </Card>
                    </div>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentExperienceDetailPage
