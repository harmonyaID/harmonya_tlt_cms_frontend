import SelectBaseOptionFAQType from '@/common/dataForm/SelectBaseOptionFAQType.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'

const PageTemplateFAQ = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2 } = formContent

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
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION2?.title || ''}
                            placeholder="e.g Frequently Asked Questions"
                        />

                        <SelectBaseOptionFAQType
                            label="Type"
                            name="typeId"
                            isRequired
                        />
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateFAQ
