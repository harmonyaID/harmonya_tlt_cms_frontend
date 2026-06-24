const baseAPI: string = String(import.meta.env.VITE_BASE_API) + '/auths'

// Auth
export const SrvLogin: string = baseAPI + '/login'
export const SrvLogout: string = baseAPI + '/logout'
export const SrvChangePassword: string = baseAPI + '/change-password'
export const SrvForgotPassword: string = baseAPI + '/forgot-password'
export const SrvResetPassword: string = baseAPI + '/forgot-password'
export const SrvProfile: string = baseAPI + '/profile'
export const SrvAuthRefreshAccess: string = baseAPI + '/refresh-access'
