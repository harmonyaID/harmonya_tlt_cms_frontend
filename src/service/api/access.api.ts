import { _shapeMethodGet } from '@/service/api/_coreAPI/_config.api.ts'
import { SrvGetRole } from '@/service/api/_acccess.endPoint.ts'

export const getRoles = _shapeMethodGet(SrvGetRole, 'tcAllroles')
