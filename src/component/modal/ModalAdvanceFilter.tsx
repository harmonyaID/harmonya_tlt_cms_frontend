import { FC } from 'react'
import { Search } from 'react-feather'
import { isArray, isEmpty } from 'lodash'
// import SelectTreeOptionBranchOffice from '@/common/dataForm/SelectTreeOptionBranchOffice'
import { MDGeneralAdvanceFilter } from '@/config/modal.config'
import { WrapFormContext } from '@/context/Form.context'
import joinClassNameHelper from '@/helper/base/joinClassName.helper'
import FormInput from '../form/FormInput'
import FormInputDateRangePicker from '../form/FormInputDateRangePicker'
import SelectTreeOption from '../form/SelectTreeOption'
import { BtnPrimary } from '../general/Button'
import FormWrap from '../wrapping/Form.wrap'
import ModalMiddle from './ModalMiddle'
import { ModalAdvanceFilterProps } from './type/modal.type'

const ModalAdvanceFilter: FC<ModalAdvanceFilterProps> = (props) => {
    const {
        id = MDGeneralAdvanceFilter,
        title = 'Advance Filter',
        width = '',
        classNameModalDialog = '',
        colMDInputSearch = 'col-md-6',
        colMDDateRange = 'col-md-6',

        formRequest = {},
        actions = {
            clear: () => {},
            pagination: () => {},
            change: () => {},
            checkMaxMonth: () => {},
            attemptAdvanceFilter: () => {},

            countAdvance: () => {},
            setIsUseSearch: () => {},
            clearCount: () => {},
        },
        companyOfficeName = 'companyOfficeIds',

        statusList = [],
        statusName = 'statusIds',
        statusLabel = 'Status',
        placeholderStatus = 'Select Status',

        isBranchOffice = true,
        isUseDefaultInputText = true,
        isUseDefaultDateRange = true,
        isStatus = true,
        isLoading = false,

        isMaxMonthRange = true,

        isMDUseDefaultBtnMargin = true,

        // Place Holder
        placeholderSearch = 'e.g I Nyoman Arbi',

        advanceContent = null,
    } = props

    return (
        <ModalMiddle
            id={id}
            title={title}
            isHideClose
            isCentered={false}
            zIndex={1050}
            width={width}
            isScrollable={false}
            classNameModalDialog={classNameModalDialog}>
            <FormWrap
                actions={{
                    handleSubmit: () => {
                        if (isMaxMonthRange) {
                            actions.checkMaxMonth(true)
                        } else {
                            actions.pagination(1)
                            actions.attemptAdvanceFilter(true)
                        }
                    },
                }}
                className="my-0 pb-0">
                <WrapFormContext
                    formRequest={formRequest}
                    actions={{
                        change: (name, value) => actions.change(name, value),
                    }}>
                    <div className="row wrap-advance-search">
                        {isUseDefaultInputText ? (
                            <div className={colMDInputSearch + ' mb-3'}>
                                <FormInput
                                    id="text-input-search-modal"
                                    label="Search"
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
                            <div className={colMDDateRange + ' mb-3'}>
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
                        {/*    <div className="col-md-6">*/}
                        {/*        <SelectTreeOptionBranchOffice*/}
                        {/*            label="Branch Office"*/}
                        {/*            placeholder="Select Office"*/}
                        {/*            name={companyOfficeName}*/}
                        {/*            className="mb-3"*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*) : null}*/}

                        {isStatus && !isEmpty(statusList) ? (
                            <div className="col-md-6">
                                <SelectTreeOption
                                    label={statusLabel}
                                    placeholder={placeholderStatus}
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

                        {advanceContent || null}
                    </div>

                    <div className="row">
                        <div
                            className={joinClassNameHelper('col-md-6', {
                                'mt-3': isMDUseDefaultBtnMargin,
                            })}>
                            <BtnPrimary
                                isOutline
                                disabled={isLoading}
                                handle={() =>
                                    actions.attemptAdvanceFilter(true)
                                }
                                className="me-3">
                                Cancel
                            </BtnPrimary>

                            <BtnPrimary
                                type="submit"
                                disabled={isLoading}
                                handle={() => {
                                    actions.countAdvance()
                                    actions.setIsUseSearch(true)
                                }}>
                                Apply Search
                            </BtnPrimary>
                        </div>

                        <div
                            className={joinClassNameHelper(
                                'col-md-6 d-flex justify-content-end',
                                {
                                    'mt-3': isMDUseDefaultBtnMargin,
                                },
                            )}>
                            <button
                                className="btn btn-sm btn-link text-neutral-100 text-underline"
                                type="button"
                                disabled={isLoading}
                                onClick={() => {
                                    actions.clear()
                                    actions.clearCount()
                                }}>
                                Clear All
                            </button>
                        </div>
                    </div>
                </WrapFormContext>
            </FormWrap>
        </ModalMiddle>
    )
}

export default ModalAdvanceFilter
