import {
    useState,
    useEffect,
    useCallback,
    useRef,
    useId,
    FC,
    ChangeEvent,
    ClipboardEvent,
} from 'react'
import {
    X,
    ChevronLeft,
    ChevronRight,
    MinusCircle,
    PlusCircle,
} from 'react-feather'
import { Eye, Trash } from 'iconsax-react'
import { isEmpty, isArray, isObject, isFunction } from 'lodash'
import Image from 'rc-image'
import ImgGeneralDefaultBig from '@/asset/image/default/general-default-big.svg'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import IconWORD from '@/asset/image/icon/flat-doc-icon.png'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import IconEXCEL from '@/asset/image/icon/flat-xls-icon.png'
import {
    checkFileTypeFromUrl,
    IS_TYPE_FILE_EXCEL,
    IS_TYPE_FILE_PDF,
    IS_TYPE_FILE_WORD,
} from '@/config/objectList.config'
import { useHookContextForm } from '@/context/Form.context'
import { eventUploadFile } from '@/helper/actionEvent.helper'
import { notifyError } from '@/helper/base/notifyGeneral.helper'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook'
import { BtnCircleRemove, BtnPrimary } from '../general/Button'
import HoverZoom from '../general/HoverZoom'
import {
    FileType,
    FormUploadFileProps,
    LayoutImageAndDocumentProps,
} from './type/componentForm.type'

const FormUploadFile: FC<FormUploadFileProps> = (props) => {
    const uniqueId = useId()
    const ctx = useHookContextForm()

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const {
        label = '',
        subTitle = 'Webp, JPG, PNG, & JPEG',
        id = '',
        required = false,
        isMulti = false,
        isGeneralFile = false,
        accept = 'image/*',
        accepts = ['image/*'],
        placeholder = '',
        urlFiles = [],
        maxSize = 10240000,
        actions = {
            onChange: () => {},
            handleDataFiles: null,
        },
        nameFileDefault = '',

        renderLayout = null,
        renderConfig = {},
        isPreview = true,
        isEdit = false,

        isResetList = false,

        isUseHook = true,

        dataPreviewBy = 'url',
        classNameLayoutImage = '',
    } = props

    const idInput = id || uniqueId
    const idAreaUpload = props.idAreaUpload || uniqueId
    const idBtnPaste = props.idBtnPaste || uniqueId + '-paste'
    const idPreview = props.name + '-preview-' + uniqueId

    const refInputFile = useRef(null)
    const refDragArea = useRef(null)

    const [previewFiles, setPreviewFiles] = useState([])

    // Handle Preview in Modal Start
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(0)

    const _handlePreviewDetailImage = useCallback(
        (isOpen: boolean = true, index: number = 0) => {
            setVisible(isOpen)
            setCurrent(index)
        },
        [],
    )

    const _handleOnChange = useCallback(
        (index: any) => {
            _handlePreviewDetailImage(true, index)
        },
        [previewFiles],
    )

    const IframeLayout = ({ detail }) => (
        <object
            data={detail[dataPreviewBy]}
            style={{ height: '80vh', width: '50vw' }}>
            <iframe
                id="iframe-preview-efaktur"
                src={detail[dataPreviewBy]}
                style={{ height: '80vh', width: '50vw' }}
            />
        </object>
    )

    const _handleRenderIcon = (dataPreview: object | any = {}) => {
        const fileUrl = dataPreview[dataPreviewBy] || ''

        const isBase64 = fileUrl.startsWith('data:')
        const isImage = isBase64
            ? fileUrl.startsWith('data:image/')
            : !(
                  checkFileTypeFromUrl(fileUrl, IS_TYPE_FILE_PDF) ||
                  checkFileTypeFromUrl(fileUrl, IS_TYPE_FILE_WORD) ||
                  checkFileTypeFromUrl(fileUrl, IS_TYPE_FILE_EXCEL)
              )

        return isImage
            ? fileUrl
            : isBase64 && fileUrl.includes('application/pdf')
              ? IconPDF
              : isBase64 && fileUrl.includes('application/msword')
                ? IconWORD
                : isBase64 && fileUrl.includes('application/vnd.ms-excel')
                  ? IconEXCEL
                  : checkFileTypeFromUrl(fileUrl, IS_TYPE_FILE_PDF)
                    ? IconPDF
                    : checkFileTypeFromUrl(fileUrl, IS_TYPE_FILE_WORD)
                      ? IconWORD
                      : checkFileTypeFromUrl(fileUrl, IS_TYPE_FILE_EXCEL)
                        ? IconEXCEL
                        : null
    }
    // Handle Preview in Modal End

    const _handleChange = (files: any[] = []) => {
        if (!isEmpty(ctx.__value) && isUseHook) {
            ctx.__handleChange(props.name, isMulti ? files : files[0])
        } else {
            actions.onChange(props.name, isMulti ? files : files[0])
        }
    }

    const _handleConvertToFile = (files: FileType[] = []) => {
        const max = isMulti ? files.length : 1
        const containerNewFiles: any[] = []

        const handleFileLoad = (
            e: ProgressEvent<FileReader>,
            file: FileType,
        ) => {
            const dataFile = {
                [dataPreviewBy]: e.target?.result,
                name: file.name,
                size: file.size || '',
                type: file.type || '',
            }

            containerNewFiles.push(dataFile)

            if (containerNewFiles.length === max && isMulti) {
                if (!isPreview && actions.handleDataFiles) {
                    actions.handleDataFiles(containerNewFiles)
                } else {
                    setPreviewFiles((oldPreviewFiles) => [
                        ...oldPreviewFiles,
                        ...containerNewFiles,
                    ])
                }
            } else if (!isMulti) {
                if (!isPreview && actions.handleDataFiles) {
                    actions.handleDataFiles(dataFile)
                } else {
                    setPreviewFiles([dataFile])
                }
            }
        }

        files.forEach((file, i) => {
            if (file instanceof Blob) {
                const reader = new FileReader()
                reader.onload = (e) => handleFileLoad(e, file)
                reader.readAsDataURL(file)
            } else {
                console.error(`Invalid file type at index ${i}:`, file)
            }
        })
    }

    const _handleUploadFile = async (
        event: ChangeEvent<HTMLInputElement> | DragEvent,
    ) => {
        const {
            name,
            files = [],
            filesOverSize = [],
        } = eventUploadFile(event, maxSize)

        if (filesOverSize.length > 0) {
            console.warn(
                'Some files are over the size limit and were not processed:',
                filesOverSize,
            )
        }

        if (files.length > 0) {
            await _handleConvertToFile(files)
            await _handleChange(files)
        } else {
            console.warn('No valid files to process.')
        }
    }

    const _handleDragDrop = () => {
        const dragArea = refDragArea.current

        dragArea.addEventListener('dragover', (e) => {
            console.log('dragover')
            dragArea.classList.add('drop-active')
        })

        refDragArea.current.addEventListener('dragleave', () => {
            dragArea.classList.remove('drop-active')
        })

        refDragArea.current.addEventListener('drop', (event) => {
            event.stopPropagation()
            event.preventDefault()

            const dataFilesDrop = event.dataTransfer.files[0]
            const typeFile = dataFilesDrop.type

            console.log('typeFile: ', typeFile)

            const fileReader = new FileReader()

            fileReader.onload = () => {
                const fileURL = fileReader.result

                setPreviewFiles([fileURL])
            }

            fileReader.readAsDataURL(dataFilesDrop)
        })
    }

    const _handleOnPaste = async (event: ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault()

        const files =
            event.clipboardData?.files ||
            event.clipboardData?.getData('File') ||
            []

        if (files.length) {
            const items = event.clipboardData.items
            const dataAllFiles = []
            const filesOverSize: string[] = []

            for (const item of items) {
                if (item.kind === 'file') {
                    const file = item.getAsFile()
                    if (file) {
                        if (file.size <= maxSize) {
                            dataAllFiles.push(file)
                        } else {
                            filesOverSize.push(file.name)
                            notifyError(`Size file ${file.name} <b>> 10MB</b>`)
                        }
                    }
                }
            }

            if (dataAllFiles.length) {
                await _handleConvertToFile(dataAllFiles)
                await _handleChange(dataAllFiles)
            }
        }
    }

    const _handleRemove = (index: number = -1) => {
        const newPreviewFiles = [...previewFiles]

        let removeDataValue = []

        if (index > -1) {
            newPreviewFiles.splice(index, 1)
            setPreviewFiles(newPreviewFiles)

            if (isArray(dataValue)) {
                removeDataValue = [...dataValue]
                removeDataValue.splice(index, 1)
            } else {
                removeDataValue = ['']
            }

            _handleChange(removeDataValue)
        }
    }

    useEffect(() => {
        if (isResetList) {
            setPreviewFiles([])
        }
    }, [dataValue])

    useEffect(() => {
        if (!isEmpty(dataValue)) {
            const dataFiles = isArray(dataValue)
                ? dataValue.map((vm) => {
                      if (isObject(vm)) {
                          return { ...vm }
                      }

                      return { [dataPreviewBy]: vm, name: '' }
                  })
                : isObject(dataValue)
                  ? [{ ...dataValue }]
                  : [
                        {
                            [dataPreviewBy]: dataValue,
                            name: nameFileDefault || '',
                            size: '',
                            type: '',
                        },
                    ]

            setPreviewFiles(dataFiles)
        }

        _handleDragDrop()
    }, [dataValue])

    const conditionSingleUpload = !isMulti && previewFiles.length

    const LayoutImage: FC<LayoutImageAndDocumentProps> = ({
        dataImage,
        passIndex,
    }) => {
        return (
            <div
                className={
                    'position-relative overflow-hidden border border-neutral-400 b-rad-8 mt-2' +
                    (classNameLayoutImage ? ` ${classNameLayoutImage}` : '')
                }>
                <div
                    className="wp-img-preview"
                    onClick={() => _handlePreviewDetailImage(true, passIndex)}>
                    <HoverZoom />

                    {/*<Image*/}
                    {/*    src={_handleRenderIcon(dataImage)}*/}
                    {/*    alt={dataImage?.name || ''}*/}
                    {/*    fallback={ImgGeneralDefault}*/}
                    {/*    className="data-img data-img-contain"*/}
                    {/*/>*/}
                </div>

                <BtnCircleRemove
                    className="btn-icon-remove-top-right z-index-999"
                    action={{
                        remove: () => _handleRemove(passIndex),
                    }}
                />
            </div>
        )
    }

    const LayoutDocument: FC<LayoutImageAndDocumentProps> = ({
        dataDocument,
        passIndex,
    }) => {
        return (
            <div className="box-preview-file mt-2">
                <div className="data-icon cursor-pointer">
                    {/*<Image*/}
                    {/*    src={_handleRenderIcon(dataDocument)}*/}
                    {/*    alt={dataDocument?.name || ''}*/}
                    {/*    fallback={ImgGeneralDefault}*/}
                    {/*    className="object-fit-contain"*/}
                    {/*/>*/}
                </div>

                <div className="wp-content-file overflow-hidden">
                    <div className="data-info">
                        <p className="text-neutral-100 mb-0 title">
                            {dataDocument.name}
                        </p>

                        {dataDocument.size ? (
                            <p className="fs-12 text-neutral-400 mb-0">
                                {dataDocument.size}
                            </p>
                        ) : null}
                    </div>

                    <div className="data-action">
                        <button
                            className="btn btn-sm text-blue-300 p-0 mt-0 me-3"
                            onClick={() =>
                                _handlePreviewDetailImage(true, passIndex)
                            }
                            type="button">
                            <Eye variant="Bold" size="18" />
                        </button>

                        <button
                            className="btn btn-sm text-danger-200 p-0 mt-0"
                            onClick={() => _handleRemove(passIndex)}
                            type="button">
                            <Trash variant="Bold" size="16" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const LayoutCustom = ({ data, more }: { data: any; more: any }) => {
        return props.renderLayout(data, more, renderConfig)
    }

    return (
        <>
            <div
                className={
                    'form-group form-upload-file-area ' +
                    (props?.className || '')
                }>
                {label ? (
                    <label htmlFor={idInput} className="form-label">
                        {label}
                        <span className="text-danger-200 fs-16">
                            {required ? '*' : ''}
                        </span>
                    </label>
                ) : null}

                <input
                    accept={accept}
                    ref={refInputFile}
                    id={idInput}
                    type="file"
                    name={props.name}
                    onChange={_handleUploadFile}
                    className="d-none"
                    value=""
                    multiple={isMulti}
                />

                <div
                    ref={refDragArea}
                    className={
                        'area-upload' + (conditionSingleUpload ? ' d-none' : '')
                    }
                    onPaste={_handleOnPaste}
                    id={idAreaUpload}>
                    <div className="text-center">
                        <p className="fs-16 fw-400 text-neutral-200 mb-1">
                            Area Paste File
                        </p>

                        {subTitle ? (
                            <p className="fs-12 text-neutral-400">{subTitle}</p>
                        ) : null}
                    </div>

                    <div className="d-flex w-100 justify-content-center">
                        <BtnPrimary
                            className="btn-sm mx-1"
                            type="button"
                            onClick={() => refInputFile.current.click()}>
                            Browse
                        </BtnPrimary>
                    </div>
                </div>

                {!isEmpty(previewFiles) ? (
                    <Image.PreviewGroup
                        preview={{
                            icons: {
                                close: <X size={18} />,
                                left: <ChevronLeft size={26} />,
                                right: <ChevronRight size={26} />,
                            },
                            visible,
                            current,
                            onVisibleChange: (value) =>
                                _handlePreviewDetailImage(value),
                            onChange: (index) => _handleOnChange(index),
                            toolbarRender: !IS_TYPE_FILE_PDF(
                                previewFiles[current]?.type,
                            )
                                ? (_, { actions: { onZoomIn, onZoomOut } }) => {
                                      return (
                                          <div className="rc-image-preview-operations">
                                              <button
                                                  className="bg-transparent border-0 text-reset rc-image-preview-operations-operation rc-image-preview-operations-operation-zoomIn"
                                                  onClick={onZoomOut}>
                                                  <MinusCircle size={26} />
                                              </button>

                                              <button
                                                  className="bg-transparent border-0 text-reset rc-image-preview-operations-operation rc-image-preview-operations-operation-zoomOut"
                                                  onClick={onZoomIn}>
                                                  <PlusCircle size={26} />
                                              </button>
                                          </div>
                                      )
                                  }
                                : () => null,
                            imageRender: IS_TYPE_FILE_PDF(
                                previewFiles[current]?.type,
                            )
                                ? () => {
                                      return (
                                          <IframeLayout
                                              detail={
                                                  previewFiles[current] || {}
                                              }
                                          />
                                      )
                                  }
                                : null,
                        }}
                        fallback={ImgGeneralDefaultBig}>
                        {isPreview ? (
                            conditionSingleUpload ? (
                                isGeneralFile ? (
                                    <LayoutDocument
                                        dataDocument={previewFiles[0]}
                                        passIndex={0}
                                    />
                                ) : (
                                    <LayoutImage
                                        dataImage={previewFiles[0]}
                                        passIndex={0}
                                    />
                                )
                            ) : isMulti && previewFiles.length ? (
                                previewFiles.map((vm, index) => {
                                    return (
                                        <div className="mt-4" key={index}>
                                            {isFunction(props.renderLayout) ? (
                                                <LayoutCustom
                                                    data={vm}
                                                    more={{
                                                        index: index,
                                                        remove: () =>
                                                            _handleRemove(
                                                                index,
                                                            ),
                                                    }}
                                                />
                                            ) : isGeneralFile ? (
                                                <LayoutDocument
                                                    dataDocument={vm}
                                                    passIndex={index}
                                                />
                                            ) : (
                                                <LayoutImage
                                                    dataImage={vm}
                                                    passIndex={index}
                                                />
                                            )}
                                        </div>
                                    )
                                })
                            ) : null
                        ) : null}
                    </Image.PreviewGroup>
                ) : null}
            </div>
        </>
    )
}

export default FormUploadFile
