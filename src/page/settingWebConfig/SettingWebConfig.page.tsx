import { useState } from 'react'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabContactFormType from '@/page/settingWebConfig/container/TabContactFormType.tsx'
import TabWebConfig from '@/page/settingWebConfig/container/TabWebConfig.tsx'
import TabWebContactForm from '@/page/settingWebConfig/container/TabWebContactForm.tsx'

const SettingWebConfigPage = () => {
    // const { __detail, __isLoading } = useDataDetailHook({
    //     urlAPI: () => getWebConfig(),
    // })

    const [listContactFormType, setListContactFormType] = useState([])

    const [isLoadingContactFormType, setIsLoadingListContactFormType] =
        useState<boolean>(false)

    return (
        <>
            <div className="mb-4">
                <PageTitle title="Website Configuration" />
            </div>

            <CardNavTab
                tabs={[
                    objectTab('Web Config', 'tabWebConfig'),
                    // objectTab('Website Contact Form', 'tabWebsiteContactForm'),
                    // objectTab('Contact Form Type', 'tabContactFormType'),
                ]}
                tabContents={[
                    objectTabContent('', <TabWebConfig />),
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

export default SettingWebConfigPage
