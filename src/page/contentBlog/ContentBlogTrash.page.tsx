import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import {BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useContentBlogMainHook from '@/page/contentBlog/hook/useContentBlogMain.hook.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ContentBlogTable from '@/page/contentBlog/component/ContentBlogTable.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import { getBlogTrash, permanentDeleteBlog, restoreBlog } from '@/service/api/contentManage.api.ts'

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

        // ---- Change Page ----
        __handleToMain
    } = useContentBlogMainHook({urlAPI: getBlogTrash})

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
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    // isDateRange
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
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
