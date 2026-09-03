import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useContentBlogMainHook from '@/page/contentBlog/hook/useContentBlogMain.hook.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ContentBlogTable from '@/page/contentBlog/component/ContentBlogTable.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import { getBlogTrash, permanentDeleteBlog, restoreBlog } from '@/service/api/contentManage.api.ts'
import ContentBlogFilter from '@/page/contentBlog/component/ContentBlogFilter.tsx'

const ContentBlogTrashPage = () => {
    const {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
        __setSearch,
        __actionSetIsUseSearch,

        // ---- Change Page ----
        __handleToMain,
    } = useContentBlogMainHook({ urlAPI: getBlogTrash, isTrash:true })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreBlog,
        urlAPIPermanentRemove: permanentDeleteBlog,
        actions:{
            onSuccess: (boat) => __actionRemove(boat.id),
        }
    })

    return (
        <>
            <CardListData
                title="Blog Trash"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <ContentBlogFilter
                    __isLoading={__isLoading}
                    __search={__search}
                    actions={{
                        __setSearch,
                        __actionClear,
                        __actionSetIsUseSearch,
                        __actionChange,
                        __actionPagination,
                    }}
                />

                <ContentBlogTable
                    isTrash={true}
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __actionPagination: __actionPagination,
                        __handleChoosePermanentRemove:
                            __handleChoosePermanentRemove,
                        __handleChooseRestore: __handleChooseRestore,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <TrashConfirmModals
                    name={__dataRestore?.title || __dataPermanentRemove?.title}
                    isLoading={__isLoadingTrash}
                    actions={{
                        handleRestore: __handleRestore,
                        handlePermanentRemove: __handlePermanentRemove,
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default ContentBlogTrashPage
