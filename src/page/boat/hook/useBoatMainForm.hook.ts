import { useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'

const defaultActive = '1'

const formCustomInformation = (name, value, order) => ({ name, value, order })

const initForm = {
    boatComponentTypeId: '',
    description: '',
    isActive: defaultActive,
    priceFile: '',
    promoPhotos: [],
    photos: [],
    customInformations: [],
}

const initMapForm = (passData) => ({
    // name: passData.name || '',
    // description: passData.description || '',
    // routeFrom: passData.routeFrom || '',
    // routeTo: passData.routeTo || '',
    // notes: passData.notes || '',
    // discountPercentage: passData.discountPercentage || '',

    boatComponentTypeId: passData?.boatComponentType?.id || '',
    description: passData.description || '',
    customInformations: passData?.customInformations?.length
        ? passData.customInformations
        : [],
    priceFile: passData?.priceFile || '',
    isActive: passData.isActive ? defaultActive : '0',
    photos: [],
    deletePhotoIds: [],
    // promoPhotos: passData?.promoPhotos.length ? passData.promoPhotos : [],
    promoPhotos: [],
    // deletePromoPhotoIds: [],
})

const useBoatMainFormHook = ({ isEdit = false }: { isEdit?: boolean }) => {
    const { id } = useParams()

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: boatPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({ ...initForm })

    const [isLoading, setIsLoading] = useState(false)

    const [lisPreviousPhotos, setLisPreviousPhotos] = useState([])

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
                if (res?.photos?.length > 0) {
                    setLisPreviousPhotos(
                        res.photos.map((photo) => ({
                            ...photo,
                            isDeleted: false,
                        })),
                    )
                }
            }
        },
        isAutoGet: isEdit,
    })

    const isLoadingDetail = isEdit
        ? dataDetail.__isLoadingDetailFormRequest
        : false

    const _handleChangeTime = (
        index: number,
        name: string,
        value: string | number,
    ) => {
        setFormRequest((prevState) => {
            const newState = { ...prevState }
            newState[name][index] = value

            return newState
        })
    }

    const _handleToggleDeletePrevPhotos = (passId: string | number) => {
        setFormRequest((prevState) => {
            const newState = { ...prevState }

            const photoIndex = newState['deletePhotoIds'].findIndex(
                (id) => id === passId,
            )

            if (photoIndex > -1) {
                newState['deletePhotoIds'].splice(photoIndex, 1)
            } else {
                newState['deletePhotoIds'].push(passId)
            }

            return newState
        })

        setLisPreviousPhotos((prevState) => {
            const newState = [...prevState]

            const index = newState.findIndex((vm) => vm.id === passId)
            if (index > -1) {
                newState[index].isDeleted = !newState[index].isDeleted
            }

            return newState
        })
    }

    // Start Handle Custom Info
    const _handleCustomInfoAdd = () => {
        nestedForm._handleArrToggle(-1, 'customInformations', {
            name: '',
            value: '',
            order: formRequest.customInformations.length + 1,
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
    // End Handle Custom Info

    const _handleSubmit = () => {
        return __handleSubmit({
            apiCall: () =>
                isEdit
                    ? apiBoat.updateWithData(id, formRequest)
                    : apiBoat.addWithData(formRequest),
            setIsLoading,
            isDirectToDetail: true,
            // callBack: () => {
            //     __handleToMain()
            // },
        })
    }

    return {
        __formRequest: formRequest,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,
        __pageStateDataSearch: restored,

        // Prev Photos
        __handleToggleDeletePrevPhotos: _handleToggleDeletePrevPhotos,
        __lisPreviousPhotos: lisPreviousPhotos,

        // Chang Form
        __setFormRequest: setFormRequest,
        __handleChange: nestedForm._handleChange,
        __handleArrToggle: nestedForm._handleArrToggle,
        __handleArrChange: nestedForm._handleArrChange,
        __handleChangeTime: _handleChangeTime,
        __handleCustomInfoAdd: _handleCustomInfoAdd,
        __handleCustomInfoRemove: _handleCustomInfoRemove,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel,
    }
}

export default useBoatMainFormHook
