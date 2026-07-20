import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBoatContactFormCRUD,
    SrvBoatCRUD,
    SrvBoatStaticStatusForm,
    SrvBoatTypeCRUD,
} from '@/service/api/_boatManage.endPoint.ts'

export const apiBoat = { ..._shapeObjectMethodCRUD(SrvBoatCRUD) }

export const apiBoatType = { ..._shapeObjectMethodCRUD(SrvBoatTypeCRUD) }

export const apiBoatContactForm = {
    ..._shapeObjectMethodCRUD(SrvBoatContactFormCRUD),
}

// Static
export const getBoatFormStatus = () =>
    _shapeMethodGet(SrvBoatStaticStatusForm, 'tcSrvBoatStaticStatusForm')
