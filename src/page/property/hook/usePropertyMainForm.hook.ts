import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyPath from '@/path/property.path.ts'
import { useState } from 'react'
import {
    propertyMapFormAddress,
    propertyMapFormRoom,
    propertyMapFormDesc,
    propertyInitForm,
    propertyMapInitForm,
} from '@/page/property/param/propertyMainForm.param.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import { apiBlogContent } from '@/service/api/contentManage.api.ts'
import { apiProperty } from '@/service/api/property.api.ts'

const usePropertyMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: propertyPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({ ...propertyInitForm })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    // Data Detail
    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiBlogContent.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...propertyMapInitForm(res),
                })

                // if (res?.tags && res?.tags.length) {
                //     setListTags(res?.tags)
                // }
                //
                // if (res?.thumbnail) {
                //     setPreviewThumbnail(res.thumbnail)
                // }
                //
                // if (res?.seo?.thumbnail) {
                //     setSetSEOThumbnail(res.seo.thumbnail)
                // }
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
                    ? apiProperty.update(id, formRequest)
                    : apiBlogContent.add(formRequest),
            setIsLoading,
            isDirectToDetail: true,
        })
    }

    return {
        ...nestedForm,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,

        // Data Page
        __pageStateDataSearch: restored,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default usePropertyMainForm
