import {
    _shapeMethodDel,
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBlogCategoryCRUD,
    SrvBlogCategoryRestore,
    SrvBlogCategoryTrash,
    SrvBlogCategoryTrashWithId,
    SrvBlogTagCRUD,
    SrvBlogTagRestore,
    SrvBlogTagTrash,
    SrvBlogTagTrashWithId,
    SrvComponentContactFormTypeCRUD,
    SrvExperienceAreaCRUD,
    SrvExperienceAreaRestore,
    SrvExperienceAreaTrash,
    SrvExperienceAreaTrashWithId,
    SrvExperienceCategoryCRUD,
    SrvExperienceInquiryFormsCRUD,
    SrvExperienceTypeCRUD,
    SrvExperienceTypeRestore,
    SrvExperienceTypeTrash,
    SrvExperienceTypeTrashWithId,
    SrvFAQCRUD,
    SrvFAQRestore,
    SrvFAQTrash,
    SrvFAQTrashWithId,
    SrvFAQTypeCRUD,
    SrvFAQTypeRestore,
    SrvFAQTypeTrash,
    SrvFAQTypeTrashWithId,
    SrvLanguageCRUD,
    SrvMediaPartnerCRUD,
    SrvMediaPartnerRestore,
    SrvMediaPartnerTrash,
    SrvMediaPartnerTrashWithId,
    SrvTLTReviewCRUD,
    SrvTLTReviewRestore,
    SrvTLTReviewTrash,
    SrvTLTReviewTrashWithId,
    SrvTLTTestimonialCRUD,
    SrvTLTTestimonialRestore,
    SrvTLTTestimonialTrash,
    SrvTLTTestimonialTrashWithId,
    SrvWebContactFormCRUD,
} from '@/service/api/_contentManageSetting.endPoint'
import {
    SrvBoatTypeRestore,
    SrvBoatTypeTrash,
    SrvBoatTypeTrashWithId,
} from '@/service/api/_boatManage.endPoint.ts'

export const apiLanguage = { ..._shapeObjectMethodCRUD(SrvLanguageCRUD) }

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
export const getBlogCategoryTrash = (search: any) =>
    _shapeMethodGetSearch(SrvBlogCategoryTrash, search)
export const permanentDeleteBlogCategory = (id: string | number) =>
    _shapeMethodDel(SrvBlogCategoryTrashWithId(id))
export const restoreBlogCategory = (id: string | number) =>
    _shapeMethodPost(SrvBlogCategoryRestore(id))

export const apiBlogTag = { ..._shapeObjectMethodCRUD(SrvBlogTagCRUD) }
export const getBlogTagTrash = (search: any) =>
    _shapeMethodGetSearch(SrvBlogTagTrash, search)
export const permanentDeleteBlogTag = (id: string | number) =>
    _shapeMethodDel(SrvBlogTagTrashWithId(id))
export const restoreBlogTag = (id: string | number) =>
    _shapeMethodPost(SrvBlogTagRestore(id))

// Experience Setting
export const apiExperienceType = {
    ..._shapeObjectMethodCRUD(SrvExperienceTypeCRUD),
}
export const getExperienceTypeTrash = (search: any) =>
    _shapeMethodGetSearch(SrvExperienceTypeTrash, search)
export const permanentDeleteExperienceType = (id: string | number) =>
    _shapeMethodDel(SrvExperienceTypeTrashWithId(id))
export const restoreExperienceType = (id: string | number) =>
    _shapeMethodPost(SrvExperienceTypeRestore(id))

export const apiExperienceCategory = {
    ..._shapeObjectMethodCRUD(SrvExperienceCategoryCRUD),
}

export const apiExperienceArea = {
    ..._shapeObjectMethodCRUD(SrvExperienceAreaCRUD),
}
export const getExperienceAreaTrash = (search: any) =>
    _shapeMethodGetSearch(SrvExperienceAreaTrash, search)
export const permanentDeleteExperienceArea = (id: string | number) =>
    _shapeMethodDel(SrvExperienceAreaTrashWithId(id))
export const restoreExperienceArea = (id: string | number) =>
    _shapeMethodPost(SrvExperienceAreaRestore(id))

export const apiExperienceInquiryForm = {
    ..._shapeObjectMethodCRUD(SrvExperienceInquiryFormsCRUD),
}

// Page Setting
export const apiTLTReview = { ..._shapeObjectMethodCRUD(SrvTLTReviewCRUD) }
export const getTLTReviewTrash = (search: any) =>
    _shapeMethodGetSearch(SrvTLTReviewTrash, search)
export const permanentDeleteTLTReview = (id: string | number) =>
    _shapeMethodDel(SrvTLTReviewTrashWithId(id))
export const restoreTLTReview = (id: string | number) =>
    _shapeMethodPost(SrvTLTReviewRestore(id))

export const apiTLTTestimonial = {
    ..._shapeObjectMethodCRUD(SrvTLTTestimonialCRUD),
}
export const getTLTTestimonialTrash = (search: any) =>
    _shapeMethodGetSearch(SrvTLTTestimonialTrash, search)
export const permanentDeleteTLTTestimonial = (id: string | number) =>
    _shapeMethodDel(SrvTLTTestimonialTrashWithId(id))
export const restoreTLTTestimonial = (id: string | number) =>
    _shapeMethodPost(SrvTLTTestimonialRestore(id))

export const apiMediaPartner = {
    ..._shapeObjectMethodCRUD(SrvMediaPartnerCRUD),
}
export const getMediaPartnerTrash = (search: any) =>
    _shapeMethodGetSearch(SrvMediaPartnerTrash, search)
export const permanentDeleteMediaPartner = (id: string | number) =>
    _shapeMethodDel(SrvMediaPartnerTrashWithId(id))
export const restoreMediaPartner = (id: string | number) =>
    _shapeMethodPost(SrvMediaPartnerRestore(id))

// FAQ Setting
export const apiFAQ = { ..._shapeObjectMethodCRUD(SrvFAQCRUD) }
export const getFAQTrash = (search: any) =>
    _shapeMethodGetSearch(SrvFAQTrash, search)
export const permanentDeleteFAQ = (id: string | number) =>
    _shapeMethodDel(SrvFAQTrashWithId(id))
export const restoreFAQ = (id: string | number) =>
    _shapeMethodPost(SrvFAQRestore(id))

export const apiFAQType = { ..._shapeObjectMethodCRUD(SrvFAQTypeCRUD) }
export const getFAQTypeTrash = (search: any) =>
    _shapeMethodGetSearch(SrvFAQTypeTrash, search)
export const permanentDeleteFAQType = (id: string | number) =>
    _shapeMethodDel(SrvFAQTypeTrashWithId(id))
export const restoreFAQType = (id: string | number) =>
    _shapeMethodPost(SrvFAQTypeRestore(id))
