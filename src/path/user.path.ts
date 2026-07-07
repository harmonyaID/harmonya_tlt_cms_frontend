import { objectPathMenu } from '@/config/base/objectPath.config.js'

const basic = 'sm-account'

const userPath = {
    basic: '/' + basic,
    ...objectPathMenu(basic + '/staff'),

    roleAndPermission: { ...objectPathMenu(basic + '/role-permission') },
}

export default userPath
