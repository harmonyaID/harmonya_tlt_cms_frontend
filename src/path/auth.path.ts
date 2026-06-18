import { pathBasenameRoute } from '@/config/base/objectPath.config.ts'

const authPath = {
    login: pathBasenameRoute('login'),
    signup: pathBasenameRoute('signup'),
    forgotPassword: pathBasenameRoute('forgot-password'),
    resetPassword: pathBasenameRoute('reset-password'),
}

export default authPath
