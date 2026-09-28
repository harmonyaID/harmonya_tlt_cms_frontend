import FormInput from '@/component/form/FormInput.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateContactUs = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2 } = formContent

    return (
        <>
            <GeneralRowForm label="Section 1">
                <WrapFormContext
                    formRequest={SECTION1}
                    actions={{
                        change: (name, value) =>
                            actions.change('SECTION1.' + name, value),
                    }}>
                    <FormInput
                        label="Title"
                        name="title"
                        value={SECTION1?.title || ''}
                        required
                        placeholder="e.g Experience"
                    />

                    <FormUploadFile
                        label="Background Image"
                        // Default
                        {...defaultUploadFileProps}
                        isUseHook={false}

                        accept="image/*"
                        required
                        name="backgroundImage"
                        value={SECTION1?.backgroundImage || ''}
                        actions={{
                            onChange: (_, newFiles) => {
                                actions.change(
                                    'SECTION1.backgroundImage',
                                    newFiles,
                                )
                            },
                        }}
                    />
                </WrapFormContext>
            </GeneralRowForm>
        </>
    )
}

export default PageTemplateContactUs
