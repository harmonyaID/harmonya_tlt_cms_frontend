import { useState } from 'react'
import { isEmpty } from 'lodash'

const useFormDataFilesHook = (
    formRequest,
    setFormRequest,
    param = 'attachments',
) => {
    const [dataFiles, setDataFiles] = useState([])

    // Handle Attachment Start
    const _handleAddFiles = (newFiles = []) => {
        let newFormRequest = { ...formRequest }
        if (isEmpty(newFormRequest[param])) {
            newFormRequest[param] = []
        }

        newFiles.map((vm) => {
            newFormRequest[param].push(vm)
        })
        setFormRequest((prevState) => ({
            ...prevState,
            [param]: newFormRequest[param],
        }))
    }

    const _handleSetDataFiles = (newPreviewFiles = [], isNew = false) => {
        setDataFiles((prev) =>
            isNew ? [...newPreviewFiles] : [...prev, ...newPreviewFiles],
        )
    }

    const _handleRemoveDataFile = (index = -1) => {
        setFormRequest((prevState) => {
            let newPrevState = { ...prevState }

            if (index > -1) {
                newPrevState[param].splice(index, 1)
            }

            return newPrevState
        })

        setDataFiles((prevState) => {
            let newDataFiles = prevState
            newDataFiles.splice(index, 1)

            return newDataFiles
        })
    }
    // Handle Attachment End

    const _handleAddFilesEdit = (newFiles = []) => {}

    return {
        __dataFiles: dataFiles,
        __actionAddFiles: _handleAddFiles,
        __actionSetDataFiles: _handleSetDataFiles,
        __actionRemoveDataFile: _handleRemoveDataFile,
    }
}

export default useFormDataFilesHook
