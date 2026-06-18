const baseAPI : any = import.meta.env.VITE_BASE_API

// Auth
export const SrvLogin : string = baseAPI + '/auth/web/login'
export const SrvLogout : string = baseAPI + '/auth/web/logout'
export const SrvProfile : string = baseAPI + '/auth/web/profile'
export const SrvAuthRefreshAccess : string = baseAPI + '/auth/web/refresh-access'