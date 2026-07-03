import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import { MDSUserSettingPermission } from '@/config/modal.config.ts'
import { useEffect, useState } from 'react'
import _ from 'lodash'
import { BtnPrimary } from '@/component/general/Button.tsx'
import actionModal from '@/helper/base/actionModal.helper.ts'
import {
    getPermissionStaff,
    updatePermissionStaff,
} from '@/service/api/staff.api.ts'
import { isSuccess } from '@/helper/condition.helper.ts'
import { AvatarInTable } from '@/component/general/Avatar.tsx'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.context.tsx'
import {
    settingPermission,
    settingRoleParam,
} from '@/page/user/param/user.param.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import CardPreview from '@/component/card/CardPreview.tsx'
import FormCheckbox from '@/component/form/FormCheckbox.tsx'

interface UserSettingPermissionFormType {
    dataDetail?: { [key: string | number]: any }
    clearSelected?: () => void
}

const UserModalSettingPermission = ({
    dataDetail = { id: '', fullName: '', gender: {} },
    clearSelected = () => {},
}: UserSettingPermissionFormType) => {
    const {
        __list,
        __isLoading,
        __actionGetData,
        __actionRemoveAll,
        __actionUpdateAll,
    } = useDataListHook({
        urlAPI: (passSearch = { id: '' }) => getPermissionStaff(passSearch.id),
        isAutoSearch: false,
        advancedSearch: {
            id: dataDetail.id,
        },
    })

    const [formRequest, setFormRequest] = useState(
        _.cloneDeep(settingPermission),
    )
    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleChange = async (index) => {
        let newListAssign = [...__list]
        let newFormRequest = { ...formRequest }

        newListAssign[index].assigned = !newListAssign[index].assigned

        if (newListAssign[index].assigned) {
            newFormRequest.permissionIds.push(newListAssign[index].id)
        } else {
            let idxRemove = newFormRequest.permissionIds.findIndex(
                (id) => id === newListAssign[index].id,
            )

            if (idxRemove > -1) {
                newFormRequest.permissionIds.splice(idxRemove, 1)
            }
        }

        __actionUpdateAll(newListAssign)
        setFormRequest(newFormRequest)
    }

    const _handleCheckAll = () => {
        let newListAssign = [...__list]
        let newFormRequest = { ...formRequest }

        if (newListAssign.length > 0) {
            let ids = newListAssign.map((e) => e.id)

            if (newListAssign.filter((e) => e.assigned).length === ids.length) {
                newListAssign = newListAssign.map((e) => ({
                    ...e,
                    assigned: false,
                }))
                newFormRequest.permissionIds = []
            } else {
                newListAssign = newListAssign.map((e) => ({
                    ...e,
                    assigned: true,
                }))
                newFormRequest.permissionIds = ids
            }

            __actionUpdateAll(newListAssign)
            setFormRequest(newFormRequest)
        }
    }

    const _handleClose = () => {
        __actionRemoveAll()
        clearSelected()
        actionModal(MDSUserSettingPermission, true)
        setFormRequest(_.cloneDeep(settingPermission))
    }

    const _handleSubmit = () => {
        setIsLoading(true)
        updatePermissionStaff(dataDetail.id, formRequest).then((resData) => {
            setIsLoading(false)
            if (isSuccess(resData)) {
                _handleClose()
            }
        })
    }

    useEffect(() => {
        if (dataDetail.id) {
            __actionGetData({
                id: dataDetail.id,
            })
        }
    }, [dataDetail.id])

    useEffect(() => {
        if (!_.isEmpty(__list) && dataDetail.id) {
            const ids =
                __list.filter((e) => e.assigned).map((e) => String(e.id)) || []

            if (!_.isEmpty(ids)) {
                nestedForm._handleChange('permissionIds', ids)
            }
        }
    }, [!_.isEmpty(__list), dataDetail.id])

    return (
        <ModalMiddle
            id={MDSUserSettingPermission}
            title="Setting Permission"
            isHideClose>
            <FormWrap actions={{ handleSubmit: () => _handleSubmit() }}>
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: nestedForm._handleChange,
                    }}>
                    {dataDetail.id ? (
                        <div className="pb-4 pt-1">
                            <AvatarInTable
                                title={dataDetail.fullName}
                                subTitle={dataDetail?.gender?.name || '-'}
                            />
                        </div>
                    ) : null}

                    <div className="row">
                        {__list.map((vm, index) => {
                            return (
                                <div className="col-md-4 mb-3" key={index}>
                                    <CardPreview className="h-100 mb-0">
                                        <FormCheckbox
                                            id={vm.name + index}
                                            label={vm.name}
                                            defaultChecked={vm.assigned}
                                            name={vm.name + index}
                                            change={() => _handleChange(index)}
                                            className="cursor-pointer"
                                        />
                                    </CardPreview>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row pt-3 align-items-center justify-content-between">
                        <div className="col-auto">
                            <div>
                                <FormCheckbox
                                    id="checkAllPermission"
                                    label="Check All"
                                    defaultChecked={
                                        __list.filter((e) => e.assigned)
                                            .length === __list.length
                                    }
                                    change={_handleCheckAll}
                                    className="cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <BtnPrimary
                                type="button"
                                handle={_handleClose}
                                className="me-3"
                                isOutline
                                isDisabled={isLoading}>
                                Close
                            </BtnPrimary>

                            {!__isLoading && !_.isEmpty(__list) ? (
                                <BtnPrimary
                                    type="submit"
                                    isDisabled={isLoading}
                                    isLoading={isLoading}>
                                    Update
                                </BtnPrimary>
                            ) : null}
                        </div>
                    </div>
                </WrapFormContext>
            </FormWrap>
        </ModalMiddle>
    )
}

export default UserModalSettingPermission
