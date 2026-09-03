import {
    SrvBlogContentCRUD,
    SrvBlogRestore,
    SrvBlogTrash,
    SrvBlogTrashWithId,
    SrvExperienceContentRestore,
    SrvExperienceContentTrash,
    SrvExperienceContentTrashWithId,
    SrvExperiencesContentCRUD,
    SrvExpInquiryFormCRUD,
    SrvExpInquiryFormRestore,
    SrvExpInquiryFormTrash,
    SrvExpInquiryFormTrashWithId,
    SrvExpInquiryFormUpdateStatus,
    SrvHomePageContent,
    SrvHomePageContentCRUD,
    SrvMenuContentCRUD,
    SrvMenuTypeStatic,
    SrvOfferContentCRUD,
    SrvOfferRestore,
    SrvOfferTrash,
    SrvOfferTrashWithId,
    SrvPageContentCRUD,
    SrvPageContentRestore,
    SrvPageContentTrash,
    SrvPageContentTrashWithId,
} from '@/service/api/_contentManage.endPoint.ts'
import {
    _shapeMethodDel,
    _shapeMethodGet,
    _shapeMethodGetSearch,
    _shapeMethodPost,
    _shapeObjectMethodCRUD,
    _shapeMethodPatch,
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
export const getPageContentTrash = (search: any) =>
    _shapeMethodGetSearch(SrvPageContentTrash, search)

export const permanentDeletePageContent = (id: string | number) =>
    _shapeMethodDel(SrvPageContentTrashWithId(id))

export const restorePageContent = (id: string | number) =>
    _shapeMethodPost(SrvPageContentRestore(id))

// Blog
export const apiBlogContent = { ..._shapeObjectMethodCRUD(SrvBlogContentCRUD) }

export const getBlogTrash = (search: any) =>
    _shapeMethodGetSearch(SrvBlogTrash, search)

export const permanentDeleteBlog = (id: string | number) =>
    _shapeMethodDel(SrvBlogTrashWithId(id))

export const restoreBlog = (id: string | number) =>
    _shapeMethodPost(SrvBlogRestore(id))

// Offer
export const apiOfferContent = {
    ..._shapeObjectMethodCRUD(SrvOfferContentCRUD),
}

export const getOfferTrash = (search: any) =>
    _shapeMethodGetSearch(SrvOfferTrash, search)

export const permanentDeleteOffer = (id: string | number) =>
    _shapeMethodDel(SrvOfferTrashWithId(id))

export const restoreOffer = (id: string | number) =>
    _shapeMethodPost(SrvOfferRestore(id))

// Experience
export const apiExperienceContent = {
    ..._shapeObjectMethodCRUD(SrvExperiencesContentCRUD),
}

export const getExperienceContentTrash = (search: any) =>
    _shapeMethodGetSearch(SrvExperienceContentTrash, search)

export const permanentDeleteExperienceContent = (id: string | number) =>
    _shapeMethodDel(SrvExperienceContentTrashWithId(id))

export const restoreExperienceContent = (id: string | number) =>
    _shapeMethodPost(SrvExperienceContentRestore(id))

export const apiExpInquiryForm = {
    ..._shapeObjectMethodCRUD(SrvExpInquiryFormCRUD),
}

export const getExpInquiryFormTrash = (search: any) =>
    _shapeMethodGetSearch(SrvExpInquiryFormTrash, search)

export const permanentDeleteExpInquiryForm = (id: string | number) =>
    _shapeMethodDel(SrvExpInquiryFormTrashWithId(id))

export const restoreExpInquiryForm = (id: string | number) =>
    _shapeMethodPost(SrvExpInquiryFormRestore(id))

export const updateStatusExpInquiryForm = (id, formRequest) =>
    _shapeMethodPatch(SrvExpInquiryFormUpdateStatus(id), formRequest)

// Menu
export const apiMenu = {
    ..._shapeObjectMethodCRUD(SrvMenuContentCRUD),
}

export const getStaticTypeMenu = () =>
    _shapeMethodGet(SrvMenuTypeStatic, 'tcSrvMenuTypeStatic')
