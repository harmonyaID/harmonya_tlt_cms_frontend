import ModalMiddle from '@/component/modal/ModalMiddle.tsx'
import { MDUserUpdateSuperAdmin } from '@/config/modal.config.ts'
import { useState, useEffect } from 'react'
import { updateSuperAdminStaff } from '@/service/api/staff.api.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import { BtnPrimary } from '@/component/general/Button.tsx'
import { TextIconLoading } from '@/component/general/TextDefault.tsx'
import { AvatarInTable } from '@/component/general/Avatar.tsx'

const initForm = {
    isSuperadmin: false,
}

interface Props {
    dataDetail?: { [key: string | number]: any }
    actions?: {
        clearSelected?: () => void
        callBack?: (passNewData?: object | any) => void
    }
}

const UserModalUpdateSuperAdmin = ({ dataDetail = {}, actions }: Props) => {
    const [formRequest, setFormRequest] = useState({ ...initForm })

    const [isLoading, setIsLoading] = useState(false)

    const { __handleChange } = useNestedFormHook(formRequest, setFormRequest)

    const _handleClose = () => {
        actions.clearSelected()
        actionModal(MDUserUpdateSuperAdmin, true)
        setFormRequest(() => ({ ...initForm }))
    }

    const _handleSubmit = () => {
        setIsLoading(true)
        updateSuperAdminStaff(dataDetail.id, formRequest).then((resData) => {
            setIsLoading(false)
            if (isSuccess(resData)) {
                actions.callBack(resData.result)
                _handleClose()
            }
        })
    }

    useEffect(() => {
        if (dataDetail.id) {
            setFormRequest((prevState) => {
                const newState = { ...prevState }
                newState.isSuperadmin = dataDetail.isSuperadmin || false
                return newState
            })
        }
    }, [dataDetail.id])

    return (
        <ModalMiddle
            id={MDUserUpdateSuperAdmin}
            title="Change Super Admin"
            isHideClose>
            <FormWrap actions={{ handleSubmit: _handleSubmit }}>
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: (name, value) => __handleChange(name, value),
                    }}>
                    {dataDetail.id ? (
                        <div className="pb-4 pt-1">
                            <AvatarInTable
                                title={dataDetail.fullName}
                                subTitle={dataDetail?.gender?.name || '-'}
                            />
                        </div>
                    ) : null}

                    <FormRadioButtonMulti
                        label="Super Admin ?"
                        name="isSuperadmin"
                        checkBoxs={[
                            {
                                defaultValue: false,
                                label: 'No',
                            },
                            {
                                defaultValue: true,
                                label: 'Yes',
                            },
                        ]}
                    />
                </WrapFormContext>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <BtnPrimary
                            isOutline
                            disabled={isLoading}
                            handle={_handleClose}
                            className="me-3">
                            Cancel
                        </BtnPrimary>

                        <BtnPrimary type="submit" disabled={isLoading}>
                            <TextIconLoading
                                name="Submit"
                                isAction={isLoading}
                            />
                        </BtnPrimary>
                    </div>
                </div>
            </FormWrap>
        </ModalMiddle>
    )
}

export default UserModalUpdateSuperAdmin
