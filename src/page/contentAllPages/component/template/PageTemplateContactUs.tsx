import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'
import FormInputPhone from '@/component/form/FormInputPhone.tsx'

const PageTemplateContactUs = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2, SECTION3 } = formContent

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
                        required
                        placeholder="e.g Experience"
                    />

                    <FormTextArea
                        label="Description"
                        name="description"
                        value={SECTION2?.description || ''}
                        required
                        placeholder="e.g Day trips, transport, services, and the community"
                    />

                    <FormInputPhone
                        value={SECTION2.phoneID}
                        label="Phone Indonesia"
                        defaultCountry="ID"
                        actions={{
                            onChange: (value) =>
                                actions.change('SECTION2.phoneID', value),
                        }}
                    />

                    <FormInputPhone
                        value={SECTION2.phoneAU}
                        label="Phone Australia"
                        actions={{
                            onChange: (value) =>
                                actions.change('SECTION2.phoneAU', value),
                        }}
                    />

                    <FormInput
                        type="email"
                        label="Reservation Email"
                        name="reservationEmail"
                        value={SECTION2?.reservationEmail || ''}
                        placeholder="e.g john@gmail.com"
                    />

                    <FormInput
                        type="email"
                        label="Poperty Email"
                        name="propertyEmail"
                        value={SECTION2?.propertyEmail || ''}
                        placeholder="e.g john@gmail.com"
                    />

                    <FormInput
                        type="email"
                        label="Business Email"
                        name="businessEmail"
                        value={SECTION2?.businessEmail || ''}
                        placeholder="e.g john@gmail.com"
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
                        required
                        placeholder="e.g Experience"
                    />

                    <div className="pb-3">
                        <FormTinyMCE
                            label="Address"
                            name="description"
                            value={SECTION3?.description || ''}
                            isUseHook={false}
                            actions={{
                                // ...actions,
                                onChange: (passName, passValue) =>
                                    actions.change(
                                        'SECTION3.description',
                                        passValue,
                                    ),
                            }}
                        />
                    </div>

                    <FormTextArea
                        label="Link Embed Map"
                        name="linkEmbedMap"
                        value={SECTION3?.linkEmbedMap || ''}
                        required
                        placeholder="e.g https"
                    />
                </WrapFormContext>
            </GeneralRowForm>
        </>
    )
}

export default PageTemplateContactUs
