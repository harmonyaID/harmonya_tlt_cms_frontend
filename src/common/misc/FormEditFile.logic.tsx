import {
    ChevronLeft,
    ChevronRight,
    MinusCircle,
    PlusCircle,
    X,
} from 'react-feather'
import {
    checkFileTypeFromUrl,
    IS_FILE_WORD_OR_EXCEL,
    IS_FILE_WORD_OR_EXCEL_OR_PDF,
    IS_TYPE_FILE_EXCEL,
    IS_TYPE_FILE_PDF,
    IS_TYPE_FILE_WORD,
    sortFileFromImageToPDF,
} from '@/config/objectList.config.ts'
import IconWORD from '@/asset/image/icon/flat-doc-icon.png'
import IconEXCEL from '@/asset/image/icon/flat-xls-icon.png'
import ImgGeneralDefaultBig from '@/asset/image/default/general-default-big.svg'
import HoverZoom from '@/component/general/HoverZoom.tsx'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import { BtnCircleRemove } from '@/component/general/Button.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import { useId, useState } from 'react'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'

interface Props {
    dataFiles?: any[]
    id?: string | number
    dataBy?: string
    dataTypeBy?: string
    classNameRowImg?: string
    columnSizeImg?: string
    actions?: {
        remove?: (index?: any, data?: any) => void
        restore?: (index?: any, data?: any) => void
    }
}

const FormEditFileLogic = ({
    dataFiles = [],
    id = '',
    dataBy = 'url',
    dataTypeBy = 'type',

    classNameRowImg = '',
    columnSizeImg = 'col-md-4',
    actions = {
        remove: () => {},
        restore: () => {},
    },
}: Props) => {
    const uniqueId = useId()

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

    console.log('dataFiles: ', dataFiles)

    return (
        <>
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
                                                        ? dataFiles[current]?.[
                                                              dataTypeBy
                                                          ]
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
                                            href={dataFiles[current]?.[dataBy]}>
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
                        (vm: any, index) => {
                            return (
                                <div
                                    className={columnSizeImg + ' mb-4'}
                                    key={index}>
                                    <div className="card border-neutral-400 h-100 b-rad-4 overflow-hidden">
                                        <div
                                            className={
                                                'wrap-img-document rounded-0'
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
                                                fallback={ImgGeneralDefault}
                                                className="data-img data-img-contain"
                                            />

                                            <BtnCircleRemove
                                                className="btn-icon-remove-top-right z-index-999"
                                                actions={{
                                                    remove: (e) => {
                                                        e.stopPropagation()
                                                        actions.remove(vm)
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        },
                    )}
                </div>
            </Image.PreviewGroup>
        </>
    )
}

export default FormEditFileLogic
