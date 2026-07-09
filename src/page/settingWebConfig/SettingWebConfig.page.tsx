import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { getWebConfig } from '@/service/api/systemManagement.api.ts'
import CardListData from '@/component/card/CardListData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import { useState } from 'react'
import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabMediaPartner from '@/page/settingWebConfig/container/TabMediaPartner.tsx'
import TabWebContactForm from '@/page/settingWebConfig/container/TabWebContactForm.tsx'
import TabContactFormType from '@/page/settingWebConfig/container/TabContactFormType.tsx'
import TabWebConfig from '@/page/settingWebConfig/container/TabWebConfig.tsx'

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
                    objectTab('Media Partner', 'tabMediaPartner'),
                    objectTab('Website Contact Form', 'tabWebsiteContactForm'),
                    objectTab('Contact Form Type', 'tabContactFormType'),
                ]}
                tabContents={[
                    objectTabContent('', <TabWebConfig />),
                    objectTabContent('', <TabMediaPartner />),
                    objectTabContent(
                        '',
                        <TabWebContactForm
                            listContactFormType={listContactFormType}
                            isLoadingContactFormType={isLoadingContactFormType}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabContactFormType
                            action={{
                                setIsLoadingFormType: (passData) =>
                                    setIsLoadingListContactFormType(passData),
                                setListFormType: (passData) =>
                                    setListContactFormType(passData),
                            }}
                        />,
                    ),
                ]}
            />
        </>
    )
}

export default SettingWebConfigPage
