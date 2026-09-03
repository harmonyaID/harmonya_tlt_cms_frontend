// Text Editor
export type FormTextEditorProps = {
    label?: string
    value: string
    readOnly?: boolean
    placeholder?: string
    classNameTextEditor?: string
    required?: boolean
    actions?: {
        onChange: (content: string) => void
    }
}
