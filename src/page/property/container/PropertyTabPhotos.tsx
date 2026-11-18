import { useState } from 'react'
import { isEmpty } from 'lodash'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import PreviewFileModalMultiLogic from '@/common/misc/PreviewFileModalMulti.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import { NotAvailable } from '@/component/general/TextDefault.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { MDPropertyPhotoForm } from '@/config/modal.config.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { uploadPhotosProperty } from '@/service/api/property.api.ts'
import { APIResponse } from '@/type/resultAPI.ts'

const initForm = {
    photo: '',
    caption: '',
    order: '',
}

const PropertyTabPhotos = ({
    propertyId,
    photos = [],
    onSuccess,
    apiUpload = uploadPhotosProperty,
}: {
    propertyId?: string | number
    photos?: any[]
    onSuccess?: () => Promise<any> | void
    apiUpload?: (id: any, form: any) => Promise<any>
}) => {
    const {
        __formRequest,
        __setFormRequest,
        __actionAddModal,
        __actionCloseModal,
    } = useCRUDModalRequestHook({
        modalId: MDPropertyPhotoForm,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: () => ({ ...initForm }),
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const [previewPhoto, setPreviewPhoto] = useState<any>()

    const _handleAdd = () => {
        setPreviewPhoto(undefined)
        __actionAddModal()
    }

    const _handleRemovePhoto = () => {
        _handleChange('photo', '')
        setPreviewPhoto(undefined)
    }

    const _handleSubmit = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData(__formRequest)
        return apiUpload(propertyId, dataForm)
    }

    return (
        <>
            <div className="row mb-3 align-items-center">
                <div className="col">
                    <h5 className="fw-500 fs-16 text-neutral-100 mb-0">
                        Photos
                    </h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary handle={_handleAdd}>Add</BtnPrimary>
                </div>
            </div>

            {!isEmpty(photos) ? (
                <PreviewFileModalMultiLogic
                    dataFiles={photos}
                    dataBy="url"
                    keyDescription="caption"
                    classNameWrapImg="max-h-120-px"
                    classNameColumnPreview="col-md-3"
                />
            ) : (
                <NotAvailable />
            )}

            <CreatePortalLayout>
                <ModalWithActionFormCRUDLogic
                    id={MDPropertyPhotoForm}
                    detail={{}}
                    title="Photo"
                    isEdit={false}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            {previewPhoto ? (
                                <div className="my-3">
                                    <p className="mb-2 text-neutral-100">
                                        Photo
                                    </p>

                                    <PreviewFileModalLogic
                                        dataUrl={String(previewPhoto)}
                                        dataBy="file"
                                        dataFile={previewPhoto}
                                        isShowBtnRemove
                                        actions={{
                                            remove: _handleRemovePhoto,
                                        }}
                                    />
                                </div>
                            ) : (
                                <FormUploadFile
                                    label="Photo"
                                    name="photo"
                                    isUseHook={false}
                                    isPreview={false}
                                    required
                                    accept="image/*"
                                    actions={{
                                        onChange: (name, newFile) =>
                                            _handleChange('photo', newFile),
                                        handleDataFiles: (newDataFile) =>
                                            setPreviewPhoto(newDataFile.url),
                                    }}
                                />
                            )}

                            <FormInput
                                label="Caption"
                                name="caption"
                                placeholder="e.g Living room"
                            />

                            <FormInput
                                label="Order"
                                name="order"
                                placeholder="e.g 1"
                                type="number"
                                isNumberOnly
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: _handleSubmit,
                        urlAPIUpdate: null,
                        initialForm: () => {},
                        callBack: () => onSuccess?.(),
                        emptySelect: () => {
                            __setFormRequest({ ...initForm })
                            setPreviewPhoto(undefined)
                        },
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default PropertyTabPhotos
