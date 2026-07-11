import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Home Page
export const SrvHomePageContentCRUD = objectPathEndPointAPI(
    baseAPI + '/home-page',
)

// Page
export const SrvPageContentCRUD = objectPathEndPointAPI(baseAPI + '/pages')

// Blog
export const SrvBlogContentCRUD = objectPathEndPointAPI(baseAPI + '/blogs')

// Experiences
export const SrvExperiencesContentCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences',
)

// Menus
export const SrvMenuContentCRUD = objectPathEndPointAPI(baseAPI + '/menus')
