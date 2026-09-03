import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import userPath from '@/path/user.path.ts'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import { apiStaff } from '@/service/api/staff.api.ts'

const genderDefault = 1
const isActiveDefault = true
const isSuperadminDefault = false

const initForm = {
    fullName: '',
    email: '',
    phone: '',
    genderId: genderDefault,
    countryId: '',
    address: '',
    isActive: isActiveDefault,
    isSuperadmin: isSuperadminDefault,
    password: '',
    confirmPassword: '',
}

// type FormType = typeof initForm

const initMapForm = (passData) => ({
    fullName: passData?.fullName || '',
    email: passData?.email || '',
    phone: passData?.phone || '',
    genderId: passData?.gender?.id || genderDefault,
    countryId: passData?.country?.id || '',
    address: passData?.address || '',
    isActive: passData?.isActive ? true : false,
    isSuperadmin: passData?.isSuperadmin ? true : isSuperadminDefault,
    // password: passData?.password || '',
    // confirmPassword: passData?.confirmPassword || '',
})

const useUserMainForm = ({
    isEdit = false,
    profileId = '',
}: {
    isEdit?: boolean
    profileId?: string
}) => {
    const navigate = useNavigate()

    const id = profileId ? profileId : useParams().id

    const restored = useLocationStateHook()

    const { __handleSubmit, __handleCancel, __handleToMain } =
        usePageFlowHandlerHook({
            basePath: userPath,
            pathFromKey: restored.from,
        })

    const [formRequest, setFormRequest] = useState({ ...initForm })

    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    // Get Detail
    const dataDetail = useDetailFormRequestHook({
        urlAPI: () => apiStaff.detail(id),
        formRequest,
        setFormRequest,
        isManualSetFormRequest: true,
        handleSetFormRequest: (res) => {
            if (isEdit) {
                // @ts-ignore
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

    // Submit
    const _handleSubmit = () => {
        return __handleSubmit({
            apiCall: () =>
                isEdit
                    ? apiStaff.update(id, formRequest)
                    : apiStaff.add(formRequest),
            setIsLoading,
            isDirectToDetail: false,
            callBack: () => {
                profileId ? navigate(userPath.myProfile) : __handleToMain()
            },
        })
    }

    const _handleCancel = () => {
        profileId ? navigate(userPath.myProfile) : __handleCancel(restored)
    }

    return {
        __formRequest: formRequest,
        __isLoading: isLoading,
        __isLoadingDetail: isLoadingDetail,
        __pageStateDataSearch: restored,

        __dataDetail: dataDetail?.__detailFormRequest || {},

        // Change Form
        __setFormRequest: setFormRequest,
        __handleChange: nestedForm._handleChange,

        // Submit / Cancel
        __handleSubmit: _handleSubmit,
        __handleCancel: _handleCancel,
    }
}

export default useUserMainForm
