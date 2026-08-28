import { isEmpty } from 'lodash'
import { initSEOFormConfig, mapSEOFormConfig } from '@/config/SEOForm.config.ts'

export const propertyMapFormAddress = (passData: Record<string, any> = {}) => ({
    buildingName: passData.buildingName || '',
    typeId: passData?.type?.id || '',
    address: passData.address || '',
    latitude: passData.latitude || '',
    longitude: passData.longitude || '',
    zipCode: passData.zipCode || '',
})

export const propertyMapFormRoom = (passData: Record<string, any> = {}) => ({
    roomTypeId: passData?.roomType?.id || '',
    bedTypeId: passData?.bedType?.id || '',
    bedCount: passData.bedCount || '',
    label: passData.label || '',
    order: passData.order || '',
})

export const propertyMapFormDesc = (passData: Record<string, any> = {}) => ({
    channel: passData.channel || '',
    language: passData.language || '',
    title: passData.title || '',
    summary: passData.summary || '',
    theSpace: passData.theSpace || '',
    guestAccess: passData.guestAccess || '',
    theNeighborhood: passData.theNeighborhood || '',
    gettingAround: passData.gettingAround || '',
    otherThingsToNote: passData.otherThingsToNote || '',

    // gettingAround: passData.gettingAround || '',
    // guestAccess: passData.guestAccess || '',
    // language: passData.language || '',
    // otherThingsToNote: passData.otherThingsToNote || '',
    // summary: passData.summary || '',
    // theNeighborhood: passData.theNeighborhood || '',
    // theSpace: passData.theSpace || '',
    // title: passData.title || '',
})

export const propertyInitForm = {
    nickname: '',
    propertyTypeId: '',
    unitTypeId: '',
    listingTypeId: '',
    occupancy: '',
    statusId: '',
    cleaningStatusId: '',
    sourceTypeId: '',
    currency: 'AUD',
    addresses: [],
    guestInfo: {
        hostName: '',
        wifiName: '',
        wifiPassword: '',
        // cleaningInstructions: ''
        // houseManual: ''
        // interactionWithGuests: ''
        // parkingInstructions: ''
        // trashInstructions: ''
    },
    rooms: [],
    availability: {
        defaultAvailabilityId: '',
        advanceNoticeValue: '',
        advanceNoticeUnitId: '',
        minLengthOfStay: '',
        maxLengthOfStay: '',
    },
    pricing: {
        weekdayBasePrice: '',
        cleaningFee: '',
        cleaningFeeTypeId: '',
        weeklyDiscount: '',
        monthlyDiscount: '',
    },
    descriptions: [],
    amenityIds: [],
    tagIds: [],
    features: [],
    seo: {
        ...initSEOFormConfig,
    },
}

export const propertyMapInitForm = (passData) => ({
    nickname: passData.nickname || '',
    propertyTypeId: passData?.type?.id || '',
    unitTypeId: passData?.unitType?.id || '',
    listingTypeId: passData?.listingType?.id || '',
    occupancy: passData.occupancy || '',
    statusId: passData?.status?.id || '',
    cleaningStatusId: passData?.cleaningStatus?.id || '',
    sourceTypeId: passData?.sourceType?.id || '',
    currency: 'AUD',
    addresses: !isEmpty(passData.addresses)
        ? passData.addresses.map((vm) => propertyMapFormAddress(vm))
        : [],
    guestInfo: {
        hostName: passData.guestInfo.hostName || '',
        wifiName: passData.guestInfo.wifiName || '',
        wifiPassword: passData.guestInfo.wifiPassword || '',
    },
    rooms: !isEmpty(passData.rooms)
        ? passData.rooms.map((vm) => propertyMapFormRoom(vm))
        : [],
    availability: {
        defaultAvailabilityId:
            passData?.availability?.defaultAvailability?.id || '',
        advanceNoticeValue: passData?.availability?.advanceNoticeValue || '',
        advanceNoticeUnitId:
            passData?.availability?.advanceNoticeUnit?.id || '',
        minLengthOfStay: passData?.availability?.minLengthOfStay || '',
        maxLengthOfStay: passData?.availability?.maxLengthOfStay || '',
    },
    pricing: {
        weekdayBasePrice: passData?.pricing?.weekdayBasePrice || '',
        cleaningFee: passData?.pricing?.cleaningFee || '',
        cleaningFeeTypeId: passData?.pricing?.cleaningFeeType?.id || '',
        weeklyDiscount: passData?.pricing?.weeklyDiscount || '',
        monthlyDiscount: passData?.pricing?.monthlyDiscount || '',
    },
    descriptions: !isEmpty(passData.descriptions)
        ? passData.descriptions.map((vm) => propertyMapFormDesc(vm))
        : [],
    amenityIds: [],
    tagIds: [],
    features: [],
    seo: { ...mapSEOFormConfig(passData?.seo || {}) },
})
