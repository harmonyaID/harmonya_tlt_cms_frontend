import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateOffer = ({
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
                <div className="vstack gap-3">
                    <GeneralRowForm label="Section 1">
                        <WrapFormContext
                            formRequest={formContent.SECTION1}
                            actions={{
                                change: (name, value) =>
                                    actions.change('SECTION1.' + name, value),
                            }}>
                            <FormInput
                                label="Title"
                                name="title"
                                value={formContent?.SECTION1?.title || ''}
                                required
                                placeholder="e.g Offers"
                            />

                            <FormUploadFile
                                label="Background Image"
                                // Default
                                {...defaultUploadFileProps}
                                isUseHook={false}

                                accept="image/*"
                                required
                                name="backgroundImage"
                                value={
                                    formContent?.SECTION1?.backgroundImage || ''
                                }
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
                            formRequest={formContent.SECTION2}
                            actions={{
                                change: (name, value) =>
                                    actions.change('SECTION2.' + name, value),
                            }}>
                            <FormInput
                                label="Title"
                                name="title"
                                value={formContent?.SECTION2?.title || ''}
                                required
                                placeholder="e.g Offers"
                            />

                            <FormTinyMCE
                                label="Description"
                                isSimple
                                name="description"
                                value={formContent || ''}
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
                        </WrapFormContext>
                    </GeneralRowForm>
                </div>
            </WrapFormContext>
        </>
    )
}

export default PageTemplateOffer
