import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Boat
export const SrvBoatCRUD = objectPathEndPointAPI(baseAPI + '/boats')

// Boat Type
export const SrvBoatTypeCRUD = objectPathEndPointAPI(baseAPI + '/boat-types')

// Boat Contact Forms
export const SrvBoatContactFormCRUD = objectPathEndPointAPI(
    baseAPI + '/boat-contact-forms',
)
