import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Boat
const baseAPIBoat = baseAPI + '/boats'
export const SrvBoatCRUD = { ...objectPathEndPointAPI(baseAPIBoat)}
export const SrvBoatTrash = baseAPIBoat + '/trash'
export const SrvBoatTrashWithId = (id: string | number = ''): string =>
    baseAPIBoat + '/trash/' + id
export const SrvBoatRestore = (id: string | number = ''): string =>
    baseAPIBoat + '/trash/' + id + '/restore'


// Boat Type
const baseAPIBoatType = baseAPIBoat + '/components/types'
export const SrvBoatTypeCRUD = objectPathEndPointAPI(baseAPIBoatType)
export const SrvBoatTypeTrash = baseAPIBoatType + '/trash'
export const SrvBoatTypeTrashWithId = (id: string | number = ''): string =>
    baseAPIBoatType + '/trash/' + id
export const SrvBoatTypeRestore = (id: string | number = ''): string =>
    baseAPIBoatType + '/trash/' + id + '/restore'



// Boat Contact Forms
export const SrvBoatContactFormCRUD = objectPathEndPointAPI(
    baseAPI + '/boat-contact-forms',
)

export const SrvBoatStaticStatusForm =
    baseAPI + '/components/statics/status-form'
