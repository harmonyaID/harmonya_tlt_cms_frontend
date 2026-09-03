import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import useContentExHook from '@/page/contentExperience/hook/useContentEx.hook.ts'
import {
    apiExperienceContent,
    getExperienceContentTrash,
    permanentDeleteExperienceContent,
    restoreExperienceContent,
} from '@/service/api/contentManage.api.ts'
import ContentExperienceTable from '@/page/contentExperience/component/ContentExperienceTable.tsx'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import {
    permanentDeleteBoat,
    restoreBoat,
} from '@/service/api/boatManage.api.ts'
import ContentExperienceFilter from '@/page/contentExperience/component/ContentExperienceFilter.tsx'

const ContentExperienceTrashPage = () => {
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
    } = useContentExHook({ urlAPI: getExperienceContentTrash, isTrash: true })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreExperienceContent,
        urlAPIPermanentRemove: permanentDeleteExperienceContent,
        actions: {
            onSuccess: (boat) => __actionRemove(boat.id),
        },
    })

    return (
        <>
            <CardListData
                title="Experience Trash"
                componentAction={
                    <BtnPrimary isOutline onClick={() => __handleToMain()}>
                        Back
                    </BtnPrimary>
                }>
                <ContentExperienceFilter
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

                <ContentExperienceTable
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

export default ContentExperienceTrashPage
