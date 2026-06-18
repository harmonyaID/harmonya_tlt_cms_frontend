import { FC, useLayoutEffect } from 'react'
import { Add } from 'iconsax-react'
import AdvanceSearch from '@/component/general/AdvanceSearch'
import { BtnCircle } from '@/component/general/Button'
import { SidebarSecondLayoutProps } from '@/component/layout/type/layout.type'
import {
    actionDataPreviewModeColumn,
    removeActionDataPreviewModeColumn,
} from '@/helper/actionModeDataPreview.helper.ts'

const SidebarSecondLayout: FC<SidebarSecondLayoutProps> = ({
    title = '',

    titleActionElement = 'Add New',
    isButtonAdd = true,
    actionsElement = {
        handleClick: () => {},
    },

    isUseAdvanceSearch = true,
    search = {},
    isUsePrevState = false,

    formAdvanceSearch = {},
    isUseSearch = false,
    countAdvance = 0,

    isUseDefaultDateRange = false,
    isBranchOffice = false,

    actionsAdvanceSearch = {
        handlePagination: () => {},
        handleClear: () => {},
        handleChange: () => {},

        handleGetPrevSearch: () => {},

        handleCountAdvance: () => {},
        handleSetIsUseSearch: () => {},
        handleClearCount: () => {},
    },
    advanceSearchContent = null,

    children,

    componentAction = null,
    placeholderSearch,
    isAdvance = true,
}) => {
    useLayoutEffect(() => {
        actionDataPreviewModeColumn()

        return () => {
            removeActionDataPreviewModeColumn()
        }
    }, [])

    return (
        <div className="second-sidebar px-0 pt-0">
            <div className="wrap-top-sticky border-bottom border-base-border-mood-theme py-3">
                <div className="px-3 hstack justify-content-between align-items-center">
                    <h5 className="fs-18 fw-500 mb-0">{title}</h5>

                    {componentAction || isButtonAdd ? (
                        <div className="hstack gap-2 align-items-center justify-content-end">
                            {componentAction}
                            {isButtonAdd ? (
                                <BtnCircle className="btn-primaryP btn-tint-400">
                                    <Add size="20" strokeWidth="2.5" />
                                </BtnCircle>
                            ) : null}
                        </div>
                    ) : null}
                </div>

                {isUseAdvanceSearch ? (
                    <div className="px-3 pt-3">
                        <AdvanceSearch
                            formRequest={search}
                            formAdvanceSearch={formAdvanceSearch}
                            countAdvance={countAdvance}
                            isUseSearch={isUseSearch}
                            actions={{
                                getDataPrevSearch: (search) =>
                                    actionsAdvanceSearch.handleGetPrevSearch(
                                        search,
                                    ),
                                pagination:
                                    actionsAdvanceSearch.handlePagination,
                                clear: actionsAdvanceSearch.handleClear,
                                change: actionsAdvanceSearch.handleChange,
                                countAdvance:
                                    actionsAdvanceSearch.handleCountAdvance,
                                setIsUseSearch:
                                    actionsAdvanceSearch.handleSetIsUseSearch,
                                clearCount:
                                    actionsAdvanceSearch.handleClearCount,
                            }}
                            isUsePrevState={isUsePrevState}
                            isSecondSidebar
                            isBranchOffice={isBranchOffice}
                            isUseDefaultDateRange={isUseDefaultDateRange}
                            columnDefaultInputText={
                                isAdvance ? 'col-10' : 'col-12'
                            }
                            columnBtnSearch="col col-2"
                            advanceContent={advanceSearchContent}
                            placeholderSearch={placeholderSearch}
                            isAdvance={isAdvance}
                        />
                    </div>
                ) : null}
            </div>

            {children}
        </div>
    )
}

export default SidebarSecondLayout
