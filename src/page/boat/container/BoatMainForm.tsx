'use client'
import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import SelectOptionBoatType from '@/common/dataForm/SelectOptionBoatType.tsx'
import FormEditFileLogic from '@/common/misc/FormEditFile.logic.tsx'
import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import {
    BtnCircleRemove,
    BtnInfo,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import useBoatMainFormHook from '@/page/boat/hook/useBoatMainForm.hook.ts'
import boatPath from '@/path/boat.path.ts'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import CustomInfoForm from '@/common/dataFeature/customInformation/CustomInfoForm.tsx'
import BoatScheduleForm from '@/page/boat/component/BoatScheduleForm.tsx'
import { Link } from 'react-router'
import IconWORD from '@/asset/image/icon/flat-doc-icon.png'
import IconPDF from '@/asset/image/icon/flat-pdf-icon.svg'
import IconEXCEL from '@/asset/image/icon/flat-xls-icon.png'
import {
    checkFileTypeFromUrl,
    IS_TYPE_FILE_EXCEL,
    IS_TYPE_FILE_PDF,
    IS_TYPE_FILE_WORD,
} from '@/config/objectList.config.ts'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import Image from 'rc-image'

const BoatMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __setFormRequest,
        __handleChange,
        __handleArrToggle,
        __handleArrChange,
        __handleSubmit,
        __handleCancel,
        __handleChangeWithParent,
        __mapImage,
        __removeMapImage,

        __handleCustomInfoAdd,
        __handleCustomInfoRemove,
        __handleCustomInfoChange,

        __handleScheduleAdd,
        __handleScheduleRemove,
        __handleScheduleChange,

        __handleToggleDeletePrevPhotoPromotion,
        __lisPreviousPhotosPromotion,

        // SEO
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // used during editing
        __handleToggleDeletePrevPhotos,
        __lisPreviousPhotos,

        //Price Files
        __setPreviewPriceFile,
        __previewPriceFile,
        __handlePriceFileRemove,
    } = useBoatMainFormHook({ isEdit })

    // Photos
    const {
        __dataFiles,
        __actionAddFiles,
        __actionSetDataFiles,
        __actionRemoveDataFile,
    } = useFormDataFilesHook(__formRequest, __setFormRequest, 'photos')

    // Promo Photos
    const {
        __dataFiles: __dataFilesPromo,
        __actionAddFiles: __actionAddFilesPromo,
        __actionSetDataFiles: __actionSetDataFilesPromo,
        __actionRemoveDataFile: __actionRemoveDataFilePromo,
    } = useFormDataFilesHook(__formRequest, __setFormRequest, 'promoPhotos')

    // Price File
    const {
        __dataFiles: __dataFilePriceFiles,
        __actionAddFiles: __actionAddFilePriceFiles,
        __actionSetDataFiles: __actionSetDataFilePriceFiles,
        __actionRemoveDataFile: __actionRemoveDataFilePriceFiles,
    } = useFormDataFilesHook(__formRequest, __setFormRequest, 'priceFiles')

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Boat', {
                        url: boatPath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {__isLoadingDetail && isEdit ? (
                <Loading />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}
                        className="vstack gap-3">
                        <CardDropdown title="Boat Information" isShow>
                            <div className="row">
                                <div className="col-md-8">
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                        }}>
                                        <GeneralRowForm label="Name" isRequired>
                                            <FormInput
                                                name="name"
                                                placeholder="e.g D’STARS FAST FERRY"
                                                required
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Boat Type"
                                            isRequired>
                                            <SelectOptionBoatType
                                                name="boatComponentTypeId"
                                                isUseHook
                                                required
                                                ids={[
                                                    ...(__formRequest.boatComponentTypeId
                                                        ? [
                                                              __formRequest.boatComponentTypeId,
                                                          ]
                                                        : []),
                                                ]}
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm label="Promo Label">
                                            <FormInput
                                                name="promoLabel"
                                                placeholder="20% Off"
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm label="Custom Informations">
                                            <div className="vstack gap-3">
                                                {__formRequest.customInformations?.map(
                                                    (group, index) => (
                                                        <CustomInfoForm
                                                            key={index}
                                                            group={group}
                                                            actions={{
                                                                onChange: (
                                                                    group,
                                                                ) =>
                                                                    __handleCustomInfoChange(
                                                                        index,
                                                                        group,
                                                                    ),
                                                                onRemove: () =>
                                                                    __handleCustomInfoRemove(
                                                                        index,
                                                                    ),
                                                            }}
                                                        />
                                                    ),
                                                )}
                                            </div>

                                            <BtnPrimary
                                                type="button"
                                                isOutline
                                                className="w-100 mb-3"
                                                handle={() =>
                                                    __handleCustomInfoAdd()
                                                }>
                                                Add New Group
                                            </BtnPrimary>
                                        </GeneralRowForm>

                                        <GeneralRowForm label="Schedule">
                                            <div className="vstack gap-3">
                                                {__formRequest.schedule?.map(
                                                    (schedule, index) => (
                                                        <BoatScheduleForm
                                                            key={index}
                                                            group={schedule}
                                                            actions={{
                                                                onChange: (
                                                                    schedule,
                                                                ) =>
                                                                    __handleScheduleChange(
                                                                        index,
                                                                        schedule,
                                                                    ),
                                                                onRemove: () =>
                                                                    __handleScheduleRemove(
                                                                        index,
                                                                    ),
                                                            }}
                                                        />
                                                    ),
                                                )}
                                            </div>

                                            <BtnPrimary
                                                type="button"
                                                isOutline
                                                className="w-100 mb-3"
                                                handle={() =>
                                                    __handleScheduleAdd()
                                                }>
                                                Add New Schedule
                                            </BtnPrimary>
                                        </GeneralRowForm>

                                        <GeneralRowForm label="Description">
                                            <FormTinyMCE
                                                name="description"
                                                isSimple
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Status Active"
                                            isRequired>
                                            <FormRadioButtonMulti
                                                name="isActive"
                                                checkBoxs={[
                                                    {
                                                        defaultValue: 0,
                                                        label: 'No',
                                                    },
                                                    {
                                                        defaultValue: 1,
                                                        label: 'Yes',
                                                    },
                                                ]}
                                            />
                                        </GeneralRowForm>
                                    </WrapFormContext>

                                    {/*Price Files*/}
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                        }}>
                                        <GeneralRowForm label="Price File">
                                            {__previewPriceFile ? (
                                                <div className="pb-3 row">
                                                    <div className="col-4">
                                                        <div className="position-relative">
                                                            <Link
                                                                to={
                                                                    __previewPriceFile
                                                                }
                                                                target="_blank">
                                                                <BtnInfo
                                                                    className="btn-sm"
                                                                    isOutline>
                                                                    <Image
                                                                        src={
                                                                            checkFileTypeFromUrl(
                                                                                __previewPriceFile,
                                                                                IS_TYPE_FILE_PDF,
                                                                            )
                                                                                ? IconPDF
                                                                                : checkFileTypeFromUrl(
                                                                                        __previewPriceFile,
                                                                                        IS_TYPE_FILE_WORD,
                                                                                    )
                                                                                  ? IconWORD
                                                                                  : checkFileTypeFromUrl(
                                                                                          __previewPriceFile,
                                                                                          IS_TYPE_FILE_EXCEL,
                                                                                      )
                                                                                    ? IconEXCEL
                                                                                    : null
                                                                        }
                                                                        alt="Price File"
                                                                        fallback={
                                                                            ImgGeneralDefault
                                                                        }
                                                                        className="data-img data-img-contain object-fit-contain"
                                                                    />
                                                                </BtnInfo>
                                                            </Link>

                                                            <BtnCircleRemove
                                                                className="btn-icon-remove-top-right z-2"
                                                                actions={{
                                                                    remove: __handlePriceFileRemove,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <FormUploadFile
                                                    name="priceFiles"
                                                    isUseHook={false}
                                                    classNameLayoutImage="col-md-5"
                                                    accept=".pdf,.xlsx,.xls,.doc,.docx"
                                                    subTitle="PDF, XLSX, XLS, DOC, DOCX"
                                                    isGeneralFile
                                                    value={
                                                        __formRequest
                                                            .priceFiles[0]
                                                    }
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                        ) => {
                                                            __handleChange(
                                                                name,
                                                                [value],
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}
                                        </GeneralRowForm>
                                    </WrapFormContext>

                                    {/*New Photos*/}
                                    {isEdit && __lisPreviousPhotos?.length ? (
                                        <GeneralRowForm label="Previous Photos">
                                            <FormEditFileLogic
                                                dataFiles={__lisPreviousPhotos.filter(
                                                    (vm) => !vm.isDeleted,
                                                )}
                                                dataBy="photo"
                                                actions={{
                                                    remove: (data) =>
                                                        __handleToggleDeletePrevPhotos(
                                                            data.id,
                                                        ),
                                                    restore: () => {},
                                                }}
                                            />
                                        </GeneralRowForm>
                                    ) : null}

                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                            handleAddFiles: __actionAddFiles,
                                            handleSetDataFiles:
                                                __actionSetDataFiles,
                                            handleRemoveDataFile:
                                                __actionRemoveDataFile,
                                            handleArrChange: __handleArrChange,
                                        }}>
                                        <GeneralRowForm
                                            label="New Photos"
                                            isRequired>
                                            <FormUploadFileWithActionPreviewLogic
                                                isUseInputDesc={false}
                                                formName="photos"
                                                dataFiles={__dataFiles}
                                                formRequest={__formRequest}
                                            />
                                        </GeneralRowForm>
                                    </WrapFormContext>

                                    {/*New Photos*/}
                                    {isEdit &&
                                    __lisPreviousPhotosPromotion?.length ? (
                                        <GeneralRowForm label="Previous Photos Promotion">
                                            <FormEditFileLogic
                                                dataFiles={__lisPreviousPhotosPromotion.filter(
                                                    (vm) => !vm.isDeleted,
                                                )}
                                                dataBy="file"
                                                actions={{
                                                    remove: (data) =>
                                                        __handleToggleDeletePrevPhotoPromotion(
                                                            data.id,
                                                        ),
                                                    restore: () => {},
                                                }}
                                            />
                                        </GeneralRowForm>
                                    ) : null}

                                    {/*Promo Photos*/}
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                            handleAddFiles:
                                                __actionAddFilesPromo,
                                            handleSetDataFiles:
                                                __actionSetDataFilesPromo,
                                            handleRemoveDataFile:
                                                __actionRemoveDataFilePromo,
                                            handleArrChange: __handleArrChange,
                                        }}>
                                        <GeneralRowForm label="Promo Photos">
                                            <FormUploadFileWithActionPreviewLogic
                                                isUseInputDesc={false}
                                                formName="promoPhotos"
                                                dataFiles={__dataFilesPromo}
                                                formRequest={__formRequest}
                                            />
                                        </GeneralRowForm>
                                    </WrapFormContext>

                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                        }}>
                                        <GeneralRowForm label="Map Image">
                                            {__mapImage ? (
                                                <div className="pb-3">
                                                    <PreviewFileModalLogic
                                                        dataUrl={__mapImage}
                                                        dataBy="file"
                                                        dataFile={__mapImage}
                                                        isShowBtnRemove
                                                        actions={{
                                                            remove: __removeMapImage,
                                                        }}
                                                        classNameWidth="col-md-4"
                                                    />
                                                </div>
                                            ) : (
                                                <FormUploadFile
                                                    name="mapImage"
                                                    isUseHook={false}
                                                    classNameLayoutImage="col-md-5"
                                                    value={
                                                        __formRequest.mapImage
                                                    }
                                                    actions={{
                                                        onChange:
                                                            __handleChange,
                                                    }}
                                                />
                                            )}
                                        </GeneralRowForm>
                                    </WrapFormContext>
                                </div>
                            </div>
                        </CardDropdown>

                        <SectionFormSEOInfo
                            classNameColumn="col-md-8"
                            __formRequest={__formRequest}
                            __handleChangeWithParent={__handleChangeWithParent}

                            // SEO Thumbnail
                            __seoThumbnail={__seoThumbnail}
                            __setSetSEOThumbnail={__setSetSEOThumbnail}
                            __handleSEOThumbnailRemove={
                                __handleSEOThumbnailRemove
                            }
                        />

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() =>
                                __handleCancel(__pageStateDataSearch)
                            }
                        />
                    </FormWrap>
                </>
            )}
        </>
    )
}

export default BoatMainForm
