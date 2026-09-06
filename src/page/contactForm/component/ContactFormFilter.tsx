import SelectOptionContactFormType from '@/common/dataForm/SelectOptionContactFormType.tsx'
import AdvanceSearch from '@/component/general/AdvanceSearch.tsx'

const ContactFormFilter = ({
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
            placeholderSearch="e.g D'Stars Fast Ferry"
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
                        <SelectOptionContactFormType
                            name="contactFormTypeIds"
                            isUseHook
                            className="mb-lg-0 mb-2"
                            label="Form Type"
                        />
                    </div>
                </>
            }
        />
    )
}

export default ContactFormFilter
