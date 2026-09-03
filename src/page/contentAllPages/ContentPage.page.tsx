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
import { apiPageContent } from '@/service/api/contentManage.api.ts'
import SelectOptionLanguage from '@/common/dataForm/SelectOptionLanguage.tsx'
import SelectOptionPageStatus from '@/common/dataForm/SelectOptionPageStatus.tsx'
import PageFilter from '@/page/contentAllPages/component/PageFilter.tsx'

const ContentPagePage = () => {
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
        __handleToTrash,
    } = usePageMainHook({ urlAPI: apiPageContent.list })

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDGeneralRemove, false),
        },
    })

    return (
        <>
            <CardListData
                title="Page"
                componentAction={
                    <div className="hstack gap-2">
                        <BtnDanger
                            isOutline
                            handle={() => {
                                __handleToTrash()
                            }}>
                            Trash
                        </BtnDanger>
                        <BtnPrimary onClick={() => __handleToAdd()}>
                            Add New
                        </BtnPrimary>
                    </div>
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
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __actionPagination: __actionPagination,
                        __handleChooseRemove: _handleChooseRemove,
                        __handleToDetail: __handleToDetail,
                        __handleToEdit: __handleToEdit,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDGeneralRemove}
                    configHandle={{
                        urlAPI: () => apiPageContent.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default ContentPagePage
