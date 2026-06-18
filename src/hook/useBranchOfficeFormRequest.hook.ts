import { useState, useEffect } from 'react'
import _ from 'lodash'
// import useBranchOfficeStore from '@/store/useBranchOffice.store'
import { FormRequest, SetFormRequest } from '@/type/form.type'

const useBranchOfficeFormRequestHook = (
    formRequest: FormRequest,
    setFormRequest: SetFormRequest,
    keyFormRequest = 'branches',
    keyValue = 'value',
) => {
    const { __list: listBranchOffices } = {
        __list: [],
    }
    //     useBranchOfficeStore({
    //     isFormatList: false,
    // })

    const [isCheckedAllCompanyOffice, setIsCheckedAllCompanyOffice] =
        useState(false)

    const _handleAddCompanyOffice = (newSelected: object | any = {}) => {
        setFormRequest((prevState) => {
            const newFormRequest = { ...prevState }

            if (!_.isEmpty(newSelected)) {
                newFormRequest[keyFormRequest] = [
                    ...newFormRequest[keyFormRequest],
                    newSelected,
                ]
            }

            _handleAllCompanyOfficeChecked(newFormRequest)

            return newFormRequest
        })
    }

    const _handleRemoveCompanyOffice = (branchId: string | number = '') => {
        setFormRequest((prevState) => {
            const newFormRequest = { ...prevState }

            newFormRequest[keyFormRequest] = newFormRequest[
                keyFormRequest
            ].filter((e) => e[keyValue] !== branchId)

            _handleAllCompanyOfficeChecked(newFormRequest)

            return newFormRequest
        })
    }

    const _handleAllCompanyOfficeChecked = (
        newFormRequest: object | any = {},
    ) => {
        if (!_.isEmpty(newFormRequest)) {
            const documentBranchOffices = newFormRequest[keyFormRequest]?.length
            const currentBranchOffices = listBranchOffices?.length

            const allRemoved =
                documentBranchOffices === 0 ||
                documentBranchOffices !== currentBranchOffices

            setIsCheckedAllCompanyOffice(!allRemoved)
        } else {
            setIsCheckedAllCompanyOffice(false)
        }
    }

    const _handleAddAllCompanyOffice = (newSelected: any[] = []) => {
        const newBranchOffices =
            newSelected?.map((vm) => ({
                value: vm.id,
                label: vm.name,
            })) || []

        setFormRequest((prevState) => {
            const newFormRequest = { ...prevState }

            newFormRequest[keyFormRequest] = isCheckedAllCompanyOffice
                ? []
                : [...newBranchOffices]

            _handleAllCompanyOfficeChecked(newFormRequest)

            return newFormRequest
        })
    }

    useEffect(() => {
        if (!_.isEmpty(formRequest[keyFormRequest])) {
            _handleAllCompanyOfficeChecked(formRequest)
        }
    }, [formRequest])

    return {
        __formRequestBranchOffice: formRequest[keyFormRequest],
        __isCheckedAllCompanyOffice: isCheckedAllCompanyOffice,
        __handleAddCompanyOffice: _handleAddCompanyOffice,
        __handleRemoveCompanyOffice: _handleRemoveCompanyOffice,
        __handleAllCompanyOfficeChecked: _handleAllCompanyOfficeChecked,
        __handleAddAllCompanyOffice: _handleAddAllCompanyOffice,
    }
}

export default useBranchOfficeFormRequestHook
