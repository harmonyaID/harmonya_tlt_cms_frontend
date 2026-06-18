import { isEmpty } from 'lodash'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import { BadgeStatusProps } from './type/misc.type'

const BadgeStatus = ({
    data = { name: '', id: '' },
    keyName = 'id',
    listStyle = [],
    isTable = false,
    isRounded = true,
    className = '',
    children,
}: BadgeStatusProps) => {
    return (
        <>
            {data && data?.name && data?.id ? (
                <span
                    className={joinClassNameHelper(
                        'badge',
                        className,
                        listStyle[data[keyName]]?.statusStyle ||
                            'bg-neutral-500',
                        {
                            'fs-12': isTable,
                            'rounded-pill': isRounded,
                        },
                    )}>
                    {!isEmpty(children) ? children : data.name}
                </span>
            ) : (
                '-'
            )}
        </>
    )
}

export default BadgeStatus
