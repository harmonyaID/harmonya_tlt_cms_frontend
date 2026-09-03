import { createStore } from 'zustand/vanilla'
import { isSuccess } from '@/helper/base/condition.helper'
import { ResDataType, StoreStateType } from '@/store/_coreStore/_store.type.ts'

type UrlAPIFunction = (search: any) => Promise<ResDataType>

export const createStoreWithAPI = (
    urlAPI: UrlAPIFunction = () => Promise.resolve({}),
    parameterByList: string = '',
) =>
    createStore<StoreStateType>((set, get) => ({
        __list: [],
        __listOption: [],
        __isLoading: false,
        __isReload: false,
        __pagination: {},
        __search: {},

        // Reduce / Handle
        __handleGet: () => {
            const { __isLoading, __list = [], __isReload, __search } = get()

            if ((!__isLoading && __list.length < 1) || __isReload) {
                set((state) => ({
                    ...state,
                    __isLoading: true,
                    __isReload: false,
                }))

                urlAPI(__search).then((resData) => {
                    let newDataList = []
                    let newPagination = {}

                    if (isSuccess(resData)) {
                        newDataList = parameterByList
                            ? resData.result[parameterByList]
                            : resData.result || []

                        newPagination = resData?.pagination
                            ? resData.pagination
                            : {}
                    }

                    set((state) => ({
                        ...state,
                        __isLoading: false,
                        __list: newDataList,
                        __pagination: newPagination,
                    }))
                })
            }
        },

        __handleReload: (search = {}) => {
            const { __handleGet } = get()

            set((state) => ({
                ...state,
                __isLoading: true,
                __isReload: true,
                __search: search,
            }))
            __handleGet()
        },

        __handleUpdate: (newData: any, index: number) => {},

        // Push single data baru ke __list (paling depan / belakang, tinggal pilih)
        __handlePush: (newData: any, toTop: boolean = true) => {
            set((state) => ({
                ...state,
                __list: toTop
                    ? [newData, ...state.__list]
                    : [...state.__list, newData],
            }))
        },
    }))
