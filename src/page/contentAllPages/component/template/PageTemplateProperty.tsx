import { ReactNode } from 'react'
import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateProperty = ({
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
                    isSimple
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
            <WrapFormContext
                formRequest={formContent}
                actions={{
                    change: (name, value) => actions.change(name, value),
                }}>
                <div className="vstack gap-3">
                    <GeneralRowForm label="Section 1" isRequired>
                        <WrapFormContext
                            formRequest={formContent.SECTION1}
                            actions={{
                                change: (name, value) =>
                                    actions.change('SECTION1.' + name, value),
                            }}>
                            <div className="vstack gap-3">
                                <div className="">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Search Label Dates"
                                                name="searchLabelDates"
                                                value={
                                                    SECTION1.searchLabelDates
                                                }
                                                required
                                                placeholder="e.g Dates"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Search Placeholder Dates"
                                                name="searchPlaceholderDates"
                                                value={
                                                    SECTION1.searchPlaceholderDates
                                                }
                                                required
                                                placeholder="e.g Choose Date"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Search Label Guest"
                                                name="searchLabelGuest"
                                                value={
                                                    SECTION1.searchLabelGuest
                                                }
                                                required
                                                placeholder="e.g Guest"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Search Placeholder Guest"
                                                name="searchPlaceholderGuest"
                                                value={
                                                    SECTION1.searchPlaceholderGuest
                                                }
                                                required
                                                placeholder="e.g 2 Adults, 0 Children"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Search Label Collection"
                                                name="searchLabelCollection"
                                                value={
                                                    SECTION1.searchLabelCollection
                                                }
                                                required
                                                placeholder="e.g Guest"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Search Placeholder Collection"
                                                name="searchPlaceholderCollection"
                                                value={
                                                    SECTION1.searchPlaceholderCollection
                                                }
                                                required
                                                placeholder="e.g 2 Villas / Resort"
                                            />
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Button Text"
                                                name="buttonText"
                                                value={SECTION1.buttonText}
                                                required
                                                placeholder="e.g Search"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <FormInput
                                                label="Button Link"
                                                name="buttonLink"
                                                value={SECTION1.buttonLink}
                                                required
                                                placeholder="e.g #"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <FormInputTextEditor
                                    sectionName="SECTION1"
                                    name="content"
                                    label="Content"
                                    value={SECTION1?.content || ''}
                                    required
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
                            </div>
                        </WrapFormContext>
                    </GeneralRowForm>

                    <GeneralRowForm label="Section 2">
                        <WrapFormContext
                            formRequest={formContent.SECTION2}
                            actions={{
                                change: (name, value) =>
                                    actions.change('SECTION2.' + name, value),
                            }}>
                            <div className="vstack gap-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <FormInput
                                            label="Label"
                                            name="label"
                                            value={SECTION2.label}
                                            required
                                            placeholder="e.g Featured Stay"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormInput
                                            label="Title"
                                            name="title"
                                            value={SECTION2.title}
                                            required
                                            placeholder="e.g ARNA SUITES & OCEAN LOUNGE"
                                        />
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <FormInput
                                            label="Button Text"
                                            name="buttonText"
                                            value={SECTION2.buttonText}
                                            required
                                            placeholder="e.g Search"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <FormInput
                                            label="Button Link"
                                            name="buttonLink"
                                            value={SECTION2.buttonLink}
                                            required
                                            placeholder="e.g #"
                                        />
                                    </div>
                                </div>

                                <FormInputTextEditor
                                    sectionName="SECTION2"
                                    name="description"
                                    label="Description"
                                    value={SECTION2?.description || ''}
                                    required
                                />

                                <FormUploadFile
                                    label="Background Image"
                                    // Default
                                    {...defaultUploadFileProps}
                                    isUseHook={false}
                                    accept="image/*"
                                    required
                                    name="backgroundImage"
                                    value={SECTION2?.backgroundImage || ''}
                                    actions={{
                                        onChange: (_, newFiles) => {
                                            actions.change(
                                                'SECTION2.backgroundImage',
                                                newFiles,
                                            )
                                        },
                                    }}
                                />
                            </div>
                        </WrapFormContext>
                    </GeneralRowForm>

                    <GeneralRowForm label="Section 3" isRequired>
                        <WrapFormContext
                            formRequest={formContent.SECTION3}
                            actions={{
                                change: (name, value) =>
                                    actions.change('SECTION3.' + name, value),
                            }}>
                            <FormInput
                                label="Title"
                                name="title"
                                value={SECTION3.title}
                                required
                                placeholder="e.g Featured Offers"
                            />
                        </WrapFormContext>
                    </GeneralRowForm>
                </div>
            </WrapFormContext>
        </>
    )
}

export default PageTemplateProperty
