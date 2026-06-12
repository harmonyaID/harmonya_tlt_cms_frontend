const baseURL: string = import.meta.env?.VITE_DOMAIN_PATH_FILE || ''
const pathFileHelper = (path: any) => baseURL + path
export default pathFileHelper
