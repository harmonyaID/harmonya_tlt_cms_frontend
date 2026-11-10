import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'

const PageTemplateIslandGuideAboutTheIsland = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2, SECTION3, SECTION4, SECTION5 } = formContent

    return (
        <>
            <div className="vstack gap-3">
                <WFSectionTitleAndBackground
                    label="Section 1"
                    formContent={SECTION1}
                    sectionKey="SECTION1"
                    titlePlaceholder="e.g FAQ"
                    actions={{ ...actions }}
                />

                <GeneralRowForm label="Section 2">
                    <WrapFormContext
                        formRequest={SECTION2}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION2.' + name, value),
                        }}></WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 3">
                    <WrapFormContext
                        formRequest={SECTION3}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION3.' + name, value),
                        }}></WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 4">
                    <WrapFormContext
                        formRequest={SECTION4}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION4.' + name, value),
                        }}></WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 5">
                    <WrapFormContext
                        formRequest={SECTION5}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION5.' + name, value),
                        }}></WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateIslandGuideAboutTheIsland