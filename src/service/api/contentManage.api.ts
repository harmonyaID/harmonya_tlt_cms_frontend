import {
    _shapeMethodDel,
    _shapeMethodGet,
    _shapeMethodGetSearch, _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBlogContentCRUD,
    SrvBlogRestore,
    SrvBlogTrash,
    SrvBlogTrashWithId,
    SrvExperiencesContentCRUD,
    SrvHomePageContent,
    SrvHomePageContentCRUD,
    SrvMenuContentCRUD,
    SrvPageContentCRUD,
} from '@/service/api/_contentManage.endPoint.ts'
import { SrvBoatCRUD } from '@/service/api/_boatManage.endPoint.ts'
import {
    SrvStaffRestore,
    SrvStaffTrash,
    SrvStaffTrashWithId,
} from '@/service/api/_staff.endPoint.ts'

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
export const apiBlogContent = {..._shapeObjectMethodCRUD(SrvBlogContentCRUD)}

export const getBlogTrash = (search: any) =>
    _shapeMethodGetSearch(SrvBlogTrash, search)

export const permanentDeleteBlog = (id: string | number) =>
    _shapeMethodDel(SrvBlogTrashWithId(id))

export const restoreBlog = (id: string | number) =>
    _shapeMethodPost(SrvBlogRestore(id))

// Experience
export const apiExperienceContent = {
    ..._shapeObjectMethodCRUD(SrvExperiencesContentCRUD),
}

// Menu
export const apiMenu = {
    ..._shapeObjectMethodCRUD(SrvMenuContentCRUD),
}
