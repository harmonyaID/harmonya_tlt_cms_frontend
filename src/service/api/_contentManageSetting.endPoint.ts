import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

export const SrvLanguageCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPI + '/languages',
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
const baseAPIBlogCategory = baseAPI + '/blogs/categories'
export const SrvBlogCategoryCRUD = objectPathEndPointAPI(baseAPIBlogCategory)
export const SrvBlogCategoryTrash = baseAPIBlogCategory + '/trash'
export const SrvBlogCategoryTrashWithId = (id: string | number = ''): string =>
    baseAPIBlogCategory + '/trash/' + id
export const SrvBlogCategoryRestore = (id: string | number = ''): string =>
    baseAPIBlogCategory + '/trash/' + id + '/restore'

const baseAPIBlogTag = baseAPI + '/blogs/tags'
export const SrvBlogTagCRUD = objectPathEndPointAPI(baseAPIBlogTag)
export const SrvBlogTagTrash = baseAPIBlogTag + '/trash'
export const SrvBlogTagTrashWithId = (id: string | number = ''): string =>
    baseAPIBlogTag + '/trash/' + id
export const SrvBlogTagRestore = (id: string | number = ''): string =>
    baseAPIBlogTag + '/trash/' + id + '/restore'

// Contain Experiences Setting
const baseAPIExperienceType = baseAPI + '/experiences/types'
export const SrvExperienceTypeCRUD = objectPathEndPointAPI(
    baseAPIExperienceType,
)
export const SrvExperienceTypeTrash = baseAPIExperienceType + '/trash'
export const SrvExperienceTypeTrashWithId = (
    id: string | number = '',
): string => baseAPIExperienceType + '/trash/' + id
export const SrvExperienceTypeRestore = (id: string | number = ''): string =>
    baseAPIExperienceType + '/trash/' + id + '/restore'

export const SrvExperienceCategoryCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences/categories',
)

const baseAPIExperienceArea = baseAPI + '/experiences/areas'
export const SrvExperienceAreaCRUD = objectPathEndPointAPI(
    baseAPIExperienceArea,
)
export const SrvExperienceAreaTrash = baseAPIExperienceArea + '/trash'
export const SrvExperienceAreaTrashWithId = (
    id: string | number = '',
): string => baseAPIExperienceArea + '/trash/' + id
export const SrvExperienceAreaRestore = (id: string | number = ''): string =>
    baseAPIExperienceArea + '/trash/' + id + '/restore'

export const SrvExperienceInquiryFormsCRUD = objectPathEndPointAPI(
    baseAPI + '/experiences/inquiry-forms',
)

// Content Page Setting
const baseAPITLTReview = baseAPI + '/tlt-reviews'
export const SrvTLTReviewCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPITLTReview)
export const SrvTLTReviewTrash = baseAPITLTReview + '/trash'
export const SrvTLTReviewTrashWithId = (id: string | number = ''): string =>
    baseAPITLTReview + '/trash/' + id
export const SrvTLTReviewRestore = (id: string | number = ''): string =>
    baseAPITLTReview + '/trash/' + id + '/restore'

const baseAPITLTTestimonial = baseAPI + '/tlt-testimonials'
export const SrvTLTTestimonialCRUD: SrvWithFeature = objectPathEndPointAPI(
    baseAPITLTTestimonial,
)
export const SrvTLTTestimonialTrash = baseAPITLTTestimonial + '/trash'
export const SrvTLTTestimonialTrashWithId = (
    id: string | number = '',
): string => baseAPITLTTestimonial + '/trash/' + id
export const SrvTLTTestimonialRestore = (id: string | number = ''): string =>
    baseAPITLTTestimonial + '/trash/' + id + '/restore'

// Content FAQ Setting
const baseAPIFAQ = baseAPI + '/faqs'
export const SrvFAQCRUD: SrvWithFeature = objectPathEndPointAPI(baseAPIFAQ)
export const SrvFAQTrash = baseAPIFAQ + '/trash'
export const SrvFAQTrashWithId = (id: string | number = ''): string =>
    baseAPIFAQ + '/trash/' + id
export const SrvFAQRestore = (id: string | number = ''): string =>
    baseAPIFAQ + '/trash/' + id + '/restore'

const baseAPIFAQType = baseAPIFAQ + '/types'
export const SrvFAQTypeCRUD: SrvWithFeature =
    objectPathEndPointAPI(baseAPIFAQType)
export const SrvFAQTypeTrash = baseAPIFAQType + '/trash'
export const SrvFAQTypeTrashWithId = (id: string | number = ''): string =>
    baseAPIFAQType + '/trash/' + id
export const SrvFAQTypeRestore = (id: string | number = ''): string =>
    baseAPIFAQType + '/trash/' + id + '/restore'
