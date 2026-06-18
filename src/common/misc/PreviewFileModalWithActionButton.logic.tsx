import { useState, useEffect } from 'react'
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
import { PreviewFileModalWithActionButtonLogicProps } from '@/common/misc/type/misc.type'
import {
    IS_FILE_WORD_OR_EXCEL,
    IS_FILE_WORD_OR_EXCEL_OR_PDF,
    IS_TYPE_FILE_EXCEL,
    IS_TYPE_FILE_PDF,
    IS_TYPE_FILE_WORD,
} from '@/config/objectList.config'

const PreviewFileModalWithActionButtonLogic = ({
    dataBy = 'url',
    dataTypeBy = 'type',
    isShowFile = false,
    dataFiles = [],
    actions = {
        toggleModal: () => {},
    },
}: PreviewFileModalWithActionButtonLogicProps) => {
    const [visible, setVisible] = useState(false)
    const [current, setCurrent] = useState(0)

    const IframeLayout = ({ detail }) => (
        <object data={detail[dataBy]} style={{ height: '80vh', width: '50vw' }}>
            <iframe
                id="iframe-preview-efaktur"
                src={detail[dataBy]}
                style={{ height: '80vh', width: '50vw' }}
            />
        </object>
    )

    useEffect(() => {
        if (!isEmpty(dataFiles) && isShowFile) {
            setVisible(true)
        }
    }, [dataFiles])

    useEffect(() => {
        if (!visible) {
            actions.toggleModal({})
            setCurrent(0)
        }
    }, [visible])

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
                    onVisibleChange: (value) => setVisible(value),
                    onChange: (index) => setCurrent(index),
                    toolbarRender: !IS_FILE_WORD_OR_EXCEL_OR_PDF(
                        dataFiles[current]?.[dataTypeBy],
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
                        dataFiles[current]?.[dataTypeBy],
                    )
                        ? () => {
                              return (
                                  <IframeLayout
                                      detail={dataFiles[current] || {}}
                                  />
                              )
                          }
                        : IS_FILE_WORD_OR_EXCEL(
                              dataFiles[current]?.[dataTypeBy],
                          )
                        ? () => {
                              return (
                                  <>
                                      <img
                                          className="rc-image-preview-img"
                                          src={
                                              IS_TYPE_FILE_WORD(
                                                  dataFiles[current]?.[
                                                      dataTypeBy
                                                  ],
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
                items={dataFiles.map((file) => ({
                    src: IS_TYPE_FILE_WORD(file?.[dataTypeBy])
                        ? IconWORD
                        : IS_TYPE_FILE_EXCEL(file?.[dataTypeBy])
                        ? IconEXCEL
                        : file[dataBy],
                    fallback: IS_TYPE_FILE_PDF(file?.[dataTypeBy])
                        ? IconPDF
                        : ImgGeneralDefault,
                    render: IS_TYPE_FILE_PDF(file?.[dataTypeBy])
                        ? () => <IframeLayout detail={file} />
                        : undefined,
                }))}
                fallback={ImgGeneralDefaultBig}
            />
        </>
    )
}

export default PreviewFileModalWithActionButtonLogic
