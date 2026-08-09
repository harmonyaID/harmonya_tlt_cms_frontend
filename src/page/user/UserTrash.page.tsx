import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnPrimary,
} from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import userPath from '@/path/user.path.ts'
import { apiStaff } from '@/service/api/staff.api.ts'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import UserTable from '@/page/user/component/UserTable.tsx'

const UserTrashPage = () => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiStaff.trash,
        advancedSearch: {
            page: 1,
            limit: 10,
            typeIds: [],
            categoryIds: [],
        },
    })

    const { __handleToMain } = usePageFlowHandlerHook({
        basePath: userPath,
        pathFromKey: 'user-main',
    })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: apiStaff.restore,
        urlAPIPermanentRemove: apiStaff.permanentDelete,
        actions: {
            onSuccess: (data) => __actionRemove(data.id),
        },
    })

    return (
        <>
            <CardListData
                title="Staff"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g Arbi TLT"
                    isDateRange={false}
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <UserTable
                    isTrash={true}
                    __list={__list}
                    __pagination={__pagination}
                    __isLoading={__isLoading}
                    actions={{
                        __actionPagination: __actionPagination,
                        __handleChoosePermanentRemove: __handleChoosePermanentRemove,
                        __handleChooseRestore: __handleChooseRestore
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <TrashConfirmModals
                    name={__dataRestore?.name || __dataPermanentRemove?.name}
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

export default UserTrashPage
