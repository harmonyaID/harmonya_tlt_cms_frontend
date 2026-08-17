import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import usePropertyMainHook from '@/page/property/hook/usePropertyMain.hook.ts'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import {
    getPropertyTrash,
    permanentDeleteProperty,
    restoreProperty,
} from '@/service/api/property.api.ts'
import PropertyTable from '@/page/property/component/PropertyTable.tsx'
import PropertyFilter from '@/page/property/component/PropertyFilter.tsx'

const PropertyTrashPage = () => {
    const {
        // ---- List Data ----
        __list,
        __isLoading,
        __pagination,
        __search,
        __actionSetIsUseSearch,
        __setSearch,
        __actionPagination,
        __actionRemove,
        __actionChange,
        __actionClear,

        // ---- Change Page ----
        __handleToMain,
    } = usePropertyMainHook({ urlAPI: getPropertyTrash, isTrash: true })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreProperty,
        urlAPIPermanentRemove: permanentDeleteProperty,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    return (
        <>
            <CardListData
                title="Property Trash"
                componentAction={
                    <BtnPrimary isOutline handle={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <PropertyFilter
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

                <PropertyTable
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

export default PropertyTrashPage
