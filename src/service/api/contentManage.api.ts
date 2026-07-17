import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBlogContentCRUD,
    SrvExperiencesContentCRUD,
    SrvHomePageContentCRUD,
    SrvMenuContentCRUD,
    SrvPageContentCRUD,
} from '@/service/api/_contentManage.endPoint.ts'

// Home Page
export const apiHomePageContent = {
    ..._shapeObjectMethodCRUD(SrvHomePageContentCRUD),
}

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

// Menu
export const apiMenu = {
    ..._shapeObjectMethodCRUD(SrvMenuContentCRUD),
}
