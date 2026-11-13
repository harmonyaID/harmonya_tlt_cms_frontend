import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import SelectBaseOptionFAQType from '@/common/dataForm/SelectBaseOptionFAQType.tsx'
import LabelForm from '@/component/form/LabelForm.tsx'
import PageAboutUsPostForm from '@/page/contentAllPages/component/PageAboutUsPostForm.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import IslandGuidesMultiImageForm from '@/page/contentAllPages/component/IslandGuidesMultiImageForm.tsx'

const PageTemplateIslandGuideAboutTheIsland = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2, SECTION3, SECTION4, SECTION5 } = formContent

    const _handleAddSection2MultiImage = () => {
        const updated = [
            ...SECTION2.images,
            {
                image: '',
            },
        ]

        actions.change('SECTION2.images', updated)
    }

    const _handleRemoveSection2MultiImage = (idx) => {
        const updated = SECTION2.images.filter((_, i) => i !== idx)

        actions.change('SECTION2.images', updated)
    }

    const _handleAddSection3List = () => {
        const updated = [
            ...SECTION3.list,
            {
                title: '',
                description: '', //text editor
            },
        ]

        actions.change('SECTION3.list', updated)
    }

    const _handleRemoveSection3List = (idx) => {
        const updated = SECTION3.list.filter((_, i) => i !== idx)

        actions.change('SECTION3.list', updated)
    }

    const _handleAddSection3FunFact = () => {
        const updated = [
            ...SECTION3.funFacts,
            {
                image: '',
                title: '',
                description: '',
            },
        ]

        actions.change('SECTION3.funFacts', updated)
    }

    const _handleRemoveSection3FunFact = (idx) => {
        const updated = SECTION3.funFacts.filter((_, i) => i !== idx)

        actions.change('SECTION3.funFacts', updated)
    }

    const _handleAddSection4VSContent = () => {
        const updated = [
            ...SECTION4.vsContents,
            {
                image: '',
                title: '',
                subTitle: '',
                description: '',
            },
        ]

        actions.change('SECTION4.vsContents', updated)
    }

    const _handleRemoveSection4VSContent = (idx) => {
        const updated = SECTION4.vsContents.filter((_, i) => i !== idx)

        actions.change('SECTION4.vsContents', updated)
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
                            placeholder="e.g Island Guide"
                        />
                        <FormTextArea
                            name="description"
                            label="Description"
                            value={SECTION2?.description || ''}
                            placeholder="e.g Island Guide"
                        />
                        <div className="mt-3">
                            <LabelForm label="Images" />
                            <div className="row g-3">
                                {SECTION2?.images?.map((image, index) => (
                                    <div className="col-md-6" key={index}>
                                        <IslandGuidesMultiImageForm
                                            form={image}
                                            isUseImage
                                            actions={{
                                                onChange: (vm) =>
                                                    actions.change(
                                                        `SECTION2.images[${index}]`,
                                                        vm,
                                                    ),
                                                onRemove: () =>
                                                    _handleRemoveSection2MultiImage(
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
                                handle={() => _handleAddSection2MultiImage()}>
                                Add New Image
                            </BtnPrimary>
                        </div>
                        <FormUploadFile
                            name="mapImage"
                            isUseHook={false}
                            label="Map Image"
                            classNameLayoutImage="col-md-5"
                            value={SECTION2?.mapImage}
                            actions={{
                                onChange: (name, value) =>
                                    actions.change('SECTION2.' + name, value),
                            }}
                        />
                        <FormInput
                            label="Map Title"
                            name="mapTitle"
                            value={SECTION2?.mapTitle || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="Map Size"
                            name="mapSize"
                            value={SECTION2?.mapSize || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="Map Distance"
                            name="mapDistance"
                            value={SECTION2?.mapDistance || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="Map Village"
                            name="mapVillage"
                            value={SECTION2?.mapVillage || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="Map Island Speciality"
                            name="mapIslandSpeciality"
                            value={SECTION2?.mapIslandSpeciality || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="Map Best Season"
                            name="mapBestSeason"
                            value={SECTION2?.mapBestSeason || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="Map Population"
                            name="mapPopulation"
                            value={SECTION2?.mapPopulation || ''}
                            placeholder="e.g Island Guide"
                        />
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
                            placeholder="e.g Island Guide"
                        />
                        <FormTinyMCE
                            name="description"
                            label="Description"
                            value={SECTION3?.description || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormUploadFile
                            name="image"
                            isUseHook={false}
                            label="Image"
                            classNameLayoutImage="col-md-5"
                            value={SECTION3?.image}
                            actions={{
                                onChange: (name, value) =>
                                    actions.change('SECTION3.' + name, value),
                            }}
                        />
                        <div className="mt-3">
                            <LabelForm label="List" />
                            <div className="row g-3">
                                {SECTION3?.list?.map((vm, index) => (
                                    <div className="col-md-6" key={index}>
                                        <IslandGuidesMultiImageForm
                                            form={vm}
                                            isUseText
                                            actions={{
                                                onChange: (vm) =>
                                                    actions.change(
                                                        `SECTION3.list[${index}]`,
                                                        vm,
                                                    ),
                                                onRemove: () =>
                                                    _handleRemoveSection3List(
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
                                handle={() => _handleAddSection3List()}>
                                Add New List
                            </BtnPrimary>
                        </div>
                        <FormInput
                            label="Fun Fact Title"
                            name="funFactTitle"
                            value={SECTION2?.funFactTitle || ''}
                            placeholder="e.g Island Guide"
                        />
                        <div className="mt-3">
                            <LabelForm label="Fun Facts" />
                            <div className="row g-3">
                                {SECTION3?.funFacts?.map((funFact, index) => (
                                    <div className="col-md-6" key={index}>
                                        <IslandGuidesMultiImageForm
                                            form={funFact}
                                            isUseText
                                            isUseImage
                                            actions={{
                                                onChange: (vm) =>
                                                    actions.change(
                                                        `SECTION3.funFacts[${index}]`,
                                                        vm,
                                                    ),
                                                onRemove: () =>
                                                    _handleRemoveSection3FunFact(
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
                                handle={() => _handleAddSection3FunFact()}>
                                Add New Fun Fact
                            </BtnPrimary>
                        </div>
                    </WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 4">
                    <WrapFormContext
                        formRequest={SECTION4}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION4.' + name, value),
                        }}>
                        <FormInput
                            label="VS Title"
                            name="vsTitle"
                            value={SECTION4?.vsTitle || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormTinyMCE
                            name="vsDescription"
                            label="VS Description"
                            value={SECTION4?.vsDescription || ''}
                            placeholder="e.g Island Guide"
                        />
                        <div className="mt-3">
                            <LabelForm label="VS Contents" />
                            <div className="row g-3">
                                {SECTION4?.vsContents?.map((funFact, index) => (
                                    <div className="col-md-6" key={index}>
                                        <IslandGuidesMultiImageForm
                                            form={funFact}
                                            isUseText
                                            isUseImage
                                            isUseSubTitle
                                            actions={{
                                                onChange: (vm) =>
                                                    actions.change(
                                                        `SECTION4.vsContents[${index}]`,
                                                        vm,
                                                    ),
                                                onRemove: () =>
                                                    _handleRemoveSection4VSContent(
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
                                handle={() => _handleAddSection4VSContent()}>
                                Add New Content
                            </BtnPrimary>
                        </div>
                    </WrapFormContext>
                </GeneralRowForm>

                <GeneralRowForm label="Section 5">
                    <WrapFormContext
                        formRequest={SECTION5}
                        actions={{
                            change: (name, value) =>
                                actions.change('SECTION5.' + name, value),
                        }}>
                        <FormInput
                            label="Title"
                            name="title"
                            value={SECTION5?.title || ''}
                            placeholder="e.g Island Guide"
                        />
                        <FormInput
                            label="FAQ Title"
                            name="FAQTitle"
                            value={SECTION2?.FAQTitle || ''}
                            placeholder="e.g Island Guide"
                        />
                        <SelectBaseOptionFAQType
                            label="FAQ Type"
                            name="FAQTypeId"
                            isRequired
                        />
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateIslandGuideAboutTheIsland
