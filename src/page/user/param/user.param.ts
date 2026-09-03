export interface MainStaffParamType {
    fullName: string
    email: string
    phone: string
    genderId: string
    countryId: string
    address: string
    isActive: boolean | string
    isOwner: boolean | string | number
    password?: string
    confirmPassword?: string
}

export const mainStaffParam: MainStaffParamType = {
    fullName: '',
    email: '',
    phone: '',
    genderId: '',
    countryId: '',
    address: '',
    isActive: true,
    isOwner: '0',
    password: '',
    confirmPassword: '',
}

interface UpdatePasswordType {
    password?: string
    confirmPassword?: string
}

export const updatePasswordParam: UpdatePasswordType = {
    password: '',
    confirmPassword: '',
}

interface settingRoleParamType {
    roleId: number | string
}

export const settingRoleParam: settingRoleParamType = { roleId: '' }

interface settingPermissionParamType {
    permissionIds: any[]
}

export const settingPermission: settingPermissionParamType = {
    permissionIds: [],
}
