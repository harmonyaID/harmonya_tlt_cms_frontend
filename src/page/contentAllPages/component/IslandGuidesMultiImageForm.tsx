import { useEffect, useState } from 'react'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import { BtnCircleRemove } from '@/component/general/Button.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'

const IslandGuidesMultiImageForm = ({
    actions,
    form,
    isUseText = false,
    isUseSubTitle = false,
    isUseImage = false,
}: {
    form: any
    isUseImage?: boolean
    isUseSubTitle?: boolean
    isUseText?: boolean
    actions: {
        onChange: (post) => void
        onRemove: () => void
    }
}) => {
    const [formRequest, setFormRequest] = useState<any>(form)
    const [previewImage, setPreviewImage] = useState<any>(form.image)

    const _handleChange = (name, value) => {
        setFormRequest((prev) => setNestedValue(prev, name, value))
    }

    const _handleImageRemove = () => {
        setPreviewImage(() => undefined)

        _handleChange('image', '')
    }

    useEffect(() => {
        actions.onChange(formRequest)
    }, [formRequest])

    return (
        <div className="my-3">
            <div className="bg-neutral-600 px-3 py-2 rounded-3 position-relative">
                <div className="position-absolute top-0 end-0 p-2">
                    <BtnCircleRemove
                        className=""
                        actions={{
                            remove: () => actions.onRemove(),
                        }}
                    />
                </div>

                <div className="mt-3">
                    <WrapFormContext
                        formRequest={formRequest}
                        actions={{
                            change: _handleChange,
                        }}>
                        {isUseText && (
                            <>
                                <FormInput
                                    name="title"
                                    label="Title"
                                    placeholder="e.g Island Guide"
                                />
                                {isUseSubTitle && (
                                    <FormInput
                                        name="subTitle"
                                        label="Sub Title"
                                        placeholder="e.g Island Guide"
                                    />
                                )}
                                <FormTinyMCE
                                    label="Description"
                                    name="description"
                                    placeholder="e.g D’STARS FAST FERRY"
                                />
                            </>
                        )}

                        {isUseImage && (
                            <div className="mt-3">
                                {previewImage ? (
                                    <>
                                        <div className="pb-3">
                                            <p className="mb-2 text-neutral-100">
                                                Thumbnail
                                            </p>

                                            <PreviewFileModalLogic
                                                dataUrl={previewImage?.toString()}
                                                dataBy="file"
                                                dataFile={previewImage}
                                                isShowBtnRemove
                                                actions={{
                                                    remove: _handleImageRemove,
                                                }}
                                                classNameWidth="w-100 max-h-148px"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <FormUploadFile
                                        label="Image"
                                        name="image"
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
                                                    _handleChange(
                                                        'image',
                                                        newFiles,
                                                    )
                                                }

                                                img.src = objectUrl
                                            },
                                            handleDataFiles: (newDataFiles) => {
                                                setPreviewImage(
                                                    newDataFiles.url,
                                                )
                                            },
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </WrapFormContext>
                </div>
            </div>
        </div>
    )
}

export default IslandGuidesMultiImageForm
