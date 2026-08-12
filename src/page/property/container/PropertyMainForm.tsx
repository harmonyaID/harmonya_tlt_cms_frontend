import SearchPropertyAmenities from '@/common/dataForm/SearchPropertyAmenities.tsx'
import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import SelectBaseOptionLanguage from '@/common/dataForm/SelectBaseOptionLanguage.tsx'
import SelectBaseOptionStaticStatus from '@/common/dataForm/SelectBaseOptionStaticAddressType.tsx'
import SelectBaseOptionStaticAdvanceNoticeUnit from '@/common/dataForm/SelectBaseOptionStaticAdvanceNoticeUnit.tsx'
import SelectBaseOptionStaticAvailabilityType from '@/common/dataForm/SelectBaseOptionStaticAvailabilityType.tsx'
import SelectBaseOptionStaticCleaningFeeType from '@/common/dataForm/SelectBaseOptionStaticCleaningFeeType.tsx'
import SelectBaseOptionStaticListingType from '@/common/dataForm/SelectBaseOptionStaticListingType.tsx'
import SelectBaseOptionStaticSourceType from '@/common/dataForm/SelectBaseOptionStaticSourceType.tsx'
import SelectBaseOptionStaticUnitType from '@/common/dataForm/SelectBaseOptionStaticUnitType.tsx'
import SelectOptionPropertyBedType from '@/common/dataForm/SelectOptionPropertyBedType.tsx'
import SelectOptionPropertyRoomType from '@/common/dataForm/SelectOptionPropertyRoomType.tsx'
import SelectOptionPropertyTag from '@/common/dataForm/SelectOptionPropertyTag.tsx'
import SelectOptionPropertyType from '@/common/dataForm/SelectOptionPropertyType.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { BtnCircleRemove, BtnPrimary } from '@/component/general/Button.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import usePropertyMainForm from '@/page/property/hook/usePropertyMainForm.hook.ts'
import {
    propertyMapFormAddress,
    propertyMapFormDesc,
} from '@/page/property/param/propertyMainForm.param.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'

const PropertyMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __setFormRequest,
        __isLoading,
        __isLoadingDetail,
        __handleChange,
        __handleArrToggle,
        __handleArrChange,
        __handleChangeWithParent,

        // Data Page
        __pageStateDataSearch,

        // Tag's
        __handleTagChoose,
        __handleTagRemove,
        __listTags,
        __setListTags,

        // Amenities
        __listAmenities,
        __listAmenitiesIds,
        __handleAmenitiesChoose,
        __handleAmenitiesRemove,

        // SEO
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // Submit / Cancel
        __handleSubmit,
        __handleCancel,
    } = usePropertyMainForm({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Property', {
                        url: contentExperiencePath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {__isLoadingDetail && isEdit ? (
                <Loading />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}>
                        <div className="vstack gap-3">
                            <CardDropdown
                                title="Property Information"
                                isShow
                                id="section-property-main-info">
                                <div className="row">
                                    <div className="col-md-10">
                                        <WrapFormContext
                                            formRequest={__formRequest}
                                            actions={{
                                                change: __handleChange,
                                                changeTags: __handleTagChoose,
                                            }}>
                                            <GeneralRowForm
                                                label="Nick Name"
                                                isRequired>
                                                <FormInput
                                                    name="nickname"
                                                    placeholder="e.g Amara"
                                                    required
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Property Type"
                                                isRequired>
                                                <SelectOptionPropertyType
                                                    name="propertyTypeId"
                                                    isUseHook
                                                    required
                                                    ids={[
                                                        ...(__formRequest.propertyTypeId
                                                            ? [
                                                                  __formRequest.propertyTypeId,
                                                              ]
                                                            : []),
                                                    ]}
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Source Type"
                                                isRequired>
                                                <SelectBaseOptionStaticSourceType
                                                    name="sourceTypeId"
                                                    isRequired
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Unit Type"
                                                isRequired>
                                                <SelectBaseOptionStaticUnitType
                                                    name="unitTypeId"
                                                    isRequired
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Listing Type"
                                                isRequired>
                                                <SelectBaseOptionStaticListingType />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Occupancy"
                                                isRequired>
                                                <FormInput
                                                    name="occupancy"
                                                    placeholder="e.g 4"
                                                    isNumberOnly
                                                    required
                                                />
                                            </GeneralRowForm>

                                            {/*<GeneralRowForm*/}
                                            {/*    label="Currency"*/}
                                            {/*    isRequired>*/}
                                            {/*    <FormInput*/}
                                            {/*        name="currency"*/}
                                            {/*        required*/}
                                            {/*        disabled*/}
                                            {/*        placeholder="e.g AUD"*/}
                                            {/*    />*/}
                                            {/*</GeneralRowForm>*/}

                                            <GeneralRowForm
                                                label="Addresses"
                                                isRequired>
                                                {__formRequest?.addresses?.map(
                                                    (vm, index) => {
                                                        const order = index + 1
                                                        const uniqId =
                                                            'addresses' + order

                                                        return (
                                                            <div
                                                                className="border border-neutral-400 p-3 rounded-3 mb-3"
                                                                key={index}>
                                                                <div
                                                                    className="row align-items-top"
                                                                    key={index}>
                                                                    <div className="col-md">
                                                                        <h6 className="mb-0">
                                                                            Address{' '}
                                                                            {index +
                                                                                1}
                                                                        </h6>
                                                                    </div>
                                                                    <div className="col-auto pb-2">
                                                                        <BtnCircleRemove
                                                                            actions={{
                                                                                remove: () =>
                                                                                    __handleArrToggle(
                                                                                        index,
                                                                                        'addresses',
                                                                                    ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <WrapFormContext
                                                                    formRequest={
                                                                        vm
                                                                    }
                                                                    actions={{
                                                                        change: (
                                                                            name,
                                                                            value,
                                                                        ) =>
                                                                            __handleArrChange(
                                                                                index,
                                                                                name,
                                                                                value,
                                                                                'addresses',
                                                                            ),
                                                                    }}>
                                                                    <FormInput
                                                                        label="Building Name"
                                                                        name="buildingName"
                                                                        placeholder="e.g Ruko"
                                                                    />

                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <SelectBaseOptionStaticStatus label="Type" />
                                                                        </div>

                                                                        <div className="col-md-6">
                                                                            <FormInput
                                                                                label="Zip Code"
                                                                                name="zipCode"
                                                                                isNumberOnly
                                                                                placeholder="e.g 80023"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <FormInput
                                                                                label="Latitude"
                                                                                name="latitude"
                                                                                isNumberOnly
                                                                                placeholder="e.g -8.679556"
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <FormInput
                                                                                label="Longitude"
                                                                                name="longitude"
                                                                                isNumberOnly
                                                                                placeholder="e.g 115.446632"
                                                                            />
                                                                        </div>
                                                                    </div>

                                                                    <FormTextArea
                                                                        label="Address"
                                                                        name="address"
                                                                        placeholder="e.g Jl Purba, Denpasar Bali"
                                                                    />
                                                                </WrapFormContext>
                                                            </div>
                                                        )
                                                    },
                                                )}

                                                <BtnPrimary
                                                    type="button"
                                                    isOutline
                                                    className="w-100 mt-0 mb-3"
                                                    handle={() =>
                                                        __handleArrToggle(
                                                            -1,
                                                            'addresses',
                                                            propertyMapFormAddress(),
                                                        )
                                                    }>
                                                    Add New Address
                                                </BtnPrimary>
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Guest Info"
                                                isRequired={false}>
                                                <WrapFormContext
                                                    formRequest={
                                                        __formRequest.guestInfo
                                                    }
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleChangeWithParent(
                                                                name,
                                                                value,
                                                                'guestInfo',
                                                            ),
                                                    }}>
                                                    <FormInput
                                                        label="Host Name"
                                                        name="hostName"
                                                        placeholder="e.g Lonjong"
                                                    />
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Wifi Name"
                                                                name="wifiName"
                                                                placeholder="e.g Beach Tonic Top"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInputPassword
                                                                label="Wifi Password"
                                                                name="wifiPassword"
                                                                placeholder="e.g tonic1234"
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Rooms"
                                                isRequired={false}>
                                                {__formRequest?.rooms?.map(
                                                    (vm, index) => {
                                                        const order = index + 1

                                                        return (
                                                            <div
                                                                className="border border-neutral-400 p-3 rounded-3 mb-3"
                                                                key={index}>
                                                                <div
                                                                    className="row align-items-top"
                                                                    key={index}>
                                                                    <div className="col-md">
                                                                        <h6 className="mb-0">
                                                                            Room{' '}
                                                                            {index +
                                                                                1}
                                                                        </h6>
                                                                    </div>
                                                                    <div className="col-auto pb-2">
                                                                        <BtnCircleRemove
                                                                            actions={{
                                                                                remove: () =>
                                                                                    __handleArrToggle(
                                                                                        index,
                                                                                        'rooms',
                                                                                    ),
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <WrapFormContext
                                                                    formRequest={
                                                                        vm
                                                                    }
                                                                    actions={{
                                                                        change: (
                                                                            name,
                                                                            value,
                                                                        ) =>
                                                                            __handleArrChange(
                                                                                index,
                                                                                name,
                                                                                value,
                                                                                'rooms',
                                                                            ),
                                                                    }}>
                                                                    <SelectOptionPropertyRoomType
                                                                        label="Room Type"
                                                                        name="roomTypeId"
                                                                        isUseHook
                                                                        // required
                                                                        ids={[
                                                                            ...(vm.roomTypeId
                                                                                ? [
                                                                                      vm.roomTypeId,
                                                                                  ]
                                                                                : []),
                                                                        ]}
                                                                    />
                                                                    <FormInput
                                                                        label="Label"
                                                                        name="label"
                                                                        placeholder="e.g Bedroom"
                                                                    />
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <SelectOptionPropertyBedType
                                                                                label="Bed Type"
                                                                                name="bedTypeId"
                                                                                isUseHook
                                                                                ids={[
                                                                                    ...(vm.bedTypeId
                                                                                        ? [
                                                                                              vm.bedTypeId,
                                                                                          ]
                                                                                        : []),
                                                                                ]}
                                                                            />
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <FormInput
                                                                                label="Bed Count"
                                                                                name="bedCount"
                                                                                placeholder="e.g 3"
                                                                                isNumberOnly
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <FormInput
                                                                        label="Order"
                                                                        name="order"
                                                                        placeholder="e.g 3"
                                                                        isNumberOnly
                                                                    />
                                                                </WrapFormContext>
                                                            </div>
                                                        )
                                                    },
                                                )}

                                                <BtnPrimary
                                                    type="button"
                                                    isOutline
                                                    className="w-100 mt-0 mb-3"
                                                    handle={() =>
                                                        __handleArrToggle(
                                                            -1,
                                                            'rooms',
                                                            propertyMapFormAddress(),
                                                        )
                                                    }>
                                                    Add New Room
                                                </BtnPrimary>
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Availability"
                                                isRequired={false}>
                                                <WrapFormContext
                                                    formRequest={
                                                        __formRequest.availability
                                                    }
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleChangeWithParent(
                                                                name,
                                                                value,
                                                                'availability',
                                                            ),
                                                    }}>
                                                    <SelectBaseOptionStaticAvailabilityType
                                                        label="Default Availability"
                                                        name="defaultAvailabilityId"
                                                    />

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Advance Notice Value"
                                                                name="advanceNoticeValue"
                                                                placeholder="e.g tonic1234"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <SelectBaseOptionStaticAdvanceNoticeUnit label="Advance Notice Unit" />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Min Length Of Stay"
                                                                name="minLengthOfStay"
                                                                placeholder="e.g 324"
                                                                isNumberOnly
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Max Length Of Stay"
                                                                name="maxLengthOfStay"
                                                                placeholder="e.g 2122"
                                                                isNumberOnly
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Pricing">
                                                <FormInput
                                                    label="Currency"
                                                    name="currency"
                                                    required
                                                    disabled
                                                    placeholder="e.g AUD"
                                                />

                                                <WrapFormContext
                                                    formRequest={
                                                        __formRequest.pricing
                                                    }
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleChangeWithParent(
                                                                name,
                                                                value,
                                                                'pricing',
                                                            ),
                                                    }}>
                                                    <FormInput
                                                        label="Weekday BasePrice"
                                                        name="weekdayBasePrice"
                                                        placeholder="e.g 3"
                                                    />

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <SelectBaseOptionStaticCleaningFeeType label="Cleaning Fee Type" />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Cleaning Fee"
                                                                name="cleaningFee"
                                                                placeholder="e.g 2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Weekly Discount"
                                                                name="weeklyDiscount"
                                                                placeholder="e.g 20"
                                                            />
                                                        </div>

                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Monthly Discount"
                                                                name="monthlyDiscount"
                                                                placeholder="e.g 20"
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Tags">
                                                <SelectOptionPropertyTag
                                                    name="tagIds"
                                                    nameOfChange="changeTags"
                                                    isMarginBottom={false}
                                                    required={
                                                        __formRequest?.tagIds
                                                            ?.length
                                                            ? false
                                                            : true
                                                    }
                                                    isUseHook
                                                    isOnlyChoose
                                                    isMulti
                                                    isClearable
                                                    ids={
                                                        __formRequest?.tagIds
                                                            ? __formRequest.tagIds
                                                            : []
                                                    }

                                                    // Layout Only Choose
                                                    dataList={__listTags}
                                                    dataActions={{
                                                        remove: __handleTagRemove,
                                                    }}
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Amenities">
                                                <SearchPropertyAmenities
                                                    isOnlyChoose
                                                    isUseHook={false}
                                                    name="amenities"
                                                    amenitiesIds={
                                                        __listAmenitiesIds
                                                    }
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                            data,
                                                        ) =>
                                                            __handleAmenitiesChoose(
                                                                data,
                                                            ),
                                                    }}
                                                />

                                                {__listAmenities?.length ? (
                                                    <>
                                                        <div className="mb-4 max-h-400px bg-neutral-600 px-3 pb-3 pt-1 rounded-2 overflow-auto">
                                                            {__listAmenities.map(
                                                                (vm, index) => (
                                                                    <div
                                                                        className="hstack justify-content-between align-items-center border-dashed border-neutral-400 border-1 py-2"
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <h6 className="fw-400 mb-0">
                                                                            {
                                                                                vm.name
                                                                            }
                                                                        </h6>

                                                                        <div className="flex-shrink-0">
                                                                            <BtnCircleRemove
                                                                                className="ms-auto"
                                                                                actions={{
                                                                                    remove: () =>
                                                                                        __handleAmenitiesRemove(
                                                                                            vm,
                                                                                        ),
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </>
                                                ) : null}
                                            </GeneralRowForm>
                                        </WrapFormContext>
                                    </div>
                                </div>
                            </CardDropdown>

                            <CardDropdown title="Description" isShow>
                                <div className="row">
                                    <div className="col-md-10">
                                        <WrapFormContext
                                            formRequest={
                                                __formRequest.descriptions
                                            }
                                            actions={{
                                                change: (name, value) =>
                                                    __handleChangeWithParent(
                                                        name,
                                                        value,
                                                        'descriptions',
                                                    ),
                                            }}>
                                            {__formRequest?.descriptions?.map(
                                                (vm, index) => {
                                                    const order = index + 1

                                                    return (
                                                        <div
                                                            className="border border-neutral-400 px-3 pt-3 rounded-3 mb-3"
                                                            key={index}>
                                                            <div
                                                                className="row align-items-top pb-4"
                                                                key={index}>
                                                                <div className="col-md">
                                                                    <h6 className="mb-0">
                                                                        Description{' '}
                                                                        {index +
                                                                            1}
                                                                    </h6>
                                                                </div>
                                                                <div className="col-auto">
                                                                    <BtnCircleRemove
                                                                        actions={{
                                                                            remove: () =>
                                                                                __handleArrToggle(
                                                                                    index,
                                                                                    'descriptions',
                                                                                ),
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>

                                                            <WrapFormContext
                                                                formRequest={vm}
                                                                actions={{
                                                                    change: (
                                                                        name,
                                                                        value,
                                                                    ) =>
                                                                        __handleArrChange(
                                                                            index,
                                                                            name,
                                                                            value,
                                                                            'descriptions',
                                                                        ),
                                                                }}>
                                                                <GeneralRowForm
                                                                    label="Language"
                                                                    isRequired>
                                                                    <SelectBaseOptionLanguage
                                                                        name="language"
                                                                        isRequired
                                                                    />
                                                                </GeneralRowForm>

                                                                <GeneralRowForm
                                                                    label="Title"
                                                                    isRequired={
                                                                        false
                                                                    }>
                                                                    <FormInput
                                                                        // label="Title"
                                                                        name="title"
                                                                        placeholder="e.g Primary"
                                                                    />
                                                                </GeneralRowForm>

                                                                <GeneralRowForm
                                                                    label="Channel"
                                                                    isRequired={
                                                                        false
                                                                    }>
                                                                    <FormInput
                                                                        // label="Channel"
                                                                        name="channel"
                                                                        placeholder="e.g Primary"
                                                                    />
                                                                </GeneralRowForm>

                                                                <GeneralRowForm
                                                                    label="Getting Around"
                                                                    isRequired={
                                                                        false
                                                                    }>
                                                                    <FormInput
                                                                        // label="Getting Around"
                                                                        name="gettingAround"
                                                                        placeholder="e.g Car"
                                                                    />
                                                                </GeneralRowForm>

                                                                <GeneralRowForm
                                                                    label="Guest Access"
                                                                    isRequired={
                                                                        false
                                                                    }>
                                                                    <FormInput
                                                                        // label="Guest Access"
                                                                        name="guestAccess"
                                                                        placeholder="e.g Root"
                                                                    />
                                                                </GeneralRowForm>

                                                                <GeneralRowForm
                                                                    label="Summary"
                                                                    isRequired={
                                                                        false
                                                                    }>
                                                                    <FormTextArea
                                                                        name="summary"
                                                                        placeholder="e.g Root"
                                                                    />
                                                                </GeneralRowForm>
                                                            </WrapFormContext>
                                                        </div>
                                                    )
                                                },
                                            )}
                                        </WrapFormContext>

                                        <div className="row justify-content-center">
                                            <div className="col-md-12">
                                                <BtnPrimary
                                                    type="button"
                                                    isOutline
                                                    className="w-100 mt-0 mb-3"
                                                    handle={() =>
                                                        __handleArrToggle(
                                                            -1,
                                                            'descriptions',
                                                            propertyMapFormDesc(),
                                                        )
                                                    }>
                                                    Add New Description
                                                </BtnPrimary>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardDropdown>

                            <SectionFormSEOInfo
                                classNameColumn="col-md-10"
                                __formRequest={__formRequest}
                                __handleChangeWithParent={
                                    __handleChangeWithParent
                                }

                                // SEO Thumbnail
                                __seoThumbnail={__seoThumbnail}
                                __setSetSEOThumbnail={__setSetSEOThumbnail}
                                __handleSEOThumbnailRemove={
                                    __handleSEOThumbnailRemove
                                }
                            />
                        </div>

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() =>
                                __handleCancel(__pageStateDataSearch)
                            }
                        />
                    </FormWrap>
                </>
            )}
        </>
    )
}

export default PropertyMainForm
