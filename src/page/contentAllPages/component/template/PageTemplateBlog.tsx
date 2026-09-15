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
                <GeneralRowForm label="Background Image" isRequired>
                    <FormUploadFile
                        // Default
                        {...defaultUploadFileProps}
                        isUseHook={false}

                        accept="image/*"
                        required
                        name="backgroundImage"
                        value={formContent?.backgroundImage || ''}
                        actions={{
                            onChange: (_, newFiles) => {
                                actions.change('backgroundImage', newFiles)
                            },
                        }}
                    />
                </GeneralRowForm>
            </WrapFormContext>
        </>
    )
}

export default PageTemplateBlog
