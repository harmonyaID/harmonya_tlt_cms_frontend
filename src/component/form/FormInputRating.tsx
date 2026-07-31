import { useState } from 'react'

interface FormInputRatingProps {
    value?: number
    onChange?: (rating: number) => void
    max?: number
    disabled?: boolean
    name?: string
}

const FormInputRating = ({
    value = 0,
    onChange,
    max = 5,
    disabled = false,
    name = 'rating',
}: FormInputRatingProps) => {
    const [hoverValue, setHoverValue] = useState<number | null>(null)

    const displayValue = hoverValue ?? value

    const handleClick = (star: number) => {
        if (disabled) return
        onChange?.(star)
    }

    return (
        <div
            className="d-inline-flex gap-1"
            role="radiogroup"
            aria-label="Rating">
            {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
                <span
                    key={star}
                    role="radio"
                    aria-checked={star === value}
                    aria-label={`${star} dari ${max}`}
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => !disabled && setHoverValue(star)}
                    onMouseLeave={() => !disabled && setHoverValue(null)}
                    onKeyDown={(e) => {
                        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault()
                            handleClick(star)
                        }
                    }}
                    className={`fs-3 ${disabled ? '' : 'cursor-pointer'} ${
                        star <= displayValue
                            ? 'text-warning'
                            : 'text-secondary opacity-50'
                    }`}
                    style={{
                        cursor: disabled ? 'not-allowed' : 'pointer',
                        userSelect: 'none',
                        transition: 'color 0.15s ease-in-out',
                    }}>
                    ★
                </span>
            ))}

            {/* hidden input kalau perlu ikut submit form native */}
            <input type="hidden" name={name} value={value} />
        </div>
    )
}

export default FormInputRating
