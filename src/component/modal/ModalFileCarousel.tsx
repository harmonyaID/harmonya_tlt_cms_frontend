import { useState, useMemo, useEffect, useLayoutEffect } from 'react'
import { DownloadCloud, Plus, X } from 'react-feather'
import { ArrowLeft, ArrowRight, Minus } from 'iconsax-react'
import BlankImage from '@/asset/image/default/general-default-big.svg'
import TextMoreLess from '@/component/general/TextMoreLess'
import { triggerOnBtoa } from '@/helper/actionTrigger.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { downloadFromUrl } from '@/helper/downloadData.helper.ts'
import {
    iconFormatFile,
    isFileImage,
    isFileRenderInElementObject,
} from '@/helper/formatFile.helper.ts'

//@ts-ignore
const ModalFileCarousel = <T,>({
    id,
    dataFiles = [],
    paramOfURL = '',
    paramOfFileName = 'fileName',
    indexForPreview = null,
    action = {
        afterClose: () => {},
    },
}: {
    id?: string
    dataFiles: T[]
    paramOfURL?: string
    paramOfFileName?: string
    indexForPreview?: number
    action?: { afterClose?: () => void }
}) => {
    const DEFAULT_ZOOM = 1
    const MAX_ZOOM = 3
    const MIN_ZOOM = 0.5
    const ZOOM_PER_CHANGE = 0.5
    const ZOOM_ON_IMAGE_CLICK = 2

    const [zoomValue, setZoomValue] = useState(DEFAULT_ZOOM)
    const [previewNumber, setPreviewNumber] = useState(null)
    const [files, setFiles] = useState([])

    const isValidToZoomIn = zoomValue >= MAX_ZOOM
    const isValidToZoomOut = zoomValue <= MIN_ZOOM

    // const _dataImage = useMemo(() => {
    //     return isArray(dataFiles)
    //         ? dataFiles.map((val) => {
    //               if (isString(val)) {
    //                   return val
    //               }
    //
    //               return val[paramOfURL]
    //           })
    //         : []
    // }, [triggerOnBtoa(dataFiles)])

    const _currentlyPreviewDataFileUrlExtension = previewNumber
        ? files?.[previewNumber][paramOfURL]?.split('.').pop()
        : ''
    const _currentlyPreviewDataFileSize =
        files[previewNumber]?.blobData?.size || 0
    const _currentlyPreviewDataFileSizeInKb =
        _currentlyPreviewDataFileSize / 1024
    const _currentlyPreviewDataFileSizeInMb =
        _currentlyPreviewDataFileSizeInKb / 1024

    const _handleZoomIn = () => {
        if (zoomValue >= MAX_ZOOM) return

        setZoomValue(zoomValue + ZOOM_PER_CHANGE)
    }

    const _handleZoomOut = () => {
        if (zoomValue <= MIN_ZOOM) return

        setZoomValue(zoomValue - ZOOM_PER_CHANGE)
    }

    const _handlePrev = () => {
        if (previewNumber > 0) {
            setPreviewNumber((prev) => prev - 1)
        } else {
            setPreviewNumber(files.length - 1)
        }

        setZoomValue(DEFAULT_ZOOM)
    }

    const _handleNext = () => {
        if (previewNumber < files.length - 1) {
            setPreviewNumber((prev) => prev + 1)
        } else {
            setPreviewNumber(0)
        }

        setZoomValue(DEFAULT_ZOOM)
    }

    const _handleClickImage = () => {
        if (zoomValue >= ZOOM_ON_IMAGE_CLICK) {
            setZoomValue(DEFAULT_ZOOM)
        } else {
            setZoomValue(ZOOM_ON_IMAGE_CLICK)
        }
    }

    // const _handleDownload = (blob = new Blob()) => {
    //     downloadBlob(blob)
    // }

    // useLayoutEffect(() => {
    //     setFiles(
    //         _dataImage.map((vm) => ({
    //
    //             blobUrl: '',
    //             blobData: null,
    //             type: FILE_TYPE_OTHER,
    //         })),
    //     )
    // }, [triggerOnBtoa(_dataImage)])

    const _handleClosed = () => {
        setZoomValue(DEFAULT_ZOOM)
        setPreviewNumber(null)
        action.afterClose()
    }

    useEffect(() => {
        if (indexForPreview !== null) {
            setPreviewNumber(indexForPreview)
        }
    }, [indexForPreview])

    useLayoutEffect(() => {
        setFiles(
            dataFiles.map((vm: T) => ({
                //@ts-ignore
                mimeType: vm?.mimeType || 'image/png',
                fileURL: vm[paramOfURL],

                ...vm,
            })),
        )
    }, [triggerOnBtoa(dataFiles)])

    useEffect(() => {
        const dataModal = document?.getElementById(id)
        const bsModal = 'hidden.bs.modal'

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                _handlePrev()
            }
            if (e.key === 'ArrowRight') {
                _handleNext()
            }

            if (e.key === '=') {
                _handleZoomIn()
            }
            if (e.key === '-') {
                _handleZoomOut()
            }
            if (e.key === 'Escape') {
                actionModal(id, true)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        dataModal?.addEventListener(bsModal, _handleClosed)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            dataModal?.removeEventListener(bsModal, _handleClosed)
        }
    }, [previewNumber, zoomValue])

    return (
        <div
            id={id}
            className="modal modal-preview-file fade overflow-auto"
            data-bs-keyboard="true"
            data-bs-backdrop="true"
            role="dialog"
            aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-transparent">
                    {files[previewNumber] && files[previewNumber]?.fileURL ? (
                        isFileImage(files[previewNumber]?.fileURL) ? (
                            <img
                                src={
                                    files[previewNumber]?.fileURL || BlankImage
                                }
                                className="preview-image cursor-pointer"
                                style={{
                                    transform: `scale(${zoomValue})`,
                                    cursor:
                                        zoomValue >= ZOOM_ON_IMAGE_CLICK
                                            ? 'zoom-out'
                                            : 'zoom-in',
                                }}
                                onClick={_handleClickImage}
                            />
                        ) : isFileRenderInElementObject(
                              files[previewNumber]?.fileURL,
                          ) ? (
                            <iframe
                                src={
                                    files[previewNumber]?.fileURL || BlankImage
                                }
                                className="w-100"
                                style={{ height: '75vh' }}
                            />
                        ) : (
                            <div className="card border-0 vstack align-items-center gap-3 py-4">
                                <div className="">
                                    <img
                                        src={iconFormatFile(
                                            files[previewNumber]?.fileURL,
                                        )}
                                        alt=""
                                    />
                                </div>

                                <div className="text-center px-4 mt-2 w-100">
                                    <TextMoreLess className="fw-semibold">
                                        {files[previewNumber][paramOfFileName]}
                                    </TextMoreLess>

                                    {/*<p className="text-gray-700 pt-2 mb-0">*/}
                                    {/*    {_currentlyPreviewDataFileUrlExtension?.toUpperCase()}*/}
                                    {/*    {' - '}*/}
                                    {/*    {_currentlyPreviewDataFileSizeInKb >*/}
                                    {/*    1024*/}
                                    {/*        ? `${_currentlyPreviewDataFileSizeInMb.toFixed(*/}
                                    {/*              1,*/}
                                    {/*          )} Mb`*/}
                                    {/*        : `${_currentlyPreviewDataFileSizeInKb.toFixed(*/}
                                    {/*              1,*/}
                                    {/*          )} Kb`}*/}
                                    {/*</p>*/}
                                </div>

                                <p className="text-gray-500 fs-12 mb-0">
                                    Cannot preview this file, please download it
                                    <span className="text-danger">*</span>
                                </p>
                            </div>
                        )
                    ) : null}

                    {/*{files[previewNumber]?.fileURL ? (*/}
                    {/*    <>*/}
                    {/*        /!* Preview Image *!/*/}
                    {/*        /!*{isImageFile(files[previewNumber]?.mimeType) && (*!/*/}
                    {/*        /!*    <img*!/*/}
                    {/*        /!*        src={*!/*/}
                    {/*        /!*            _currentlyPreviewData?.fileURL ||*!/*/}
                    {/*        /!*            BlankImage*!/*/}
                    {/*        /!*        }*!/*/}
                    {/*        /!*        className="preview-image cursor-pointer"*!/*/}
                    {/*        /!*        style={{*!/*/}
                    {/*        /!*            transform: `scale(${zoomValue})`,*!/*/}
                    {/*        /!*            cursor:*!/*/}
                    {/*        /!*                zoomValue >= ZOOM_ON_IMAGE_CLICK*!/*/}
                    {/*        /!*                    ? 'zoom-out'*!/*/}
                    {/*        /!*                    : 'zoom-in',*!/*/}
                    {/*        /!*        }}*!/*/}
                    {/*        /!*        onClick={_handleClickImage}*!/*/}
                    {/*        /!*    />*!/*/}
                    {/*        /!*)}*!/*/}

                    {/*        /!* Preview PDF *!/*/}
                    {/*        {_currentlyPreviewData?.type === FILE_TYPE_PDF && (*/}
                    {/*            <iframe*/}
                    {/*                src={`${_currentlyPreviewData?.blobUrl}`}*/}
                    {/*                className="w-100"*/}
                    {/*                style={{ height: '75vh' }}*/}
                    {/*            />*/}
                    {/*        )}*/}

                    {/*        /!* Preview Other *!/*/}
                    {/*        {_currentlyPreviewData?.type ===*/}
                    {/*            FILE_TYPE_OTHER && (*/}
                    {/*            <div className="d-flex flex-column justify-content-center align-items-center gap-3 h-100 bg-neutral-700 py-4">*/}
                    {/*                <DocumentDownload*/}
                    {/*                    variant="Bulk"*/}
                    {/*                    size={60}*/}
                    {/*                />*/}
                    {/*                <div className="text-center px-4 mt-2">*/}
                    {/*                    <TextMoreLess>*/}
                    {/*                        {_dataImage?.[previewNumber]}*/}
                    {/*                    </TextMoreLess>*/}

                    {/*                    <p className="text-gray-700 mt-2">*/}
                    {/*                        {_currentlyPreviewDataFileUrlExtension?.toUpperCase()}*/}
                    {/*                        {' - '}*/}
                    {/*                        {_currentlyPreviewDataFileSizeInKb >*/}
                    {/*                        1024*/}
                    {/*                            ? `${_currentlyPreviewDataFileSizeInMb.toFixed(*/}
                    {/*                                  1,*/}
                    {/*                              )} Mb`*/}
                    {/*                            : `${_currentlyPreviewDataFileSizeInKb.toFixed(*/}
                    {/*                                  1,*/}
                    {/*                              )} Kb`}*/}
                    {/*                    </p>*/}
                    {/*                </div>*/}

                    {/*                <p className="text-gray-700 fs-12">*/}
                    {/*                    <span className="text-danger">*</span>*/}
                    {/*                    Cannot preview this file, please*/}
                    {/*                    download it*/}
                    {/*                </p>*/}
                    {/*            </div>*/}
                    {/*        )}*/}
                    {/*    </>*/}
                    {/*) : (*/}
                    {/*    <div className="d-flex flex-column justify-content-center align-items-center gap-3 h-100 bg-neutral-700 py-5">*/}
                    {/*        <GallerySlash variant="Bulk" size={60} />*/}
                    {/*        <p className="mt-1 text-gray-700 mb-0">*/}
                    {/*            Error while loading file.*/}
                    {/*        </p>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>
            </div>

            {/* Toolbar */}
            <div className="toolbar-wrapper">
                <div className="toolbar-section">
                    <button type="button" title="Prev" onClick={_handlePrev}>
                        <ArrowLeft size={18} />
                    </button>
                    <div className="zoom-value">
                        {previewNumber + 1}/{files.length}
                    </div>
                    <button type="button" title="Next" onClick={_handleNext}>
                        <ArrowRight size={18} />
                    </button>
                </div>

                {isFileImage(files[previewNumber]?.fileURL) ? (
                    <div className="toolbar-section">
                        <button
                            type="button"
                            title="Zoom Out"
                            disabled={isValidToZoomOut}
                            onClick={_handleZoomOut}>
                            <Minus size={18} />
                        </button>
                        <div className="zoom-value">{zoomValue * 100}%</div>
                        <button
                            type="button"
                            title="Zoom In"
                            disabled={isValidToZoomIn}
                            onClick={_handleZoomIn}>
                            <Plus size={18} />
                        </button>
                    </div>
                ) : null}

                {files[previewNumber] && files[previewNumber]?.fileURL && (
                    <div
                        className="toolbar-section"
                        title="Download"
                        onClick={() =>
                            downloadFromUrl(
                                files[previewNumber].fileURL,
                                files[previewNumber][paramOfFileName] || '',
                            )
                        }>
                        <button type="button">
                            <DownloadCloud size={18} />
                        </button>
                    </div>
                )}
                <div
                    className="toolbar-section"
                    title="Close Preview"
                    onClick={() => actionModal(id, true)}>
                    <button type="button">
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalFileCarousel
