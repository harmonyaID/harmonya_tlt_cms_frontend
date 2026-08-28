import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Home Page
export const SrvHomePageContentCRUD = objectPathEndPointAPI(
    baseAPI + '/homepages',
)
export const SrvHomePageContent = baseAPI + '/homepages'

// Page
const baseApiPageContent = baseAPI + '/pages'
export const SrvPageContentCRUD = objectPathEndPointAPI(baseApiPageContent)
export const SrvPageContentTrash = baseApiPageContent + '/trash'

export const SrvPageContentTrashWithId = (id: string | number = ''): string =>
    baseApiPageContent + '/trash/' + id

export const SrvPageContentRestore = (id: string | number = ''): string =>
    baseApiPageContent + '/trash/' + id + '/restore'

// Blog
const baseAPIBlog = baseAPI + '/blogs'
export const SrvBlogContentCRUD = { ...objectPathEndPointAPI(baseAPIBlog) }

export const SrvBlogTrash = baseAPIBlog + '/trash'

export const SrvBlogTrashWithId = (id: string | number = ''): string =>
    baseAPIBlog + '/trash/' + id

export const SrvBlogRestore = (id: string | number = ''): string =>
    baseAPIBlog + '/trash/' + id + '/restore'

// Offer
const baseAPIOffer = baseAPI + '/offers'
export const SrvOfferContentCRUD = { ...objectPathEndPointAPI(baseAPIOffer) }

export const SrvOfferTrash = baseAPIOffer + '/trash'

export const SrvOfferTrashWithId = (id: string | number = ''): string =>
    baseAPIOffer + '/trash/' + id

export const SrvOfferRestore = (id: string | number = ''): string =>
    baseAPIOffer + '/trash/' + id + '/restore'

// Experiences
const baseAPIExperience = baseAPI + '/experiences'
export const SrvExperiencesContentCRUD =
    objectPathEndPointAPI(baseAPIExperience)

export const SrvExperienceContentTrash = baseAPIExperience + '/trash'

export const SrvExperienceContentTrashWithId = (
    id: string | number = '',
): string => baseAPIExperience + '/trash/' + id

export const SrvExperienceContentRestore = (id: string | number = ''): string =>
    baseAPIExperience + '/trash/' + id + '/restore'

const baseAPIInquiryForm = baseAPI + '/experiences/inquiry-forms'
export const SrvExpInquiryFormCRUD = objectPathEndPointAPI(baseAPIInquiryForm)

export const SrvExpInquiryFormTrash = baseAPIInquiryForm + '/trash'

export const SrvExpInquiryFormTrashWithId = (
    id: string | number = '',
): string => baseAPIInquiryForm + '/trash/' + id

export const SrvExpInquiryFormRestore = (id: string | number = ''): string =>
    baseAPIInquiryForm + '/trash/' + id + '/restore'

export const SrvExpInquiryFormUpdateStatus = (id) =>
    SrvExpInquiryFormCRUD.main + '/' + id + '/status'

// Menus
export const SrvMenuContentCRUD = objectPathEndPointAPI(baseAPI + '/menus')

// Menus Setting
export const SrvMenuTypeStatic = baseAPI + +'/components/statics/menu-types'
