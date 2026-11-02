import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'

const PageTemplateAbout = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2, SECTION3, SECTION4 } = formContent

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
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTinyMCE
                            isSimple
                            name="description"
                            label="Description"
                            value={SECTION2?.description || ''}
                            placeholder="e.g Boat Transfer"
                            actions={{
                                onChange: (name, value) =>
                                    actions.change('SECTION2.' + name, value),
                            }}
                        />
                    </WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 3">
                    <WrapFormContext
                        formRequest={SECTION3}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION3.' + name, value),
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION3?.title || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTextArea
                            name="subTitle"
                            label="Sub Title"
                            value={SECTION3?.subTitle || ''}
                            placeholder="e.g Boat Transfer"
                        />
                    </WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 4">
                    <WrapFormContext
                        formRequest={SECTION4}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION4.' + name, value),
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION4?.title || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTextArea
                            name="subTitle"
                            label="Sub Title"
                            value={SECTION4?.subTitle || ''}
                            placeholder="e.g Boat Transfer"
                        />
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateAbout
