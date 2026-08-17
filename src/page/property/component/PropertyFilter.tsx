import SelectOptionBoatType from '@/common/dataForm/SelectOptionBoatType.tsx'
import AdvanceSearch from '@/component/general/AdvanceSearch.tsx'
import SelectOptionPropertyType from '@/common/dataForm/SelectOptionPropertyType.tsx'
import SelectBaseOptionStaticSourceType from '@/common/dataForm/SelectBaseOptionStaticSourceType.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import SelectOptionPropertyTag from '@/common/dataForm/SelectOptionPropertyTag.tsx'
import SelectOptionPropertyAmenitiesCategory from '@/common/dataForm/SelectOptionPropertyAmenitiesCategory.tsx'

const PropertyFilter = ({
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
            placeholderSearch="e.g Beach Tonic"
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
                        <SelectOptionPropertyType
                            name="typeIds"
                            isUseHook
                            className="mb-lg-0 mb-2"
                            label="Type"
                        />
                    </div>
                    <div className="col-md-4 col-lg-2">
                        <div className="hstack gap-1 align-items-end">
                            <FormInput
                                label="Occupancy"
                                name="occupancyFrom"
                                placeholder="0"
                                isNumberOnly
                                className="mb-lg-0 mb-2"
                            />
                            <p className="mb-2 text-neutral-400">to</p>
                            <FormInput
                                name="occupancyTo"
                                placeholder="100"
                                isNumberOnly
                                className="mb-lg-0 mb-2"
                            />
                        </div>
                    </div>
                </>
            }
            advanceContent={
                <>
                    <div className="col-6">
                        <SelectOptionPropertyType
                            name="typeIds"
                            isUseHook
                            label="Type"
                        />
                    </div>
                    <div className="col-6">
                        <div className="hstack gap-1 align-items-end">
                            <FormInput
                                label="Occupancy"
                                name="occupancyFrom"
                                placeholder="0"
                                isNumberOnly
                            />
                            <p className="text-neutral-400">to</p>
                            <FormInput
                                name="occupancyTo"
                                placeholder="100"
                                isNumberOnly
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <SelectOptionPropertyTag
                            name="tagIds"
                            isUseHook
                            label="Tag"
                        />
                    </div>
                    <div className="col-6">
                        <SelectOptionPropertyAmenitiesCategory
                            name="tagIds"
                            isUseHook
                            label="Amenities Category"
                        />
                    </div>
                </>
            }
        />
    )
}

export default PropertyFilter
