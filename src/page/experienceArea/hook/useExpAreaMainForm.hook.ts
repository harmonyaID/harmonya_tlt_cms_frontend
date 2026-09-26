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
import { isArray, isEmpty, isObject } from 'lodash'

const initForm = {
    experienceTypeId: '',
    name: '',
    description: '',
    featuredImage: '',
    deleteFeaturedImage: '',
    banner: '',
    deleteBanner: '',

    customInformations: [],
    propertyIds: [],
    mapImage: '',
    deleteMapImage: 0,

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

    mapImage: '',
    deleteMapImage: 0,
    customInformations: passData?.customInformations?.length
        ? passData.customInformations
        : [],
    propertyIds: [],

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

    const [mapImage, setMapImage] = useState('')

    const [listProperties, setListProperties] = useState<any[]>([])

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleRemoveMapImage = () => {
        nestedForm.setFormRequest((prevState) => ({
            ...prevState,
            mapImage: '',
            deleteMapImage: 1,
        }))
        setMapImage('')
    }
    // END MAIN FROM

    // START SEO
    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }
    // END SEO

    // Start Handle Custom Info
    const _handleCustomInfoAdd = () => {
        nestedForm._handleArrToggle(-1, 'customInformations', {
            name: '',
            customInformations: [
                {
                    name: '',
                    value: '',
                    order: 1,
                },
            ],
        })
    }

    const _handleCustomInfoRemove = (indexToRemove) => {
        setFormRequest((prev) => {
            const updated = prev.customInformations
                .filter((_, index) => index !== indexToRemove)
                .map((item, index) => ({
                    ...item,
                    order: index + 1,
                }))

            return {
                ...prev,
                customInformations: updated,
            }
        })
    }

    const _handleChangeCustomInfo = (index, group) => {
        setFormRequest((prev) => {
            const updated = [...prev.customInformations]

            updated[index] = group

            return {
                ...prev,
                customInformations: updated,
            }
        })
    }
    // End Handle Custom Info

    // SART Property
    const _handlePropertyRemove = (dataProperty) => {
        setFormRequest((prev) => {
            const newState = { ...prev }
            newState.propertyIds = newState.propertyIds.filter(
                (id) => id !== dataProperty.id,
            )

            return newState
        })

        setListProperties((prev) =>
            prev.filter((property) => property.id !== dataProperty.id),
        )
    }

    const _handlePropertyChoose = (newProperty) => {
        if (formRequest.propertyIds.length == 9) {
            return
        }

        if (!isEmpty(newProperty)) {
            const checkData = isArray(newProperty)
                ? newProperty[0]
                : isObject(newProperty)
                  ? newProperty
                  : {}

            nestedForm._handleArrAddMulti('propertyIds', [checkData.id])

            // @ts-ignore
            setListProperties((prevState) => [...prevState, ...newProperty])
        }
    }

    // END Property

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

                if (res?.mapImage) {
                    setMapImage(res?.mapImage)
                }

                if (res?.properties){
                    setListProperties(res.properties)
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
        __mapImage: mapImage,
        __removeMapImage: _handleRemoveMapImage,

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

        __handleCustomInfoAdd: _handleCustomInfoAdd,
        __handleCustomInfoRemove: _handleCustomInfoRemove,
        __handleCustomInfoChange: _handleChangeCustomInfo,

        __listProperties: listProperties,
        __handlePropertyRemove: _handlePropertyRemove,
        __handlePropertyChoose: _handlePropertyChoose,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default useExpAreaMainForm
