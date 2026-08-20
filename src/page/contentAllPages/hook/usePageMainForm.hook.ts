import { useState } from 'react'
import { useParams } from 'react-router'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import { setRemoveNestedArray } from '@/helper/setRemoveNestedValue.helper.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import {
    initMapPageMainForm,
    initPageMainForm,
} from '@/page/contentAllPages/param/pageMainForm.param.ts'
import contentAllPagesPath from '@/path/contentAllPages.path.ts'
import {
    apiHomePageContent,
    apiPageContent,
    detailHomePageContent,
} from '@/service/api/contentManage.api.ts'

const usePageMainFormHook = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentAllPagesPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState<any>({ ...initPageMainForm })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    // START SEO
    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }
    // END SEO

    // START SECTION NESTED FORM
    const _handleSectionInput = (name?: any, value: any = '') => {
        setFormRequest((prevState) => setNestedValue(prevState, name, value))
    }

    const _handleSectionRemoveNested = (name, index) => {
        setFormRequest((prevState) =>
            setRemoveNestedArray(prevState, name, index),
        )
    }
    // END SECTION NESTED FORM

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiPageContent.detail(id),
        // urlAPI: () => detailHomePageContent({ locale: id || locale }),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            setFormRequest(initMapPageMainForm(res))
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
                isEdit
                    ? apiPageContent.updateWithData(id, formRequest)
                    : apiPageContent.addWithData(formRequest),
            setIsLoading,
            isDirectToDetail: true,
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
        ...nestedForm,

        __handleSectionInput: _handleSectionInput,
        __handleSectionRemoveNested: _handleSectionRemoveNested,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel: () => __handleToDetail(id),
    }
}

export default usePageMainFormHook
