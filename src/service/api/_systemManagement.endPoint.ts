import { objectPathEndPointAPI } from '@/config/base/objectPath.config'
import { SrvWithFeature } from '@/service/api/type/config.type.ts'

const baseAPI: any = String(import.meta.env.VITE_BASE_API)

// Web Config
export const SrvWebConfig = baseAPI + '/configurations/website'

export const SrvWebConfigUpdate = (id) => baseAPI + '/' + id + '/update'
