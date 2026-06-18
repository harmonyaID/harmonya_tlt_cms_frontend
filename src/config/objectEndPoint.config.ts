type ObjExtendEndPointType = {
    name: string
    path: string
    isMenuId: boolean
}

export const objectExtendEndPoint = (
    name = '',
    path = '',
    isMenuId = false,
): ObjExtendEndPointType => {
    return {
        name,
        path,
        isMenuId,
    }
}
