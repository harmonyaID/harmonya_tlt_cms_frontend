import '@/asset/theme/content-public.scss'
import useHomePageMainHook from '@/page/contentHomePage/hook/useHomePageMain.hook.ts'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'

import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { isEmpty } from 'lodash'
import { MediaNotAvailable } from '@/component/general/TextDefault.tsx'
import ContentMedia from '@/component/general/ContentMedia.tsx'

const ContentHomePagePage = () => {
    const {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
    } = useHomePageMainHook()

    console.log('__list: ', __list)

    // @ts-ignore
    const {
        SECTION1 = {},
        SECTION2 = {},

        // @ts-ignore
    } = !__isLoading && !isEmpty(__list) ? __list?.value : {}

    return (
        <>
            <LoadingStatePreviewData isLoading={__isLoading} data={__list}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="vstack gap-3 content-public">
                            <CardDropdown
                                title={<b>SECTION 1</b>}
                                // classNameBlog="show"
                                isShow
                                id="section-01">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION1.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Image',
                                            <ContentMedia
                                                src={SECTION1.videoThumbnail}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Video',
                                            <ContentMedia
                                                src={SECTION1.backgroundVideo}
                                                type="video"
                                            />,
                                        ),
                                        objectListDetail('', ''),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown
                                title={<b>SECTION 2</b>}
                                id="section-02">
                                <p className="fs-18 fw-medium">Left Position</p>
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION2.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Image',
                                            <ContentMedia
                                                src={SECTION2.mapImage}
                                                type="image"
                                            />,
                                        ),
                                    ]}
                                />

                                <p className="fs-18 fw-medium pt-5">
                                    Right Position
                                </p>

                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Background Image',
                                            <ContentMedia
                                                src={SECTION2.image}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Side Content',
                                            <RenderHtml
                                                html={SECTION2.sideContent}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION2.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION2.buttonLink}
                                            />,
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

export default ContentHomePagePage
