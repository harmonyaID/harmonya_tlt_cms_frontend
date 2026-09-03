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
    SrvBoatTypeRestore,
    SrvBoatTypeTrash,
    SrvBoatTypeTrashWithId,
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
export const getBoatTypeTrash = (search: any) =>
    _shapeMethodGetSearch(SrvBoatTypeTrash, search)
export const permanentDeleteBoatType = (id: string | number) =>
    _shapeMethodDel(SrvBoatTypeTrashWithId(id))
export const restoreBoatType = (id: string | number) =>
    _shapeMethodPost(SrvBoatTypeRestore(id))

export const apiBoatContactForm = {
    ..._shapeObjectMethodCRUD(SrvBoatContactFormCRUD),
}

// Static
export const getBoatFormStatus = () =>
    _shapeMethodGet(SrvBoatStaticStatusForm, 'tcSrvBoatStaticStatusForm')
