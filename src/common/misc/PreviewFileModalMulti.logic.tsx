import { Children, FC, useState } from 'react'
import {
    ChevronLeft,
    ChevronRight,
    MinusCircle,
    PlusCircle,
    X,
} from 'react-feather'
import { isEmpty } from 'lodash'
import Image from 'rc-image'
import ImgGeneralDefaultBig from '@/asset/image/default/general-default-big.svg'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import HoverZoom from '@/component/general/HoverZoom'
import { NotAvailable } from '@/component/general/TextDefault'
import TextMoreLess from '@/component/general/TextMoreLess'
import VerticalDataPreview from '@/component/general/VerticalDataPreview'
import {
    checkFileTypeFromUrl,
    IS_TYPE_FILE_PDF,
    objectListDetail,
} from '@/config/objectList.config'
import {
    IframeLayoutProps,
    PreviewFileModalMultiLogicProps,
} from './type/misc.type'

const PreviewFileModalMultiLogic = ({
    dataFiles = [],
    dataBy = 'file',
    className = '',
    classNameColumnPreview = 'col-md-4',
    classNameImagePreview = '',
    classNameWrapImg = '',
    children = null,
    isDescription = true,
}: PreviewFileModalMultiLogicProps) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [current, setCurrent] = useState<number>(0)

    const _handlePreviewDetailImage = (
        isOpen: boolean = true,
        index: number = 0,
    ) => {
        setVisible(isOpen)
        setCurrent(index)
    }

    const _handleOnChange = (index: number) => {
        _handlePreviewDetailImage(true, index)
    }

    const IframeLayout: FC<IframeLayoutProps> = ({ detail }) => (
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
            {isEmpty(dataFiles) ? (
                <NotAvailable />
            ) : (
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
                        toolbarRender: !checkFileTypeFromUrl(
                            dataFiles[current][dataBy],
                            IS_TYPE_FILE_PDF,
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
                        imageRender: checkFileTypeFromUrl(
                            dataFiles[current][dataBy],
                            IS_TYPE_FILE_PDF,
                        )
                            ? () => {
                                  return (
                                      <IframeLayout
                                          detail={dataFiles[current] || {}}
                                      />
                                  )
                              }
                            : null,
                    }}
                    fallback={ImgGeneralDefaultBig}>
                    <div
                        className={
                            'row g-3' + (className ? ` ${className}` : '')
                        }>
                        {children
                            ? Children.map(children, (child, index) => (
                                  <div
                                      className={classNameColumnPreview}
                                      key={index}>
                                      <div
                                          className={classNameImagePreview}
                                          onClick={() =>
                                              _handlePreviewDetailImage(
                                                  true,
                                                  index,
                                              )
                                          }>
                                          {child}
                                      </div>
                                  </div>
                              ))
                            : dataFiles.map((vm, index) => {
                                  const isImage = !checkFileTypeFromUrl(
                                      vm[dataBy],
                                      IS_TYPE_FILE_PDF,
                                  )

                                  return (
                                      <div
                                          className={classNameColumnPreview}
                                          key={index}>
                                          <div className="card overflow-hidden border-neutral-400 mb-0">
                                              <div
                                                  className={
                                                      'wrap-img-document use-h-120 ' +
                                                      classNameWrapImg
                                                  }
                                                  onClick={() =>
                                                      _handlePreviewDetailImage(
                                                          true,
                                                          index,
                                                      )
                                                  }>
                                                  <HoverZoom />

                                                  <Image
                                                      src={
                                                          !isImage
                                                              ? IconPDF
                                                              : vm[dataBy]
                                                      }
                                                      alt={vm?.name || ''}
                                                      fallback={
                                                          ImgGeneralDefault
                                                      }
                                                      className="data-img data-img-min-h-200P"
                                                  />
                                              </div>

                                              {isDescription ? (
                                                  <VerticalDataPreview
                                                      className="p-3"
                                                      {...objectListDetail(
                                                          'Description',
                                                          <TextMoreLess>
                                                              {vm.description ||
                                                                  '-'}
                                                          </TextMoreLess>,
                                                      )}
                                                  />
                                              ) : null}
                                          </div>
                                      </div>
                                  )
                              })}
                    </div>
                </Image.PreviewGroup>
            )}
        </>
    )
}

export default PreviewFileModalMultiLogic
