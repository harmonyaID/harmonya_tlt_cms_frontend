// Text Editor
export type FormTextEditorProps = {
    label?: string
    value: string
    readOnly?: boolean
    placeholder?: string
    required?: boolean
    actions?: {
        onChange: (content: string) => void
    }
}
