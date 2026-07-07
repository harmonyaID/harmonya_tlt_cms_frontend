import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import { MDUserUpdatePassword } from '@/config/modal.config.ts'
import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { updatePasswordParam } from '@/page/user/param/user.param.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import FormWrap from '@/component/wrapping/Form.wrap'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { updatePasswordStaff } from '@/service/api/staff.api.ts'
import { isSuccess } from '@/helper/condition.helper.ts'
import { AvatarInTable } from '@/component/general/Avatar.tsx'

interface StaffFormType {
    dataDetail?: { [key: string | number]: any }
    actions?: {
        clearSelected?: () => void
    }
}

const UserModalUpdatePassword = ({
    dataDetail = { id: '', fullName: '', gender: {} },
    actions = {
        clearSelected: () => {},
    },
}: StaffFormType) => {
    const [formRequest, setFormRequest] = useState(
        cloneDeep(updatePasswordParam),
    )
    const [isLoading, setIsLoading] = useState(false)

    const nestedForm = useNestedFormHook(formRequest, setFormRequest)

    const _handleClose = () => {
        actionModal(MDUserUpdatePassword, true)
        setFormRequest(cloneDeep(updatePasswordParam))
        actions.clearSelected()
    }

    const _handleSubmit = () => {
        setIsLoading(true)
        updatePasswordStaff(dataDetail.id, formRequest).then((resData) => {
            setIsLoading(false)
            if (isSuccess(resData)) {
                _handleClose()
            }
        })
    }

    return (
        <ModalMiddle id={MDUserUpdatePassword} title="Update Password">
            <FormWrap actions={{ handleSubmit: () => _handleSubmit() }}>
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: nestedForm._handleChange,
                    }}>
                    {dataDetail.id ? (
                        <div className="pb-3 pt-1">
                            <AvatarInTable
                                title={dataDetail.fullName}
                                subTitle={dataDetail?.gender?.name || '-'}
                            />
                        </div>
                    ) : null}

                    <FormInputPassword
                        label="Password"
                        name="password"
                        value={formRequest.password}
                        required
                    />

                    <FormInputPassword
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formRequest.confirmPassword}
                        required
                    />

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
                            <BtnPrimary
                                type="submit"
                                isDisabled={isLoading}
                                isLoading={isLoading}>
                                Update
                            </BtnPrimary>
                        </div>
                    </div>
                </WrapFormContext>
            </FormWrap>
        </ModalMiddle>
    )
}

export default UserModalUpdatePassword
