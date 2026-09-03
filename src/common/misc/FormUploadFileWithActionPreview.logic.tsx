import { useState, useId } from 'react'
import {
    X,
    ChevronLeft,
    ChevronRight,
    MinusCircle,
    PlusCircle,
} from 'react-feather'
import { isEmpty } from 'lodash'
import Image from 'rc-image'
import ImgGeneralDefaultBig from '@/asset/image/default/general-default-big.svg'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import IconWORD from '@/asset/image/icon/flat-doc-icon.png'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import IconEXCEL from '@/asset/image/icon/flat-xls-icon.png'
import FormTextArea from '@/component/form/FormTextArea'
import FormUploadFile from '@/component/form/FormUploadFile'
import { BtnCircleRemove } from '@/component/general/Button'
import HoverZoom from '@/component/general/HoverZoom'
import {
    checkFileTypeFromUrl,
    IS_FILE_WORD_OR_EXCEL,
    IS_FILE_WORD_OR_EXCEL_OR_PDF,
    IS_TYPE_FILE_EXCEL,
    IS_TYPE_FILE_PDF,
    IS_TYPE_FILE_WORD,
    sortFileFromImageToPDF,
} from '@/config/objectList.config'
import { useHookContextForm, WrapFormContext } from '@/context/Form.context'
import { FormUploadFileWithActionPreviewLogicProps } from './type/misc.type'

const FormUploadFileWithActionPreviewLogic = (
    props: FormUploadFileWithActionPreviewLogicProps,
) => {
    const uniqueId = useId()

    const {
        __actions = {
            handleAddFiles: () => {},
            handleSetDataFiles: () => {},
            handleRemoveDataFile: () => {},
            handleArrChange: () => {},
        },
    } = useHookContextForm()

    const {
        id = '',
        formName = 'attachments',
        dataBy = 'url',
        dataTypeBy = 'type',

        required = false,
        isUseDefaultLabel = true,

        dataFiles = [],
        formRequest = {},
        isUseInputDesc = true,
        isEdit = false,
        isMulti = true,
        classNameRowImg = '',
        columnSizeImg = 'col-md-4',
        nameInput = 'description',
    } = props

    const idInput = id || uniqueId

    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(0)

    const _handlePreviewDetailImage = (
        isOpen: boolean = true,
        index: number = 0,
    ) => {
        setVisible(isOpen)
        setCurrent(index)
    }

    const _handleOnChange = (index: any) => {
        _handlePreviewDetailImage(true, index)
    }

    const _handleRenderIcon = (dataPreview: object | any = {}) => {
        const fileUrl = dataPreview[dataBy] || ''

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

    const IframeLayout = ({ detail }) => (
        <object data={detail[dataBy]} style={{ height: '80vh', width: '50vw' }}>
            <iframe
                id="iframe-preview-efaktur"
                src={detail[dataBy]}
                style={{ height: '80vh', width: '50vw' }}
            />
        </object>
    )

    return (
        <>
            {!isUseDefaultLabel ? (
                <label htmlFor={idInput} className="form-label">
                    {props.label}
                    <span className="text-danger-200 fs-16">
                        {required ? '*' : ''}
                    </span>
                </label>
            ) : null}

            {(!isMulti && isEmpty(dataFiles)) || isMulti ? (
                <FormUploadFile
                    label={isUseDefaultLabel ? props.label : ''}
                    name={formName}
                    accept={props.accept}
                    subTitle={props.subTitle}
                    classNameLabel="fs-16"
                    required={required}
                    dataPreviewBy={dataBy}
                    isMulti={isMulti}
                    isPreview={false}
                    isUseHook={false}
                    actions={{
                        onChange: (name, newFiles) =>
                            __actions.handleAddFiles(newFiles),
                        handleDataFiles: (newDataFiles) =>
                            __actions.handleSetDataFiles(newDataFiles),
                    }}
                />
            ) : null}

            {!isEmpty(dataFiles) ? (
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
                        toolbarRender: !IS_FILE_WORD_OR_EXCEL_OR_PDF(
                            !dataFiles[current]?.[dataBy]?.startsWith('data:')
                                ? dataFiles[current]?.[dataTypeBy]
                                : dataFiles[current]?.type,
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
                            !dataFiles[current]?.[dataBy]?.startsWith('data:')
                                ? dataFiles[current]?.[dataTypeBy]
                                : dataFiles[current]?.type,
                        )
                            ? () => {
                                  return (
                                      <IframeLayout
                                          detail={dataFiles[current] || {}}
                                      />
                                  )
                              }
                            : IS_FILE_WORD_OR_EXCEL(
                                    !dataFiles[current]?.[dataBy]?.startsWith(
                                        'data:',
                                    )
                                        ? dataFiles[current]?.[dataTypeBy]
                                        : dataFiles[current]?.type,
                                )
                              ? () => {
                                    return (
                                        <>
                                            <img
                                                className="rc-image-preview-img"
                                                src={
                                                    IS_TYPE_FILE_WORD(
                                                        !dataFiles[current]?.[
                                                            dataBy
                                                        ]?.startsWith('data:')
                                                            ? dataFiles[
                                                                  current
                                                              ]?.[dataTypeBy]
                                                            : dataFiles[current]
                                                                  ?.type,
                                                    )
                                                        ? IconWORD
                                                        : IconEXCEL
                                                }
                                                alt="Preview File"
                                            />

                                            <a
                                                className="btn btn-gray-700 text-white-full mt-3 mb-0"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={
                                                    dataFiles[current]?.[dataBy]
                                                }>
                                                Download File
                                            </a>
                                        </>
                                    )
                                }
                              : null,
                    }}
                    fallback={ImgGeneralDefaultBig}>
                    <div className={'row ' + classNameRowImg}>
                        {sortFileFromImageToPDF({ data: dataFiles }).map(
                            (vm, index) => {
                                return (
                                    <div
                                        className={columnSizeImg + ' mb-4'}
                                        key={index}>
                                        <div className="card border-neutral-400 h-100 b-rad-4 overflow-hidden">
                                            <div
                                                className={
                                                    'wrap-img-document rounded-0' +
                                                    (!isUseInputDesc
                                                        ? ' border-bottom-0'
                                                        : '')
                                                }
                                                onClick={() =>
                                                    _handlePreviewDetailImage(
                                                        true,
                                                        index,
                                                    )
                                                }>
                                                <HoverZoom />

                                                <Image
                                                    src={_handleRenderIcon(vm)}
                                                    alt={vm?.name || ''}
                                                    fallback={ImgGeneralDefault}
                                                    className="data-img data-img-contain"
                                                />

                                                <BtnCircleRemove
                                                    className="btn-icon-remove-top-right z-index-999"
                                                    actions={{
                                                        remove: (e) => {
                                                            e.stopPropagation()
                                                            __actions.handleRemoveDataFile(
                                                                index,
                                                                vm?.id || '',
                                                            )
                                                        },
                                                    }}
                                                />
                                            </div>

                                            {isUseInputDesc ? (
                                                <WrapFormContext
                                                    formRequest={
                                                        formRequest[formName][
                                                            index
                                                        ] || {}
                                                    }
                                                    key={index}
                                                    actions={{
                                                        change: (name, value) =>
                                                            __actions.handleArrChange(
                                                                index,
                                                                name,
                                                                value,
                                                                formName,
                                                            ),
                                                    }}>
                                                    <FormTextArea
                                                        name={
                                                            nameInput ||
                                                            'description'
                                                        }
                                                        placeholder="e.g Description about attachment"
                                                        className="mt-4 mb-0 px-2 pb-2"
                                                    />
                                                </WrapFormContext>
                                            ) : null}
                                        </div>
                                    </div>
                                )
                            },
                        )}
                    </div>
                </Image.PreviewGroup>
            ) : null}
        </>
    )
}

export default FormUploadFileWithActionPreviewLogic
