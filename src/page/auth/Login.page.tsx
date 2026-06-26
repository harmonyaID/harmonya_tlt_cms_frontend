import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { LOGO_PAGE_LOGIN } from '@/config/logoPath.config.ts'
import '@/asset/theme/base/_auth.scss'
import { BtnPrimary } from '@/component/general/Button'
import AuthLayout from './component/AuthLayout'
import { WrapFormContext } from '@/context/Form.context'
import { isSuccess } from '@/helper/base/condition.helper.ts'
import { setLocalStorage } from '@/helper/base/localStorage.helper.ts'
import { LS_TOKEN } from '@/config/localStrorage.config.ts'
import authPath from '@/path/auth.path.ts'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'
import { apiAuthLogin } from '@/service/api/auth.api.ts'
import useIsLoginHook from '@/hook/useIsLogin.hook.ts'
import dashboardPath from '@/path/dashboard.path.ts'

type LoginMainParam = {
    email: string
    password: string
}

const LoginPage = () => {
    useIsLoginHook()

    const navigate = useNavigate()

    const [formRequest, setFormRequest] = useState<LoginMainParam>({
        email: '',
        password: '',
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const _handleChange = (name: string, value: any) => {
        setFormRequest((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const _handleSubmit = () => {
        setIsLoading(true)

        apiAuthLogin(formRequest)
            .then((resData) => {
                setIsLoading(false)
                if (isSuccess(resData)) {
                    setLocalStorage(LS_TOKEN, resData.result.token)
                    navigate(dashboardPath.main)
                }
            })
            .catch((err) => {
                setIsLoading(false)
            })
    }

    return (
        <AuthLayout>
            <div className="w-100 px-md-3 px-lg-5">
                <Link to="#" className="">
                    <img
                        src={LOGO_PAGE_LOGIN}
                        className="logo-admin-login"
                        alt="TLT CMS"
                    />
                </Link>
            </div>

            <div className="w-100 px-md-3 px-lg-5 d-flex align-items-end flex-column">
                <div className="w-100 mt-autoP mt-5 mb-auto">
                    <h4 className="normal fw-600 text-neutral-100">
                        Welcome to{' '}
                        <span className="text-black fw-600">CRM Traveller</span>
                    </h4>
                    <p className="fw-400 text-neutral-200 pb-3">
                        Sign in to your account below
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

                            <FormInputPassword
                                name="password"
                                label="Password"
                                id="form-password"
                                required
                            />

                            <div className="mb-4">
                                <Link
                                    to={authPath.forgotPassword}
                                    className="text-primary text-decoration-none">
                                    Forgot Password ?
                                </Link>
                            </div>

                            <BtnPrimary
                                type="submit"
                                isDisabled={isLoading}
                                isLoading={isLoading}
                                className="w-100 mt-3">
                                Sign In
                            </BtnPrimary>
                        </WrapFormContext>
                    </FormWrap>
                </div>
            </div>

            <div className="w-100 px-md-3 px-lg-5 my-auto">
                <p className="fs-13 text-center text-neutral-400 mb-0">
                    Version{' '}
                    <span className="fw-600 text-tint-300">
                        {String(__APP_VERSION__)}
                    </span>
                </p>
            </div>
        </AuthLayout>
    )
}

export default LoginPage
