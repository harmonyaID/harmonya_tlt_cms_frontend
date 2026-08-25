import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import TinyMCERenderer from '@/component/general/TinyMCERenderer.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import PageMainForm from '@/page/contentAllPages/container/PageMainForm.tsx'
import usePageDetailHook from '@/page/contentAllPages/hook/usePageDetail.hook.ts'
import contentAllPages from '@/path/contentAllPages.path.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'

const ContentPageDetailPage = () => {
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
    } = usePageDetailHook()

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Page',
                        actions: {
                            url: contentAllPages.main,
                            state: { ...__pageStateDataSearch },
                        },
                    },
                    { name: 'Detail' },
                ]}
            />

            <div className="row mb-4 g-3 align-items-md-center">
                <div className="col">
                    <PageTitle title="Page Detail" />
                </div>

                <div className="col-auto">
                    <div className="hstack gap-2 flex-wrap">
                        {/*<BtnPrimary*/}
                        {/*    isOutline*/}
                        {/*    onClick={() => __handleToPreview(__detail.id)}>*/}
                        {/*    Preview*/}
                        {/*</BtnPrimary>*/}

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
                {!isEmpty(__detail) ? (
                    <>
                        <div className="vstack gap-4">
                            <CardDropdown
                                title="Main Information"
                                id="section-main-information"
                                isShow>
                                <HorizontalLoopDataLogic
                                    list={[
                                        objectListDetail(
                                            'Title',
                                            __detail?.title || '-',
                                        ),
                                        objectListDetail(
                                            'Locale',
                                            <span className="text-capitalize">
                                                {__detail?.locale || '-'}
                                            </span>,
                                        ),
                                        objectListDetail(
                                            'Status',
                                            <span className="text-capitalize">
                                                {__detail?.status || '-'}
                                            </span>,
                                        ),
                                        // objectListDetail(
                                        //     'Description',
                                        //     <PreElement className="text-capitalize">
                                        //         {__detail?.description || '-'}
                                        //     </PreElement>,
                                        // ),
                                        objectListDetail(
                                            'Short Description',
                                            <PreElement className="text-capitalize">
                                                {__detail?.shortDescription ||
                                                    '-'}
                                            </PreElement>,
                                        ),

                                        objectListDetail(
                                            'Content',
                                            __detail.content ? (
                                                <TinyMCERenderer
                                                    content={__detail.content}
                                                />
                                            ) : (
                                                '-'
                                            ),
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            {/*<CardDropdown*/}
                            {/*    title="Content Information"*/}
                            {/*    id="section-content-information"*/}
                            {/*    isShow>*/}
                            {/*    <div className="p-4 bg-neutral-600 rounded-2">*/}
                            {/*        <TinyMCERenderer*/}
                            {/*            content={__detail.content}*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</CardDropdown>*/}

                            <CardDropdown
                                title="SEO Information"
                                id="section-seo-information"
                                isShow>
                                <SectionPreviewSEOInformation
                                    isTitle={false}
                                    seo={__detail.seo}
                                />
                            </CardDropdown>
                        </div>
                    </>
                ) : null}
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentPageDetailPage
