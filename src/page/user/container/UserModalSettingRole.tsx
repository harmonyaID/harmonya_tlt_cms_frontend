import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import { MDUserSettingRole } from '@/config/modal.config.ts'
import { useEffect, useState } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import { BtnPrimary } from '@/component/general/Button.tsx'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { getRoleStaff, updateRoleStaff } from '@/service/api/staff.api.ts'
import { isSuccess } from '@/helper/condition.helper.ts'
import { AvatarInTable } from '@/component/general/Avatar.tsx'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { settingRoleParam } from '@/page/user/param/user.param.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'

interface staffFormType {
    dataDetail?: { [key: string | number]: any }
    clearSelected?: () => void
}

const UserModalSettingRole = ({
    dataDetail = { id: '', fullName: '', gender: {} },
    clearSelected = () => {},
}: staffFormType) => {
    const { __list, __isLoading, __actionGetData, __actionRemoveAll } =
        useDataListHook({
            urlAPI: (passSearch = { id: '' }) =>
                getRoleStaff(passSearch.id, 'tcSettingRole' + passSearch.id),
            isAutoSearch: false,
            advancedSearch: {
                id: dataDetail.id,
            },
        })

    const [formRequest, setFormRequest] = useState(cloneDeep(settingRoleParam))
    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleClose = () => {
        __actionRemoveAll()
        clearSelected()
        actionModal(MDUserSettingRole, true)
        setFormRequest(cloneDeep(settingRoleParam))
    }

    const _handleSubmit = () => {
        setIsLoading(true)
        updateRoleStaff(dataDetail.id, formRequest).then((resData) => {
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
        if (!isEmpty(__list) && dataDetail.id) {
            const idxActive = __list.findIndex((vm) => vm.assigned === true)
            if (idxActive > -1) {
                nestedForm._handleChange('roleId', String(__list[idxActive].id))
            }
        }
    }, [!isEmpty(__list), dataDetail.id])

    return (
        <ModalMiddle id={MDUserSettingRole} title="Setting Role" isHideClose>
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

                    {!__isLoading && !isEmpty(__list) ? (
                        <FormRadioButtonMulti
                            label="Setting Role"
                            name="roleId"
                            required
                            // nameOfChange="chooseStatus"
                            checkBoxs={__list.map((vm) => ({
                                defaultValue: vm.id,
                                label: vm.display,
                            }))}
                        />
                    ) : null}

                    <div className="row pt-3">
                        <div className="col-md-12">
                            <BtnPrimary
                                type="button"
                                handle={_handleClose}
                                className="me-3"
                                isOutline
                                isDisabled={isLoading}>
                                Close
                            </BtnPrimary>

                            {!__isLoading && !isEmpty(__list) ? (
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

export default UserModalSettingRole
