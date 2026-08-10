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
import FormTextEditor from '@/component/form/FormTextEditor.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import useBoatMainFormHook from '@/page/boat/hook/useBoatMainForm.hook.ts'
import boatPath from '@/path/boat.path.ts'

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
        __handleCustomInfoAdd,
        __handleCustomInfoRemove,
        __handleSubmit,
        __handleCancel,
        __handleChangeWithParent,

        __handleToggleDeletePrevPhotoPromotion,
        __lisPreviousPhotosPromotion,

        // SEO
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // used during editing
        __handleToggleDeletePrevPhotos,
        __lisPreviousPhotos,
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
    } = useFormDataFilesHook(
        __formRequest,
        __setFormRequest,
        'deletePromoPhotoIds',
    )

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

                                        <GeneralRowForm
                                            label="Custom Informations">
                                            {__formRequest.customInformations.map(
                                                (vm, index) => {
                                                    const order = index + 1
                                                    const uniqId =
                                                        'customInformations' +
                                                        order

                                                    return (
                                                        <div
                                                            className="row align-items-end"
                                                            key={index}>
                                                            <div className="col-md">
                                                                <FormInput
                                                                    label="Name"
                                                                    name="name"
                                                                    value={
                                                                        vm.name
                                                                    }
                                                                    placeholder="e.g Capacity"
                                                                    required
                                                                    id={uniqId}
                                                                    actions={{
                                                                        onChange:
                                                                            (
                                                                                name,
                                                                                value,
                                                                            ) =>
                                                                                __handleArrChange(
                                                                                    index,
                                                                                    name,
                                                                                    value,
                                                                                    'customInformations',
                                                                                ),
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-md">
                                                                <FormInput
                                                                    label="Value"
                                                                    name="value"
                                                                    value={
                                                                        vm.value
                                                                    }
                                                                    placeholder="e.g 20 People"
                                                                    required
                                                                    id={uniqId}
                                                                    actions={{
                                                                        onChange:
                                                                            (
                                                                                name,
                                                                                value,
                                                                            ) =>
                                                                                __handleArrChange(
                                                                                    index,
                                                                                    name,
                                                                                    value,
                                                                                    'customInformations',
                                                                                ),
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-auto pb-4">
                                                                <BtnCircleRemove
                                                                    actions={{
                                                                        remove: () =>
                                                                            __handleCustomInfoRemove(
                                                                                index,
                                                                            ),
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                },
                                            )}

                                            <BtnPrimary
                                                type="button"
                                                isOutline
                                                className="w-100 mb-3"
                                                handle={() =>
                                                    __handleCustomInfoAdd()
                                                }>
                                                Add New Information
                                            </BtnPrimary>
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Description">
                                            <FormTextEditor
                                                value={
                                                    __formRequest.description
                                                }
                                                actions={{
                                                    onChange: (value) =>
                                                        __handleChange(
                                                            'description',
                                                            value,
                                                        ),
                                                }}
                                                required
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

                                        <GeneralRowForm
                                            label="Price File">
                                            <FormUploadFile
                                                name="priceFile"
                                                nameFileDefault="Price"
                                                subTitle="PDF"
                                                accept=".pdf"
                                                required
                                                isGeneralFile
                                            />
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
                                        <GeneralRowForm
                                            label="Promo Photos">
                                            <FormUploadFileWithActionPreviewLogic
                                                isUseInputDesc={false}
                                                formName="promoPhotos"
                                                dataFiles={__dataFilesPromo}
                                                formRequest={__formRequest}
                                            />
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
