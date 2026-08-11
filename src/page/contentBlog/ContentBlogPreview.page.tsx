import useContentBlogDetail from '@/page/contentBlog/hook/useContentBlogDetail.hook.ts'
import { BtnPrimary } from '@/component/general/Button.tsx'
import TinyMCERenderer from '@/component/general/TinyMCERenderer.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import { oneTypeFormatDate } from '@/helper/actionFormatDate.helper.ts'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import Image from 'rc-image'
import LoadingInPage from '@/component/loading/LoadingPage.tsx'

const ContentBlogPreviewPage = () => {
    const {
        __id,
        __detail,
        __isLoading,

        // Change Page
        __handleToDetail
    } = useContentBlogDetail()
    
    return (
        <>
            <div className="hstack justify-content-end mb-3">
                <BtnPrimary isOutline onClick={() => __handleToDetail(__id)}>
                    Back
                </BtnPrimary>
            </div>

            {__isLoading ? (
                <LoadingInPage/>
                ) : (
                <div className="bg-white p-4 rounded-4">
                    {__detail && (
                        <Image
                            src={__detail?.thumbnail?.toString()}
                            alt="Preview File"
                            className="data-img data-img-contain w-100 rounded-3"
                        />
                    )}

                    <p className="mt-3 mb-5">
                        <TinyMCERenderer
                            content={`Home / Blog / ${__detail.title}`}
                        />
                    </p>

                    <p className="text-uppercase fs-16">
                        <TinyMCERenderer
                            content={oneTypeFormatDate(
                                __detail.createdAt,
                                'MMMM, DD YYYY',
                            )}
                        />
                    </p>

                    <h1 className="text-uppercase fw-medium">
                        <TinyMCERenderer content={__detail.title} />
                    </h1>

                    <div className="hstack gap-3 py-2">
                        {__detail.tags &&
                            __detail?.tags?.map((tag, index) => (
                                <BadgeStatusGeneral
                                    value={tag?.name || '-'}
                                    className="blog-tag fw-normal"
                                    key={index}
                                />
                            ))}
                    </div>

                    <hr className="mb-5" />

                    <TinyMCERenderer content={__detail.excerpt} />

                    <hr className="my-5" />

                    <TinyMCERenderer content={__detail.content} />
                </div>
            )}
        </>
    )
}

export default ContentBlogPreviewPage