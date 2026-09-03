export type UsePageFlowHandlerType = {
    basePath: {
        detail: (id: string) => string
        edit: (id: string) => string
        add: string
        main: string
        trash?: string
    }
    extraPath?: string
    pathFromKey?: string
    modalRemoveId?: string
    search?: Record<string, any>
    countAdvance?: number
    isUseSearch?: boolean
}
