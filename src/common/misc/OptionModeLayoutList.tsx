import { ReactNode } from 'react'
import { Category, Grid4, TaskSquare } from 'iconsax-react'
// import {
//     MODE_LAYOUT_BOX,
//     MODE_LAYOUT_BOX_ID,
//     MODE_LAYOUT_COLUMN,
//     MODE_LAYOUT_COLUMN_ID,
//     MODE_LAYOUT_TABLE_ID,
//     MODE_LAYOUT_TABLE,
// } from '@/config/modeLayout.config.ts'

export const MODE_LAYOUT_BOX_ID = 1
export const MODE_LAYOUT_BOX = 'Box'

export const MODE_LAYOUT_COLUMN_ID = 2
export const MODE_LAYOUT_COLUMN = 'Column'

export const MODE_LAYOUT_TABLE_ID = 3
export const MODE_LAYOUT_TABLE = 'Table'

const objectModeLayout = (
    id: number,
    name: string,
    contentIcon?: ReactNode,
) => ({
    id,
    name,
    content: (
        <div className="hstack gap-2 align-items-center fs-14">
            {contentIcon || ''} {name}
        </div>
    ),
    contentIcon,
})

export const ModeLayoutBox = objectModeLayout(
    MODE_LAYOUT_BOX_ID,
    MODE_LAYOUT_BOX,
    <Category size={18} variant="Bulk" />,
)

export const ModeLayoutColumn = objectModeLayout(
    MODE_LAYOUT_COLUMN_ID,
    MODE_LAYOUT_COLUMN,
    <Grid4 size={18} variant="Bulk" />,
)

export const ModeLayoutTable = objectModeLayout(
    MODE_LAYOUT_TABLE_ID,
    MODE_LAYOUT_TABLE,
    <TaskSquare size={20} variant="Bulk" />,
)

export const ModeLayoutListInObject = {
    [MODE_LAYOUT_BOX_ID]: ModeLayoutBox,
    [MODE_LAYOUT_COLUMN_ID]: ModeLayoutColumn,
    [MODE_LAYOUT_TABLE_ID]: ModeLayoutTable,
}

export const OptionModeLayoutList = [
    ModeLayoutBox,
    ModeLayoutColumn,
    ModeLayoutTable,
]
