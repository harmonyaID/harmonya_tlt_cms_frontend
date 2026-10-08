import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'

const PageTemplateGeneralHero = ({
    formContent,
    titlePlaceholder = 'e.g Offers',
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1 } = formContent

    return (
        <>
            <WFSectionTitleAndBackground
                label="Section 1"
                formContent={SECTION1}
                sectionKey="SECTION1"
                titlePlaceholder={titlePlaceholder}
                actions={actions}
            />
        </>
    )
}

export default PageTemplateGeneralHero
