import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPIProperty: any =
    String(import.meta.env.VITE_BASE_API) + '/properties'

// Property
export const SrvPropertyCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPIProperty)
export const SrvPropertyPhotosCreate = (propertyId) =>
    baseAPIProperty + '/' + propertyId + '/photos'
export const SrvPropertyPhotosRemove = (propertyId, photoId) =>
    SrvPropertyPhotosCreate(propertyId) + '/' + photoId
export const SrvPropertyTrash = baseAPIProperty + '/trash'
export const SrvPropertyTrashWithId = (id: string | number = ''): string =>
    baseAPIProperty + '/trash/' + id
export const SrvPropertyRestore = (id: string | number = ''): string =>
    baseAPIProperty + '/trash/' + id + '/restore'

// Property Inquiry
export const SrvPropertyInquiryCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/inquiry-forms',
)

// Property Contact Form
export const SrvPropertyContactFormCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/contact-forms',
)

// Reviews Property
const baseAPIPropertyReviews = baseAPIProperty + '/reviews'
export const SrvPropertyReviewCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIPropertyReviews,
)
export const SrvPropertyReviewsTrash = baseAPIPropertyReviews + '/trash'
export const SrvPropertyReviewsTrashWithId = (
    id: string | number = '',
): string => baseAPIPropertyReviews + '/trash/' + id
export const SrvPropertyReviewsRestore = (id: string | number = ''): string =>
    baseAPIPropertyReviews + '/trash/' + id + '/restore'

// Setting
const baseAPIPropertyType = baseAPIProperty + '/types'
export const SrvPropertyTypeCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPIPropertyType)
export const SrvPropertyTypeTrash = baseAPIPropertyType + '/trash'
export const SrvPropertyTypeTrashWithId = (id: string | number = ''): string =>
    baseAPIPropertyType + '/trash/' + id
export const SrvPropertyTypeRestore = (id: string | number = ''): string =>
    baseAPIPropertyType + '/trash/' + id + '/restore'

const baseAPIBedType = baseAPIProperty + '/bed-types'
export const SrvPropertyBedTypeCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPIBedType)
export const SrvPropertyBedTypeTrash = baseAPIBedType + '/trash'
export const SrvPropertyBedTypeTrashWithId = (
    id: string | number = '',
): string => baseAPIBedType + '/trash/' + id
export const SrvPropertyBedTypeRestore = (id: string | number = ''): string =>
    baseAPIBedType + '/trash/' + id + '/restore'

const baseAPIRoomType = baseAPIProperty + '/room-types'
export const SrvPropertyRoomTypeCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPIRoomType)
export const SrvPropertyRoomTypeTrash = baseAPIRoomType + '/trash'
export const SrvPropertyRoomTypeTrashWithId = (
    id: string | number = '',
): string => baseAPIRoomType + '/trash/' + id
export const SrvPropertyRoomTypeRestore = (id: string | number = ''): string =>
    baseAPIRoomType + '/trash/' + id + '/restore'

const baseAPITag = baseAPIProperty + '/tags'
export const SrvPropertyTagCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPITag)
export const SrvPropertyTagTrash = baseAPITag + '/trash'
export const SrvPropertyTagTrashWithId = (id: string | number = ''): string =>
    baseAPITag + '/trash/' + id
export const SrvPropertyTagRestore = (id: string | number = ''): string =>
    baseAPITag + '/trash/' + id + '/restore'

// Setting Static
const baseAPIDataStatic =
    String(import.meta.env.VITE_BASE_API) + '/components/statics'

export const SrvPropertyStaticUnitType =
    baseAPIDataStatic + '/property-unit-types'

export const SrvPropertyStaticListingType =
    baseAPIDataStatic + '/property-listing-types'

export const SrvPropertyStaticStatus = baseAPIDataStatic + '/property-statuses'

export const SrvPropertyStaticAddressType =
    baseAPIDataStatic + '/property-address-types'

export const SrvPropertyStaticSourceType =
    baseAPIDataStatic + '/property-source-types'

export const SrvPropertyStaticAvailabilityType =
    baseAPIDataStatic + '/property-availability-types'

export const SrvPropertyStaticCleaningFeeType =
    baseAPIDataStatic + '/property-cleaning-fee-types'

export const SrvPropertyStaticCleaningStatuses =
    baseAPIDataStatic + '/property-cleaning-statuses'

export const SrvPropertyStaticAdvanceNoticeUnits =
    baseAPIDataStatic + '/property-advance-notice-units'

export const SrvPropertyStaticGuestySyncStatuses =
    baseAPIDataStatic + '/property-guesty-sync-statuses'

export const SrvPropertyStaticMediaPartnerType =
    baseAPIDataStatic + '/media-partner-type'

export const SrvPropertyStaticStatusForm = baseAPIDataStatic + '/status-form'
