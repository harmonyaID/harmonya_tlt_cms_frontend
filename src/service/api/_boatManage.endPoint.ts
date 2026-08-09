import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Boat
const baseAPIBoat = baseAPI + '/boats'
export const SrvBoatCRUD = {
    ...objectPathEndPointAPI(baseAPIBoat),
    trash: baseAPIBoat + '/trash',
    trashWithId: (id: number|string) =>  baseAPIBoat + '/trash/' + id,
    restore: (id: number|string) =>  baseAPIBoat + '/trash/' + id + '/restore',
}

// Boat Type
export const SrvBoatTypeCRUD = objectPathEndPointAPI(
    SrvBoatCRUD.main + '/components/types',
)

// Boat Contact Forms
export const SrvBoatContactFormCRUD = objectPathEndPointAPI(
    baseAPI + '/boat-contact-forms',
)

export const SrvBoatStaticStatusForm =
    baseAPI + '/components/statics/status-form'
