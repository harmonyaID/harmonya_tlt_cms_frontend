import SelectBaseOptionLanguage from '@/common/dataForm/SelectBaseOptionLanguage.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import PageSelectStatus from '@/page/contentAllPages/component/PageSelectStatus.tsx'
import PageTable from '@/page/contentAllPages/component/PageTable.tsx'
import usePageMainHook from '@/page/contentAllPages/hook/usePageMain.hook.ts'
import {
    apiPageContent,
    getPageContentTrash,
    permanentDeleteBlog,
    permanentDeletePageContent,
    restoreBlog,
    restorePageContent,
} from '@/service/api/contentManage.api.ts'
import SelectOptionLanguage from '@/common/dataForm/SelectOptionLanguage.tsx'
import SelectOptionPageStatus from '@/common/dataForm/SelectOptionPageStatus.tsx'
import PageFilter from '@/page/contentAllPages/component/PageFilter.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'

const ContentPageTrashPage = () => {
    const {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionRemove,
        __actionChange,
        __actionClear,
        __setSearch,
        __actionPagination,
        __actionSetIsUseSearch,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToMain,
    } = usePageMainHook({ urlAPI: getPageContentTrash })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restorePageContent,
        urlAPIPermanentRemove: permanentDeletePageContent,
        actions: {
            onSuccess: (boat) => __actionRemove(boat.id),
        },
    })

    return (
        <>
            <CardListData
                title="Page"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <PageFilter
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

                <PageTable
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

export default ContentPageTrashPage
