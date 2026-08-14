// import { useState, useEffect } from 'react'
// import { isEmpty, isArray } from 'lodash'
// import {
//     DEFAULT_UPLOAD_ID,
//     INITIAL_UPLOAD_ID,
// } from '@/helper/fileUpload.helper'
// import { UploadFileFormRequest } from './type/hook.type'
//
// const useUploadFileFormRequestHook = ({
//     formRequest,
//     setFormRequest,
//     keyFormRequest = 'attachments',
//     withMimeType = false,
//     isLoadData = false,
//     withDeleted = false,
//     isMulti = true,
// }: UploadFileFormRequest) => {
//     const [dataFiles, setDataFiles] = useState([])
//
//     const _handleAddFiles = (newFiles: any = []) => {
//         setFormRequest((prevState) => {
//             const newFormRequest = { ...prevState }
//
//             if (isEmpty(newFormRequest[keyFormRequest])) {
//                 newFormRequest[keyFormRequest] = []
//             }
//
//             if (!isArray(newFiles) && !isMulti) {
//                 if (!withMimeType) {
//                     newFormRequest[keyFormRequest].push(newFiles)
//                 } else {
//                     if (newFormRequest[keyFormRequest].length > 0) {
//                         newFormRequest[keyFormRequest][0].deleted = true
//                     }
//                     newFormRequest[keyFormRequest].push({
//                         ...(withDeleted ? { id: DEFAULT_UPLOAD_ID } : {}),
//                         file: newFiles,
//                         mimeType: newFiles.type,
//                     })
//                 }
//             } else {
//                 newFiles?.forEach((vm, idxFile) => {
//                     if (!withMimeType) {
//                         newFormRequest[keyFormRequest].push(vm)
//                     } else {
//                         newFormRequest[keyFormRequest].push({
//                             ...(withDeleted
//                                 ? { id: DEFAULT_UPLOAD_ID + '-' + idxFile }
//                                 : {}),
//                             file: vm,
//                             mimeType: vm.type,
//                         })
//                     }
//                 })
//             }
//
//             return newFormRequest
//         })
//     }
//
//     const _handleSetDataFiles = (
//         newPreviewFiles: any = [],
//         isUseOld = true,
//     ) => {
//         setDataFiles((prev) => {
//             if (!isArray(newPreviewFiles) && !isMulti) {
//                 return [
//                     {
//                         ...newPreviewFiles,
//                         ...(withDeleted ? { id: DEFAULT_UPLOAD_ID } : {}),
//                     },
//                 ]
//             }
//
//             return isUseOld
//                 ? [
//                       ...prev.map((file) => ({
//                           ...file,
//                           ...(withDeleted ? { deleted: true } : {}),
//                       })),
//                       ...newPreviewFiles.map((vm, idxFile) => ({
//                           ...vm,
//                           ...(withDeleted
//                               ? { id: DEFAULT_UPLOAD_ID + '-' + idxFile }
//                               : {}),
//                       })),
//                   ]
//                 : newPreviewFiles
//         })
//     }
//
//     const _handleRemoveDataFile = (index = -1, idFile = '') => {
//         setFormRequest((prevState) => {
//             const newPrevState = { ...prevState }
//
//             const idx = newPrevState[keyFormRequest].findIndex(
//                 (file) => file.id === idFile,
//             )
//
//             if (idx > -1 && idFile) {
//                 if (
//                     withDeleted &&
//                     typeof newPrevState[keyFormRequest][idx].file === 'string'
//                 ) {
//                     newPrevState[keyFormRequest][idx].deleted = true
//                 } else {
//                     newPrevState[keyFormRequest].splice(idx, 1)
//                 }
//             } else {
//                 newPrevState[keyFormRequest].splice(index, 1)
//             }
//
//             return newPrevState
//         })
//
//         setDataFiles((prevState) => {
//             const newDataFiles = prevState
//             newDataFiles.splice(index, 1)
//
//             return newDataFiles
//         })
//     }
//
//     const _handleInitialData = (attachments = []) => {
//         setFormRequest((prevState) => {
//             const newFormRequest = { ...prevState }
//
//             newFormRequest[keyFormRequest] = newFormRequest[keyFormRequest].map(
//                 (vm, idxFile) => {
//                     return {
//                         ...vm,
//                         ...(withDeleted
//                             ? {
//                                   id: INITIAL_UPLOAD_ID + '-' + idxFile,
//                                   deleted: false,
//                               }
//                             : {}),
//                     }
//                 },
//             )
//
//             return newFormRequest
//         })
//
//         setDataFiles((prevState) => {
//             let newPrevState = [...prevState]
//
//             newPrevState = attachments.map((vm, idxFile) => {
//                 return {
//                     ...vm,
//                     ...(withDeleted
//                         ? {
//                               id: INITIAL_UPLOAD_ID + '-' + idxFile,
//                               deleted: false,
//                           }
//                         : {}),
//                 }
//             })
//
//             return newPrevState
//         })
//     }
//
//     useEffect(() => {
//         if (isLoadData) {
//             _handleInitialData(formRequest[keyFormRequest])
//         } else {
//             _handleSetDataFiles([], false)
//         }
//     }, [isEmpty(formRequest[keyFormRequest])])
//
//     return {
//         __dataFiles: dataFiles,
//         __handleAddFiles: _handleAddFiles,
//         __handleSetDataFiles: _handleSetDataFiles,
//         __handleRemoveDataFile: _handleRemoveDataFile,
//     }
// }
//
// export default useUploadFileFormRequestHook

import { useState, useEffect } from 'react'
import { isArray, isEmpty } from 'lodash'
import { generateUploadFileUniqueID } from '@/helper/fileUpload.helper'
import { UploadFileFormRequest } from './type/hook.type'

const useUploadFileFormRequestHook = ({
    formRequest,
    setFormRequest,
    keyFormRequest = 'attachments',
    externalFormRequest = {},
    withMimeType = false,
    isLoadData = false,
    withDeleted = false,
    isMulti = true,
}: UploadFileFormRequest) => {
    const [dataFiles, setDataFiles] = useState([])

    // Create uniqueId
    const [initialID, setInitialID] = useState<string>('')
    const [defaultID, setDefaultID] = useState<string>(
        generateUploadFileUniqueID(),
    )

    const _generateDefaultID = (id: string) => setDefaultID(id)
    const _generateInitialID = (id: string) => setInitialID(id)

    const _handleAddFiles = (newFiles: any = []) => {
        _generateDefaultID(generateUploadFileUniqueID())

        setFormRequest((prevState) => {
            const newFormRequest = { ...prevState }

            if (isEmpty(newFormRequest[keyFormRequest])) {
                newFormRequest[keyFormRequest] = []
            }

            if (!isArray(newFiles) && !isMulti) {
                if (!withMimeType) {
                    newFormRequest[keyFormRequest].push({
                        ...newFiles,
                        ...externalFormRequest,
                    })
                } else {
                    if (newFormRequest[keyFormRequest].length > 0) {
                        newFormRequest[keyFormRequest][0].deleted = true
                    }

                    newFormRequest[keyFormRequest].push({
                        ...(withDeleted ? { id: defaultID } : {}),
                        file: newFiles,
                        mimeType: newFiles.type,
                        ...externalFormRequest,
                    })
                }
            } else {
                newFiles.forEach((vm, idxFile) => {
                    if (!withMimeType) {
                        newFormRequest[keyFormRequest].push({
                            ...vm,
                            ...externalFormRequest,
                        })
                    } else {
                        newFormRequest[keyFormRequest].push({
                            ...(withDeleted
                                ? { id: defaultID + '-' + idxFile }
                                : {}),
                            file: vm,
                            mimeType: vm.type,
                            ...externalFormRequest,
                        })
                    }
                })
            }

            return newFormRequest
        })
    }

    const _handleSetDataFiles = (
        newPreviewFiles: any = [],
        isUseOld = true,
    ) => {
        setDataFiles((prev) => {
            if (!isArray(newPreviewFiles) && !isMulti) {
                return [
                    {
                        ...newPreviewFiles,
                        ...(withDeleted ? { id: defaultID } : {}),
                    },
                ]
            }

            return isUseOld
                ? [
                      ...prev,
                      ...newPreviewFiles.map((vm, idxFile) => ({
                          ...vm,
                          ...(withDeleted
                              ? { id: defaultID + '-' + idxFile }
                              : {}),
                      })),
                  ]
                : newPreviewFiles
        })
    }

    const _handleRemoveDataFile = (index = -1, idFile = '') => {
        setFormRequest((prevState) => {
            const newPrevState = { ...prevState }

            const idx = newPrevState[keyFormRequest].findIndex(
                (file) => file.id === idFile,
            )

            if (idx > -1 && idFile) {
                if (
                    withDeleted &&
                    typeof newPrevState[keyFormRequest][idx].file === 'string'
                ) {
                    newPrevState[keyFormRequest][idx].deleted = true
                } else {
                    newPrevState[keyFormRequest].splice(idx, 1)
                }
            } else {
                newPrevState[keyFormRequest].splice(index, 1)
            }

            return newPrevState
        })

        setDataFiles((prevState) => {
            const newDataFiles = prevState

            const idx = newDataFiles.findIndex((file) => file.id === idFile)

            if (idx > -1 && idFile) {
                if (
                    withDeleted &&
                    !newDataFiles[idx].file.startsWith('data:')
                ) {
                    newDataFiles[idx].deleted = true
                } else {
                    newDataFiles.splice(idx, 1)
                }
            } else {
                newDataFiles.splice(index, 1)
            }

            return newDataFiles
        })
    }

    const _handleInitialData = (attachments = []) => {
        _generateInitialID(generateUploadFileUniqueID('initial-upload'))

        setFormRequest((prevState) => {
            const newFormRequest = { ...prevState }

            newFormRequest[keyFormRequest] = newFormRequest[keyFormRequest].map(
                (vm, idxFile) => {
                    return {
                        ...vm,
                        ...(withDeleted
                            ? {
                                  id: initialID + '-' + idxFile,
                                  deleted: false,
                              }
                            : {}),
                    }
                },
            )

            return newFormRequest
        })

        setDataFiles((prevState) => {
            let newPrevState = [...prevState]

            newPrevState = attachments.map((vm, idxFile) => {
                return {
                    ...vm,
                    ...(withDeleted
                        ? {
                              id: initialID + '-' + idxFile,
                              deleted: false,
                          }
                        : {}),
                }
            })

            return newPrevState
        })
    }

    useEffect(() => {
        if (isLoadData) {
            _handleInitialData(formRequest[keyFormRequest])
        } else {
            _handleSetDataFiles([], false)
        }
    }, [isLoadData, isEmpty(formRequest[keyFormRequest])])

    return {
        __dataFiles: dataFiles,
        __setDataFiles: setDataFiles,
        __handleAddFiles: _handleAddFiles,
        __handleSetDataFiles: _handleSetDataFiles,
        __handleRemoveDataFile: _handleRemoveDataFile,
    }
}

export default useUploadFileFormRequestHook
