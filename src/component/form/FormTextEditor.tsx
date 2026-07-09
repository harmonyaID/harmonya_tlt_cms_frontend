import { FC, useEffect, useRef } from 'react'
import Quill from 'quill'
import LabelForm from './LabelForm'
import { FormTextEditorProps } from '@/component/form/type/formTextEditor.type.ts'

const FormTextEditor = ({
    label,
    value,
    readOnly = false,
    placeholder = 'Write something...',
    required = false,
    actions = {
        onChange: () => {},
    },
}: FormTextEditorProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const quillRef = useRef<Quill | null>(null)

    useEffect(() => {
        if (!containerRef.current) return

        // Prevent re-initialization
        if (quillRef.current) return

        // Create editor container
        const editorEl = document.createElement('div')
        containerRef.current.appendChild(editorEl)

        // Initialize Quill
        const quill = new Quill(editorEl, {
            theme: 'snow',
            readOnly,
            placeholder,
            modules: {
                toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block'],
                    [{ align: [] }],
                    ['link', 'image', 'video'],
                    ['clean'],
                ],
            },
        })

        // Set initial content
        quill.root.innerHTML = value

        // Handle text changes
        quill.on('text-change', () => {
            const html = quill.root.innerHTML
            const isEmpty = quill.getLength() <= 1

            actions.onChange(isEmpty ? '' : html)
        })

        quillRef.current = quill

        return () => {
            quill.off('text-change', () => {})
            quillRef.current = null
        }
    }, []) //eslint-disable-line

    // Update content if parent changes (and differs)
    useEffect(() => {
        if (quillRef.current) {
            const current = quillRef.current.root.innerHTML
            if (value !== current) {
                quillRef.current.root.innerHTML = value
            }
        }

        if (quillRef.current && readOnly) {
            quillRef.current.enable(!readOnly)
        }
    }, [value, readOnly])

    return (
        <div className="form-group">
            {label ? <LabelForm label={label} required={required} /> : null}

            <div ref={containerRef} className="quill-editor" />
        </div>
    )
}

export default FormTextEditor
