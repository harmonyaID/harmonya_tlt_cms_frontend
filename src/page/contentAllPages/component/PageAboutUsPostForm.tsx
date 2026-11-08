import { useEffect, useState } from 'react'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import LabelForm from '@/component/form/LabelForm.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'

const PageAboutUsPostForm = ({
    actions,
    post,
}: {
    post: any
    actions: {
        onChange: (post) => void
        onRemove: () => void
    }
}) => {
    const [formRequest, setFormRequest] = useState<any>(post)
    const [previewImage, setPreviewImage] = useState<any>(post.image)

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
                        <FormInput
                            name="year"
                            label="Year"
                            placeholder="e.g 2024"
                        />
                        <FormTinyMCE
                            label="Description"
                            name="description"
                            placeholder="e.g D’STARS FAST FERRY"
                        />

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
                                                URL.createObjectURL(newFiles)

                                            img.onload = () => {
                                                _handleChange('image', newFiles)
                                            }

                                            img.src = objectUrl
                                        },
                                        handleDataFiles: (newDataFiles) => {
                                            setPreviewImage(newDataFiles.url)
                                        },
                                    }}
                                />
                            )}
                        </div>
                    </WrapFormContext>
                </div>
            </div>
        </div>
    )
}

export default PageAboutUsPostForm
