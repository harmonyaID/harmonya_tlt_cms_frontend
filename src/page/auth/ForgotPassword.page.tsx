import { useState } from 'react'
import { Link } from 'react-router'
import { ArrowLeft } from 'iconsax-react'
import AuthLayout from './component/AuthLayout'
// import InputForm from '@/component/form/Input.form'
import authPath from '@/path/auth.path.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import FormInput from '@/component/form/FormInput.tsx'

import '@/asset/theme/base/_auth.scss'

const ForgotPasswordPage = () => {
    const [formRequest, setFormRequest] = useState({
        email: '',
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
                    <Link
                        to={authPath.login}
                        className="text-primary text-decoration-none">
                        <span className="pe-2">
                            <ArrowLeft size={20} />
                        </span>
                        Back to Sign In
                    </Link>
                </div>
                <div className="w-100 px-md-3 px-lg-5 mt-5 mb-auto">
                    <h4 className="fw-600">Forgot Password</h4>
                    <p className="fw-400 text-neutral-200 pb-2">
                        Input your email to reset the password
                    </p>

                    <FormWrap actions={{ handleSubmit: _handleSubmit }}>
                        <WrapFormContext
                            formRequest={formRequest}
                            actions={{
                                change: _handleChange,
                            }}>
                            <FormInput
                                name="email"
                                label="Email"
                                type="email"
                                id="form-email"
                                placeholder="e.g arbi@demo.com"
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

export default ForgotPasswordPage
