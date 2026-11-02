import { useEffect, useState } from 'react'
import FormInput from '@/component/form/FormInput.tsx'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'

const CustomInfoForm = ({
    group,
    actions: { onChange, onRemove },
}: {
    group: any
    actions: {
        onChange: (group) => void
        onRemove: () => void
    }
}) => {
    const [formRequest, setFormRequest] = useState<any>(group)

    const _handleChange = (name, value) => {
        setFormRequest((prev) => setNestedValue(prev, name, value))
    }

    const _handleRemove = (idx) => {
        setFormRequest((prev) => {
            const updated = [...prev.customInformations]

            updated.splice(idx, 1)

            return {
                ...prev,
                customInformations: updated,
            }
        })
    }

    const _handleAdd = () => {
        setFormRequest((prev) => ({
            ...prev,
            customInformations: [
                ...prev.customInformations,
                {
                    name: '',
                    value: '',
                    order: prev.customInformations.length + 1,
                },
            ],
        }))
    }

    useEffect(() => {
        onChange(formRequest)
    }, [formRequest])

    return (
        <div className="bg-neutral-600 px-3 py-2 rounded-3 position-relative">
            <div className="position-absolute top-0 end-0 p-2">
                <BtnCircleRemove
                    className=""
                    actions={{
                        remove: () => onRemove(),
                    }}
                />
            </div>
            <FormInput
                name="name"
                label="Group"
                placeholder="Something"
                className="my-3"
                value={formRequest.name}
                actions={{
                    onChange: _handleChange,
                }}
            />
            <div className="vstack gap-2 align-items-start mb-2">
                {formRequest?.customInformations?.map((info, index) => (
                    <div key={index} className="w-100 ps-4">
                        <div className="row">
                            <div className="col">
                                <div className="vstack gap-2 ">
                                    <FormInput
                                        label="Name"
                                        name={`customInformations[${index}].name`}
                                        className="mb-0"
                                        placeholder="e.g Value"
                                        required
                                        value={info.name}
                                        actions={{
                                            onChange: _handleChange,
                                        }}
                                    />
                                    <FormTinyMCE
                                        isSimple
                                        label="Value"
                                        name={`customInformations[${index}].value`}
                                        className="mb-0"
                                        isUseHook={false}
                                        placeholder="e.g Value"
                                        value={info.value}
                                        actions={{
                                            onChange: _handleChange,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="col-auto">
                                <BtnCircleRemove
                                    className="mb-1"
                                    actions={{
                                        remove: () => _handleRemove(index),
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <BtnPrimary type="button" isOutline handle={() => _handleAdd()}>
                    Add Info
                </BtnPrimary>
            </div>
        </div>
    )
}

export default CustomInfoForm
