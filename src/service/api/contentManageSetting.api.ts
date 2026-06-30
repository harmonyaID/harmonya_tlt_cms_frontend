import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvFAQCRUD,
    SrvLanguageCRUD,
} from '@/service/api/_contentManageSetting.ts'

export const apiLanguage = { ..._shapeObjectMethodCRUD(SrvLanguageCRUD) }

export const apiFAQ = { ..._shapeObjectMethodCRUD(SrvFAQCRUD) }
