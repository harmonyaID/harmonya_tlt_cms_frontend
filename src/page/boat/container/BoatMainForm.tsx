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
import FormInputTimePicker from '@/component/form/FormInputTimePicker.tsx'
import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormEditFileLogic from '@/common/misc/FormEditFile.logic.tsx'

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
        __handleChangeTime,
        __handleSubmit,
        __handleCancel,

        // used during editing
        __handleToggleDeletePrevPhotos,
        __lisPreviousPhotos,
    } = useBoatMainFormHook({ isEdit })

    const {
        __dataFiles,
        __actionAddFiles,
        __actionSetDataFiles,
        __actionRemoveDataFile,
    } = useFormDataFilesHook(__formRequest, __setFormRequest, 'photos')

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
                                        <GeneralRowForm label="Name" isRequired>
                                            <FormInput
                                                name="name"
                                                placeholder="e.g D'Stars Fast Ferry"
                                                required
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Description"
                                            isRequired>
                                            <FormTextArea
                                                name="description"
                                                placeholder="e.g Fast ferry from Sanur to Nusa Lembongan"
                                                required
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Route"
                                            isRequired>
                                            <FormInput
                                                label="Route From"
                                                name="routeFrom"
                                                placeholder="e.g Sanur, Bali"
                                                required
                                            />
                                            <FormInput
                                                label="Route To"
                                                name="routeTo"
                                                placeholder="e.g Jungutbatu Bay, Nusa Lembongan"
                                                required
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Departure Times From Bali"
                                            isRequired>
                                            {__formRequest.departureTimesFromBali.map(
                                                (vm, index) => {
                                                    const order = index + 1
                                                    const uniqName =
                                                        'departureTimesFromBali' +
                                                        order

                                                    return (
                                                        <div
                                                            className="row align-items-end"
                                                            key={index}>
                                                            <div className="col-md">
                                                                <FormInputTimePicker
                                                                    label={
                                                                        'Time ' +
                                                                        order
                                                                    }
                                                                    required
                                                                    id={
                                                                        uniqName
                                                                    }
                                                                    name={
                                                                        uniqName
                                                                    }
                                                                    format="h.i K"
                                                                    config={{
                                                                        enableTime: true,
                                                                        noCalendar: true,
                                                                    }}
                                                                    defaultValue={
                                                                        vm
                                                                    }
                                                                    value={vm}
                                                                    isHook={
                                                                        false
                                                                    }
                                                                    actions={{
                                                                        onChange:
                                                                            (
                                                                                name,
                                                                                value,
                                                                            ) =>
                                                                                __handleChangeTime(
                                                                                    index,
                                                                                    'departureTimesFromBali',
                                                                                    value,
                                                                                ),
                                                                    }}
                                                                />
                                                            </div>
                                                            {index ? (
                                                                <div className="col-auto pb-4">
                                                                    <BtnCircleRemove
                                                                        actions={{
                                                                            remove: () =>
                                                                                __handleArrToggle(
                                                                                    index,
                                                                                    'departureTimesFromBali',
                                                                                ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    )
                                                },
                                            )}

                                            <BtnPrimary
                                                type="button"
                                                isOutline
                                                className="w-100 mb-3"
                                                handle={() =>
                                                    __handleArrToggle(
                                                        -1,
                                                        'departureTimesFromBali',
                                                        '',
                                                    )
                                                }>
                                                Add New Time
                                            </BtnPrimary>
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Departure Times From Lembongan"
                                            isRequired>
                                            {__formRequest.departureTimesFromLembongan.map(
                                                (vm, index) => {
                                                    const order = index + 1
                                                    const uniqName =
                                                        'departureTimesFromLembongan' +
                                                        order

                                                    return (
                                                        <div
                                                            className="row align-items-end"
                                                            key={index}>
                                                            <div className="col-md">
                                                                <FormInputTimePicker
                                                                    label={
                                                                        'Time ' +
                                                                        order
                                                                    }
                                                                    required
                                                                    id={
                                                                        uniqName
                                                                    }
                                                                    name={
                                                                        uniqName
                                                                    }
                                                                    format="h.i K"
                                                                    config={{
                                                                        enableTime: true,
                                                                        noCalendar: true,
                                                                    }}
                                                                    defaultValue={
                                                                        vm
                                                                    }
                                                                    value={vm}
                                                                    isHook={
                                                                        false
                                                                    }
                                                                    actions={{
                                                                        onChange:
                                                                            (
                                                                                name,
                                                                                value,
                                                                            ) =>
                                                                                __handleChangeTime(
                                                                                    index,
                                                                                    'departureTimesFromLembongan',
                                                                                    value,
                                                                                ),
                                                                    }}
                                                                />
                                                            </div>
                                                            {index ? (
                                                                <div className="col-auto pb-4">
                                                                    <BtnCircleRemove
                                                                        actions={{
                                                                            remove: () =>
                                                                                __handleArrToggle(
                                                                                    index,
                                                                                    'departureTimesFromLembongan',
                                                                                ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    )
                                                },
                                            )}

                                            <BtnPrimary
                                                type="button"
                                                isOutline
                                                className="w-100 mb-3"
                                                handle={() =>
                                                    __handleArrToggle(
                                                        -1,
                                                        'departureTimesFromLembongan',
                                                        '',
                                                    )
                                                }>
                                                Add New Time
                                            </BtnPrimary>
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="DiscountPercentage (%)"
                                            isRequired>
                                            <FormInput
                                                name="discountPercentage"
                                                placeholder="e.g 20"
                                                type="number"
                                                min="0"
                                                max="100"
                                                isCheckMinInput
                                                required
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Notes"
                                            isRequired>
                                            <FormTextArea
                                                name="notes"
                                                placeholder="e.g Fast ferry from Sanur to Nusa Lembongan"
                                                required
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Status Active"
                                            isRequired>
                                            <FormRadioButtonMulti
                                                // label="Active"
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

                                    {isEdit ? (
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
                                                // isEdit={isEdit}
                                                dataFiles={__dataFiles}
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
