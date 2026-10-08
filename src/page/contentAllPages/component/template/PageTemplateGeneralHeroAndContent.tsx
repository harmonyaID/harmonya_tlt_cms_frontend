import { ReactNode } from 'react'
import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateGeneralHeroAndContent = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const FormInputTextEditor = ({
        sectionName = '',
        name = '',
        value = '',
        ...other
    }: {
        sectionName?: string
        name: string
        value: any | ReactNode
        [key: string]: any
    }) => {
        return (
            <div className="form-group">
                <FormTinyMCE
                    // isSimple
                    {...other}
                    name={sectionName ? sectionName + '.' + name : name}
                    isUseHook={false}
                    value={value || ''}
                    actions={{
                        onChange: (passName, passValue) =>
                            actions.change(
                                sectionName ? sectionName + '.' + name : name,
                                passValue,
                            ),
                    }}
                />
            </div>
        )
    }

    const { SECTION1, SECTION2, SECTION3 } = formContent

    return (
        <>
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
                        <FormInputTextEditor
                            sectionName="SECTION2"
                            name="content"
                            label="Content"
                            value={SECTION2?.content || ''}
                            required
                        />
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateGeneralHeroAndContent
