export interface UrlCRUDType {
    main?: string
    detail?: (id: string | number) => string
    update?: (id: string | number, isSlasUpdate?: boolean) => string
    delete?: (id: string | number) => string
}

export interface SrvWithFeature {
    main: string
    detail: (menuId: string | number) => string
    update: (menuId: string | number, isSlasUpdate?: boolean) => string
    delete: (menuId: string | number) => string
    [key: string]: any
}

export type SrvCRUDWithExtendType<T = {}> = UrlCRUDType & T
