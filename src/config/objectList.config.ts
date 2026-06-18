import _ from 'lodash'
import moment from 'moment'

interface DataArray {
    [key: string]: any
}

interface SortDataBase {
    data: DataArray[]
    key?: string
    isOrderASC?: boolean
}

interface SortDataFormat extends SortDataBase {
    format?: string
}

type SortDataType = (param: SortDataBase) => DataArray[]

type SortDataTypeWithFormat = (param: SortDataFormat) => DataArray[]

interface ObjectListDetail {
    title: string
    content?: any
    isLayoutContentDefault?: boolean
    isLayoutTitleDefault?: boolean
}

export const objectListDetail = (
    title: any,
    content?: any,
    isLayoutContentDefault: boolean = true,
    isLayoutTitleDefault: boolean = true,
): ObjectListDetail => ({
    title,
    content,
    isLayoutContentDefault,
    isLayoutTitleDefault,
})

export const IS_TYPE_FILE_WORD = (type: string = ''): boolean => {
    return type === 'application/msword' || type === 'doc' || type === 'docx'
}

export const IS_TYPE_FILE_EXCEL = (type: string = ''): boolean => {
    return (
        type === 'application/vnd.ms-excel' || type === 'xls' || type === 'xlsx'
    )
}

export const IS_TYPE_FILE_PDF = (type: string = ''): boolean => {
    return type === 'application/pdf' || type === 'pdf'
}

export const IS_FILE_WORD_OR_EXCEL = (type: string = ''): boolean => {
    return IS_TYPE_FILE_WORD(type) || IS_TYPE_FILE_EXCEL(type)
}

export const IS_FILE_WORD_OR_EXCEL_OR_PDF = (type: string = ''): boolean => {
    return IS_TYPE_FILE_PDF(type) || IS_FILE_WORD_OR_EXCEL(type)
}

export const sortFileFromImageToPDF: SortDataType = ({
    data = [],
    key = 'type',
}) => {
    return data.sort((a, b) => {
        const isImageA = !IS_TYPE_FILE_PDF(a[key])
        const isImageB = !IS_TYPE_FILE_PDF(b[key])
        const isPdfA = IS_TYPE_FILE_PDF(a[key])
        const isPdfB = IS_TYPE_FILE_PDF(b[key])

        if (isImageA && !isImageB) return -1
        if (!isImageA && isImageB) return 1
        if (isPdfA && !isPdfB) return -1
        if (!isPdfA && isPdfB) return 1

        return 0
    })
}

export const sortDataByNameWithOrder: SortDataType = ({
    data = [],
    key = 'name',
    isOrderASC = true,
}) => {
    return data.sort((a, b) => {
        const nameA = _.lowerCase(a[key])
        const nameB = _.lowerCase(b[key])

        if (nameA < nameB) {
            return isOrderASC ? -1 : 1
        } else if (nameA > nameB) {
            return isOrderASC ? 1 : -1
        } else {
            return 0
        }
    })
}

export const sortDataByDate: SortDataTypeWithFormat = ({
    data = [],
    key = 'createdAt',
    format = 'DD/MM/YYYY HH:mm:ss',
    isOrderASC = true,
}) => {
    return data.sort((a, b) => {
        const dateA = moment(a[key], format).valueOf()
        const dateB = moment(b[key], format).valueOf()

        if (isOrderASC) {
            return dateA - dateB
        } else {
            return dateB - dateA
        }
    })
}

export const sortDataByName: SortDataType = ({ data = [], key = 'name' }) => {
    return data.sort((a, b) => {
        const nameA = _.lowerCase(a[key])
        const nameB = _.lowerCase(b[key])

        if (nameA < nameB) {
            return -1
        }

        if (nameB > nameA) {
            return 1
        }

        return 0
    })
}

export const checkFileTypeFromUrl = (
    url: string = '',
    checkType: (type: string) => boolean,
): boolean => {
    const segments = url.split('.')
    const extension = segments[segments.length - 1]
    return checkType(_.lowerCase(extension))
}
