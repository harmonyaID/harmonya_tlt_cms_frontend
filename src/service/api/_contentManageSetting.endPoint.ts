import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

export const SrvLanguageCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPI + '/languages',
)

export const SrvFAQCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPI + '/faqs',
)

export const SrvTLTReviewCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPI + '/tlt-reviews',
)

export const SrvMediaPartnerCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPI + '/media-partners',
)

export const SrvWebContactFormCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPI + '/website-contact-forms',
)

// Component
export const SrvComponentContactFormTypeCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPI + '/components/contact-form-types')

// Contain Blog Setting
export const SrvBlogCategoryCRUD = objectPathEndPointAPI(
    baseAPI + '/blogs/categories',
)

export const SrvBlogTagCRUD = objectPathEndPointAPI(baseAPI + '/blogs/tags')

// Contain Experiences Setting
const baseAPIExperienceType = baseAPI + '/experiences/types'
export const SrvExperienceTypeCRUD = objectPathEndPointAPI(baseAPIExperienceType)
export const SrvExperienceTypeTrash = baseAPIExperienceType + '/trash'
export const SrvExperienceTypeTrashWithId = (id: string | number = ''): string =>
    baseAPIExperienceType + '/trash/' + id
export const SrvExperienceTypeRestore = (id: string | number = ''): string =>
    baseAPIExperienceType + '/trash/' + id + '/restore'

export const SrvExperienceCategoryCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences/categories',
)

export const SrvExperienceAreaCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences/areas',
)

export const SrvExperienceInquiryFormsCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences/inquiry-forms',
)
