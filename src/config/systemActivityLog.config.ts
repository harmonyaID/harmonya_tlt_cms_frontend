import { AddSquare, Edit, Trash } from 'iconsax-react'
import { RotateCcw } from 'react-feather'

export const UPDATE = 'update'
export const CREATE = 'create'
export const DELETE = 'delete'
export const RESTORE = 'restore'

export const LOG_ACTION_BADGE = {
    [CREATE]: 'bg-badge-log-green',
    [UPDATE]: 'bg-badge-log-yellow',
    [DELETE]: 'bg-badge-log-red',
    [RESTORE]: 'bg-badge-log-blue',
}

export const LOG_ACTION_ICON = {
    [CREATE]: AddSquare,
    [UPDATE]: Edit,
    [DELETE]: Trash,
    [RESTORE]: RotateCcw,
}