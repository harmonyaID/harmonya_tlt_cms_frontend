import useContentBlogMainForm from '@/page/contentBlog/hook/useContentBlogMainForm.hook.ts'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import boatPath from '@/path/boat.path.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import Card from '@/component/card/Card.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import SelectOptionBlogCategory from '@/common/dataForm/SelectOptionBlogCategory.tsx'
import SelectOptionBlogTag from '@/common/dataForm/SelectOptionBlogTag.tsx'
import { isArray, isObject } from 'lodash'
import { BtnCircleRemove } from '@/component/general/Button.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextEditor from '@/component/form/FormTextEditor.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'

const ContentBlogMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __handleChange,
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
                                <div className="vstack gap-3">
                                    <Card title="Blog Information">
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
                                                    disabled
                                                    readOnly
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
                                    </Card>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <WrapFormContext
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                        changeTags: (data) =>
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
                                                nameOfChange="changeTags"
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
                                            />
                                            {__listTags?.length ? (
                                                <>
                                                    <p className="fs-12 mb-2 fw-600">
                                                        Total Tags :{' '}
                                                        {__listTags.length}
                                                    </p>
                                                    <div className="mb-4 max-h-120-px bg-neutral-600 px-3 pb-3 rounded-2 overflow-auto">
                                                        {__listTags.map(
                                                            (tag, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="border-dashed border-neutral-400 border-1 pb-2 d-flex pt-3">
                                                                        <div className="w-100">
                                                                            {
                                                                                tag.name
                                                                            }
                                                                        </div>
                                                                        <BtnCircleRemove
                                                                            className="ms-auto"
                                                                            actions={{
                                                                                remove: () =>
                                                                                    __handleTagRemove(
                                                                                        tag,
                                                                                    ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                )
                                                            },
                                                        )}
                                                    </div>
                                                </>
                                            ) : null}
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
