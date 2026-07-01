import { FC, useState } from 'react'
import * as Icon from 'react-feather'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import HoverZoom from '@/component/general/HoverZoom'
import {
    checkFileTypeFromUrl,
    IS_TYPE_FILE_PDF,
} from '@/config/objectList.config'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { IframeLayoutProps, PreviewFileModalLogicProps } from './type/misc.type'

const PreviewFileModalLogic: FC<PreviewFileModalLogicProps> = ({
    dataUrl = '',
    dataBy = 'url',
    dataFile = {},
    classNameWidth = 'w-25',
    isShowBtnRemove = false,

    actions = {
        remove: () => {},
    },
}) => {
    const [visible, setVisible] = useState<boolean>(false)

    const _handleShowPreviewFile = (isOpen: boolean = true) => {
        setVisible(isOpen)
    }

    const isImage = !checkFileTypeFromUrl(dataUrl, IS_TYPE_FILE_PDF)

    const IframeLayout: FC<IframeLayoutProps> = ({ detail = {} }) => (
        <object data={detail[dataBy]} style={{ height: '80vh', width: '50vw' }}>
            <iframe
                id="iframe-preview-efaktur"
                src={detail[dataBy]}
                style={{ height: '80vh', width: '50vw' }}
            />
        </object>
    )

    return (
        <Image.PreviewGroup
            preview={{
                icons: {
                    close: <Icon.X size={18} />,
                    left: <Icon.ChevronLeft size={26} />,
                    right: <Icon.ChevronRight size={26} />,
                },
                visible,
                onVisibleChange: (value) => _handleShowPreviewFile(value),
                toolbarRender: !checkFileTypeFromUrl(dataUrl, IS_TYPE_FILE_PDF)
                    ? (_, { actions: { onZoomIn, onZoomOut } }) => {
                          return (
                              <div className="rc-image-preview-operations">
                                  <button
                                      className="bg-transparent border-0 text-reset rc-image-preview-operations-operation rc-image-preview-operations-operation-zoomIn"
                                      onClick={onZoomOut}>
                                      <Icon.MinusCircle size={26} />
                                  </button>

                                  <button
                                      className="bg-transparent border-0 text-reset rc-image-preview-operations-operation rc-image-preview-operations-operation-zoomOut"
                                      onClick={onZoomIn}>
                                      <Icon.PlusCircle size={26} />
                                  </button>
                              </div>
                          )
                      }
                    : () => null,
                imageRender: checkFileTypeFromUrl(dataUrl, IS_TYPE_FILE_PDF)
                    ? () => {
                          return <IframeLayout detail={dataFile || {}} />
                      }
                    : null,
            }}>
            <div
                className={joinClassNameHelper(
                    'position-relative overflow-hidden border border-neutral-400 b-rad-8',
                    classNameWidth,
                )}>
                <div
                    className="wp-img-preview"
                    onClick={() => _handleShowPreviewFile()}>
                    <HoverZoom />

                    <Image
                        src={!isImage ? IconPDF : dataUrl}
                        alt="Preview File"
                        fallback={ImgGeneralDefault}
                        className="data-img data-img-contain"
                    />
                </div>
            </div>
        </Image.PreviewGroup>
    )
}

export default PreviewFileModalLogic
