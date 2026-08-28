import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import SelectOptionBlogCategory from '@/common/dataForm/SelectOptionBlogCategory.tsx'
import SelectOptionBlogTag from '@/common/dataForm/SelectOptionBlogTag.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import JsonEditorForm from '@/component/form/FormJsonEditor.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { BtnCircleRemove } from '@/component/general/Button.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import SEOPreviewPublic from '@/component/general/SEOPreviewPublic.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useContentBlogMainForm from '@/page/contentBlog/hook/useContentBlogMainForm.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import useContentOfferMainForm from '@/page/contentOffer/hook/useContentOfferMainForm.hook.ts'
import contentOfferPath from '@/path/contentOffer.path.ts'
import FormInputDatePicker from '@/component/form/FormInputDatePicker.tsx'

const ContentOfferMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __handleChange,
        __handleChangeWithParent,
        __handleArrAddMulti,
        __handleChangeTitle,

        // tags
        __listTags,

        // Thumbnail
        __previewThumbnail,
        __setPreviewThumbnail,
        __handleThumbnailRemove,

        // SEO Thumbnail
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // Form
        __handleSubmit,
        __handleCancel,
    } = useContentOfferMainForm({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Offer', {
                        url: contentOfferPath.main,
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
                        // className="vstack gap-1"
                    >
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="vstack gap-4">
                                    <CardDropdown
                                        title="Offer Information"
                                        isShow>
                                        <WrapFormContext
                                            formRequest={__formRequest}
                                            actions={{
                                                change: __handleChange,
                                            }}>
                                            <GeneralRowForm
                                                label="Title"
                                                isRequired>
                                                <FormInput
                                                    name="title"
                                                    required
                                                    value={__formRequest.title}
                                                    placeholder="e.g Uni"
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                        ) =>
                                                            __handleChangeTitle(
                                                                value,
                                                            ),
                                                    }}
                                                />

                                                <FormInput
                                                    label="Slug"
                                                    name="slug"
                                                    // disabled
                                                    // readOnly
                                                    required
                                                    placeholder="by title"
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Date"
                                                isRequired>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <FormInputDatePicker
                                                            name="startDate"
                                                            label="Start"
                                                        />
                                                    </div>
                                                    <div className="col-6">
                                                        <FormInputDatePicker
                                                            name="endDate"
                                                            label="End"
                                                        />
                                                    </div>
                                                </div>
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Excerpt"
                                                isRequired>
                                                <FormTinyMCE
                                                    name="excerpt"
                                                    height={300}
                                                    placeholder="e.g Nusa Lembongan is a stunning island just 30 minutes from Bali."
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTinyMCE name="content" />
                                            </GeneralRowForm>
                                        </WrapFormContext>
                                    </CardDropdown>

                                    <SectionFormSEOInfo
                                        classNameColumn="col-md-12"
                                        __formRequest={__formRequest}
                                        __handleChangeWithParent={
                                            __handleChangeWithParent
                                        }

                                        // SEO Thumbnail
                                        __seoThumbnail={__seoThumbnail}
                                        __setSetSEOThumbnail={
                                            __setSetSEOThumbnail
                                        }
                                        __handleSEOThumbnailRemove={
                                            __handleSEOThumbnailRemove
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <WrapFormContext
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                    }}>
                                    <Card title="Other Information">
                                        <div className="">
                                            {__previewThumbnail ? (
                                                <>
                                                    <div className="pb-3">
                                                        <p className="mb-2 text-neutral-100">
                                                            Thumbnail
                                                        </p>

                                                        <PreviewFileModalLogic
                                                            dataUrl={__previewThumbnail?.toString()}
                                                            dataBy="file"
                                                            dataFile={
                                                                __previewThumbnail
                                                            }
                                                            isShowBtnRemove
                                                            actions={{
                                                                remove: __handleThumbnailRemove,
                                                            }}
                                                            classNameWidth="w-100 max-h-148px"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <FormUploadFile
                                                    label="Thumbnail"
                                                    name="thumbnail"
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
                                                                    'thumbnail',
                                                                    newFiles,
                                                                )
                                                            }

                                                            img.src = objectUrl
                                                        },
                                                        handleDataFiles: (
                                                            newDataFiles,
                                                        ) => {
                                                            __setPreviewThumbnail(
                                                                newDataFiles.url,
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}

                                            <FormRadioButtonMulti
                                                label="Status Active"
                                                name="isActive"
                                                className="mb-0"
                                                required
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
                                        </div>
                                    </Card>
                                </WrapFormContext>
                            </div>
                        </div>

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

export default ContentOfferMainForm
