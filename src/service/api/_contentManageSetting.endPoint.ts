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
