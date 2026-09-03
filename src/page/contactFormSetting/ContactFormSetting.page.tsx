import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabContactFormType from '@/page/contactFormSetting/container/TabContactFormType.tsx'

const ContactFormPage = () => {
    return (
        <>
            <div className="mb-4">
                <PageTitle title="Contact Form Setting" />
            </div>

            <CardNavTab
                tabs={[objectTab('Type', 'tabContactFormType')]}
                tabContents={[objectTabContent('', <TabContactFormType />)]}
            />
        </>
    )
}

export default ContactFormPage
