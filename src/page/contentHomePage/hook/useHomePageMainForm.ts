import { useState } from 'react'
import { useParams } from 'react-router'
import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'
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

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: contentHomePagePath,
            pathFromKey: restored.from,
        })

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
        isHideSidebar: true,
    })

    const isLoadingDetail = isEdit
        ? dataDetail.__isLoadingDetailFormRequest
        : false

    const _handleSubmit = () => {
        return __handleSubmit({
            apiCall: () => apiHomePageContent.updateWithData(id, formRequest),
            setIsLoading,
            // isDirectToDetail: true,
            callBack: () => {
                __handleToMain()
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
        __handleChange: nestedForm._handleChange,
        __handleArrToggle: nestedForm._handleArrToggle,
        __handleArrChange: nestedForm._handleArrChange,
        __handleChangeWithParent: nestedForm._handleChangeWithParent,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default useHomePageMainForm
