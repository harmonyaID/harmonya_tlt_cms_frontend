import {
    _shapeMethodDel,
    _shapeMethodGetSearch,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvPropertyCRUD,
    SrvPropertyPhotosCreate,
    SrvPropertyPhotosRemove,
    SrvPropertyRestore,
    SrvPropertyTrash,
    SrvPropertyTrashWithId,
    SrvPropertyVariantCRUD,
    SrvPropertyVariantPhotosCreate,
    SrvPropertyVariantPhotosRemove,
    SrvPropertyVariantRestore,
    SrvPropertyVariantTrash,
    SrvPropertyVariantTrashWithId,
} from '@/service/api/_property.endPoint.ts'

export const apiPropertyVariant = {
    ..._shapeObjectMethodCRUD(SrvPropertyVariantCRUD),
}

export const updatePropertyVariant = (id, formRequest) =>
    _shapeMethodPost(SrvPropertyVariantCRUD.update(id), formRequest)

export const uploadPhotosProperty = (propertyId, formRequest) =>
    _shapeMethodPost(
        SrvPropertyVariantPhotosCreate(propertyId),
        formRequest,
        true,
        '',
        true,
    )

export const removePhotosProperty = (propertyId, photoId) =>
    _shapeMethodDel(SrvPropertyVariantPhotosRemove(propertyId, photoId))

export const getPropertyTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPropertyVariantTrash, search)

export const permanentDeleteProperty = (id: string | number) =>
    _shapeMethodDel(SrvPropertyVariantTrashWithId(id))

export const restoreProperty = (id: string | number) =>
    _shapeMethodPost(SrvPropertyVariantRestore(id))
