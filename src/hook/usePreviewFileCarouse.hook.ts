import { useState } from 'react'
import { MDGeneralPreview } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'

const usePreviewFileCarouselHook = (modalId: string = MDGeneralPreview) => {
    const [indexCarousel, setIndexCarousel] = useState<number | null>(null)

    const _handlePreviewFile = (passIndex: number) => {
        setIndexCarousel(passIndex)
        actionModal(modalId)
    }

    return {
        __indexCarousel: indexCarousel,
        __actionCarousel: {
            setIndex: setIndexCarousel,
            preview: _handlePreviewFile,
        },

        // Deprecated
        get __indexFile() {
            console.warn(
                'usePreviewFileCarouselHook: __indexFile deprecated, gunakan __indexCarousel',
            )
            return indexCarousel
        },
        get __setIndexForPreview() {
            console.warn(
                'usePreviewFileCarouselHook: __setIndexForPreview deprecated, gunakan __actionCarousel.setIndex',
            )

            return setIndexCarousel
        },
        get __handlePreviewFile() {
            console.warn(
                'usePreviewFileCarouselHook: __handlePreviewFile deprecated, gunakan __actionCarousel.preview',
            )

            return _handlePreviewFile
        },
    }
}

export default usePreviewFileCarouselHook
