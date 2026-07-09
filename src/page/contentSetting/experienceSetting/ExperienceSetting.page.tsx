import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabExType from '@/page/contentSetting/experienceSetting/container/TabExType.tsx'
import { useState } from 'react'
import TabExCategory from '@/page/contentSetting/experienceSetting/container/TabExCategory.tsx'

const ExperienceSettingPage = () => {
    const [listType, setListType] = useState([])
    const [isLoadingType, setIsLoadingType] = useState<boolean>(false)

    return (
        <>
            <PageTitle title="Experience Setting" className="pb-4" />

            <CardNavTab
                tabs={[
                    objectTab('Type', 'tabTypes'),
                    objectTab('Category', 'tabCategory'),
                    // objectTab('Inquiry Form', 'tabInquiryForm'),
                ]}
                tabContents={[
                    objectTabContent(
                        '',
                        <TabExType
                            action={{
                                setListType,
                                setIsLoadingType,
                            }}
                        />,
                    ),
                    objectTabContent(
                        '',
                        <TabExCategory
                            listType={listType}
                            isLoadingType={isLoadingType}
                        />,
                    ),
                    // objectTabContent('', ''),
                ]}
            />
        </>
    )
}

export default ExperienceSettingPage
