import { useState } from 'react'
import { useParams } from 'react-router'
import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'
import { useGlobalPrivateContext } from '@/context/GlobalPrivate.context.tsx'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import { apiExperienceContent } from '@/service/api/contentManage.api.ts'

const defaultIsActive = 1

const initCatalogForm = (name, file) => ({ name, file })

const initMapForm = (passData) => {
    return {
        experienceTypeId: passData?.type?.id || '',
        experienceAreaId: passData?.area?.id || '',
        name: passData.name || '',
        openHours: passData.openHours || '',
        description: passData.description || '',
        mapLocationUrl: passData.mapLocationUrl || '',
        whatsapp: passData.whatsapp || '',
        instagram: passData.instagram || '',
        website: passData.website || '',
        isActive: passData?.isActive ? 1 : 0,
        showInquiry: passData?.showInquiry ? 1 : 0,
        thumbnail: '',
        mapImage: '',
        photos: [],
        deletePhotoIds: [],
        catalogs: [],
        deleteCatalogIds: [],
        seo: { ...mapSEOFormConfig(passData?.seo || {}) },
    }
}

const initForm = {
    experienceTypeId: '',
    experienceAreaId: '',
    name: '',
    openHours: '',
    description: '',
    mapLocationUrl: '',
    whatsapp: '',
    instagram: '',
    website: '',
    isActive: defaultIsActive,
    showInquiry: defaultIsActive,
    thumbnail: '',
    mapImage: '',
    photos: [],
    catalogs: [],
    seo: {
        ...initSEOFormConfig,
    },
}

const useContentExMainFormHook = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const { __profile } = useGlobalPrivateContext()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentExperiencePath,
            pathFromKey: restored.from,
        })

    const [previewThumbnail, setPreviewThumbnail] = useState('')

    const [previewMapImage, setPreviewMapImage] = useState('')

    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const [formRequest, setFormRequest] = useState({
        ...initForm,
        author: __profile?.fullName || '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleThumbnailRemove = () => {
        setPreviewThumbnail('')
        nestedForm.__handleChange('thumbnail', '')
    }

    const _handleMapImageRemove = () => {
        setPreviewMapImage('')
        nestedForm.__handleChange('mapImage', '')
    }

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiExperienceContent.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...initMapForm(res),
                })

                // if (res?.tags && res?.tags.length) {
                //     setListTags(res?.tags)
                // }

                if (res?.thumbnail) {
                    setPreviewThumbnail(res.thumbnail)
                }

                if (res?.mapImage) {
                    setPreviewMapImage(res.mapImage)
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
                    ? apiExperienceContent.updateWithData(id, formRequest)
                    : apiExperienceContent.addWithData(formRequest),
            setIsLoading,
            isDirectToDetail: true,
        })
    }

    return {
        __formRequest: formRequest,
        __setFormRequest: setFormRequest,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,
        __pageStateDataSearch: restored,
        __handleChange: nestedForm._handleChange,
        __handleChangeArr: nestedForm.__handleArrChange,
        __handleArrAddMulti: nestedForm._handleArrAddMulti,
        __handleChangeWithParent: nestedForm._handleChangeWithParent,
        __handleArrChange: nestedForm._handleArrChange,

        // Thumbnail
        __previewThumbnail: previewThumbnail,
        __setPreviewThumbnail: setPreviewThumbnail,
        __handleThumbnailRemove: _handleThumbnailRemove,

        // Map Image
        __previewMapImage: previewMapImage,
        __setPreviewMapImage: setPreviewMapImage,
        __handleMapImageRemove: _handleMapImageRemove,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default useContentExMainFormHook
