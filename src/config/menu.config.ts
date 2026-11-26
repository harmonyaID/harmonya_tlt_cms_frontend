export const MENU_ID = 1
export const MENU_NAME = 'Menu'

export const MEGA_MENU_ID = 2
export const MEGA_MENU_NAME = 'Mega Menu'

export const menuNavbarTypes = [
    { label: MENU_NAME, value: MENU_ID },
    { label: MEGA_MENU_NAME, value: MEGA_MENU_ID },
]

// Item type id from form (typeId) or API detail (type.id); default to Menu
export const getMenuItemTypeId = (item: any): number =>
    Number(item?.typeId ?? item?.type?.id) || MENU_ID

export const getMenuItemTypeName = (item: any): string =>
    menuNavbarTypes.find((vm) => vm.value === getMenuItemTypeId(item))
        ?.label ||
    item?.type?.name ||
    MENU_NAME
