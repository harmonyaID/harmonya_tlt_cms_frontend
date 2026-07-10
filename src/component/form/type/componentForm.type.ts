import {
    ChangeEvent,
    InputHTMLAttributes,
    ReactNode,
    TextareaHTMLAttributes,
} from 'react'

// Form Checkbox
export interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string
    label: string
    isDefault?: boolean
    isCircle?: boolean
    classNameInput?: string
    classNameLabel?: string
    change?: (e: ChangeEvent<HTMLInputElement>) => void
    other?: object
}

// Form Input Date
export interface FormInputDatePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    classNameInput?: string
    clearButton?: boolean
    format?: string | any
    actions?: {
        onChange?: (
            name: string,
            value: any,
            e: ChangeEvent<HTMLInputElement>,
        ) => void
    }
    config?: object
    index?: number | string | any
    other?: object
    isResetValue?: boolean
}

// Form Date Range
export interface FormInputDateRangePickerProps {
    id?: string
    idStartDate?: string
    idEndDate?: string
    name?: string
    startName?: string
    endName?: string
    value?: any
    className?: string
    classInput?: string
    label?: string | ReactNode
    extraLabel?: string
    required?: boolean
    disabled?: boolean
    disabledStartDate?: boolean
    disabledEndDate?: boolean
    clearButton?: boolean
    readOnly?: boolean
    autoComplete?: string
    placeholder?: string
    format?: string
    actions?: {
        onChange: (
            name: string,
            value: any,
            e: ChangeEvent<HTMLInputElement>,
        ) => void
    }
    config?: object | any
    other?: object | any
}

// Form Input Time
export interface FormInputTimePickerProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    format?: string
    classInput?: string
    actions?: {
        onChange: (
            name: string,
            value: any,
            event: ChangeEvent<HTMLInputElement>,
        ) => void
    }
    config?: object | any
    other?: object | any
    isTimeRange?: boolean
    isResetValue?: boolean
    isHook?: boolean
}

// Form Input
export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string
    name: string
    label?: string
    required?: boolean
    className?: string
    classNameInput?: string
    icon?: ReactNode
    classNameIcon?: string
    handleIcon?: () => void
    isNumberOnly?: boolean
    isCheckMinInput?: boolean
    isCheckMaxInput?: boolean
    actions?:
        | object
        | any
        | {
              onChange?: (
                  name: string,
                  value: any,
                  e: ChangeEvent<HTMLInputElement>,
              ) => void
          }
    other?: object | any
}

export interface FormInputCurrencyProps extends FormInputProps {
    isUseHook?: boolean
    nameOfChange?: string
    isAllowNegative?: boolean
}

export interface FormInputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string
    name?: string
    label?: string
    required?: boolean
    readOnly?: boolean
    className?: string
    classNameInput?: string
    actions?:
        | object
        | any
        | {
              onChange?: (
                  name: string,
                  value: any,
                  e: React.ChangeEvent<HTMLInputElement>,
              ) => void
          }
}

// Form Radio Button
interface CheckBox {
    defaultValue: any
    label: string
    [key: string]: any
}

export interface FormRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string
    className?: string
    classNameRadio?: string
    label?: string
    required?: boolean
    disabled?: boolean
    readOnly?: boolean
    actions?: {
        onChange?: (
            name: string,
            value: any,
            e?: ChangeEvent<HTMLInputElement>,
        ) => void
    }
    nameOfChange?: string
    isUseHook?: boolean
    name: string
    value?: any
    defaultValue?: any
    aliasName?: string
    isGetDefaultValue?: boolean
}

export interface FormRadioButtonMultiProps {
    id?: string
    name: string
    checkBoxs?: CheckBox[]
    required?: boolean | any
    disabled?: boolean | any
    readOnly?: boolean
    actions?:
        | object
        | any
        | {
              onChange?: (
                  name: string,
                  value: any,
                  e: ChangeEvent<HTMLInputElement>,
              ) => void
          }
    isUseHook?: boolean
    className?: string
    classNameRow?: string
    label?: string
    value?: any
    aliasName?: string
    nameOfChange?: string
}

// Form Select Option
export interface FormSelectOptionProps extends InputHTMLAttributes<HTMLSelectElement> {
    name: string
    value?: any
    id?: string
    label?: string
    className?: string
    classNameSelect?: string
    disabled?: boolean
    required?: boolean
    children: ReactNode
    actions?:
        | object
        | any
        | {
              onChange?: (
                  name: string,
                  value: any,
                  e: ChangeEvent<HTMLInputElement>,
              ) => void
          }
    other?: object
}

// Form Text Area
export interface FormTextAreaProps {
    id?: string
    name: string
    className?: string
    label?: string
    required?: boolean
    disabled?: boolean
    classNameInput?: string
    autoComplete?: string
    placeholder?: string
    readOnly?: boolean
    rows?: number
    cols?: number
    other?: TextareaHTMLAttributes<HTMLTextAreaElement>
    value?: any
    actions?: {
        onChange?: (
            name: string,
            value: any,
            e: ChangeEvent<HTMLInputElement>,
        ) => void
    }
}

// Form Upload File
export interface FormUploadFileProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    classNameLabel?: string
    classNameLayoutImage?: string
    subTitle?: string
    actions?: {
        onChange?: (
            name: string,
            value: any,
            event?: ChangeEvent<HTMLInputElement>,
        ) => void
        handleDataFiles?: (files: any[] | any) => void
    }
    isMulti?: boolean
    isGeneralFile?: boolean
    accepts?: string[] | any[]
    urlFiles?: string[] | any[]
    maxSize?: number
    nameFileDefault?: string
    renderLayout?: void | any
    renderConfig?: object | any
    isPreview?: boolean
    isResetList?: boolean
    isUseHook?: boolean
    isEdit?: boolean
    idAreaUpload?: string
    idBtnPaste?: string
    dataPreviewBy?: string
}

export interface LayoutImageAndDocumentProps {
    dataImage?: {
        name: string
        size: number | any
        type: string
    }
    dataDocument?: {
        name: string
        size: number | any
        type: string
    }
    passIndex: any
}

export interface FileType extends Blob {
    name: string
    size: number
    type: string
}

// Form Label
export interface LabelProps {
    label?: string
    dataId?: string
    required?: boolean
}

export interface FormLabelProps {
    label?: string
    dataId?: string
    isRequired?: boolean
}

// Form Row
export interface RowFormProps {
    label: string | ReactNode
    children: ReactNode
    classNameColumnLabel?: string
    classNameColumnChild?: string
    className?: string
    classNameLabel?: string
    secondLabel?: string | ReactNode
    isRequired?: boolean
}
