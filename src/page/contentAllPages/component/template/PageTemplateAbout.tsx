import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import PageAboutUsPostForm from '@/page/contentAllPages/component/PageAboutUsPostForm.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import LabelForm from '@/component/form/LabelForm.tsx'
import PageAboutUsSubsectionForm from '@/page/contentAllPages/component/PageAboutUsSubsectionForm.tsx'

const PageTemplateAbout = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2, SECTION3, SECTION4 } = formContent

    const _handleAddSection2Post = () => {
        const updated = [
            ...SECTION2.posts,
            {
                image: '',
                year: '',
                description: '',
            },
        ]

        actions.change('SECTION2.posts', updated)
    }

    const _handleRemoveSection2Post = (idx) => {
        const updated = SECTION2.posts.filter((_, i) => i !== idx)

        actions.change('SECTION2.posts', updated)
    }

    return (
        <>
            <div className="vstack gap-3">
                <WFSectionTitleAndBackground
                    label="Section 1"
                    formContent={SECTION1}
                    sectionKey="SECTION1"
                    titlePlaceholder="e.g FAQ"
                    actions={{ ...actions }}
                />

                <GeneralRowForm label="Section 2">
                    <WrapFormContext
                        formRequest={SECTION2}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION2.' + name, value),
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION2?.title || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTinyMCE
                            name="description"
                            label="Description"
                            value={SECTION2?.description || ''}
                            placeholder="e.g Boat Transfer"
                            actions={{
                                onChange: (name, value) =>
                                    actions.change('SECTION2.' + name, value),
                            }}
                        />

                        <div className="mt-3">
                            <LabelForm label="Posts" />
                            <div className="row g-3">
                                {SECTION2?.posts?.map((post, index) => (
                                    <div className="col-md-6" key={index}>
                                        <PageAboutUsPostForm
                                            post={post}
                                            actions={{
                                                onChange: (vm) =>
                                                    actions.change(
                                                        `SECTION2.posts[${index}]`,
                                                        vm,
                                                    ),
                                                onRemove: () =>
                                                    _handleRemoveSection2Post(
                                                        index,
                                                    ),
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                            <BtnPrimary
                                type="button"
                                isOutline
                                className="w-100 mb-3"
                                handle={() => _handleAddSection2Post()}>
                                Add New Post
                            </BtnPrimary>
                        </div>
                    </WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 3">
                    <WrapFormContext
                        formRequest={SECTION3}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION3.' + name, value),
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION3?.title || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTextArea
                            name="subTitle"
                            label="Sub Title"
                            value={SECTION3?.subTitle || ''}
                            placeholder="e.g Boat Transfer"
                        />

                        <div className="mt-3">
                            <PageAboutUsSubsectionForm
                                subSection={SECTION3?.SubSection1}
                                label="Sub Section 1"
                                actions={{
                                    onChange: (vm) =>
                                        actions.change(
                                            'SECTION3.SubSection1',
                                            vm,
                                        ),
                                }}
                            />
                        </div>
                        <div className="mt-3">
                            <PageAboutUsSubsectionForm
                                subSection={SECTION3?.SubSection2}
                                label="Sub Section 2"
                                actions={{
                                    onChange: (vm) =>
                                        actions.change(
                                            'SECTION3.SubSection2',
                                            vm,
                                        ),
                                }}
                            />
                        </div>
                        <div className="mt-3">
                            <PageAboutUsSubsectionForm
                                subSection={SECTION3?.SubSection3}
                                label="Sub Section 3"
                                isUseFile
                                actions={{
                                    onChange: (vm) =>
                                        actions.change(
                                            'SECTION3.SubSection3',
                                            vm,
                                        ),
                                }}
                            />
                        </div>
                    </WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 4">
                    <WrapFormContext
                        formRequest={SECTION4 || { title: '', subTitle: '' }}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION4.' + name, value),
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION4?.title || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTextArea
                            name="subTitle"
                            label="Sub Title"
                            value={SECTION4?.subTitle || ''}
                            placeholder="e.g Boat Transfer"
                        />
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateAbout
