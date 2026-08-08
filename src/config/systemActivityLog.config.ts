import { AddSquare, Edit, Trash } from 'iconsax-react'

export const UPDATE = 'update'
export const CREATE = 'create'
export const DELETE = 'delete'

export const LOG_ACTION_BADGE = {
    [CREATE]: 'bg-badge-log-green',
    [UPDATE]: 'bg-badge-log-yellow',
    [DELETE]: 'bg-badge-log-red',
}

export const LOG_ACTION_ICON = {
    [CREATE]: AddSquare,
    [UPDATE]: Edit,
    [DELETE]: Trash,
}