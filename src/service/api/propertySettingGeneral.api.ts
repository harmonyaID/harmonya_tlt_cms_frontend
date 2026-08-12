import {
    _shapeMethodDel,
    _shapeMethodGet, _shapeMethodGetSearch, _shapeMethodPost,
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
    SrvPropertyTrash,
    SrvPropertyTrashWithId,
    SrvPropertyRestore,
    SrvPropertyTypeTrash,
    SrvPropertyTypeTrashWithId,
    SrvPropertyTypeRestore,
    SrvPropertyBedTypeTrash,
    SrvPropertyBedTypeTrashWithId,
    SrvPropertyBedTypeRestore,
    SrvPropertyRoomTypeTrash,
    SrvPropertyRoomTypeTrashWithId,
    SrvPropertyRoomTypeRestore,
    SrvPropertyTagTrash,
    SrvPropertyTagTrashWithId,
    SrvPropertyTagRestore,
} from '@/service/api/_property.endPoint.ts'

export const apiPropertyType = {
    ..._shapeObjectMethodCRUD(SrvPropertyTypeCRUD),
}
export const getPropertyTypeTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPropertyTypeTrash, search)
export const permanentDeletePropertyType = (id: string | number) =>
    _shapeMethodDel(SrvPropertyTypeTrashWithId(id))
export const restorePropertyType = (id: string | number) =>
    _shapeMethodPost(SrvPropertyTypeRestore(id))




export const apiPropertyBedType = {
    ..._shapeObjectMethodCRUD(SrvPropertyBedTypeCRUD),
}
export const getPropertyBedTypeTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPropertyBedTypeTrash, search)
export const permanentDeletePropertyBedType = (id: string | number) =>
    _shapeMethodDel(SrvPropertyBedTypeTrashWithId(id))
export const restorePropertyBedType = (id: string | number) =>
    _shapeMethodPost(SrvPropertyBedTypeRestore(id))



export const apiPropertyRoomType = {
    ..._shapeObjectMethodCRUD(SrvPropertyRoomTypeCRUD),
}
export const getPropertyRoomTypeTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPropertyRoomTypeTrash, search)
export const permanentDeletePropertyRoomType = (id: string | number) =>
    _shapeMethodDel(SrvPropertyRoomTypeTrashWithId(id))
export const restorePropertyRoomType = (id: string | number) =>
    _shapeMethodPost(SrvPropertyRoomTypeRestore(id))


export const apiPropertyTag = { ..._shapeObjectMethodCRUD(SrvPropertyTagCRUD) }
export const getPropertyTagTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPropertyTagTrash, search)
export const permanentDeletePropertyTag = (id: string | number) =>
    _shapeMethodDel(SrvPropertyTagTrashWithId(id))
export const restorePropertyTag = (id: string | number) =>
    _shapeMethodPost(SrvPropertyTagRestore(id))



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
