import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvFAQCRUD,
    SrvLanguageCRUD,
    SrvMediaPartnerCRUD,
    SrvTLTReviewCRUD,
} from '@/service/api/_contentManageSetting.endPoint'

export const apiLanguage = { ..._shapeObjectMethodCRUD(SrvLanguageCRUD) }

export const apiFAQ = { ..._shapeObjectMethodCRUD(SrvFAQCRUD) }

export const apiTLTReview = { ..._shapeObjectMethodCRUD(SrvTLTReviewCRUD) }

export const apiMediaPartner = {
    ..._shapeObjectMethodCRUD(SrvMediaPartnerCRUD),
}
