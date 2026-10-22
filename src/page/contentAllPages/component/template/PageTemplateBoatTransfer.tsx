import SelectBaseOptionFAQType from '@/common/dataForm/SelectBaseOptionFAQType.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import WFSectionTitleAndBackground from '@/page/contentAllPages/component/widgetForm/WFSectionTitleAndBackground.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import SelectOptionBoatType from '@/common/dataForm/SelectOptionBoatType.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const PageTemplateBoatTransfer = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const { SECTION1, SECTION2, SECTION3 } = formContent

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
                        <FormTextArea
                            name="subTitle"
                            label="Sub Title"
                            value={SECTION2?.subTitle || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <SelectOptionBoatType
                            name="boatTypeId"
                            label="Boat Type"
                            id="SECTION2.boatTypeId"
                            isUseHook={false}
                            value={Number(SECTION2?.boatTypeId)}
                            actions={{
                                onChange: (name, value) =>
                                    actions.change('SECTION2.' + name, value),
                            }}
                        />
                        <FormInput
                            label="Promo Label"
                            name="bannerPromoLabel"
                            value={SECTION2?.bannerPromoLabel || ''}
                            placeholder="e.g 20%"
                        />
                        <FormUploadFile
                            label="Promo Image"
                            {...defaultUploadFileProps}
                            isUseHook={false}
                            accept="image/*"
                            required
                            name="bannerPromoImage"
                            value={SECTION2?.bannerPromoImage || ''}
                            actions={{
                                onChange: (name, newFiles) => {
                                    actions.change('SECTION2.' + name, newFiles)
                                },
                            }}
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
                            placeholder="e.g Boat Transfer"
                        />
                        <FormTextArea
                            name="subTitle"
                            label="Sub Title"
                            value={SECTION3?.subTitle || ''}
                            placeholder="e.g Boat Transfer"
                        />
                        <SelectOptionBoatType
                            name="boatTypeId"
                            id="SECTION3.boatTypeId"
                            label="Boat Type"
                            isUseHook={false}
                            value={Number(SECTION3?.boatTypeId)}
                            actions={{
                                onChange: (name, value) =>
                                    actions.change('SECTION3.' + name, value),
                            }}
                        />
                    </WrapFormContext>
                </GeneralRowForm>
            </div>
        </>
    )
}

export default PageTemplateBoatTransfer
