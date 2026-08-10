import {
    _shapeMethodDel,
    _shapeMethodGet, _shapeMethodGetSearch, _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBoatContactFormCRUD,
    SrvBoatCRUD,
    SrvBoatRestore,
    SrvBoatStaticStatusForm,
    SrvBoatTrash,
    SrvBoatTrashWithId,
    SrvBoatTypeCRUD,
} from '@/service/api/_boatManage.endPoint.ts'
import {
    SrvStaffRestore,
    SrvStaffTrash,
    SrvStaffTrashWithId,
} from '@/service/api/_staff.endPoint.ts'

export const apiBoat = {..._shapeObjectMethodCRUD(SrvBoatCRUD)}

export const getBoatTrash = (search: any) =>
    _shapeMethodGetSearch(SrvBoatTrash, search)

export const permanentDeleteBoat = (id: string | number) =>
    _shapeMethodDel(SrvBoatTrashWithId(id))

export const restoreBoat = (id: string | number) =>
    _shapeMethodPost(SrvBoatRestore(id))


export const apiBoatType = { ..._shapeObjectMethodCRUD(SrvBoatTypeCRUD) }

export const apiBoatContactForm = {
    ..._shapeObjectMethodCRUD(SrvBoatContactFormCRUD),
}

// Static
export const getBoatFormStatus = () =>
    _shapeMethodGet(SrvBoatStaticStatusForm, 'tcSrvBoatStaticStatusForm')
