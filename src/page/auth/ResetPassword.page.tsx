import { useState } from 'react'
import '@/asset/theme/base/_auth.scss'
import AuthLayout from '@/page/auth/component/AuthLayout.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'

const ResetPasswordPage = () => {
    const [formRequest, setFormRequest] = useState({
        password: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleChange = (name: string, value: any) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const _handleSubmit = async () => {}

    return (
        <>
            <AuthLayout>
                <div className="w-100 px-md-3 px-lg-5 mt-auto">
                    <h4 className="fw-600">Reset New Password</h4>
                    <p className="fw-400 text-neutral-200 pb-2">
                        Input your new password
                    </p>

                    <FormWrap actions={{ handleSubmit: _handleSubmit }}>
                        <WrapFormContext
                            formRequest={formRequest}
                            actions={{
                                change: _handleChange,
                            }}>
                            <FormInputPassword
                                name="password"
                                label="Password"
                                id="form-password"
                                required
                            />

                            <BtnPrimary
                                type="submit"
                                isDisabled={isLoading}
                                isLoading={isLoading}>
                                Reset Password
                            </BtnPrimary>
                        </WrapFormContext>
                    </FormWrap>
                </div>
            </AuthLayout>
        </>
    )
}

export default ResetPasswordPage
