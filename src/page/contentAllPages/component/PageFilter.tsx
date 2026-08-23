import SelectOptionPageStatus from '@/common/dataForm/SelectOptionPageStatus.tsx'
import SelectOptionLanguage from '@/common/dataForm/SelectOptionLanguage.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import AdvanceSearch from '@/component/general/AdvanceSearch.tsx'

const PageFilter = ({
    __search,
    __isLoading,
    actions,
}: {
    __search: any
    __isLoading: boolean
    actions: {
        __actionChange: (name, value) => void
        __actionPagination: (page) => void
        __actionClear: () => void
        __actionSetIsUseSearch: (isUse) => void
        __setSearch: (search) => void
    }
}) => {
    return (
        <AdvanceSearch
            formRequest={__search}
            isUseSearch={true}
            isUsePrevState
            placeholderSearch="e.g Mindful Travel"
            isAdvance={false}
            actions={{
                change: actions.__actionChange,
                pagination: actions.__actionPagination,
                clear: actions.__actionClear,
                setIsUseSearch: actions.__actionSetIsUseSearch,
                countAdvance: () => {},
                clearCount: () => {},
                getDataPrevSearch: actions.__setSearch,
            }}
            isLoading={__isLoading}
            baseContent={
                <>
                    <div className="col-md-4 col-lg-2">
                        <SelectOptionPageStatus
                            isUseHook
                            label="Status"
                            name="status"
                            className="mb-lg-0 mb-2"
                        />
                    </div>
                    <div className="col-md-4 col-lg-2">
                        <SelectOptionLanguage
                            isUseHook
                            label="Locale"
                            name="locale"
                            className="mb-lg-0 mb-2"
                        />
                    </div>
                </>
            }
        />
    )
}

export default PageFilter
