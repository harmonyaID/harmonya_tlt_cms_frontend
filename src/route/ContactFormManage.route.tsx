import { lazy } from 'react'
import { Route } from 'react-router'
import Page404Layout from '@/component/layout/Page404.layout.tsx'
import SuspenseLayout from '@/component/layout/Suspense.layout.tsx'
import {
    contactFormPath,
    contactFormSettingPath,
} from '@/path/contactFormManage.path.ts'

const titleContactForm = 'Contact Form'

const titleTypeSetting = 'Type Setting'

const ContactFormPage = lazy(
    () => import('@/page/contactForm/ContactForm.page.tsx'),
)

const ContactFormSettingPage = lazy(
    () => import('@/page/contactFormSetting/ContactFormSetting.page.tsx'),
)

const ContactFormManageRoute = () => (
    <>
        <Route>
            <Route
                index
                path={contactFormPath.main}
                element={
                    <SuspenseLayout
                        titleNavbar={titleContactForm}
                        isCheckPermission={false}>
                        <ContactFormPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={<Page404Layout to={contactFormPath.main} />}
            />
        </Route>

        <Route>
            <Route
                index
                path={contactFormSettingPath.type.main}
                element={
                    <SuspenseLayout
                        titleNavbar={titleTypeSetting}
                        isCheckPermission={false}>
                        <ContactFormSettingPage />
                    </SuspenseLayout>
                }
            />

            <Route
                path="*"
                element={
                    <Page404Layout to={contactFormSettingPath.type.main} />
                }
            />
        </Route>
    </>
)

export default ContactFormManageRoute
