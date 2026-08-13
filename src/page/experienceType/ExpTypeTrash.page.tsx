import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import {BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import useExpTypeMainHook from '@/page/experienceType/hook/useExpTypeMain.hook.ts'
import {getExperienceTypeTrash, permanentDeleteExperienceType, restoreExperienceType,
} from '@/service/api/contentManageSetting.api.ts'
import ExpTypeTable from '@/page/experienceType/component/ExpTypeTable.tsx'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import { permanentDeleteBoat, restoreBoat } from '@/service/api/boatManage.api.ts'

const ExperienceAreaPage = () => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,

        __handleToAdd,
        __handleToMain,
        __handleToTrash,
    } = useExpTypeMainHook({ urlAPI: getExperienceTypeTrash })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreExperienceType,
        urlAPIPermanentRemove: permanentDeleteExperienceType,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    return (
        <>
            <CardListData
                title="Type Trash"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
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

                <ExpTypeTable
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

export default ExperienceAreaPage
