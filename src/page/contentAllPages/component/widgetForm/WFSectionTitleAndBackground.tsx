import FormInput from '@/component/form/FormInput.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import { defaultUploadFileProps } from '@/page/contentAllPages/param/configThemeProps.param.ts'

const WFSectionTitleAndBackground = ({
    label,
    formContent,
    sectionKey = '',
    titlePlaceholder = 'e.g Offers',
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    const _handleName = (name: string) => {
        return sectionKey ? sectionKey + '.' + name : name
    }

    return (
        <GeneralRowForm label={label}>
            <WrapFormContext
                formRequest={formContent}
                actions={{
                    change: (name, value) =>
                        actions.change(_handleName(name), value),
                }}>
                <FormInput
                    label="Title"
                    name="title"
                    value={formContent?.title || ''}
                    required
                    placeholder={titlePlaceholder}
                />

                <FormUploadFile
                    label="Background Image"
                    {...defaultUploadFileProps}
                    isUseHook={false}

                    accept="image/*"
                    required
                    name="backgroundImage"
                    value={formContent?.backgroundImage || ''}
                    actions={{
                        onChange: (_, newFiles) => {
                            actions.change(
                                _handleName('backgroundImage'),
                                newFiles,
                            )
                        },
                    }}
                />
            </WrapFormContext>
        </GeneralRowForm>
    )
}

export default WFSectionTitleAndBackground
