import useBoatMain from '@/page/boat/hook/useBoatMain.hook.ts'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    apiBoat,
    getBoatTrash,
    permanentDeleteBoat,
    restoreBoat,
} from '@/service/api/boatManage.api.ts'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import BoatTable from '@/page/boat/component/BoatTable.tsx'
import BoatFilter from '@/page/boat/component/BoatFilter.tsx'

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
        __setSearch,
        __actionSetIsUseSearch,

        // ---- Change Page ----
        __handleToMain,
    } = useBoatMain({ urlAPI: getBoatTrash, isTrash: true })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreBoat,
        urlAPIPermanentRemove: permanentDeleteBoat,
        actions: {
            onSuccess: (boat) => __actionRemove(boat.id),
        },
    })

    return (
        <>
            <CardListData
                title="Boat Trash"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <BoatFilter
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

                <BoatTable
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
