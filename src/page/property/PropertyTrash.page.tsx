import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import {
    TblLineFirst,
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import {
    BtnPrimary,
} from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import usePropertyMainHook from '@/page/property/hook/usePropertyMain.hook.ts'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import { getPropertyTrash, permanentDeleteProperty, restoreProperty } from '@/service/api/property.api.ts'
import PropertyTable from '@/page/property/component/PropertyTable.tsx'

const PropertyTrashPage = () => {
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
    } = usePropertyMainHook({urlAPI: getPropertyTrash})


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
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <PropertyTable
                    isTrash={true}
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __actionPagination: __actionPagination,
                        __handleChoosePermanentRemove: __handleChoosePermanentRemove,
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
