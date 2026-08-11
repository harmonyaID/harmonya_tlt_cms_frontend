import {
    _shapeMethodDel, _shapeMethodGetSearch,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvPropertyCRUD,
    SrvPropertyPhotosCreate,
    SrvPropertyPhotosRemove,
    SrvPropertyRestore,
    SrvPropertyReviewCRUD,
    SrvPropertyTrash,
    SrvPropertyTrashWithId,
} from '@/service/api/_property.endPoint.ts'

export const apiProperty = {
    ..._shapeObjectMethodCRUD(SrvPropertyCRUD),
}

export const uploadPhotosProperty = (propertyId, formRequest) =>
    _shapeMethodPost(
        SrvPropertyPhotosCreate(propertyId),
        formRequest,
        true,
        '',
        true,
    )

export const removePhotosProperty = (propertyId, photoId) =>
    _shapeMethodDel(SrvPropertyPhotosRemove(propertyId, photoId))

export const getPropertyTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPropertyTrash, search)

export const permanentDeleteProperty = (id: string | number) =>
    _shapeMethodDel(SrvPropertyTrashWithId(id))

export const restoreProperty = (id: string | number) =>
    _shapeMethodPost(SrvPropertyRestore(id))

export const apiPropertyReviews = {
    ..._shapeObjectMethodCRUD(SrvPropertyReviewCRUD),
}
