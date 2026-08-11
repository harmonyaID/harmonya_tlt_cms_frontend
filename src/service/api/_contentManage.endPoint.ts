import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Home Page
export const SrvHomePageContentCRUD = objectPathEndPointAPI(
    baseAPI + '/homepages',
)
export const SrvHomePageContent = baseAPI + '/homepages'

// Page
export const SrvPageContentCRUD = objectPathEndPointAPI(baseAPI + '/pages')

// Blog
const baseAPIBlog = baseAPI + '/blogs'
export const SrvBlogContentCRUD = { ...objectPathEndPointAPI(baseAPIBlog) }

export const SrvBlogTrash = baseAPIBlog + '/trash'

export const SrvBlogTrashWithId = (id: string | number = ''): string =>
    baseAPIBlog + '/trash/' + id

export const SrvBlogRestore = (id: string | number = ''): string =>
    baseAPIBlog + '/trash/' + id + '/restore'

// Experiences
export const SrvExperiencesContentCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences',
)

export const SrvExpInquiryFormCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences/inquiry-forms',
)

export const SrvExpInquiryFormUpdateStatus = (id) =>
    SrvExpInquiryFormCRUD.main + '/' + id + '/status'

// Menus
export const SrvMenuContentCRUD = objectPathEndPointAPI(baseAPI + '/menus')

// Menus Setting
export const SrvMenuTypeStatic = baseAPI + +'/components/statics/menu-types'
