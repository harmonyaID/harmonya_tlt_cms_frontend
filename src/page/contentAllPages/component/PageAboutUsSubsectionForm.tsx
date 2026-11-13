import LabelForm from '@/component/form/LabelForm.tsx'
import { useEffect, useState } from 'react'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import { Link } from 'react-router'
import { BtnCircleRemove, BtnInfo } from '@/component/general/Button.tsx'
import Image from 'rc-image'
import {
    checkFileTypeFromUrl,
    IS_TYPE_FILE_EXCEL,
    IS_TYPE_FILE_PDF,
    IS_TYPE_FILE_WORD,
} from '@/config/objectList.config.ts'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import IconWORD from '@/asset/image/icon/flat-doc-icon.png'
import IconEXCEL from '@/asset/image/icon/flat-xls-icon.png'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'

const PageAboutUsSubsectionForm = ({
    label,
    subSection,
    isUseFile = false,
    actions,
}: {
    label: string
    subSection: any
    isUseFile?: boolean
    actions: {
        onChange: (subSection: any) => void
    }
}) => {
    const [formRequest, setFormRequest] = useState<any>(
        subSection || {
            image: '',
            title: '',
            subTitle: '',
            description: '', //Text editor
            buttonTitle: '',
            buttonLink: '',
        },
    )
    const [previewImage, setPreviewImage] = useState<any>(subSection?.image)
    const [previewFile, setPreviewFile] = useState<any>(subSection?.file)

    const _handleChange = (name, value) => {
        setFormRequest((prev) => setNestedValue(prev, name, value))
    }

    const _handleImageRemove = () => {
        setPreviewImage(() => undefined)

        _handleChange('image', '')
    }

    const _handleFileRemove = () => {
        setPreviewFile(() => undefined)

        _handleChange('file', '')
    }

    useEffect(() => {
        actions.onChange(formRequest)
    }, [formRequest])

    return (
        <div className="bg-neutral-600 px-3 py-2 rounded-3 position-relative">
            <LabelForm label={label} />

            <WrapFormContext
                formRequest={formRequest}
                actions={{
                    change: _handleChange,
                }}>
                <FormInput
                    name="title"
                    label="Title"
                    placeholder="e.g D’STARS FAST FERRY"
                />
                <FormInput
                    name="subTitle"
                    label="Sub Title"
                    placeholder="e.g D’STARS FAST FERRY"
                />
                <FormTinyMCE
                    label="Description"
                    name="description"
                    placeholder="e.g D’STARS FAST FERRY"
                />
                {isUseFile && (
                    <div className="mt-3">
                        {previewFile ? (
                            <div className="pb-3 row">
                                <div className="col-4">
                                    <p className="mb-2 text-neutral-100">
                                        File
                                    </p>
                                    <div className="position-relative">
                                        <Link to={previewFile} target="_blank">
                                            <BtnInfo
                                                className="btn-sm"
                                                isOutline>
                                                <Image
                                                    src={
                                                        checkFileTypeFromUrl(
                                                            previewFile,
                                                            IS_TYPE_FILE_PDF,
                                                        )
                                                            ? IconPDF
                                                            : checkFileTypeFromUrl(
                                                                    previewFile,
                                                                    IS_TYPE_FILE_WORD,
                                                                )
                                                              ? IconWORD
                                                              : checkFileTypeFromUrl(
                                                                      previewFile,
                                                                      IS_TYPE_FILE_EXCEL,
                                                                  )
                                                                ? IconEXCEL
                                                                : null
                                                    }
                                                    alt="Price File"
                                                    fallback={ImgGeneralDefault}
                                                    className="data-img data-img-contain object-fit-contain"
                                                />
                                            </BtnInfo>
                                        </Link>

                                        <BtnCircleRemove
                                            className="btn-icon-remove-top-right z-2"
                                            actions={{
                                                remove: _handleFileRemove,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <FormUploadFile
                                name="file"
                                label="File"
                                isUseHook={false}
                                classNameLayoutImage="col-md-5"
                                accept=".pdf,.xlsx,.xls,.doc,.docx"
                                subTitle="PDF, XLSX, XLS, DOC, DOCX"
                                isGeneralFile
                                value={formRequest.file}
                                actions={{
                                    onChange: (name, value) => {
                                        _handleChange(name, value)
                                    },
                                }}
                            />
                        )}
                    </div>
                )}

                <div className="mt-3">
                    {previewImage ? (
                        <>
                            <div className="pb-3">
                                <p className="mb-2 text-neutral-100">Image</p>

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
                                    // @ts-ignore
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
    )
}

export default PageAboutUsSubsectionForm
