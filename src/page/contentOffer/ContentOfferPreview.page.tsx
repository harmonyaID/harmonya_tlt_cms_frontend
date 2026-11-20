import useContentOfferDetail from '@/page/contentOffer/hook/useContentOfferDetail.hook.ts'
import { BtnPrimary } from '@/component/general/Button.tsx'
import TinyMCERenderer from '@/component/general/TinyMCERenderer.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import LoadingInPage from '@/component/loading/LoadingPage.tsx'

const ContentOfferPreviewPage = () => {
    const {
        __id,
        __detail,
        __isLoading,

        // Change Page
        __handleToDetail,
    } = useContentOfferDetail()

    return (
        <>
            <div className="hstack justify-content-end mb-3">
                <BtnPrimary isOutline onClick={() => __handleToDetail(__id)}>
                    Back
                </BtnPrimary>
            </div>

            {__isLoading ? (
                <LoadingInPage />
            ) : (
                <div className="bg-white p-4 rounded-4">
                    {__detail && (
                        <PreviewFileModalLogic
                            dataUrl={__detail?.thumbnail?.toString()}
                            dataBy="file"
                            dataFile={__detail.thumbnail}
                            classNameWidth="w-100 max-h-400px"
                        />
                    )}

                    <p className="mt-3 mb-5">
                        <TinyMCERenderer
                            content={`Home / Offer / ${__detail.title}`}
                        />
                    </p>

                    <p className="text-uppercase fs-16">
                        {__detail.startDate} - {__detail.endDate}
                    </p>

                    <h1 className="text-uppercase fw-medium">
                        <TinyMCERenderer content={__detail.title} />
                    </h1>

                    <hr className="mb-5" />

                    <TinyMCERenderer content={__detail.excerpt} />

                    <hr className="my-5" />

                    <TinyMCERenderer content={__detail.content} />

                    {__detail.additionalContent && (
                        <>
                            <hr className="my-5" />
                            <TinyMCERenderer
                                content={__detail.additionalContent}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default ContentOfferPreviewPage
