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
const baseAPIExperience = baseAPI + '/experiences'
export const SrvExperiencesContentCRUD = objectPathEndPointAPI(baseAPIExperience)

export const SrvExperienceContentTrash = baseAPIExperience + '/trash'

export const SrvExperienceContentTrashWithId = (id: string | number = ''): string =>
    baseAPIExperience + '/trash/' + id

export const SrvExperienceContentRestore = (id: string | number = ''): string =>
    baseAPIExperience + '/trash/' + id + '/restore'


const baseAPIInquiryForm = baseAPI + '/experiences/inquiry-forms'
export const SrvExpInquiryFormCRUD = objectPathEndPointAPI(baseAPIInquiryForm)

export const SrvExpInquiryFormTrash = baseAPIInquiryForm + '/trash'

export const SrvExpInquiryFormTrashWithId = (id: string | number = ''): string =>
    baseAPIInquiryForm + '/trash/' + id

export const SrvExpInquiryFormRestore = (id: string | number = ''): string =>
    baseAPIInquiryForm + '/trash/' + id + '/restore'

export const SrvExpInquiryFormUpdateStatus = (id) =>
    SrvExpInquiryFormCRUD.main + '/' + id + '/status'

// Menus
export const SrvMenuContentCRUD = objectPathEndPointAPI(baseAPI + '/menus')

// Menus Setting
export const SrvMenuTypeStatic = baseAPI + +'/components/statics/menu-types'
