import { useState } from 'react'
import { useParams } from 'react-router'
import { isEmpty } from 'lodash'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import {
    propertyMapFormAddress,
    propertyMapFormRoom,
    propertyMapFormDesc,
    propertyInitForm,
    propertyMapInitForm,
} from '@/page/property/param/propertyMainForm.param.ts'
import propertyPath from '@/path/property.path.ts'
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

    const [seoThumbnail, setSetSEOThumbnail] = useState('')

    const [formRequest, setFormRequest] = useState({ ...propertyInitForm })

    const [isLoading, setIsLoading] = useState(false)

    const [listTags, setListTags] = useState<any[]>([])

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleSEOThumbnailRemove = () => {
        setSetSEOThumbnail('')
        nestedForm.__handleChangeWithParent('thumbnail', '', 'seo')
    }

    // Data Detail
    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiProperty.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        // isHideSidebar: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest({
                    ...propertyMapInitForm(res),
                    tagIds: !isEmpty(res.tags)
                        ? res.tags.map((vm) => vm.id)
                        : [],
                })

                if (res?.tags && res?.tags.length) {
                    setListTags(res?.tags)
                }

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
                    : apiProperty.add(formRequest),
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

        // Tags
        // __handleTagChoose: _handleTagChoose,
        // __handleTagRemove: _handleTagRemove,
        __listTags: listTags,
        __setListTags: setListTags,

        // SEO
        __seoThumbnail: seoThumbnail,
        __setSetSEOThumbnail: setSetSEOThumbnail,
        __handleSEOThumbnailRemove: _handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default usePropertyMainForm
