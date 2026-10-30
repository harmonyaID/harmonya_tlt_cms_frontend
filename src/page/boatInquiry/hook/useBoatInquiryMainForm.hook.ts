import { useNavigate, useParams } from 'react-router'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import boatPath from '@/path/boat.path.ts'
import { useState } from 'react'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDetailFormRequestHook from '@/hook/useDetailFormRequest.hook.ts'
import { apiBoat, apiBoatContactForm } from '@/service/api/boatManage.api.ts'
import { actionFormatDateStrict } from '@/helper/actionFormatDate.helper.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import { objDataSearchOther } from '@/config/objectPassState.config.ts'
import { boatInquiryGeneral } from '@/path/boatInquiry.path.ts'

const defaultActive = '1'

const initForm = {
    boatId: '',
    ticketType: 'one_way',
    fromLocation: '',
    toLocation: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    adultCount: '1',
    childCount: '0',
    infantCount: '0',

    name: '',
    phoneCountryCode: '',
    phone: '',
    email: '',

    needLandTransport: defaultActive,
    departurePickupPoint: '',
    departurePickupFlightNumber: '',
    departurePickupArrivalTime: '',
    departureDropOffPoint: '',
    departureDropOffLocation: '',
    departureDropOffArrivalTime: '',

    returnPickupPoint: '',
    returnPickupLocation: '',
    returnPickupCheckoutTime: '',
    returnDropOffPoint: '',
    returnDropOffLocation: '',

    bookedThroughTlt: defaultActive,
    tltBookingRefName: '',
    hasSurfboard: '0',
    message: '',
}

const initMapForm = (passData): Record<keyof typeof initForm, any> => ({
    boatId: passData?.boat?.id || '',
    ticketType: passData?.ticketType || 'one_way',
    adultCount: passData?.adultCount || '1',
    childCount: passData?.childCount || '0',
    infantCount: passData?.infantCount || '0',
    fromLocation: passData?.fromLocation || '',
    toLocation: passData?.toLocation || '',
    departureDate: passData?.departureDate || '',
    departureTime: passData?.departureTime || '',
    returnDate: passData?.returnDate || '',
    returnTime: passData?.returnTime || '',

    name: passData?.name || '',
    email: passData?.email || '',
    phone: passData?.phone || '',
    phoneCountryCode: passData?.phoneCountryCode || '',

    needLandTransport: passData?.fromLocation || defaultActive,
    departurePickupPoint: passData?.departurePickupPoint || '',
    departurePickupFlightNumber: passData?.departurePickupFlightNumber || '',
    departurePickupArrivalTime: passData?.departurePickupArrivalTime || '',
    departureDropOffPoint: passData?.departureDropOffPoint || '',
    departureDropOffLocation: passData?.departureDropOffLocation || '',
    departureDropOffArrivalTime: passData?.departureDropOffArrivalTime || '',

    returnPickupPoint: passData?.returnPickupPoint || '',
    returnPickupLocation: passData?.returnPickupLocation || '',
    returnPickupCheckoutTime: passData?.returnPickupCheckoutTime || '',
    returnDropOffPoint: passData?.returnDropOffPoint || '',
    returnDropOffLocation: passData?.returnDropOffLocation || '',

    bookedThroughTlt: passData?.bookedThroughTlt ? defaultActive : '0',
    tltBookingRefName: passData?.tltBookingRefName || '',
    hasSurfboard: passData?.hasSurfboard || '0',
    message: passData?.message || '',
})

const useBoatInquiryMainForm = () => {
    const { slug } = useParams()
    const navigate = useNavigate()

    const restored = useLocationStateHook()

    const [formRequest, setFormRequest] = useState<
        Record<keyof typeof initForm, any>
    >({ ...initForm })
    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleNavigateWithState = (
        url: string,
        extraState: Record<string, any> = {},
    ) => {
        navigate(url, {
            state: {
                ...objDataSearchOther(restored),
                ...extraState,
            },
        })
    }

    const _handleToMain = () => {
        _handleNavigateWithState(boatInquiryGeneral.main(slug))
    }

    const _handleSubmit = () => {
        const payload = {
            ...formRequest,
            departureDate: actionFormatDateStrict(
                formRequest.departureDate,
                'YYYY-MM-DD',
            ),
            returnDate: actionFormatDateStrict(
                formRequest.returnDate,
                'YYYY-MM-DD',
            ),
        }

        setIsLoading(true)
        apiBoatContactForm
            .add(payload)
            .then((res) => {
                if (isSuccess(res)) {
                    _handleToMain()
                }
            })
            .finally(() => setIsLoading(false))
    }

    return {
        __formRequest: formRequest,
        __isLoading: isLoading,
        __pageStateDataSearch: restored,
        __mainPath: boatInquiryGeneral.main(slug),

        __setFormRequest: setFormRequest,
        __handleChange: nestedForm._handleChange,

        __handleSubmit: _handleSubmit,
        __handleCancel: _handleToMain,
    }
}

export default useBoatInquiryMainForm
