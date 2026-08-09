import useBoatMain from '@/page/boat/hook/useBoatMain.hook.ts'
import CardListData from '@/component/card/CardListData.tsx'
import {
    BtnPrimary,
} from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { apiBoat } from '@/service/api/boatManage.api.ts'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import BoatTable from '@/page/boat/component/BoatTable.tsx'

const BoatTrashPage = () => {
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
    } = useBoatMain({ urlAPI: apiBoat.trash })


    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: apiBoat.restore,
        urlAPIPermanentRemove: apiBoat.permanentDelete,
        actions:{
            onSuccess: (boat) => __actionRemove(boat.id),
        }
    })

    return (
        <>
            <CardListData
                title="Boat Trash"
                componentAction={
                    <div className="hstack gap-3">
                        <BtnPrimary isOutline onClick={() => __handleToMain()}>
                            Back
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
                    isTrash={true}
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
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

export default BoatTrashPage
