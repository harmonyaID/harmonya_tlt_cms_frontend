import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import SelectOptionBlogCategory from '@/common/dataForm/SelectOptionBlogCategory.tsx'
import SelectOptionBlogTag from '@/common/dataForm/SelectOptionBlogTag.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import JsonEditorForm from '@/component/form/FormJsonEditor.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTextEditor from '@/component/form/FormTextEditor.tsx'
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

const ContentBlogMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __handleChange,
        __handleChangeWithParent,
        __handleArrAddMulti,
        __handleChangeTitle,
        __handleTagChoose,
        __handleTagRemove,

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
    } = useContentBlogMainForm({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Blog', {
                        url: contentBlogPath.main,
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
                                        title="Blog Information"
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
                                                label="Excerpt"
                                                isRequired>
                                                <FormTextArea
                                                    name="excerpt"
                                                    required
                                                    placeholder="e.g Nusa Lembongan is a stunning island just 30 minutes from Bali."
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        __formRequest.content
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
                                                    required
                                                />
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

                                    {/*<CardDropdown*/}
                                    {/*    title="SEO Information"*/}
                                    {/*    isShow>*/}
                                    {/*    <SEOPreviewPublic*/}
                                    {/*        title={*/}
                                    {/*            __formRequest?.seo?.title || ''*/}
                                    {/*        }*/}
                                    {/*        description={*/}
                                    {/*            __formRequest?.seo*/}
                                    {/*                ?.description || ''*/}
                                    {/*        }*/}

                                    {/*        className="mb-4"*/}
                                    {/*    />*/}

                                    {/*    <WrapFormContext*/}
                                    {/*        formRequest={__formRequest.seo}*/}
                                    {/*        actions={{*/}
                                    {/*            change: (name, value) =>*/}
                                    {/*                __handleChangeWithParent(*/}
                                    {/*                    name,*/}
                                    {/*                    value,*/}
                                    {/*                    'seo',*/}
                                    {/*                ),*/}
                                    {/*        }}>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Meta Title"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormInput*/}
                                    {/*                name="title"*/}
                                    {/*                required*/}
                                    {/*                value={*/}
                                    {/*                    __formRequest.seo.title*/}
                                    {/*                }*/}
                                    {/*                placeholder="e.g Best Beach Clubs in Nusa Lembongan"*/}
                                    {/*                actions={{*/}
                                    {/*                    onChange: (*/}
                                    {/*                        name,*/}
                                    {/*                        value,*/}
                                    {/*                    ) => {*/}
                                    {/*                        __handleChangeWithParent(*/}
                                    {/*                            name,*/}
                                    {/*                            value,*/}
                                    {/*                            'seo',*/}
                                    {/*                        )*/}
                                    {/*                        __handleChangeWithParent(*/}
                                    {/*                            'info',*/}
                                    {/*                            value,*/}
                                    {/*                            'seo',*/}
                                    {/*                        )*/}
                                    {/*                        // __handleChangeWithParent(*/}
                                    {/*                        //     'slug',*/}
                                    {/*                        //     textSlug(value),*/}
                                    {/*                        //     'seo',*/}
                                    {/*                        // )*/}
                                    {/*                    },*/}
                                    {/*                }}*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Meta Slug"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormInput*/}
                                    {/*                name="slug"*/}
                                    {/*                required*/}
                                    {/*                placeholder="e.g best-beach-clubs-in-nusa-lembongan"*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Meta Canonical Url"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormInput*/}
                                    {/*                name="canonicalUrl"*/}
                                    {/*                required*/}
                                    {/*                placeholder="e.g https://www.thelembongantraveller.com/nusa-lembongan/"*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Meta Description"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormTextArea*/}
                                    {/*                name="description"*/}
                                    {/*                required*/}
                                    {/*                placeholder="e.g Best Beach Clubs in Nusa Lembongan"*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Meta Keyword"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormTextArea*/}
                                    {/*                name="metaKeyword"*/}
                                    {/*                required*/}
                                    {/*                placeholder="e.g the lembongan traveller, explore bali, lembongan bali"*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Meta Image"*/}
                                    {/*            isRequired>*/}
                                    {/*            {__seoThumbnail ? (*/}
                                    {/*                <>*/}
                                    {/*                    <div className="pb-3P">*/}
                                    {/*                        <PreviewFileModalLogic*/}
                                    {/*                            dataUrl={__seoThumbnail?.toString()}*/}
                                    {/*                            dataBy="file"*/}
                                    {/*                            dataFile={*/}
                                    {/*                                __seoThumbnail*/}
                                    {/*                            }*/}
                                    {/*                            isShowBtnRemove*/}
                                    {/*                            actions={{*/}
                                    {/*                                remove: __handleSEOThumbnailRemove,*/}
                                    {/*                            }}*/}
                                    {/*                            classNameWidth="w-100 max-h-148px"*/}
                                    {/*                        />*/}
                                    {/*                    </div>*/}
                                    {/*                </>*/}
                                    {/*            ) : (*/}
                                    {/*                <FormUploadFile*/}
                                    {/*                    // label="Thumbnail"*/}
                                    {/*                    name="thumbnail"*/}
                                    {/*                    required*/}
                                    {/*                    isUseHook={false}*/}
                                    {/*                    isPreview={false}*/}
                                    {/*                    accept="image/*"*/}
                                    {/*                    actions={{*/}
                                    {/*                        onChange: (*/}
                                    {/*                            _,*/}
                                    {/*                            newFiles,*/}
                                    {/*                        ) => {*/}
                                    {/*                            const img =*/}
                                    {/*                                new Image()*/}
                                    {/*                            const objectUrl =*/}
                                    {/*                                URL.createObjectURL(*/}
                                    {/*                                    newFiles,*/}
                                    {/*                                )*/}

                                    {/*                            img.onload =*/}
                                    {/*                                () => {*/}
                                    {/*                                    __handleChangeWithParent(*/}
                                    {/*                                        'thumbnail',*/}
                                    {/*                                        newFiles,*/}
                                    {/*                                        'seo',*/}
                                    {/*                                    )*/}
                                    {/*                                }*/}

                                    {/*                            img.src =*/}
                                    {/*                                objectUrl*/}
                                    {/*                        },*/}
                                    {/*                        handleDataFiles: (*/}
                                    {/*                            newDataFiles,*/}
                                    {/*                        ) => {*/}
                                    {/*                            __setSetSEOThumbnail(*/}
                                    {/*                                newDataFiles.url,*/}
                                    {/*                            )*/}
                                    {/*                        },*/}
                                    {/*                    }}*/}
                                    {/*                />*/}
                                    {/*            )}*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Robot Index"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormRadioButtonMulti*/}
                                    {/*                name="robotIndex"*/}
                                    {/*                className="mb-0"*/}
                                    {/*                required*/}
                                    {/*                checkBoxs={[*/}
                                    {/*                    {*/}
                                    {/*                        defaultValue: 0,*/}
                                    {/*                        label: 'No',*/}
                                    {/*                    },*/}
                                    {/*                    {*/}
                                    {/*                        defaultValue: 1,*/}
                                    {/*                        label: 'Yes',*/}
                                    {/*                    },*/}
                                    {/*                ]}*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}
                                    {/*        <GeneralRowForm*/}
                                    {/*            label="Robot Follow"*/}
                                    {/*            isRequired>*/}
                                    {/*            <FormRadioButtonMulti*/}
                                    {/*                name="robotFollow"*/}
                                    {/*                className="mb-0"*/}
                                    {/*                required*/}
                                    {/*                checkBoxs={[*/}
                                    {/*                    {*/}
                                    {/*                        defaultValue: 0,*/}
                                    {/*                        label: 'No',*/}
                                    {/*                    },*/}
                                    {/*                    {*/}
                                    {/*                        defaultValue: 1,*/}
                                    {/*                        label: 'Yes',*/}
                                    {/*                    },*/}
                                    {/*                ]}*/}
                                    {/*            />*/}
                                    {/*        </GeneralRowForm>*/}

                                    {/*        <JsonEditorForm*/}
                                    {/*            name="schemaMarkup"*/}
                                    {/*            label="Schema Markup"*/}
                                    {/*            secondLabel="SEO Meta AI Schema Markup"*/}
                                    {/*            value={*/}
                                    {/*                __formRequest.seo.schemaMarkup*/}
                                    {/*            }*/}
                                    {/*            onChange={(name, value) =>*/}
                                    {/*                __handleChangeWithParent(*/}
                                    {/*                    name,*/}
                                    {/*                    value,*/}
                                    {/*                    'seo',*/}
                                    {/*                )*/}
                                    {/*            }*/}
                                    {/*            isRequired*/}
                                    {/*        />*/}
                                    {/*    </WrapFormContext>*/}
                                    {/*</CardDropdown>*/}
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <WrapFormContext
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                        changeTags: (name, value, data) =>
                                            __handleTagChoose(data),
                                        changeTagsOld: (data) =>
                                            __handleTagChoose(data),
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

                                            <SelectOptionBlogCategory
                                                label="Category"
                                                name="categoryId"
                                                required
                                                isUseHook
                                                ids={[
                                                    ...(__formRequest.categoryId
                                                        ? [
                                                              __formRequest.categoryId,
                                                          ]
                                                        : []),
                                                ]}
                                            />

                                            <SelectOptionBlogTag
                                                label="Tags"
                                                name="tagIds"
                                                nameOfChange="changeTagsOld"
                                                required={
                                                    __formRequest?.tagIds
                                                        ?.length
                                                        ? false
                                                        : true
                                                }
                                                isUseHook
                                                isOnlyChoose
                                                isMulti
                                                isClearable
                                                ids={
                                                    __formRequest?.tagIds
                                                        ? __formRequest.tagIds
                                                        : []
                                                }

                                                // Layout Only Choose
                                                dataList={__listTags}
                                                dataActions={{
                                                    remove: __handleTagRemove,
                                                }}
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

export default ContentBlogMainForm
