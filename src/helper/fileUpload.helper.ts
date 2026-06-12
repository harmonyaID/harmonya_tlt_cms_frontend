import { isObject } from 'lodash'
import { v4 as uuid } from 'uuid'

export const generateUploadFileUniqueID = (name = 'file-upload'): string => {
    return name + '-' + uuid()
}

export const DEFAULT_UPLOAD_ID = generateUploadFileUniqueID()
export const INITIAL_UPLOAD_ID = generateUploadFileUniqueID('initial-upload')

export const configFileUploadOrExisting = (
    dataFile: any[] = [],
    key: string = 'path',
) => {
    return dataFile.map((vm) => {
        if (typeof vm.file === 'string') {
            return { ...vm, [key]: vm.file, mimeType: vm.mimeType }
        }

        if (isObject(vm.file)) {
            return { ...vm }
        }

        return vm
    })
}
