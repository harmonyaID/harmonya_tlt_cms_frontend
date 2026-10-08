import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateExperience = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2 } = formContent

    return (
        <div className="vstack gap-3">
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

            <GeneralRowForm label="Section 2">
                <WrapFormContext
                    formRequest={SECTION2}
                    actions={{
                        change: (name, value) =>
                            actions.change('SECTION2.' + name, value),
                    }}>
                    <div className="form-group">
                        <FormTinyMCE
                            label="Title"
                            isSimple
                            name="title"
                            value={SECTION2?.title || ''}
                            isUseHook={false}
                            required
                            actions={{
                                onChange: (passName, passValue) =>
                                    actions.change('SECTION2.title', passValue),
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FormTinyMCE
                            label="Description"
                            isSimple
                            name="description"
                            value={SECTION2?.description || ''}
                            isUseHook={false}
                            required
                            actions={{
                                onChange: (passName, passValue) =>
                                    actions.change(
                                        'SECTION2.description',
                                        passValue,
                                    ),
                            }}
                        />
                    </div>
                </WrapFormContext>
            </GeneralRowForm>
        </div>
    )
}

export default PageTemplateExperience
