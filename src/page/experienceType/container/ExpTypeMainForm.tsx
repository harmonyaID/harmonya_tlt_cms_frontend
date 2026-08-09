import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import SelectBaseOptionExpType from '@/common/dataForm/SelectBaseOptionExpType.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextEditor from '@/component/form/FormTextEditor.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { isLoadingAndDetail } from '@/helper/condition.helper.ts'
import useExpTypeMainForm from '@/page/experienceType/hook/useExpTypeMainForm.hook.ts'
import experienceAreaPath from '@/path/experienceArea.path.ts'

const ExpTypeMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __pageStateDataSearch,

        // Detail
        __isLoadingDetail,
        __detailFormRequest,

        // Chang Form
        __setFormRequest,
        __handleChange,
        __handleChangeWithParent,

        // Banner
        __previewFeaturedImage,
        __setPreviewFeaturedImage,
        __previewBanner,
        __setPreviewBanner,
        __handleBannerRemove,

        // SEO
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit,
        __handleCancel,
    } = useExpTypeMainForm({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Type', {
                        url: experienceAreaPath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {isEdit &&
            isLoadingAndDetail(__isLoadingDetail, __detailFormRequest) ? (
                <LoadingNotAvailable isLoading={__isLoadingDetail} isNotFound />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}
                        className="vstack gap-3">
                        <CardDropdown title="Type Information" isShow>
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
                                                required
                                                placeholder="e.g Water Sport"
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm label="Description">
                                            <FormTextEditor
                                                value={
                                                    __formRequest.description
                                                }
                                                placeholder="e.g Nestled along a pristine stretch of coastline in Nusa Lembongan."
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

                                        <GeneralRowForm label="Featured Image">
                                            {__previewFeaturedImage ? (
                                                <>
                                                    <div className="pb-3">
                                                        {/*<p className="mb-2 text-neutral-100">*/}
                                                        {/*    Featured Image*/}
                                                        {/*</p>*/}

                                                        <PreviewFileModalLogic
                                                            dataUrl={__previewFeaturedImage?.toString()}
                                                            dataBy="file"
                                                            dataFile={
                                                                __previewFeaturedImage
                                                            }
                                                            isShowBtnRemove
                                                            actions={{
                                                                remove: () =>
                                                                    __handleBannerRemove(
                                                                        'featuredImage',
                                                                    ),
                                                            }}
                                                            classNameWidth="w-100 max-h-148px"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <FormUploadFile
                                                    // label="Featured Image"
                                                    name="featuredImage"
                                                    required
                                                    isUseHook={false}
                                                    isPreview={false}
                                                    accept="image/*"
                                                    actions={{
                                                        onChange: (
                                                            _,
                                                            newFiles,
                                                        ) => {
                                                            const img =
                                                                new Image()
                                                            const objectUrl =
                                                                URL.createObjectURL(
                                                                    newFiles,
                                                                )

                                                            img.onload = () => {
                                                                __handleChange(
                                                                    'featuredImage',
                                                                    newFiles,
                                                                )
                                                            }

                                                            img.src = objectUrl
                                                        },
                                                        handleDataFiles: (
                                                            newDataFiles,
                                                        ) => {
                                                            __setPreviewFeaturedImage(
                                                                newDataFiles.url,
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}
                                        </GeneralRowForm>

                                        <GeneralRowForm label="Banner Image">
                                            {__previewBanner ? (
                                                <>
                                                    <div className="pb-3">
                                                        <p className="mb-2 text-neutral-100">
                                                            Banner Image
                                                        </p>

                                                        <PreviewFileModalLogic
                                                            dataUrl={__previewBanner?.toString()}
                                                            dataBy="file"
                                                            dataFile={
                                                                __previewBanner
                                                            }
                                                            isShowBtnRemove
                                                            actions={{
                                                                remove: () =>
                                                                    __handleBannerRemove(
                                                                        'banner',
                                                                    ),
                                                            }}
                                                            classNameWidth="w-100 max-h-148px"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <FormUploadFile
                                                    // label="Banner Image"
                                                    name="banner"
                                                    required
                                                    isUseHook={false}
                                                    isPreview={false}
                                                    accept="image/*"
                                                    actions={{
                                                        onChange: (
                                                            _,
                                                            newFiles,
                                                        ) => {
                                                            const img =
                                                                new Image()
                                                            const objectUrl =
                                                                URL.createObjectURL(
                                                                    newFiles,
                                                                )

                                                            img.onload = () => {
                                                                __handleChange(
                                                                    'banner',
                                                                    newFiles,
                                                                )
                                                            }

                                                            img.src = objectUrl
                                                        },
                                                        handleDataFiles: (
                                                            newDataFiles,
                                                        ) => {
                                                            __setPreviewBanner(
                                                                newDataFiles.url,
                                                            )
                                                        },
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

export default ExpTypeMainForm
