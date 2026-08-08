import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'
import {
    RESTORE_COUNT,
    RESTORE_COUNT_ADVANCE,
    RESTORE_IS_USE_SEARCH,
    RESTORE_STATE,
} from '@/config/advanceSearch.config.ts'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'
import FormInput from '@/component/form/FormInput.tsx'
import { Filter, Search } from 'react-feather'
import FormInputDateRangePicker from '@/component/form/FormInputDateRangePicker.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'

export type FilterBarBasicProps = {
    formRequest: object | any
    isLoading?: boolean
    // isUsePrevState?: boolean

    // Search Text
    isSearchText?: boolean
    searchTextPlaceholder?: string
    columnDefaultInputText?: string
    columnDefaultDateRange?: string
    columnBtnSearch?: string

    // Second Sidebar
    isSecondSidebar?: boolean

    // Date Range
    isDateRange?: boolean

    // Classname row
    classNameWrap?: string

    children?: React.ReactNode

    // Actions
    actions?: {
        setFormRequest?: ([key]: any) => void
        clear?: () => void
        pagination?: (page: number) => void
        change?: (name: string, value: any) => void
    }
}

const FilterBarBasic = (props: FilterBarBasicProps) => {
    // const pageStateDataSearch = {
    //     ...useLocationStateHook(),
    // }

    // useEffect(() => {
    //     if (
    //         isUsePrevState &&
    //         !isEmpty(pageStateDataSearch[RESTORE_STATE]) &&
    //         !isEmpty(pageStateDataSearch[RESTORE_COUNT])
    //     ) {
    //         _handleGetPrevAdvanceSearchData({
    //             newSearch: pageStateDataSearch[RESTORE_STATE] || {},
    //             newIsUseSearch:
    //                 pageStateDataSearch[RESTORE_COUNT][RESTORE_IS_USE_SEARCH] ||
    //                 false,
    //             newCountAdvance:
    //                 pageStateDataSearch[RESTORE_COUNT][RESTORE_COUNT_ADVANCE] ||
    //                 0,
    //         })
    //     }
    // }, [])

    const {
        formRequest = {},
        isLoading = false,
        // isUsePrevState = false,

        // Search Text
        isSearchText = true,
        searchTextPlaceholder = 'e.g i nyoman arbi',
        columnDefaultInputText = 'col-md-6 col-lg-3',
        columnDefaultDateRange = 'col-md-6 col-lg-3',
        columnBtnSearch = 'col-md-4 col-lg-2',

        // Second Sidebar
        isSecondSidebar = false,

        // Date Range
        isDateRange = true,

        // Classname row
        classNameWrap = '',

        children,

        // Actions
        actions = {
            setFormRequest: () => {},
            change: () => {},
            pagination: () => {},
            clear: () => {},
        },
    } = props

    return (
        <>
            <FormWrap
                actions={{
                    handleSubmit: () => actions.pagination(1),
                }}>
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: (name, value) => actions.change(name, value),
                    }}>
                    <div
                        className={joinClassNameHelper(
                            'row wrap-advance-search align-items-end',
                            classNameWrap,
                        )}>
                        {isSearchText ? (
                            <div
                                className={joinClassNameHelper(
                                    'mb-lg-0 mb-2',
                                    columnDefaultInputText,
                                )}>
                                <FormInput
                                    label={!isSecondSidebar ? 'Search' : ''}
                                    name="search"
                                    placeholder={searchTextPlaceholder}
                                    className="fm-input-search mb-0"
                                    icon={
                                        <>
                                            <Search size={18} />
                                        </>
                                    }
                                    classNameIcon="fm-place-icon"
                                />
                            </div>
                        ) : null}

                        {isDateRange ? (
                            <div
                                className={joinClassNameHelper(
                                    'mb-lg-0 mb-2',
                                    columnDefaultDateRange,
                                )}>
                                <FormInputDateRangePicker
                                    label={
                                        <>
                                            Date Range{' '}
                                            {/*{isMaxMonthRange ? (*/}
                                            {/*    <span className="text-blue-300">*/}
                                            {/*            (Max 6 month)*/}
                                            {/*        </span>*/}
                                            {/*) : null}*/}
                                        </>
                                    }
                                    startName="fromDate"
                                    endName="toDate"
                                    value={formRequest}
                                />
                            </div>
                        ) : null}

                        {children}

                        <div
                            className={joinClassNameHelper(
                                'mb-lg-0 mb-2 d-flex align-items-end',
                                columnBtnSearch,
                            )}>
                            {!isSecondSidebar ? (
                                <BtnPrimary
                                    className="btn-filter btn-sm"
                                    type="submit"
                                    disabled={isLoading}>
                                    Search
                                </BtnPrimary>
                            ) : null}

                            {/*{isAdvance ? (*/}
                            {/*    <div className="wp-btn-filter position-relative">*/}
                            {/*        <button*/}
                            {/*            className={joinClassNameHelper(*/}
                            {/*                'btn btn-filter btn-sm text-neutral-100',*/}
                            {/*                {*/}
                            {/*                    'border border-primary':*/}
                            {/*                        isUseSearch &&*/}
                            {/*                        countAdvance > 0,*/}
                            {/*                    'ms-2': !isSecondSidebar,*/}
                            {/*                },*/}
                            {/*            )}*/}
                            {/*            type="button"*/}
                            {/*            onClick={() =>*/}
                            {/*                _handleAttemptAdvanceFilter()*/}
                            {/*            }*/}
                            {/*            disabled={isLoading}>*/}
                            {/*            <Filter size={18} />*/}
                            {/*        </button>*/}

                            {/*        {isUseSearch && countAdvance > 0 ? (*/}
                            {/*            <div className="btn-count-filter fs-10 fw-700 text-black-100 rounded-circle bg-primary">*/}
                            {/*                {countAdvance}*/}
                            {/*            </div>*/}
                            {/*        ) : null}*/}
                            {/*    </div>*/}
                            {/*) : null}*/}

                            {!isSecondSidebar ? (
                                <button
                                    className="btn btn-sm btn-link text-neutral-100 text-underline ms-2"
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => {
                                        actions.clear()

                                        // if (isUseSearch) {
                                        //     actions.clearCount()
                                        // }
                                    }}>
                                    Clear All
                                </button>
                            ) : null}
                        </div>
                    </div>
                </WrapFormContext>
            </FormWrap>
        </>
    )
}

export default FilterBarBasic
