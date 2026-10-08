import FormInput from '@/component/form/FormInput.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateBlog = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    return (
        <>
            <WrapFormContext
                formRequest={formContent}
                actions={{
                    change: (name, value) => actions.change(name, value),
                }}>
                <GeneralRowForm label="Section 1">
                    <WrapFormContext
                        formRequest={formContent.SECTION1}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION1.' + name, value),
                        }}>
                        <FormUploadFile
                            label="Background Image"
                            // Default
                            {...defaultUploadFileProps}
                            isUseHook={false}

                            accept="image/*"
                            required
                            name="backgroundImage"
                            value={formContent?.SECTION1?.backgroundImage || ''}
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
            </WrapFormContext>
        </>
    )
}

export default PageTemplateBlog
