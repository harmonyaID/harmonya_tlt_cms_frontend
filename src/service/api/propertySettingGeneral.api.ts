import { _shapeObjectMethodCRUD } from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvPropertyTypeCRUD,
    SrvPropertyBedTypeCRUD,
    SrvPropertyRoomTypeCRUD,
    SrvPropertyTagCRUD,
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
