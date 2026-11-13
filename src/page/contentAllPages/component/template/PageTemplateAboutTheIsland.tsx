import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { setRemoveNestedArray } from '@/helper/setRemoveNestedValue.helper.ts'
import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'
import { pointDataAboutIslandSection3 } from '@/page/contentAllPages/dataSchema/dataAboutTheIslands.ts'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateAboutTheIsland = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const {
        SECTION1,
        SECTION2,
        SECTION3,
        SECTION4,
        SECTION5,
        SECTION6,
        SECTION7,
        SECTION8,
    } = formContent

    return (
        <>
            <div className="vstack gap-3">
                <WFSectionTitleAndBackground
                    label="Section 1"
                    formContent={SECTION1}
                    sectionKey="SECTION1"
                    titlePlaceholder="e.g About The Island"
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
                            required
                            placeholder="e.g About The Island"
                        />

                        <div className="form-group">
                            <FormTinyMCE
                                label="Title"
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

                    <WrapFormContext
                        formRequest={SECTION2?.images}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION2.images', value),
                            handleAddFiles: (passFiles) =>
                                actions.change('SECTION2.images', passFiles),
                            handleSetDataFiles: (newDataFiles) =>
                                actions.change('SECTION2.images', newDataFiles),
                            handleRemoveDataFile: (index, id) => {
                                const newDataFiles = setRemoveNestedArray(
                                    SECTION2,
                                    'images',
                                    index,
                                )

                                console.log('newDataFiles: ', newDataFiles)

                                actions.change('SECTION2.images', newDataFiles)
                            },
                            handleArrChange: (
                                index,
                                name,
                                value,
                                formName,
                            ) => {},
                        }}>
                        <FormUploadFileWithActionPreviewLogic
                            label="Image's"
                            isUseInputDesc={false}
                            formName="images"
                            dataFiles={SECTION2?.images || []}
                            formRequest={SECTION2?.images}
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
                        <FormUploadFile
                            label="Map Image"
                            // Default
                            {...defaultUploadFileProps}
                            isUseHook={false}

                            accept="image/*"
                            required
                            name="backgroundImage"
                            value={SECTION3?.backgroundImage || ''}
                            actions={{
                                onChange: (_, newFiles) => {
                                    actions.change(
                                        'SECTION3.backgroundImage',
                                        newFiles,
                                    )
                                },
                            }}
                        />

                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION3?.title || ''}
                            placeholder="e.g About The Island"
                        />

                        {SECTION3?.points && SECTION3?.points.length ? (
                            <>
                                {SECTION3.points.map((vm, index) => {
                                    return (
                                        <div
                                            className="card border-neutral-400 p-3 vstack gap-3 mt-3"
                                            key={index}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <p className="fs-16 mb-0">
                                                        Information{' '}
                                                        <span className="fw-500">
                                                            #{index + 1}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="col-md-6"></div>
                                            </div>

                                            <FormUploadFile
                                                label="Icon"
                                                // Default
                                                {...defaultUploadFileProps}
                                                isUseHook={false}

                                                accept="image/*"
                                                required
                                                name="icon"
                                                value={SECTION3?.icon || ''}
                                                actions={{
                                                    onChange: (_, newFiles) => {
                                                        actions.change(
                                                            'SECTION3.points[' +
                                                                index +
                                                                '].icon',
                                                            newFiles,
                                                        )
                                                    },
                                                }}
                                            />

                                            {/*<FormInput*/}
                                            {/*    label="Title"*/}
                                            {/*    name="title"*/}
                                            {/*    value={vm?.title || ''}*/}
                                            {/*    required*/}
                                            {/*    placeholder="e.g Size: Lembongan – 8.7 km², Ceningan – 3.9 km²"*/}
                                            {/*/>*/}

                                            <FormTinyMCE
                                                label="Title"
                                                isSimple
                                                name="title"
                                                value={vm.title || ''}
                                                isUseHook={false}
                                                required
                                                actions={{
                                                    onChange: (
                                                        passName,
                                                        passValue,
                                                    ) =>
                                                        actions.change(
                                                            'SECTION3.points[' +
                                                                index +
                                                                '].title',
                                                            passValue,
                                                        ),
                                                }}
                                            />
                                        </div>
                                    )
                                })}
                            </>
                        ) : null}

                        <div className="pt-3">
                            <BtnPrimary
                                className="mt-2 w-100"
                                type="button"
                                onClick={() => {
                                    actions.change(
                                        'SECTION3.points[' +
                                            SECTION3.points.length +
                                            ']',
                                        {
                                            ...pointDataAboutIslandSection3,
                                        },
                                    )
                                }}>
                                Add Information
                            </BtnPrimary>
                        </div>
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateAboutTheIsland
