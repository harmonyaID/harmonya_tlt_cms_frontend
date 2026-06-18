import { FC } from 'react'
import { TickCircle, CloseCircle } from 'iconsax-react'
import { isBoolean } from 'lodash'
import { TextTrueOrFalseProps } from '@/component/general/type/general.type.ts'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

export const TextTrueOrFalse: FC<TextTrueOrFalseProps> = ({
    value = false,
    isWithIcon = true,
    isWithText = true,
    iconSize = 20,
    className = '',
    classNameIcon = '',
    textTrue = 'Yes',
    textFalse = 'No',
}) => {
    return isBoolean(value) ? (
        <span
            className={joinClassNameHelper(
                'd-flex align-items-center gap-2',
                className,
            )}>
            {isWithIcon && (
                <>
                    {value ? (
                        <TickCircle
                            variant="Bold"
                            size={iconSize}
                            className={joinClassNameHelper(
                                'color-status-green-600',
                                classNameIcon,
                            )}
                        />
                    ) : (
                        <CloseCircle
                            variant="Bold"
                            size={iconSize}
                            className={joinClassNameHelper(
                                'color-status-red-500',
                                classNameIcon,
                            )}
                        />
                    )}
                </>
            )}
            {isWithText ? (value ? textTrue : textFalse) : null}
        </span>
    ) : (
        '-'
    )
}

export default TextTrueOrFalse
