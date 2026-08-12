import {
    _shapeMethodDel,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvPropertyCRUD,
    SrvPropertyPhotosCreate,
    SrvPropertyPhotosRemove,
    SrvPropertyReviewCRUD,
} from '@/service/api/_property.endPoint.ts'

export const apiProperty = {
    ..._shapeObjectMethodCRUD(SrvPropertyCRUD),
}
export const updateProperty = (id, formRequest) =>
    _shapeMethodPost(SrvPropertyCRUD.update(id), formRequest)

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

export const apiPropertyReviews = {
    ..._shapeObjectMethodCRUD(SrvPropertyReviewCRUD),
}
