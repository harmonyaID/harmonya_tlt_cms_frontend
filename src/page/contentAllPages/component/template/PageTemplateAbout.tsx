import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'

const PageTemplateAbout = ({
    formContent,
    actions = {
        change: (name, value) => {},
    },
}: any) => {
    return (
        <>
            <WrapFormContext
                formRequest={formContent}
                actions={{
                    change: (name, value) => actions.change(name, value),
                }}>
                <GeneralRowForm label="Video Thumbnail" isRequired>
                    {/*<FormUploadFile*/}
                    {/*    // Default*/}
                    {/*    {...defaultPropsFile}*/}

                    {/*    accept="image/*"*/}
                    {/*    required*/}
                    {/*    name="videoThumbnail"*/}
                    {/*    value={*/}
                    {/*        SECTION1.videoThumbnail*/}
                    {/*    }*/}
                    {/*    actions={{*/}
                    {/*        onChange: (*/}
                    {/*            _,*/}
                    {/*            newFiles,*/}
                    {/*        ) => {*/}
                    {/*            __handleUploadFile(*/}
                    {/*                'SECTION1',*/}
                    {/*                'videoThumbnail',*/}
                    {/*                newFiles,*/}
                    {/*            )*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*/>*/}
                </GeneralRowForm>
            </WrapFormContext>
        </>
    )
}

export default PageTemplateAbout
