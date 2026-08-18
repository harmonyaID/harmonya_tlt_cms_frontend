import { PageTitle } from '@/component/general/TitleGeneral.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabBlogTag from '@/page/contentSetting/blogSetting/container/TabBlogTag.tsx'
import TabBlogCategory from '@/page/contentSetting/blogSetting/container/TabBlogCategory.tsx'

const BlogSettingPage = () => (
    <>
        <PageTitle title="Blog Setting" className="pb-4" />

        <CardNavTab
            tabs={[
                objectTab('Category', 'tabCategory'),
                objectTab('Tag', 'tabTag'),
            ]}
            tabContents={[
                objectTabContent('', <TabBlogCategory />),
                objectTabContent('', <TabBlogTag />),
            ]}
        />
    </>
)

export default BlogSettingPage
