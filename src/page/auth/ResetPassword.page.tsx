import { useState, useEffect } from 'react'
import '@/asset/theme/base/_auth.scss'
import AuthLayout from '@/page/auth/component/AuthLayout.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'
import useIsLoginHook from '@/hook/useIsLogin.hook.ts'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import authPath from '@/path/auth.path.ts'
import { apiAuthResetPassword } from '@/service/api/auth.api.ts'
import { ArrowLeft } from 'iconsax-react'

const ResetPasswordPage = () => {
    useIsLoginHook()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [formRequest, setFormRequest] = useState({
        password: '',
        confirmPassword: '',
        token: '',
    })
    const [isLoading, setIsLoading] = useState(false)

    const _handleChange = (name, value) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const _handleSubmit = async () => {
        setIsLoading(true)

        apiAuthResetPassword(formRequest)
            .then((resData) => {
                setIsLoading(false)
                if (isSuccess(resData)) {
                    navigate(authPath.login)
                }
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            setFormRequest((prevState) => ({ ...prevState, token }))
        }
    }, [])

    return (
        <>
            <AuthLayout>
                <div className="w-100 px-md-3 px-lg-5 mt-auto">
                    <div className="w-100 mt-auto pb-5">
                        <Link
                            to={authPath.login}
                            className="text-primary text-decoration-none">
                            <span className="pe-2">
                                <ArrowLeft size={20} />
                            </span>
                            Back to Sign In
                        </Link>
                    </div>

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
                            <FormInputPassword
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="form-confirmPassword"
                                required
                            />

                            <BtnPrimary
                                type="submit"
                                className="w-100 mt-3"
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
