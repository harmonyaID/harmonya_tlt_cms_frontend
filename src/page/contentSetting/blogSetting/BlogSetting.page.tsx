import { PageTitle } from '@/component/general/TitleGeneral.tsx'
// import CardNavTab from '@/component/card/CardNavTab.tsx'
// import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
// import TabFAQ from '@/page/contentSetting/blogSetting/container/TabFAQ.tsx'
// import TabLanguage from '@/page/contentSetting/blogSetting/container/TabLanguage.tsx'
// import TabTLTReview from '@/page/contentSetting/blogSetting/container/TabTLTReview.tsx'

const BlogSettingPage = () => {
    return (
        <>
            <div className="mb-4">
                <PageTitle title="Blog Setting" />
            </div>

            {/*<CardNavTab*/}
            {/*    tabs={[*/}
            {/*        objectTab('FAQ', 'tabFAQ'),*/}
            {/*        objectTab('Language', 'tabLanguage'),*/}
            {/*        objectTab('TLT Review', 'tabTLTReview'),*/}
            {/*    ]}*/}
            {/*    tabContents={[*/}
            {/*        objectTabContent('', <TabFAQ />),*/}
            {/*        objectTabContent('', <TabLanguage />),*/}
            {/*        objectTabContent('', <TabTLTReview />),*/}
            {/*    ]}*/}
            {/*/>*/}
        </>
    )
}

export default BlogSettingPage
