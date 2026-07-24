import { FC, useState, useEffect, ChangeEvent, useRef } from 'react'
import ReactJson from '@microlink/react-json-view'
import GeneralRowForm from '@/component/form/GeneralRowForm'
import FormTextArea from '@/component/form/FormTextArea'
import { BtnInfo } from '@/component/general/Button'
import jsonlint from 'jsonlint-mod'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'

export interface JsonEditorFormProps {
    name?: string
    label?: string
    secondLabel?: string
    darkTheme?: boolean
    value?: Record<string, any>
    onChange?: (name: string, value: any, e?: ChangeEvent<any>) => void
    placeholder?: string
    isRequired?: boolean
    className?: string
}

const isEmptyObject = (object: any) =>
    object && Object.keys(object).length === 0 && object.constructor === Object

const JsonEditorForm: FC<JsonEditorFormProps> = ({
    name = '',
    label = '',
    secondLabel = '',
    darkTheme = false,
    value,
    onChange,
    placeholder = `e.g Paste JSON ${label || name} here...`,
    isRequired = false,
    className = '',
}) => {
    const [jsonData, setJsonData] = useState<Record<string, any> | undefined>(
        value && !isEmptyObject(value) ? value : undefined,
    )
    const [jsonText, setJsonText] = useState<string>(
        value && !isEmptyObject(value) ? JSON.stringify(value, null, 2) : '',
    )
    const [isInvalidJson, setIsInvalidJson] = useState(false)
    const [jsonErrorMessage, setJsonErrorMessage] = useState<string>('')
    const isTypingRef = useRef(false)

    useEffect(() => {
        if (!isTypingRef.current) {
            if (value && !isEmptyObject(value)) {
                setJsonData(value)
                setJsonText(JSON.stringify(value, null, 2))
            } else {
                setJsonData(undefined)
                setJsonText('')
            }
        }
    }, [value])

    useEffect(() => {
        const container = document.querySelector('.react-json-view')
        if (!container) return

        const handleKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement

            const isReactJsonKeyInput =
                target &&
                target.closest('.react-json-view') &&
                (target.classList.contains('variable-editor') ||
                    target.classList.contains('object-key') ||
                    (target as HTMLInputElement).type === 'text')

            if (!isReactJsonKeyInput || e.key !== 'Enter') return

            const input = target as HTMLInputElement
            const newKey = input.value.trim()
            if (!newKey) return

            const objectContainer = target.closest('.object-container')
            let currentParent: any = jsonData

            if (objectContainer && jsonData) {
                const keyTrail: string[] = []
                let parentEl = objectContainer.parentElement

                while (parentEl) {
                    const keyLabel = parentEl.querySelector(
                        ':scope > .object-key',
                    )
                    if (keyLabel && keyLabel.textContent) {
                        keyTrail.unshift(keyLabel.textContent)
                    }
                    parentEl = parentEl.closest('.object-container')
                }

                if (keyTrail.length) {
                    currentParent = keyTrail.reduce(
                        (acc, k) => acc?.[k],
                        jsonData,
                    )
                }
            }

            const isDuplicate =
                currentParent &&
                typeof currentParent === 'object' &&
                Object.prototype.hasOwnProperty.call(currentParent, newKey)

            if (isDuplicate) {
                e.preventDefault()
                e.stopPropagation()
                setIsInvalidJson(true)
                setJsonErrorMessage(`Duplicate key '${newKey}' in this object.`)
            } else {
                setIsInvalidJson(false)
                setJsonErrorMessage('')
            }
        }

        container.addEventListener('keydown', handleKeyDown, true)
        return () =>
            container.removeEventListener('keydown', handleKeyDown, true)
    }, [jsonData])

    const _handleTextChange = (
        name: string,
        val: string,
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        isTypingRef.current = true
        setJsonText(val)

        if (val.trim() === '') {
            setJsonData(undefined)
            setIsInvalidJson(false)
            onChange?.(name, {}, e)
            return
        }

        try {
            const parsed = jsonlint.parse(val)
            setJsonData(parsed)
            setIsInvalidJson(false)
            onChange?.(name, parsed, e)
        } catch (error: any) {
            setIsInvalidJson(true)
            setJsonErrorMessage(error.message)
        }

        clearTimeout((_handleTextChange as any).timeout)
        ;(_handleTextChange as any).timeout = setTimeout(() => {
            isTypingRef.current = false
        }, 600)
    }

    return (
        <div className={joinClassNameHelper('row mt-4', className)}>
            <div className="col-md-12">
                <GeneralRowForm
                    label={label}
                    secondLabel={secondLabel}
                    isRequired={isRequired}>
                    <div className="position-relative">
                        <FormTextArea
                            name={name}
                            placeholder={placeholder}
                            rows={jsonText?.length > 50 ? 20 : 5}
                            value={jsonText}
                            actions={{ onChange: _handleTextChange }}
                        />

                        <BtnInfo
                            className="position-absolute top-0 end-0 mt-2 me-2"
                            onClick={() => {
                                try {
                                    const parsed = JSON.parse(jsonText)
                                    const pretty = JSON.stringify(
                                        parsed,
                                        null,
                                        2,
                                    )
                                    setJsonText(pretty)
                                    setIsInvalidJson(false)
                                } catch {
                                    setIsInvalidJson(true)
                                }
                            }}>
                            Pretty JSON
                        </BtnInfo>
                    </div>
                    {isInvalidJson ? (
                        <div
                            className="alert alert-danger p-2 fs-12"
                            role="alert">
                            <strong>Invalid JSON</strong>
                            <pre className="mb-0 mt-1">{jsonErrorMessage}</pre>
                        </div>
                    ) : null}

                    <ReactJson
                        src={jsonData}
                        name={false}
                        theme={darkTheme ? 'monokai' : 'rjv-default'}
                        collapsed={1}
                        displayDataTypes={false}
                        enableClipboard={false}
                        style={{
                            fontSize: '12px',
                            fontFamily: 'Menlo, monospace',
                            padding: '16px',
                            borderRadius: '8px',
                            backgroundColor: darkTheme ? '#2A2A2A' : '#F0F0F5',
                        }}
                    />
                </GeneralRowForm>
            </div>
        </div>
    )
}

export default JsonEditorForm
