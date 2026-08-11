import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvAmenitiesCategoryCRUD,
    SrvAmenitiesCRUD,
    SrvCountries,
    SrvInfoWebsite,
    SrvInfoWebsiteUpdate,
} from '@/service/api/_setting.endPoint.ts'

export const getCountries = () =>
    _shapeMethodGet(SrvCountries, 'tcSrvCountries')

// Info Website
export const getInfoWebsite = () =>
    _shapeMethodGet(SrvInfoWebsite, 'tcSrvInfoWebsiteDetail')

export const updateInfoWebsite = (id: string | number) =>
    _shapeMethodGet(SrvInfoWebsiteUpdate(id), 'tcSrvInfoWebsiteUpdate')

// Amenities
export const apiAmenitiesCRUD = {
    ..._shapeObjectMethodCRUD(SrvAmenitiesCRUD),
}

export const apiAmenitiesCategoryCRUD = {
    ..._shapeObjectMethodCRUD(SrvAmenitiesCategoryCRUD),
}
