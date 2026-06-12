import _ from 'lodash'

type FormRequest = { [key: string]: any }

export const objectToFormData = async (
    formRequest: FormRequest = {},
    convertDataForm: FormData = new FormData(),
    parent: string = '',
): Promise<FormData> => {
    let fd = convertDataForm

    const keys = Object.keys(formRequest)
    await Promise.all(
        keys.map(async (vm) => {
            const newName = parent ? parent + '[' + vm + ']' : vm

            if (formRequest[vm] instanceof File) {
                fd.append(newName, formRequest[vm])
            } else if (formRequest[vm] instanceof Blob) {
                fd.append(newName, formRequest[vm], 'custom-filename.extension')
            } else if (_.isObject(formRequest[vm])) {
                fd = await objectToFormData(formRequest[vm], fd, newName)
            } else if (_.isArray(formRequest[vm])) {
                if (!_.isEmpty(formRequest[vm])) {
                    fd = await arrayToFormData(formRequest[vm], fd, newName)
                } else {
                    fd.append(newName, '')
                }
            } else {
                fd.append(newName, formRequest[vm])
            }
        }),
    )

    return fd
}

const arrayToFormData = async (
    formRequest: FormRequest[] = [],
    convertDataForm: FormData = new FormData(),
    parent: string = '',
): Promise<FormData> => {
    let fd = convertDataForm

    await Promise.all(
        formRequest.map(async (vm, index) => {
            const newName = parent
                ? parent + '[' + index + ']'
                : '[' + index + ']'

            if (vm instanceof File) {
                fd.append(newName, vm)
            } else if (vm instanceof Blob) {
                fd.append(newName, vm, 'custom-filename.extension')
            } else if (_.isObject(vm)) {
                fd = await objectToFormData(vm, fd, newName)
            } else if (_.isArray(vm)) {
                if (!_.isEmpty(vm)) {
                    fd = await arrayToFormData(vm, fd, newName)
                } else {
                    fd.append(newName, '')
                }
            } else {
                fd.append(newName, vm)
            }
        }),
    )

    return fd
}
