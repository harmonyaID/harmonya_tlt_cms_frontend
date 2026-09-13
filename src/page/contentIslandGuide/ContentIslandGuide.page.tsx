import PageComingSoonLayout from '@/component/layout/PageComingSoon.layout.tsx'
import useContentExHook from '@/page/contentExperience/hook/useContentEx.hook.ts'
import {
    apiExperienceContent,
    apiIslandGuide,
} from '@/service/api/contentManage.api.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDGeneralRemove } from '@/config/modal.config.ts'
import { BtnDanger, BtnPrimary } from '@/component/general/Button.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ContentIslandGuideFilter from '@/page/contentIslandGuide/component/ContentIslandGuideFilter.tsx'
import ContentExperienceTable from '@/page/contentIslandGuide/component/ContentIslandGuideTable.tsx'
import useContentIslandGuideHook from '@/page/contentIslandGuide/hook/useContentIslandGuide.hook.ts'

const ContentIslandGuidePage = () => {
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
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
        __handleToTrash,
    } = useContentIslandGuideHook({ urlAPI: apiIslandGuide.list })

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
                title="Island Guide"
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
                <ContentIslandGuideFilter
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
                        urlAPI: () => apiIslandGuide.delete(dataForRemove.id),
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

export default ContentIslandGuidePage
