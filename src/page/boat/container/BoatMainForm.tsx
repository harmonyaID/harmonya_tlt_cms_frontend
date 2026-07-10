'use client'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import boatPath from '@/path/boat.path.ts'
import useBoatMainFormHook from '@/page/boat/hook/useBoatMainForm.hook.ts'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import Card from '@/component/card/Card.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormEditFileLogic from '@/common/misc/FormEditFile.logic.tsx'
import SelectOptionBoatType from '@/common/dataForm/SelectOptionBoatType.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import FormTextEditor from '@/component/form/FormTextEditor.tsx'

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

        __handleToggleDeletePrevPhotoPromotion,
        __lisPreviousPhotosPromotion,

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
                        className="vstack gap-1">
                        <Card title="Boat Information">
                            <div className="row">
                                <div className="col-md-8">
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                        }}>
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
                                            label="Custom Informations"
                                            isRequired>
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
                                            label="Description"
                                            isRequired>
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
                                            label="Price File"
                                            isRequired>
                                            <FormUploadFile
                                                name="priceFile"
                                                nameFileDefault="Document NPWP"
                                                subTitle="Webp, JPG, PNG, JPEG & PDF"
                                                accept=".pdf"
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
                                            label="Promo Photos"
                                            isRequired>
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
                        </Card>

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
