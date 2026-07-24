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

// Reviews Property
export const SrvPropertyReviewCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/reviews',
)

// Setting
export const SrvPropertyTypeCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/types',
)

export const SrvPropertyBedTypeCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/bed-types',
)

export const SrvPropertyRoomTypeCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/room-types',
)

export const SrvPropertyTagCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPIProperty + '/tags',
)

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
