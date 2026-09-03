import { useState } from 'react'
import { useParams } from 'react-router'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'
import { apiPropertyReviews } from '@/service/api/property.api.ts'

const initForm = {
    propertyId: '',
    name: '',
    rating: '',
    review: '',
    isActive: 0,
    photos: [],
    deletePhotoIds: [],
}

const initMapForm = (passData) => ({
    propertyId: passData?.property?.id || '',
    name: passData.name || '',
    rating: passData.rating || '',
    review: passData.review || '',
    isActive: passData.isActive ? 1 : 0,
    photos: [],
    deletePhotoIds: [],
})

const usePropertyReviewMainFormHook = ({
    isEdit = false,
}: {
    isEdit?: boolean
}) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: propertyReviewsPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({ ...initForm })

    const [isLoading, setIsLoading] = useState(false)

    const [lisPreviousPhotos, setLisPreviousPhotos] = useState([])

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiPropertyReviews.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                //@ts-ignore
                setFormRequest(initMapForm(res))

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
                    ? apiPropertyReviews.updateWithData(id, formRequest)
                    : apiPropertyReviews.addWithData(formRequest),
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
        __isLoadingDetail: isLoadingDetail,
        __pageStateDataSearch: restored,
        ...nestedForm,

        __detail: dataDetail.__detailFormRequest,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default usePropertyReviewMainFormHook
