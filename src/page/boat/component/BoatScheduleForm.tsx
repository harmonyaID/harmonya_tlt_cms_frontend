import { useEffect, useState } from 'react'
import FormInput from '@/component/form/FormInput.tsx'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import setNestedValue from '@/helper/setNestedValue.helper.ts'

const BoatScheduleForm = ({
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
            const updated = [...prev.times]

            updated.splice(idx, 1)

            return {
                ...prev,
                times: updated,
            }
        })
    }

    const _handleAdd = () => {
        setFormRequest((prev) => ({
            ...prev,
            times: [...prev.times, ''],
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

            <div className="row">
                <div className="col-6">
                    <FormInput
                        name="from"
                        label="From"
                        placeholder="e.g Jungutbatu"
                        className="my-3"
                        value={formRequest.from}
                        actions={{
                            onChange: _handleChange,
                        }}
                    />
                </div>
                <div className="col-6">
                    <FormInput
                        name="to"
                        label="To"
                        placeholder="e.g Sanur"
                        className="my-3"
                        value={formRequest.to}
                        actions={{
                            onChange: _handleChange,
                        }}
                    />
                </div>
            </div>

            <div className="vstack gap-2 align-items-start mb-2">
                {formRequest?.times?.map((time, index) => (
                    <div key={index} className="row align-items-end w-100">
                        <div className="col">
                            <FormInput
                                label={`Time ${index + 1}`}
                                name={`times[${index}]`}
                                className="mb-0"
                                placeholder="e.g 11 AM"
                                value={time}
                                actions={{
                                    onChange: _handleChange,
                                }}
                            />
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
                ))}

                <BtnPrimary type="button" isOutline handle={() => _handleAdd()}>
                    Add Time
                </BtnPrimary>
            </div>
        </div>
    )
}

export default BoatScheduleForm
