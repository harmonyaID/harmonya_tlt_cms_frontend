import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

const baseComponentAPI = baseAPI + '/component'

export const SrvCountries = baseAPI + '/components/countries'

// Info Website
export const SrvInfoWebsite = baseAPI + '/configurations/website'

export const SrvInfoWebsiteUpdate = (id: string | number) =>
    baseAPI + '/configurations/website/' + id + '/update'
