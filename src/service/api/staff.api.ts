import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import { SrvStaffCRUD } from '@/service/api/_staff.endPoint.ts'

export const apiStaff = { ..._shapeObjectMethodCRUD(SrvStaffCRUD) }
