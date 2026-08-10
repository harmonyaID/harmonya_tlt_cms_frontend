import useBoatMain from '@/page/boat/hook/useBoatMain.hook.ts'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import BoatTable from '@/page/boat/component/BoatTable.tsx'

const BoatPage = () => {
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
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
    } = useBoatMain({ urlAPI: apiBoat.list })

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
                title="Boat"
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
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    isDateRange={false}
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />
                <BoatTable
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __handleChooseRemove: _handleChooseRemove,
                        __actionPagination: __actionPagination,
                        __handleToDetail: __handleToDetail,
                        __handleToEdit: __handleToEdit,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDGeneralRemove}
                    configHandle={{
                        urlAPI: () => apiBoat.delete(dataForRemove.id),
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

export default BoatPage
