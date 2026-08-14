import { useState } from 'react'
import { useParams } from 'react-router'
import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import { setRemoveNestedArray } from '@/helper/setRemoveNestedValue.helper.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import {
    apiHomePageContent,
    detailHomePageContent,
} from '@/service/api/contentManage.api.ts'

const initForm = {
    value: {},
    locale: '',
    seo: {
        ...initSEOFormConfig,
    },
}

const initMapForm = (passData) => ({
    value: passData?.value || {},
    locale: passData?.locale || '',
    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})

const useHomePageMainForm = ({ isEdit = true }: { isEdit?: boolean } = {}) => {
    const { locale, id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentHomePagePath,
            pathFromKey: restored.from,
        })

    const [previewDataFiles, setPreviewDataFiles] = useState<any>({})

    const [formRequest, setFormRequest] = useState<any>({ ...initForm })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    // START SEO
    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }
    // END SEO

    // START PREVIEW DATA FILES
    const _handleUploadFile = (section: string, name: string, value = '') => {
        setPreviewDataFiles((prevState) => {
            const newState = { ...prevState }
            newState[section] = {
                ...newState[section],
                [name]: value,
            }

            return newState
        })

        setFormRequest((prevState) => {
            const newState = { ...prevState }

            newState.value[section] = {
                ...newState.value[section],
                [name]: value,
            }

            return newState
        })
    }
    // END PREVIEW DATA FILES

    // START SECTION NESTED FORM
    const _handleSectionInput = (name, value = '') => {
        setFormRequest((prevState) =>
            setNestedValue(prevState, 'value.' + name, value),
        )
    }

    const _handleSectionRemoveNested = (name, index) => {
        setFormRequest((prevState) =>
            setRemoveNestedArray(prevState, 'value.' + name, index),
        )
    }
    // END SECTION NESTED FORM

    const dataDetail = useDetailFormRequestHook({
        // urlAPI: () => apiHomePageContent.detail(id),
        urlAPI: () => detailHomePageContent({ locale: id || locale }),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            setFormRequest(initMapForm(res))
        },
        isAutoGet: isEdit,
        // isHideSidebar: true,
    })

    const isLoadingDetail = isEdit
        ? dataDetail.__isLoadingDetailFormRequest
        : false

    const _handleSubmit = () => {
        return __handleSubmit({
            apiCall: () =>
                apiHomePageContent.updateWithData(
                    dataDetail?.__detailFormRequest?.id,
                    formRequest,
                ),
            setIsLoading,
            isDirectToDetail: false,
            callBack: () => {
                __handleToDetail(id)
            },
        })
    }

    return {
        __formRequest: formRequest,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,
        __detail: dataDetail?.__detailFormRequest || {},
        __pageStateDataSearch: restored,

        // Chang Form
        __setFormRequest: setFormRequest,
        __handleChange: nestedForm.__handleChange,
        __handleArrToggle: nestedForm.__handleArrToggle,
        __handleArrChange: nestedForm.__handleArrChange,
        __handleChangeWithParent: nestedForm.__handleChangeWithParent,

        __handleSectionInput: _handleSectionInput,
        __handleSectionRemoveNested: _handleSectionRemoveNested,

        // Input File
        __handleUploadFile: _handleUploadFile,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel: () => __handleToDetail(id),
    }
}

export default useHomePageMainForm
