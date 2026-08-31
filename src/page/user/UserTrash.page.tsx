import CardListData from '@/component/card/CardListData.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import userPath from '@/path/user.path.ts'
import {
    apiStaff,
    getStaffTrash,
    permanentDeleteStaff,
    restoreStaff,
} from '@/service/api/staff.api.ts'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import UserTable from '@/page/user/component/UserTable.tsx'
import UserFilter from '@/page/user/component/UserFilter.tsx'
import moment from 'moment/moment'

const UserTrashPage = () => {
    const {
        __list,
        __isLoading,
        __pagination,
        __search,
        __setSearch,
        __isUseSearch,
        __actionSetIsUseSearch,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: getStaffTrash,
        advancedSearch: {
            fromDate: moment().subtract({ months: 1 }).format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            roleIds: [],
            countryId: '',
            genderId: '',
            limit: 50,
        },
    })

    const { __handleToMain } = usePageFlowHandlerHook({
        basePath: userPath,
        pathFromKey: userPath.trash,
        search: __search,
        isUseSearch: __isUseSearch,
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
        urlAPIRestore: restoreStaff,
        urlAPIPermanentRemove: permanentDeleteStaff,
        actions: {
            onSuccess: (data) => __actionRemove(data.id),
        },
    })

    return (
        <>
            <CardListData
                title="User Trash"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <UserFilter
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

                <UserTable
                    isTrash={true}
                    __list={__list}
                    __pagination={__pagination}
                    __isLoading={__isLoading}
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
