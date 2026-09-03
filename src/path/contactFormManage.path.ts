import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

export const contactFormPath = {
    ...objectPathMenu('contact-form'),
    trash: pathBasenameRoute('contact-form') + '/trash',
}

const mainSetting = 'contact-form-setting'

export const contactFormSettingPath = {
    default: mainSetting,
    main: '/' + mainSetting,
    type: objectPathMenu(mainSetting + '/type'),
}
