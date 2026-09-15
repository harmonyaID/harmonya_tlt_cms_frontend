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
    name: '',
    email: '',
    phone: '',
    ticketType: 'one_way',
    baliLandLocation: '',
    bookedThroughTlt: defaultActive,
    tltBookingRefName: '',
    adultCount: 1,
    childCount: 0,
    infantCount: 0,
    departureDateFromBali: '',
    departureTimeFromBali: '',
    pickUpLocationBali: '',
    flightNumber: '',
    arrivalTime: '',
    hotelNameBali: '',
    hotelContactBali: '',
    departureDateFromLembongan: '',
    departureTimeFromLembongan: '',
    dropOffLocationBali: '',
    flightTime: '',
    hotelNameLembongan: '',
    accommodationLembongan: '',
    passengerNames: '',
    hasSurfboard: defaultActive,
    hearAboutUs: '',
    message: '',
}

const initMapForm = (passData) => ({
    boatId: passData?.boat?.id || '',
    name: passData?.name || '',
    email: passData?.email || '',
    phone: passData?.phone || '',
    ticketType: passData?.ticketType || 'one_way',
    baliLandLocation: passData?.baliLandLocation || '',
    bookedThroughTlt: passData?.bookedThroughTlt ? defaultActive : '0',
    tltBookingRefName: passData?.tltBookingRefName || '',
    adultCount: passData?.adultCount || 1,
    childCount: passData?.childCount || 1,
    infantCount: passData?.infantCount || 1,
    departureDateFromBali: passData?.departureDateFromBali || '',
    departureTimeFromBali: passData?.departureTimeFromBali || '',
    pickUpLocationBali: passData?.pickUpLocationBali || '',
    flightNumber: passData?.flightNumber || '',
    arrivalTime: passData?.arrivalTime || '',
    hotelNameBali: passData?.hotelNameBali || '',
    hotelContactBali: passData?.hotelContactBali || '',
    departureDateFromLembongan: passData?.departureDateFromLembongan || '',
    departureTimeFromLembongan: passData?.departureTimeFromLembongan || '',
    dropOffLocationBali: passData?.dropOffLocationBali || '',
    flightTime: passData?.flightTime || '',
    hotelNameLembongan: passData?.hotelNameLembongan || '',
    accommodationLembongan: passData?.accommodationLembongan || '',
    passengerNames: passData?.passengerNames || '',
    hasSurfboard: passData?.hasSurfBoard ? defaultActive : '0',
    hearAboutUs: passData?.hearAboutUs || '',
    message: passData?.message || '',
})

const useBoatInquiryMainForm = () => {
    const { slug } = useParams()
    const navigate = useNavigate()

    const restored = useLocationStateHook()

    const [formRequest, setFormRequest] = useState({ ...initForm })
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
            departureDateFromBali: actionFormatDateStrict(
                formRequest.departureDateFromBali,
                'YYYY-MM-DD',
            ),
            departureDateFromLembongan: actionFormatDateStrict(
                formRequest.departureDateFromLembongan,
                'YYYY-MM-DD',
            ),
        }

        setIsLoading(true)
        apiBoatContactForm
            .addWithData(payload)
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
