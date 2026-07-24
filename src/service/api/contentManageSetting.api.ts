import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBlogCategoryCRUD,
    SrvBlogTagCRUD,
    SrvComponentContactFormTypeCRUD,
    SrvExperienceAreaCRUD,
    SrvExperienceCategoryCRUD,
    SrvExperienceInquiryFormsCRUD,
    SrvExperienceTypeCRUD,
    SrvFAQCRUD,
    SrvLanguageCRUD,
    SrvMediaPartnerCRUD,
    SrvTLTReviewCRUD,
    SrvWebContactFormCRUD,
} from '@/service/api/_contentManageSetting.endPoint'

export const apiLanguage = { ..._shapeObjectMethodCRUD(SrvLanguageCRUD) }

export const apiFAQ = { ..._shapeObjectMethodCRUD(SrvFAQCRUD) }

export const apiTLTReview = { ..._shapeObjectMethodCRUD(SrvTLTReviewCRUD) }

export const apiMediaPartner = {
    ..._shapeObjectMethodCRUD(SrvMediaPartnerCRUD),
}

export const apiWebContactForm = {
    ..._shapeObjectMethodCRUD(SrvWebContactFormCRUD),
}

export const apiContactFormType = {
    ..._shapeObjectMethodCRUD(SrvComponentContactFormTypeCRUD),
}

// Blog Setting
export const apiBlogCategory = {
    ..._shapeObjectMethodCRUD(SrvBlogCategoryCRUD),
}

export const apiBlogTag = { ..._shapeObjectMethodCRUD(SrvBlogTagCRUD) }

// Experience Setting
export const apiExperienceType = {
    ..._shapeObjectMethodCRUD(SrvExperienceTypeCRUD),
}

export const apiExperienceCategory = {
    ..._shapeObjectMethodCRUD(SrvExperienceCategoryCRUD),
}

export const apiExperienceArea = {
    ..._shapeObjectMethodCRUD(SrvExperienceAreaCRUD),
}

export const apiExperienceInquiryForm = {
    ..._shapeObjectMethodCRUD(SrvExperienceInquiryFormsCRUD),
}
