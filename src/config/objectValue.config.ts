export const objectRoute = (
    path: string,
    element: any,
    title: string,
    navTile?: string,
    children?: [],
    indexPath?: string
) => ({
    path,
    element,
    title,
    navTile: navTile || title,
    children,
})

export const objectMenuService = (
    name: string,
    icon: any,
    link?: any
) => ({
    name,
    icon,
    link
})
