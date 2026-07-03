import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabFAQ from '@/page/contentSetting/pageSetting/container/TabFAQ.tsx'
import TabLanguage from '@/page/contentSetting/pageSetting/container/TabLanguage.tsx'
import TabTLTReview from '@/page/contentSetting/pageSetting/container/TabTLTReview.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import TabMediaPartner from '@/page/contentSetting/pageSetting/container/TabMediaPartner.tsx'
import TabContactFormType from '@/page/contentSetting/pageSetting/container/TabContactFormType.tsx'
import TabWebContactForm from '@/page/contentSetting/pageSetting/container/TabWebContactForm.tsx'
import { useState } from 'react'

const PageSettingPage = () => {
    const [listContactFormType, setListContactFormType] = useState([])

    const [isLoadingContactFormType, setIsLoadingListContactFormType] =
        useState<boolean>(false)

    return (
        <>
            <div className="mb-4">
                <PageTitle title="Page Setting" />
            </div>

            <CardNavTab
                tabs={[
                    objectTab('FAQ', 'tabFAQ'),
                    objectTab('Language', 'tabLanguage'),
                    objectTab('TLT Review', 'tabTLTReview'),
                    // objectTab('Media Partner', 'tabMediaPartner'),
                    // objectTab('Website Contact Form', 'tabWebsiteContactForm'),
                    // objectTab('Contact Form Type', 'tabContactFormType'),
                ]}
                tabContents={[
                    objectTabContent('', <TabFAQ />),
                    objectTabContent('', <TabLanguage />),
                    objectTabContent('', <TabTLTReview />),
                    // objectTabContent('', <TabMediaPartner />),
                    // objectTabContent(
                    //     '',
                    //     <TabWebContactForm
                    //         listContactFormType={listContactFormType}
                    //         isLoadingContactFormType={isLoadingContactFormType}
                    //     />,
                    // ),
                    // objectTabContent(
                    //     '',
                    //     <TabContactFormType
                    //         action={{
                    //             setIsLoadingFormType: (passData) =>
                    //                 setIsLoadingListContactFormType(passData),
                    //             setListFormType: (passData) =>
                    //                 setListContactFormType(passData),
                    //         }}
                    //     />,
                    // ),
                ]}
            />
        </>
    )
}

export default PageSettingPage
