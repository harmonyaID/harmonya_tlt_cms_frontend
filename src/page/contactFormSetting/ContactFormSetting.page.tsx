import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabContactFormType from '@/page/contactFormSetting/container/TabContactFormType.tsx'
import TabContactFormInquiryType from '@/page/contactFormSetting/container/TabContactFormInquiryType.tsx'

const ContactFormPage = () => {
    return (
        <>
            <div className="mb-4">
                <PageTitle title="Contact Form Setting" />
            </div>

            <CardNavTab
                tabs={[
                    objectTab('Type of Contact', 'tabContactFormType'),
                    objectTab(
                        'Type of Inquiry Contact',
                        'tabContactFormInquiryType',
                    ),
                ]}
                tabContents={[
                    objectTabContent('', <TabContactFormType />),
                    objectTabContent('', <TabContactFormInquiryType />),
                ]}
            />
        </>
    )
}

export default ContactFormPage
