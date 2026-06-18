export const objectRadioButton = (
    defaultValue: string | number | boolean,
    label: string,
): { defaultValue: string | number | boolean; label: string } => ({
    defaultValue,
    label,
})

export const objectSelectOption = (
    value: string | number,
    label: string | number,
): { value: string | number; label: string | number } => ({ value, label })

export const objectTreeStatus = (
    key: string | number,
    title: string,
    value: string | number,
    id: string | number,
    children: Array<{
        key: string | number
        title: string
        value: string | number
        id: string | number
        children: any[]
    }> = [],
): {
    key: string | number
    title: string
    value: string | number
    id: string | number
    children: any[]
} => ({
    key,
    title,
    value,
    id,
    children,
})

export const objectColorSetting = (
    name: string,
    color: string,
): { name: string; color: string } => ({ name, color })

export const objectStatusStyle = (
    statusStyle: object | any,
    backgroundColor: string = '',
    color: string = '',
): { statusStyle: object | any; backgroundColor: string; color: string } => ({
    statusStyle,
    backgroundColor: backgroundColor || ' bg-' + statusStyle,
    color: color || ' color-' + statusStyle,
})
