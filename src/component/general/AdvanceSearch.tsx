import { useEffect } from 'react'
import { Filter, Search } from 'react-feather'
import { isArray, isEmpty, isFunction } from 'lodash'
// import SelectTreeOptionBranchOffice from '@/common/dataForm/SelectTreeOptionBranchOffice'
import FormInput from '@/component/form/FormInput'
import FormInputDateRangePicker from '@/component/form/FormInputDateRangePicker'
import SelectTreeOption from '@/component/form/SelectTreeOption'
import { BtnPrimary } from '@/component/general/Button'
import { AdvanceSearchProps } from '@/component/general/type/general.type'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout'
import ModalAdvanceFilter from '@/component/modal/ModalAdvanceFilter'
import ModalConfirmMaxThreeMonth from '@/component/modal/ModalConfirmMaxThreeMonth'
import FormWrap from '@/component/wrapping/Form.wrap'
import {
    countAdvanceSearch,
    RESTORE_COUNT,
    RESTORE_COUNT_ADVANCE,
    RESTORE_IS_USE_SEARCH,
    RESTORE_STATE,
} from '@/config/advanceSearch.config'
import {
    MDGeneralAdvanceFilter,
    MDGeneralFilterMaxThreeMonth,
} from '@/config/modal.config'
import { WrapFormContext } from '@/context/Form.context'
import { dateDifference } from '@/helper/actionFormatDate.helper'
import actionModal from '@/helper/base/actionModal.helper'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import useLocationStateHook from '@/hook/useLocationState.hook'

const AdvanceSearch = (props: AdvanceSearchProps) => {
    const pageStateDataSearch = {
        ...useLocationStateHook(),
    }

    const {
        id = MDGeneralAdvanceFilter,
        title = 'Advance Filter',
        width = '',
        classNameModalDialog = '',
        colMDInputSearch = 'col-md-6',
        colMDDateRange = 'col-md-6',

        formRequest = {},
        formAdvanceSearch = {},

        countAdvance = 0,
        isUseSearch = false,
        isUsePrevState = false,
        actions = {
            clear: () => {},
            pagination: () => {},
            change: () => {},

            getDataPrevSearch: () => {},

            countAdvance: () => {},
            setIsUseSearch: () => {},
            clearCount: () => {},
        },

        companyOfficeName = 'companyOfficeIds',

        statusList = [],
        statusName = 'statusIds',
        statusLabel = 'Status',
        placeholderStatus = 'Select Status',

        isAdvance = true,
        isLoading = false,
        isUseDefaultInputText = true,
        isUseDefaultDateRange = true,
        isBranchOffice = true,
        isStatus = true,

        isMaxMonthRange = true,
        maxMonthRange = 6,

        isMDUseDefaultBtnMargin = true,

        placeholderSearch = 'e.g i nyoman arbi',
        columnDefaultInputText = 'col-md-6 col-lg-3',
        columnDefaultDateRange = 'col-md-6 col-lg-3',
        columnBtnSearch = 'col-md-4 col-lg-2',

        isSecondSidebar = false,

        baseContent = null,
        advanceContent = null,
    } = props

    const _handleCountAdvance = () => {
        const newCount = countAdvanceSearch(formRequest, formAdvanceSearch)

        if (isFunction(actions.countAdvance)) {
            actions.countAdvance(newCount)
        }
    }

    const _handleSearchCheckMaxMonth = (isActionAdvance: boolean = false) => {
        const countMonth = dateDifference(
            formRequest.dateFrom,
            formRequest.dateTo,
        )

        if (maxMonthRange > countMonth) {
            if (isActionAdvance) {
                _handleAttemptAdvanceFilter(true)
            }
            actions.pagination(1)
        } else {
            actionModal(MDGeneralFilterMaxThreeMonth, false)
        }
    }

    const _handleAttemptAdvanceFilter = (isClose: boolean = false) => {
        isAdvance ? actionModal(id, isClose) : null
    }

    const _handleGetPrevAdvanceSearchData = ({
        newSearch = {},
        newIsUseSearch = false,
        newCountAdvance = 0,
    }: {
        newSearch: object
        newIsUseSearch?: boolean
        newCountAdvance?: number
    }) => {
        actions.getDataPrevSearch(newSearch)
        actions.setIsUseSearch(newIsUseSearch)
        actions.countAdvance(newCountAdvance)
    }

    useEffect(() => {
        if (
            isUsePrevState &&
            !isEmpty(pageStateDataSearch[RESTORE_STATE]) &&
            !isEmpty(pageStateDataSearch[RESTORE_COUNT])
        ) {
            _handleGetPrevAdvanceSearchData({
                newSearch: pageStateDataSearch[RESTORE_STATE] || {},
                newIsUseSearch:
                    pageStateDataSearch[RESTORE_COUNT][RESTORE_IS_USE_SEARCH] ||
                    false,
                newCountAdvance:
                    pageStateDataSearch[RESTORE_COUNT][RESTORE_COUNT_ADVANCE] ||
                    0,
            })
        }
    }, [])

    return (
        <>
            <FormWrap
                actions={{
                    handleSubmit: () => {
                        if (isMaxMonthRange) {
                            _handleSearchCheckMaxMonth()
                        } else {
                            actions.pagination(1)
                            _handleAttemptAdvanceFilter(true)
                        }
                    },
                }}>
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: (name, value) => actions.change(name, value),
                    }}>
                    <div className="row wrap-advance-search align-items-end">
                        {isUseDefaultInputText ? (
                            <div
                                className={joinClassNameHelper(
                                    'mb-lg-0 mb-2',
                                    columnDefaultInputText,
                                )}>
                                <FormInput
                                    label={!isSecondSidebar ? 'Search' : ''}
                                    name="search"
                                    placeholder={placeholderSearch}
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

                        {isUseDefaultDateRange ? (
                            <div
                                className={joinClassNameHelper(
                                    'mb-lg-0 mb-2',
                                    columnDefaultDateRange,
                                )}>
                                <FormInputDateRangePicker
                                    label={
                                        <>
                                            Date Range{' '}
                                            {isMaxMonthRange ? (
                                                <span className="text-blue-300">
                                                    (Max 6 month)
                                                </span>
                                            ) : null}
                                        </>
                                    }
                                    startName="dateFrom"
                                    endName="dateTo"
                                    value={formRequest}
                                />
                            </div>
                        ) : null}

                        {/*{isBranchOffice ? (*/}
                        {/*    <div className="mb-lg-0 mb-2 col-md-4 col-lg-2">*/}
                        {/*        <SelectTreeOptionBranchOffice*/}
                        {/*            label="Branch Office"*/}
                        {/*            placeholder="Select Office"*/}
                        {/*            name={companyOfficeName}*/}
                        {/*            className="mb-0"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*) : null}*/}

                        {isStatus && !isEmpty(statusList) ? (
                            <div className="mb-lg-0 mb-2 col-md-4 col-lg-2">
                                <SelectTreeOption
                                    label={statusLabel}
                                    placeholder={placeholderStatus}
                                    className="mb-0"
                                    dataValues={
                                        !isEmpty(formRequest[statusName]) &&
                                        isArray(formRequest[statusName])
                                            ? formRequest[statusName]
                                            : []
                                    }
                                    options={statusList}
                                    handleChoose={(values) =>
                                        actions.change(statusName, values)
                                    }
                                    treeCheckable
                                />
                            </div>
                        ) : null}

                        {baseContent || null}

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

                            {isAdvance ? (
                                <div className="wp-btn-filter position-relative">
                                    <button
                                        className={joinClassNameHelper(
                                            'btn btn-filter btn-sm text-neutral-100',
                                            {
                                                'border border-primary':
                                                    isUseSearch &&
                                                    countAdvance > 0,
                                                'ms-2': !isSecondSidebar,
                                            },
                                        )}
                                        type="button"
                                        onClick={() =>
                                            _handleAttemptAdvanceFilter()
                                        }
                                        disabled={isLoading}>
                                        <Filter size={18} />
                                    </button>

                                    {isUseSearch && countAdvance > 0 ? (
                                        <div className="btn-count-filter fs-10 fw-700 text-black-100 rounded-circle bg-primary">
                                            {countAdvance}
                                        </div>
                                    ) : null}
                                </div>
                            ) : null}

                            {!isSecondSidebar ? (
                                <button
                                    className={joinClassNameHelper(
                                        'btn btn-sm btn-link text-neutral-100 text-underline ms-2',
                                        { 'px-0': isAdvance },
                                    )}
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => {
                                        actions.clear()

                                        if (isUseSearch) {
                                            actions.clearCount()
                                        }
                                    }}>
                                    Clear All
                                </button>
                            ) : null}
                        </div>
                    </div>
                </WrapFormContext>
            </FormWrap>

            <CreatePortalLayout>
                <ModalConfirmMaxThreeMonth />

                <ModalAdvanceFilter
                    id={id}
                    title={title}
                    width={width}
                    classNameModalDialog={classNameModalDialog}
                    colMDInputSearch={colMDInputSearch}
                    colMDDateRange={colMDDateRange}
                    formRequest={formRequest}
                    statusLabel={statusLabel}
                    placeholderStatus={placeholderStatus}
                    actions={{
                        change: actions.change,
                        pagination: actions.pagination,
                        checkMaxMonth: _handleSearchCheckMaxMonth,
                        attemptAdvanceFilter: _handleAttemptAdvanceFilter,
                        clear: actions.clear,
                        countAdvance: _handleCountAdvance,
                        setIsUseSearch: actions.setIsUseSearch,
                        clearCount: actions.clearCount,
                    }}
                    advanceContent={advanceContent}
                    companyOfficeName={companyOfficeName}
                    statusList={statusList}
                    statusName={statusName}
                    isLoading={isLoading}
                    isUseDefaultInputText={isUseDefaultInputText}
                    isUseDefaultDateRange={isUseDefaultDateRange}
                    isBranchOffice={isBranchOffice}
                    isStatus={isStatus}
                    isMDUseDefaultBtnMargin={isMDUseDefaultBtnMargin}
                />
            </CreatePortalLayout>
        </>
    )
}

export default AdvanceSearch
