import {
    _shapeMethodDel,
    _shapeMethodGet,
    _shapeMethodGetSearch, _shapeMethodPost,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBlogContentCRUD,
    SrvExperiencesContentCRUD,
    SrvHomePageContent,
    SrvHomePageContentCRUD,
    SrvMenuContentCRUD,
    SrvPageContentCRUD,
} from '@/service/api/_contentManage.endPoint.ts'
import { SrvBoatCRUD } from '@/service/api/_boatManage.endPoint.ts'

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
    trash: (search: any) => _shapeMethodGetSearch(SrvBlogContentCRUD.trash, search),
    permanentDelete: (id: any) => _shapeMethodDel(SrvBlogContentCRUD.trashWithId(id)),
    restore: (id: any) => _shapeMethodPost(SrvBlogContentCRUD.restore(id))
}

// Experience
export const apiExperienceContent = {
    ..._shapeObjectMethodCRUD(SrvExperiencesContentCRUD),
}

// Menu
export const apiMenu = {
    ..._shapeObjectMethodCRUD(SrvMenuContentCRUD),
}
