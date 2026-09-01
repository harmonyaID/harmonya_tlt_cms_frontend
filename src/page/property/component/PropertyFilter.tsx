import SelectOptionBoatType from '@/common/dataForm/SelectOptionBoatType.tsx'
import AdvanceSearch from '@/component/general/AdvanceSearch.tsx'
import SelectOptionPropertyType from '@/common/dataForm/SelectOptionPropertyType.tsx'
import SelectBaseOptionStaticSourceType from '@/common/dataForm/SelectBaseOptionStaticSourceType.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import SelectOptionPropertyTag from '@/common/dataForm/SelectOptionPropertyTag.tsx'
import SelectOptionPropertyAmenitiesCategory from '@/common/dataForm/SelectOptionPropertyAmenitiesCategory.tsx'
import FormRange from '@/component/form/FormRange.tsx'
import SelectOptionPropertySourceType from '@/common/dataForm/SelectOptionPropertySourceType.tsx'

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
                            name="propertyTypeIds"
                            isUseHook
                            className="mb-lg-0 mb-2"
                            label="Type"
                        />
                    </div>
                    <div className="col-md-4 col-lg-2">
                        <SelectOptionPropertySourceType
                            name="sourceTypeIds"
                            label="Source Type"
                            isUseHook
                            className="mb-lg-0 mb-2"
                        />
                    </div>
                </>
            }
            advanceContent={
                <>
                    <div className="col-6">
                        <SelectOptionPropertyType
                            name="propertyTypeIds"
                            isUseHook
                            label="Type"
                        />
                    </div>
                    <div className="col-6">
                        <div className="hstack gap-1 align-items-end">
                            <FormRange
                                label="Occupancy"
                                name="occupancyMax"
                                placeholder="0"
                                type="range"
                                min={0}
                                max={100}
                                className="mb-lg-0 mb-2"
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
                    <div className="col-6">
                        <FormInput
                            name="area"
                            label="Area"
                            placeholder="e.g. JungutBatu"
                        />
                    </div>
                    <div className="col-6">
                        <SelectOptionPropertySourceType
                            name="sourceTypeIds"
                            label="Source Type"
                            isUseHook
                        />
                    </div>
                </>
            }
        />
    )
}

export default PropertyFilter
