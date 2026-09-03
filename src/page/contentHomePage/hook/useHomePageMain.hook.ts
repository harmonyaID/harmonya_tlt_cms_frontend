import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { LOCALE_EN } from '@/config/locale.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import { detailHomePageContent } from '@/service/api/contentManage.api.ts'

const useHomePageMainHook = () => {
    // const {
    //     __list,
    //     __isLoading,
    //     __pagination,
    //     __search,
    //     __actionPagination,
    //     __actionRemove,
    //     __actionChange,
    //     __actionClear,
    // } = useDataListHook({
    //     urlAPI: (dataSearch) =>
    //         detailHomePageContent({ locale: dataSearch.locale }),
    //     advancedSearch: {
    //         locale: 'en',
    //     },
    // })

    const { id } = useParams()

    const [search, setSearch] = useState({
        locale: id || LOCALE_EN,
    })

    const { __detail, __isLoading } = useDataDetailHook({
        urlAPI: () => detailHomePageContent(search),
        triggerBy: search.locale,
    })

    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: contentHomePagePath,
            pathFromKey: 'hom-main',
        })

    const _handleSearchChange = (name, value) => {
        setSearch((prevState) => ({ ...prevState, [name]: value }))
        if (value) {
            __handleToDetail(value)
        }
    }

    useEffect(() => {
        if (!id) {
            __handleToDetail(LOCALE_EN)
        }
    }, [id])

    return {
        // ---- List Data ----
        // __list,
        // __isLoading,
        // __pagination,
        // __search,
        // __actionPagination,
        // __actionRemove,
        // __actionChange,
        // __actionClear,

        __search: search,
        __handleSearchChange: _handleSearchChange,

        __detail,
        __isLoading,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
    }
}

export default useHomePageMainHook
