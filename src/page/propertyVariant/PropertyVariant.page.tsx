import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import PropertyFilter from '@/page/propertyVariant/component/PropertyFilter.tsx'
import PropertyTable from '@/page/propertyVariant/component/PropertyTable.tsx'
import usePropertyMainHook from '@/page/propertyVariant/hook/usePropertyMain.hook.ts'
import { apiPropertyVariant } from '@/service/api/propertyVariant.api.ts'

const PropertyVariantPage = () => {
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
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
    } = usePropertyMainHook({ urlAPI: apiPropertyVariant.list })

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
                title="Property Variant"
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
                    __isLoading={__isLoading}
                    __list={__list}
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
                        urlAPI: () =>
                            apiPropertyVariant.delete(dataForRemove.id),
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

export default PropertyVariantPage
