import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import useExperienceAreaMain from '@/page/experienceArea/hook/useExpAreaMain.hook.ts'
import {
    apiExperienceArea,
    getExperienceAreaTrash,
    getIslandGuideAreaTrash,
    permanentDeleteExperienceArea,
    permanentDeleteIslandGuideArea,
    restoreExperienceArea,
} from '@/service/api/contentManageSetting.api.ts'
import ExperienceAreaTable from '@/page/experienceArea/component/ExperienceAreaTable.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import {
    permanentDeleteBoat,
    restoreBoat,
} from '@/service/api/boatManage.api.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import {
    getIslandGuideTrash,
    restoreIslandGuide,
} from '@/service/api/contentManage.api.ts'
import IslandGuideAreaTable from '@/page/islandGuideArea/component/IslandGuideAreaTable.tsx'
import useIslandGuideAreaMain from '@/page/islandGuideArea/hook/useIslandGuideAreaMain.hook.ts'

const IslandGuideAreaTrashPage = () => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,

        __handleToMain,
    } = useIslandGuideAreaMain({ urlAPI: getIslandGuideAreaTrash })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreIslandGuide,
        urlAPIPermanentRemove: permanentDeleteIslandGuideArea,
        actions: {
            onSuccess: (area) => __actionRemove(area.id),
        },
    })

    return (
        <>
            <CardListData
                title="Area Trash"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    // isDateRange
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <IslandGuideAreaTable
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

export default IslandGuideAreaTrashPage
