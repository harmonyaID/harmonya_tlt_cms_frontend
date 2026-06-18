import { objectRadioButton } from '@/config/objectData.config.ts'

export const DATA_YES_LABEL = 'Yes'
export const DATA_YES_VALUE_STRING = 'true'
export const DATA_YES_VALUE_BOOLEAN = true

export const DANA_NO_LABEL = 'No'
export const DANA_NO_VALUE_STRING = 'false'
export const DANA_NO_VALUE_BOOLEAN = false

export const optionYesOrNoString = [
    objectRadioButton(DATA_YES_VALUE_STRING, DATA_YES_LABEL),
    objectRadioButton(DANA_NO_VALUE_STRING, DANA_NO_LABEL),
]

export const optionYesOrNoValueBoolean = [
    objectRadioButton(DATA_YES_VALUE_BOOLEAN, DATA_YES_LABEL),
    objectRadioButton(DANA_NO_VALUE_BOOLEAN, DANA_NO_LABEL),
]

export const isCheckDataYesOrNoValueString = (passValue: string) =>
    passValue === DATA_YES_VALUE_STRING
        ? DATA_YES_VALUE_BOOLEAN
        : DANA_NO_VALUE_BOOLEAN
