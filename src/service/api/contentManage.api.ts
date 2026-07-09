import {
    _shapeMethodGet,
    _shapeObjectMethodCRUD,
} from '@/service/api/_coreAPI/_config.api.ts'
import {
    SrvBlogContentCRUD,
    SrvExperiencesContentCRUD,
    SrvHomePageContentCRUD,
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
// Blog
export const apiExperienceContent = {
    ..._shapeObjectMethodCRUD(SrvExperiencesContentCRUD),
}
