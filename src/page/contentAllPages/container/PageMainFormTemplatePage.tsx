import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import {
    TEMPLATE_ABOUT,
    TEMPLATE_BLOG,
    TEMPLATE_OFFER,
    TEMPLATE_PROPERTY,
    TEMPLATE_PROPERTY_DETAIL,
} from '@/config/pageTemplate.config.ts'
import PageTemplateAbout from '@/page/contentAllPages/component/template/PageTemplateAbout.tsx'
import PageTemplateBlog from '@/page/contentAllPages/component/template/PageTemplateBlog.tsx'

const PageMainFormTemplatePage = ({
    template,
    content,
    actions = {
        onChange: (passName, passValue) => {},
    },
    ...props
}) => {
    const renderPageTemplate = {
        [TEMPLATE_ABOUT]: <PageTemplateAbout {...props} />,
        [TEMPLATE_BLOG]: <PageTemplateBlog {...props} />,
        // [TEMPLATE_OFFER]: <PageTemplateAbout {...props} />,
        // [TEMPLATE_PROPERTY]: <PageTemplateAbout {...props} />,
        // [TEMPLATE_PROPERTY_DETAIL]: <PageTemplateAbout {...props} />,
    }

    return (
        renderPageTemplate[template] || (
            <FormTinyMCE
                name="content"
                value={content || ''}
                isUseHook={false}
                required
                actions={{
                    ...actions,
                    // onChange: (passName, passValue) =>
                    //     props.__handleSectionInput(passName, passValue),
                }}
            />
        )
    )
}

export default PageMainFormTemplatePage
