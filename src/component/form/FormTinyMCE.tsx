import { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import 'tinymce/tinymce'
import 'tinymce/models/dom/model'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/skins/ui/oxide/skin'
import 'tinymce/skins/content/default/content'
import 'tinymce/skins/ui/oxide/content'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/media'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/help'
// Include resources that a plugin lazy-loads at the run-time
import 'tinymce/plugins/help/js/i18n/keynav/en'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import { isEmpty } from 'lodash'
import CustomCSS from '@/asset/theme/custom/_tinymce-editor.scss?url'
import { FormInputProps } from '@/component/form/type/componentForm.type.ts'
import { useHookContextForm } from '@/context/Form.context.tsx'
import useComponentInputConfigHook from '@/hook/base/useComponentInputConfig.hook.ts'

const FormTinyMCE = ({
    placeholder = 'Write your content here...',
    height = 500,
    isUseHook = true,
    isSimple = false,
    ...props
}: FormInputProps & {
    height?: number
    isUseHook?: boolean
    isSimple?: boolean
}) => {
    const ctx = useHookContextForm()
    const [initialValue, setInitialValue] = useState('')

    const { dataValue } = useComponentInputConfigHook(
        ctx,
        props?.actions?.onChange || null,
        props.name,
        props.value,
    )

    const editorRef = useRef(null)

    const _handleChange = (content: string) => {
        if (!isEmpty(ctx.__value) && isUseHook) {
            ctx.__handleChange(props.name, content || '')
        } else {
            props.actions?.onChange?.(props.name, content)
        }
    }

    // useEffect(() => {
    //     setInitialValue(dataValue)
    // }, [])

    return isSimple ? (
        <Editor
            licenseKey="gpl"
            onInit={(_, editor) => (editorRef.current = editor)}
            // initialValue={initialValue}
            initialValue={dataValue}
            onEditorChange={_handleChange}
            init={{
                height: 200,
                menubar: false,
                plugins: 'lists link',
                toolbar:
                    'bold italic underline strikethrough | bullist numlist | link | undo redo',
                branding: false,
                statusbar: false,
                resize: false,
                placeholder: placeholder,
            }}
        />
    ) : (
        <Editor
            licenseKey="gpl"
            onInit={(_, editor) => (editorRef.current = editor)}
            initialValue={initialValue}
            onEditorChange={_handleChange}
            init={{
                height: height,
                menubar: true,
                promotion: false,
                branding: false,
                statusbar: false,
                file_picker_types: 'image',
                help_accessibility: false,
                placeholder: placeholder,

                plugins: [
                    'advlist',
                    'autolink',
                    'lists',
                    'link',
                    'image',
                    'charmap',
                    'anchor',
                    'searchreplace',
                    'visualblocks',
                    'code',
                    'fullscreen',
                    'insertdatetime',
                    'media',
                    'table',
                    'preview',
                    'help',
                    'wordcount',
                ],

                toolbar:
                    'undo redo | blocks | fontfamily | styles ' +
                    'bold italic forecolor backcolor | ' +
                    'alignleft aligncenter alignright alignjustify | ' +
                    'bullist numlist outdent indent | ' +
                    'link image media | ',
                block_formats:
                    'Paragraph=p;' +
                    'Heading 1=h1;' +
                    'Heading 2=h2;' +
                    'Heading 3=h3;' +
                    'Heading 4=h4;' +
                    'Heading 4=h5;' +
                    'Heading 4=h6;' +
                    'Quote=blockquote;' +
                    'Preformatted=pre',
                table_header_type: 'sectionCells',

                file_picker_callback: (callback) => {
                    const input = document.createElement('input')

                    input.type = 'file'
                    input.accept = 'image/*'

                    input.onchange = () => {
                        const file = input.files?.[0]
                        if (!file) return

                        const reader = new FileReader()

                        reader.onload = () => {
                            callback(reader.result as string, {
                                alt: file.name,
                            })
                        }

                        reader.readAsDataURL(file)
                    }

                    input.click()
                },

                content_css: CustomCSS,

                font_formats:
                    'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',

                style_formats: [
                    {
                        title: 'Info',
                        block: 'div',
                        classes: 'info-block',
                        wrapper: true,
                        preview: 'Info',
                    },
                    {
                        title: 'Warning',
                        block: 'div',
                        classes: 'warning-block',
                        wrapper: true,
                        preview: 'Warning',
                    },
                    {
                        title: 'Danger',
                        block: 'div',
                        classes: 'danger-block',
                        wrapper: true,
                        preview: 'Danger',
                    },
                ],
            }}
        />
    )
}

export default FormTinyMCE
