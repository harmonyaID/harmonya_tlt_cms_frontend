import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'

const defaultActive = '1'

const initForm = {
    categoryId: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '', // text editor
    author: '',
    publishedAt: '',
    isActive: defaultActive,
    tagIds: [],
    thumbnail: '',
}

const initMapForm = (passData) => ({
    categoryId: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '', // text editor
    author: '',
    publishedAt: '',
    isActive: defaultActive,
    tagIds: [],
    thumbnail: '',
})

const useContentBlogMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: boatPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({ ...initForm })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiBoat.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest(initMapForm(res))
                // __setList(res?.employees || [])
                // if (res?.photos?.length > 0) {
                //     setLisPreviousPhotos(
                //         res.photos.map((photo) => ({
                //             ...photo,
                //             isDeleted: false,
                //         })),
                //     )
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
                    ? apiBoat.updateWithData(id, formRequest)
                    : apiBoat.addWithData(formRequest),
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
    }
}

export default useContentBlogMainForm
