import {
    _shapeMethodDel,
    _shapeMethodGet, _shapeMethodGetSearch, _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBoatContactFormCRUD,
    SrvBoatCRUD,
    SrvBoatStaticStatusForm,
    SrvBoatTypeCRUD,
} from '@/service/api/_boatManage.endPoint.ts'

export const apiBoat = {
    ..._shapeObjectMethodCRUD(SrvBoatCRUD),
    trash: (search:any) => _shapeMethodGetSearch(SrvBoatCRUD.trash, search),
    permanentDelete: (id: any) => _shapeMethodDel(SrvBoatCRUD.trashWithId(id)),
    restore: (id: any) => _shapeMethodPost(SrvBoatCRUD.restore(id))
}

export const apiBoatType = { ..._shapeObjectMethodCRUD(SrvBoatTypeCRUD) }

export const apiBoatContactForm = {
    ..._shapeObjectMethodCRUD(SrvBoatContactFormCRUD),
}

// Static
export const getBoatFormStatus = () =>
    _shapeMethodGet(SrvBoatStaticStatusForm, 'tcSrvBoatStaticStatusForm')
