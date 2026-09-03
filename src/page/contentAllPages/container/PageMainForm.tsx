import { isEmpty } from 'lodash'
import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import SelectBaseOptionLanguage from '@/common/dataForm/SelectBaseOptionLanguage.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import PageSelectStatus from '@/page/contentAllPages/component/PageSelectStatus.tsx'
import usePageMainFormHook from '@/page/contentAllPages/hook/usePageMainForm.hook.ts'
import contentAllPagesPath from '@/path/contentAllPages.path.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'

const PageMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __detail,
        __pageStateDataSearch,
        __handleChange,
        __handleChangeWithParent,
        __handleSectionInput,
        __handleSectionRemoveNested,

        // SEO Thumbnail
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // Form
        __handleSubmit,
        __handleCancel,
    } = usePageMainFormHook({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Page', {
                        url: contentAllPagesPath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {(__isLoadingDetail || isEmpty(__detail)) && isEdit ? (
                <LoadingNotAvailable
                    isLoading={__isLoadingDetail}
                    isNotFound={isEmpty(__detail)}
                />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}>
                        <WrapFormContext
                            formRequest={__formRequest}
                            actions={{
                                change: (name, value) =>
                                    __handleSectionInput(name, value),
                            }}>
                            <div className="vstack gap-3">
                                <CardDropdown
                                    title="Main Form"
                                    isShow
                                    id="section-main-form">
                                    <GeneralRowForm label="Title" isRequired>
                                        <FormInput
                                            name="title"
                                            required
                                            // value={__formRequest.title}
                                            placeholder="e.g About"
                                            // actions={{
                                            //     onChange: (
                                            //         name,
                                            //         value,
                                            //     ) =>
                                            //         __handleChangeTitle(
                                            //             value,
                                            //         ),
                                            // }}
                                        />
                                    </GeneralRowForm>

                                    <GeneralRowForm label="Locale" isRequired>
                                        <SelectBaseOptionLanguage
                                            name="locale"
                                            isRequired
                                        />
                                    </GeneralRowForm>

                                    <GeneralRowForm label="Status" isRequired>
                                        <PageSelectStatus
                                            name="status"
                                            required
                                        />
                                    </GeneralRowForm>

                                    {/*<GeneralRowForm*/}
                                    {/*    label="Description"*/}
                                    {/*    isRequired>*/}
                                    {/*    <FormTextArea*/}
                                    {/*        name="description"*/}
                                    {/*        placeholder="e.g About"*/}
                                    {/*        required*/}
                                    {/*    />*/}
                                    {/*</GeneralRowForm>*/}

                                    <GeneralRowForm
                                        label="Short Description"
                                        isRequired>
                                        <FormTextArea
                                            name="shortDescription"
                                            placeholder="e.g About"
                                            required
                                        />
                                    </GeneralRowForm>

                                    <GeneralRowForm
                                        label="Content"
                                        isRequired
                                        // classNameColumnLabel="col-md-12 pb-3"
                                        // classNameColumnChild="col-md-12"
                                    >
                                        {/*<WrapFormContext*/}
                                        {/*    formRequest={__formRequest.value}*/}
                                        {/*    actions={{*/}
                                        {/*        change: (name, value) =>*/}
                                        {/*            __handleSectionInput(*/}
                                        {/*                name,*/}
                                        {/*                value,*/}
                                        {/*            ),*/}
                                        {/*    }}>*/}
                                        {/*</WrapFormContext>*/}

                                        <FormTinyMCE
                                            name="content"
                                            value={__formRequest?.content || ''}
                                            isUseHook={false}
                                            required
                                            actions={{
                                                onChange: (
                                                    passName,
                                                    passValue,
                                                ) =>
                                                    __handleSectionInput(
                                                        passName,
                                                        passValue,
                                                    ),
                                            }}
                                        />
                                    </GeneralRowForm>
                                </CardDropdown>

                                {/*SEO FORM*/}
                                <SectionFormSEOInfo
                                    classNameColumn="col-12"
                                    __formRequest={__formRequest}
                                    __handleChangeWithParent={
                                        __handleChangeWithParent
                                    }

                                    // SEO Thumbnail
                                    __seoThumbnail={__seoThumbnail}
                                    __setSetSEOThumbnail={__setSetSEOThumbnail}
                                    __handleSEOThumbnailRemove={
                                        __handleSEOThumbnailRemove
                                    }
                                />
                            </div>
                        </WrapFormContext>

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() => __handleCancel()}
                        />
                    </FormWrap>
                </>
            )}
        </>
    )
}

export default PageMainForm
