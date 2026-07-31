import { isEmpty } from 'lodash'
import SearchProperty from '@/common/dataForm/SearchProperty.tsx'
import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import Card from '@/component/card/Card.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormInputRating from '@/component/form/FormInputRating.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import usePropertyReviewMainFormHook from '@/page/propertyReviews/hook/usePropertyReviewMainForm.hook.ts'
import boatPath from '@/path/boat.path.ts'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'

const PropertyReviewMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,

        // Change Input
        __setFormRequest,
        __handleChange,
        __handleArrChange,

        __detail,

        // Submit / Cancel
        __handleSubmit,
        __handleCancel,
    } = usePropertyReviewMainFormHook({ isEdit })

    // Photos
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
                    objectNavBread('Property Review', {
                        url: propertyReviewsPath.main,
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
                        <Card title="Review Information">
                            <WrapFormContext
                                formRequest={__formRequest}
                                actions={{
                                    change: __handleChange,
                                    chooseProperty: (_, __, data) =>
                                        __handleChange(
                                            'propertyId',
                                            data?.id || '',
                                        ),
                                }}>
                                <div className="row">
                                    <div className="col-md-9">
                                        <GeneralRowForm
                                            label="Property"
                                            isRequired>
                                            <SearchProperty
                                                name="networkSettingId"
                                                dataProperty={__detail.property}
                                                isUseDataNetworkSettingToHandle={
                                                    !isEmpty(__detail.property)
                                                }
                                                nameOfChange="chooseProperty"
                                                isUseHook
                                                isEdit={isEdit}
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm label="Name" isRequired>
                                            <FormInput
                                                name="name"
                                                placeholder="e.g D’STARS FAST FERRY"
                                                required
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm label="Rating">
                                            {/*<FormInput*/}
                                            {/*    name="rating"*/}
                                            {/*    placeholder="e.g D’STARS FAST FERRY"*/}
                                            {/*    required*/}
                                            {/*/>*/}
                                            <FormInputRating
                                                name="rating"
                                                value={__formRequest.rating}
                                                onChange={(val) =>
                                                    __handleChange(
                                                        'rating',
                                                        val,
                                                    )
                                                }
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Review"
                                            isRequired>
                                            <FormTextArea
                                                // label="Review"
                                                name="review"
                                                required
                                                placeholder="e.g Nusa Lembongan is a great place to bring children of all ages. It’s a very safe island and the locals adore children."
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
                                    </div>
                                </div>
                            </WrapFormContext>

                            {/*Hide Temporary*/}
                            {/*<WrapFormContext*/}
                            {/*    formRequest={__formRequest}*/}
                            {/*    actions={{*/}
                            {/*        change: __handleChange,*/}
                            {/*        handleAddFiles: __actionAddFiles,*/}
                            {/*        handleSetDataFiles: __actionSetDataFiles,*/}
                            {/*        handleRemoveDataFile:*/}
                            {/*            __actionRemoveDataFile,*/}
                            {/*        handleArrChange: __handleArrChange,*/}
                            {/*    }}>*/}
                            {/*    <GeneralRowForm label="New Photos" isRequired>*/}
                            {/*        <FormUploadFileWithActionPreviewLogic*/}
                            {/*            isUseInputDesc={false}*/}
                            {/*            formName="photos"*/}
                            {/*            dataFiles={__dataFiles}*/}
                            {/*            formRequest={__formRequest}*/}
                            {/*        />*/}
                            {/*    </GeneralRowForm>*/}
                            {/*</WrapFormContext>*/}
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

export default PropertyReviewMainForm
