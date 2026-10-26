import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'

const PageTemplateSearch = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1 } = formContent

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
            </div>
        </>
    )
}

export default PageTemplateSearch
