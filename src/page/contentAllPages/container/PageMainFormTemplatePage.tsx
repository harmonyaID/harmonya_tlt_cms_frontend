import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import {
    TEMPLATE_ABOUT,
    TEMPLATE_BLOG,
    TEMPLATE_EXPERIENCE,
    TEMPLATE_INFO_FAQ,
    TEMPLATE_INFO_PRIVACY_POLICY,
    TEMPLATE_INFO_TNC,
    TEMPLATE_OFFER,
    TEMPLATE_PROPERTY,
    TEMPLATE_PROPERTY_DETAIL,
} from '@/config/pageTemplate.config.ts'
import PageTemplateAbout from '@/page/contentAllPages/component/template/PageTemplateAbout.tsx'
import PageTemplateBlog from '@/page/contentAllPages/component/template/PageTemplateBlog.tsx'
import PageTemplateExperience from '@/page/contentAllPages/component/template/PageTemplateExperience.tsx'
import PageTemplateGeneralHeroAndContent from '@/page/contentAllPages/component/template/PageTemplateGeneralHeroAndContent.tsx'
import PageTemplateOffer from '@/page/contentAllPages/component/template/PageTemplateOffer.tsx'
import PageTemplateProperty from '@/page/contentAllPages/component/template/PageTemplateProperty.tsx'

const PageMainFormTemplatePage = ({
    template,
    formContent,
    actions = {
        change: (passName, passValue) => {},
    },
    ...props
}) => {
    const propsPageTemplate = {
        formContent,
        actions,
    }

    const renderPageTemplate = {
        // [TEMPLATE_ABOUT]: <PageTemplateAbout {...propsPageTemplate} />,
        [TEMPLATE_BLOG]: <PageTemplateBlog {...propsPageTemplate} />,
        [TEMPLATE_OFFER]: <PageTemplateOffer {...propsPageTemplate} />,
        [TEMPLATE_PROPERTY]: <PageTemplateProperty {...propsPageTemplate} />,
        // [TEMPLATE_PROPERTY_DETAIL]: <PageTemplateAbout {...props} />,
        [TEMPLATE_EXPERIENCE]: (
            <PageTemplateExperience {...propsPageTemplate} />
        ),

        // Info Page
        [TEMPLATE_INFO_FAQ]: (
            <PageTemplateGeneralHeroAndContent {...propsPageTemplate} />
        ),
        [TEMPLATE_INFO_TNC]: (
            <PageTemplateGeneralHeroAndContent {...propsPageTemplate} />
        ),
        [TEMPLATE_INFO_PRIVACY_POLICY]: (
            <PageTemplateGeneralHeroAndContent {...propsPageTemplate} />
        ),
    }

    return (
        renderPageTemplate[template] || (
            <GeneralRowForm
                label="Content"
                isRequired
                // classNameColumnLabel="col-md-12 pb-3"
                // classNameColumnChild="col-md-12"
            >
                <FormTinyMCE
                    name="content"
                    value={formContent || ''}
                    isUseHook={false}
                    required
                    actions={{
                        // ...actions,
                        onChange: (passName, passValue) =>
                            actions.change('', passValue),
                    }}
                />
            </GeneralRowForm>
        )
    )
}

export default PageMainFormTemplatePage
