import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvPropertyTypeCRUD,
    SrvPropertyBedTypeCRUD,
    SrvPropertyRoomTypeCRUD,
    SrvPropertyTagCRUD,

    // Static
    SrvPropertyStaticUnitType,
    SrvPropertyStaticListingType,
    SrvPropertyStaticStatus,
    SrvPropertyStaticAddressType,
    SrvPropertyStaticSourceType,
    SrvPropertyStaticAvailabilityType,
    SrvPropertyStaticCleaningFeeType,
    SrvPropertyStaticCleaningStatuses,
    SrvPropertyStaticAdvanceNoticeUnits,
    SrvPropertyStaticGuestySyncStatuses,
    SrvPropertyStaticMediaPartnerType,
    SrvPropertyStaticStatusForm,
} from '@/service/api/_property.endPoint.ts'

export const apiPropertyType = {
    ..._shapeObjectMethodCRUD(SrvPropertyTypeCRUD),
}

export const apiPropertyBedType = {
    ..._shapeObjectMethodCRUD(SrvPropertyBedTypeCRUD),
}

export const apiPropertyRoomType = {
    ..._shapeObjectMethodCRUD(SrvPropertyRoomTypeCRUD),
}

export const apiPropertyTag = { ..._shapeObjectMethodCRUD(SrvPropertyTagCRUD) }

// Static Setting
export const getStaticUnitType = () =>
    _shapeMethodGet(SrvPropertyStaticUnitType, 'tcSrvPropertyStaticUnitType')

export const getStaticListingType = () =>
    _shapeMethodGet(
        SrvPropertyStaticListingType,
        'tcSrvPropertyStaticListingType',
    )

export const getStaticStatus = () =>
    _shapeMethodGet(SrvPropertyStaticStatus, 'tcSrvPropertyStaticStatus')

export const getStaticAddressType = () =>
    _shapeMethodGet(
        SrvPropertyStaticAddressType,
        'tcSrvPropertyStaticAddressType',
    )

export const getStaticSourceType = () =>
    _shapeMethodGet(
        SrvPropertyStaticSourceType,
        'tcSrvPropertyStaticSourceType',
    )

export const getStaticAvailabilityType = () =>
    _shapeMethodGet(
        SrvPropertyStaticAvailabilityType,
        'tcSrvPropertyStaticAvailabilityType',
    )

export const getStaticCleaningFeeType = () =>
    _shapeMethodGet(
        SrvPropertyStaticCleaningFeeType,
        'tcSrvPropertyStaticCleaningFeeType',
    )

export const getStaticCleaningStatus = () =>
    _shapeMethodGet(
        SrvPropertyStaticCleaningStatuses,
        'tcSrvPropertyStaticCleaningStatuses',
    )

export const getStaticAdvanceNoticeUnit = () =>
    _shapeMethodGet(
        SrvPropertyStaticAdvanceNoticeUnits,
        'tcSrvPropertyStaticAdvanceNoticeUnits',
    )

export const getStaticGuestySyncStatus = () =>
    _shapeMethodGet(
        SrvPropertyStaticGuestySyncStatuses,
        'tcSrvPropertyStaticGuestySyncStatuses',
    )

export const getStaticMediaPartnerType = () =>
    _shapeMethodGet(
        SrvPropertyStaticMediaPartnerType,
        'tcSrvPropertyStaticMediaPartnerType',
    )

export const getStaticStatusForm = () =>
    _shapeMethodGet(
        SrvPropertyStaticStatusForm,
        'tcSrvPropertyStaticStatusForm',
    )
