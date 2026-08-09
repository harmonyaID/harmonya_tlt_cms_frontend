import { useState } from 'react'
import { useParams } from 'react-router'
import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import experienceAreaPath from '@/path/experienceArea.path.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import { apiExperienceArea } from '@/service/api/contentManageSetting.api.ts'

const initForm = {
    experienceTypeId: '',
    name: '',
    description: '',
    featuredImage: '',
    deleteFeaturedImage: '',
    banner: '',
    deleteBanner: '',
    seo: {
        ...initSEOFormConfig,
    },
}

const initMapForm = (passData) => ({
    experienceTypeId: passData?.type?.id || '',
    name: passData.name || '',
    description: passData?.description || '',
    featuredImage: '', //passData?.featuredImage || '',
    deleteFeaturedImage: passData?.deleteFeaturedImage || '',
    banner: '', //passData?.banner || '',
    deleteBanner: passData?.deleteBanner || '',

    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})

const useExpAreaMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: experienceAreaPath,
            pathFromKey: restored.from,
        })

    // START MAIN FORM
    const [formRequest, setFormRequest] = useState(initForm)

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)
    // END MAIN FROM

    // START SEO
    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }
    // END SEO

    // START BANNER
    const [previewFeaturedImage, setPreviewFeaturedImage] = useState('')

    const [previewBanner, setPreviewBanner] = useState('')

    const _handleBannerRemove = (name = '') => {
        setFormRequest((prevState) => {
            const newState = { ...prevState }
            newState[name] = ''

            if (name === 'featuredImage') {
                setPreviewFeaturedImage('')
                if (
                    isEdit &&
                    dataDetail?.__detailFormRequest.featuredImage ===
                        previewFeaturedImage
                ) {
                    // @ts-ignore
                    newState.deleteFeaturedImage = 1
                }
            }

            if (name === 'banner') {
                setPreviewBanner('')
                if (
                    isEdit &&
                    dataDetail?.__detailFormRequest.banner === previewBanner
                ) {
                    // @ts-ignore
                    newState.deleteBanner = 1
                }
            }

            return newState
        })
    }
    // END BANNER

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiExperienceArea.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest(initMapForm(res))

                if (res.featuredImage) {
                    setPreviewFeaturedImage(res.featuredImage)
                }

                if (res.banner) {
                    setPreviewBanner(res.banner)
                }

                if (res?.seo?.thumbnail) {
                    setSetSEOThumbnail(res.seo.thumbnail)
                }
            }
        },
        isAutoGet: isEdit,
    })

    const isLoadingDetail = isEdit
        ? dataDetail.__isLoadingDetailFormRequest
        : false

    const _handleSubmit = () => {
        return __handleSubmit({
            apiCall: () =>
                isEdit
                    ? apiExperienceArea.updateWithData(id, formRequest)
                    : apiExperienceArea.addWithData(formRequest),
            setIsLoading,
            isDirectToDetail: false,
            callBack: () => {
                __handleToMain()
            },
        })
    }

    return {
        __formRequest: formRequest,
        __isLoading: isLoading,
        __pageStateDataSearch: restored,
        __isLoadingDetail: isLoadingDetail,
        __detailFormRequest: dataDetail.__detailFormRequest,

        // Chang Form
        __setFormRequest: setFormRequest,
        ...nestedForm,

        // Banner
        __previewFeaturedImage: previewFeaturedImage,
        __setPreviewFeaturedImage: setPreviewFeaturedImage,
        __previewBanner: previewBanner,
        __setPreviewBanner: setPreviewBanner,
        __handleBannerRemove: _handleBannerRemove,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default useExpAreaMainForm
