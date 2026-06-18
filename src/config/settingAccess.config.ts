import {
    objectRadioButton,
    objectSelectOption,
} from '@/config/objectData.config.ts'

export const SETTING_TYPE_NONE = 'None'
export const SETTING_TYPE_NONE_ID = 1

export const SETTING_TYPE_PASSWORD = 'Password'
export const SETTING_TYPE_PASSWORD_ID = 2

export const SETTING_TYPE_AUTH = 'Authentication'
export const SETTING_TYPE_AUTH_ID = 3

export const optionSettingAccess = [
    objectSelectOption(SETTING_TYPE_NONE_ID, SETTING_TYPE_NONE),
    objectSelectOption(SETTING_TYPE_PASSWORD_ID, SETTING_TYPE_PASSWORD),
    objectSelectOption(SETTING_TYPE_AUTH_ID, SETTING_TYPE_AUTH),
]

export const optionCheckBoxSettingAccess = [
    objectRadioButton(SETTING_TYPE_NONE_ID, SETTING_TYPE_NONE),
    objectRadioButton(SETTING_TYPE_PASSWORD_ID, SETTING_TYPE_PASSWORD),
    objectRadioButton(SETTING_TYPE_AUTH_ID, SETTING_TYPE_AUTH),
]
