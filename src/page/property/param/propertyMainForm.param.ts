export const propertyMapFormAddress = (passData: Record<string, any> = {}) => ({
    typeId: passData.typeId || '',
    address: passData.address || '',
    latitude: passData.latitude || '',
    longitude: passData.longitude || '',
    zipCode: passData.zipCode || '',
})

export const propertyMapFormRoom = (passData: Record<string, any> = {}) => ({
    roomTypeId: passData.id || '',
    label: passData.label || '',
    order: passData.order || '',
})

export const propertyMapFormDesc = (passData: Record<string, any> = {}) => ({
    channel: passData.channel || '',
    language: passData.language || '',
    title: passData.title || '',
    summary: passData.summary || '',
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
    seo: {
        title: '',
        slug: '',
        robotIndex: '',
        robotFollow: '',
        structuredData: {
            // JSON
            '@context': '',
            '@type': '',
        },
    },
}

export const propertyMapInitForm = (passData) => ({})
