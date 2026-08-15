import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import JsonEditorForm from '@/component/form/FormJsonEditor.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import SEOPreviewPublic from '@/component/general/SEOPreviewPublic.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'

const SectionFormSEOInfo = ({
    __formRequest,
    __handleChangeWithParent,
    __seoThumbnail,
    __handleSEOThumbnailRemove,
    __setSetSEOThumbnail,
    classNameColumn = 'col-md-12',
}) => {
    return (
        <>
            <CardDropdown title="SEO Information" isShow>
                <div className="row">
                    <div className={classNameColumn}>
                        <SEOPreviewPublic
                            title={__formRequest?.seo?.title || ''}
                            description={__formRequest?.seo?.description || ''}
                            urlPhoto={__seoThumbnail}
                            className="mb-4"
                        />

                        <WrapFormContext
                            formRequest={__formRequest.seo}
                            actions={{
                                change: (name, value) =>
                                    __handleChangeWithParent(
                                        name,
                                        value,
                                        'seo',
                                    ),
                            }}>
                            <GeneralRowForm
                                label="Meta Title"
                                // isRequired
                            >
                                <FormInput
                                    name="title"
                                    // required
                                    value={__formRequest?.seo?.title || ''}
                                    placeholder="e.g Best Beach Clubs in Nusa Lembongan"
                                    actions={{
                                        onChange: (name, value) => {
                                            __handleChangeWithParent(
                                                name,
                                                value,
                                                'seo',
                                            )
                                            __handleChangeWithParent(
                                                'info',
                                                value,
                                                'seo',
                                            )
                                            // __handleChangeWithParent(
                                            //     'slug',
                                            //     textSlug(value),
                                            //     'seo',
                                            // )
                                        },
                                    }}
                                />
                            </GeneralRowForm>
                            <GeneralRowForm
                                label="Meta Slug"
                                // isRequired
                            >
                                <FormInput
                                    name="slug"
                                    // required
                                    placeholder="e.g best-beach-clubs-in-nusa-lembongan"
                                />
                            </GeneralRowForm>
                            <GeneralRowForm
                                label="Meta Canonical Url"
                                // isRequired
                            >
                                <FormInput
                                    name="canonicalUrl"
                                    // required
                                    placeholder="e.g https://www.thelembongantraveller.com/nusa-lembongan/"
                                />
                            </GeneralRowForm>
                            <GeneralRowForm
                                label="Meta Description"
                                // isRequired
                            >
                                <FormTextArea
                                    name="description"
                                    // required
                                    placeholder="e.g Best Beach Clubs in Nusa Lembongan"
                                />
                            </GeneralRowForm>
                            <GeneralRowForm
                                label="Meta Keyword"
                                // isRequired
                            >
                                <FormTextArea
                                    name="metaKeyword"
                                    // required
                                    placeholder="e.g the lembongan traveller, explore bali, lembongan bali"
                                />
                            </GeneralRowForm>
                            <GeneralRowForm
                                label="Meta Image"
                                // isRequired
                            >
                                {__seoThumbnail ? (
                                    <>
                                        <div className="pb-3P">
                                            <PreviewFileModalLogic
                                                dataUrl={__seoThumbnail?.toString()}
                                                dataBy="file"
                                                dataFile={__seoThumbnail}
                                                isShowBtnRemove
                                                actions={{
                                                    remove: __handleSEOThumbnailRemove,
                                                }}
                                                classNameWidth="w-100 max-h-148px"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <FormUploadFile
                                        // label="Thumbnail"
                                        name="thumbnail"
                                        required
                                        isUseHook={false}
                                        isPreview={false}
                                        accept="image/*"
                                        actions={{
                                            onChange: (_, newFiles) => {
                                                const img = new Image()
                                                const objectUrl =
                                                    URL.createObjectURL(
                                                        newFiles,
                                                    )

                                                img.onload = () => {
                                                    __handleChangeWithParent(
                                                        'thumbnail',
                                                        newFiles,
                                                        'seo',
                                                    )
                                                }

                                                img.src = objectUrl
                                            },
                                            handleDataFiles: (newDataFiles) => {
                                                __setSetSEOThumbnail(
                                                    newDataFiles.url,
                                                )
                                            },
                                        }}
                                    />
                                )}
                            </GeneralRowForm>
                            <GeneralRowForm label="Robot Index" isRequired>
                                <FormRadioButtonMulti
                                    name="robotIndex"
                                    className="mb-0"
                                    required
                                    checkBoxs={[
                                        {
                                            defaultValue: 0,
                                            label: 'No',
                                        },
                                        {
                                            defaultValue: 1,
                                            label: 'Yes',
                                        },
                                    ]}
                                />
                            </GeneralRowForm>
                            <GeneralRowForm
                                label="Robot Follow"
                                // isRequired
                            >
                                <FormRadioButtonMulti
                                    name="robotFollow"
                                    className="mb-0"
                                    // required
                                    checkBoxs={[
                                        {
                                            defaultValue: 0,
                                            label: 'No',
                                        },
                                        {
                                            defaultValue: 1,
                                            label: 'Yes',
                                        },
                                    ]}
                                />
                            </GeneralRowForm>

                            <JsonEditorForm
                                name="schemaMarkup"
                                label="Schema Markup"
                                secondLabel="SEO Meta AI Schema Markup"
                                value={__formRequest?.seo?.structuredData || ''}
                                onChange={(name, value) =>
                                    __handleChangeWithParent(name, value, 'seo')
                                }
                                // isRequired
                            />
                        </WrapFormContext>
                    </div>
                </div>
            </CardDropdown>
        </>
    )
}

export default SectionFormSEOInfo
