import {
    SrvBlogContentCRUD,
    SrvExperiencesContentCRUD,
    SrvExpInquiryFormCRUD,
    SrvExpInquiryFormUpdateStatus,
    SrvHomePageContent,
    SrvHomePageContentCRUD,
    SrvMenuContentCRUD,
    SrvPageContentCRUD,
} from '@/service/api/_contentManage.endPoint.ts'
import {
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPatch,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'

// Home Page
export const apiHomePageContent = {
    ..._shapeObjectMethodCRUD(SrvHomePageContentCRUD),
}

export const detailHomePageContent = (formSearch) =>
    _shapeMethodGetSearch(SrvHomePageContent, formSearch, 'tcFormSearch')

// Page
export const apiPageContent = {
    ..._shapeObjectMethodCRUD(SrvPageContentCRUD),
}
// Blog
export const apiBlogContent = {
    ..._shapeObjectMethodCRUD(SrvBlogContentCRUD),
}

// Experience
export const apiExperienceContent = {
    ..._shapeObjectMethodCRUD(SrvExperiencesContentCRUD),
}

export const apiExpInquiryForm = {
    ..._shapeObjectMethodCRUD(SrvExpInquiryFormCRUD),
}

export const updateStatusExpInquiryForm = (id, formRequest) =>
    _shapeMethodPatch(SrvExpInquiryFormUpdateStatus(id), formRequest)

// Menu
export const apiMenu = {
    ..._shapeObjectMethodCRUD(SrvMenuContentCRUD),
}
