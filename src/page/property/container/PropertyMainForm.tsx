import Card from '@/component/card/Card.tsx'
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
import { propertyMapFormAddress } from '@/page/property/param/propertyMainForm.param.ts'
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

        // Data Page
        __pageStateDataSearch,

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
                        <div className="row">
                            <div className="col-md-8">
                                <Card title="Property Information">
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
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
                                            isRequired></GeneralRowForm>
                                        <GeneralRowForm
                                            label="Unit Type"
                                            isRequired></GeneralRowForm>
                                        <GeneralRowForm
                                            label="Listing Type"
                                            isRequired></GeneralRowForm>
                                        <GeneralRowForm
                                            label="Currency"
                                            isRequired>
                                            <FormInput
                                                name="currency"
                                                required
                                                disabled
                                                placeholder="e.g AUD"
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Addresses"
                                            isRequired>
                                            {__formRequest.addresses.map(
                                                (vm, index) => {
                                                    const order = index + 1
                                                    const uniqId =
                                                        'addresses' + order

                                                    return (
                                                        <div
                                                            className="border border-neutral-400 p-3 rounded-3 mb-3"
                                                            key={index}>
                                                            <div
                                                                className="row align-items-end"
                                                                key={index}>
                                                                <div className="col-md">
                                                                    Address{' '}
                                                                    {index + 1}
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
                                                                    __formRequest.addresses
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
                                                                <FormTextArea
                                                                    label="Value"
                                                                    name="value"
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
                                            <FormInput
                                                label="Host Name"
                                                name="hostName"
                                                placeholder="e.g Lonjong"
                                            />
                                            <FormInput
                                                label="Wifi Name"
                                                name="wifiName"
                                                placeholder="e.g Beach Tonic Top"
                                            />
                                            <FormInputPassword
                                                label="Wifi Password"
                                                name="wifiPassword"
                                                placeholder="e.g tonic1234"
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Rooms"
                                            isRequired={false}></GeneralRowForm>

                                        <GeneralRowForm
                                            label="Availability"
                                            isRequired={false}>
                                            <FormInput
                                                label="Default Availability"
                                                name="defaultAvailabilityId"
                                                placeholder="e.g tonic1234"
                                            />
                                            <FormInput
                                                label="Advance Notice Value"
                                                name="advanceNoticeValue"
                                                placeholder="e.g tonic1234"
                                            />
                                            <FormInput
                                                label="Advance Notice Unit"
                                                name="advanceNoticeUnitId"
                                                placeholder="e.g tonic1234"
                                            />
                                            <FormInput
                                                label="Min Length Of Stay"
                                                name="minLengthOfStay"
                                                placeholder="e.g 324"
                                            />
                                            <FormInput
                                                label="Max Length Of Stay"
                                                name="maxLengthOfStay"
                                                placeholder="e.g 2122"
                                                isNumberOnly
                                            />
                                        </GeneralRowForm>

                                        <GeneralRowForm
                                            label="Pricing"
                                            isRequired>
                                            <FormInput
                                                label="Weekday BasePrice"
                                                name="weekdayBasePrice"
                                                placeholder="e.g tonic1234"
                                            />

                                            <FormInput
                                                label="Cleaning Fee"
                                                name="Cleaning Fee"
                                                placeholder="e.g tonic1234"
                                            />

                                            <FormInput
                                                label="Cleaning Fee Type"
                                                name="cleaningFeeTypeId"
                                                placeholder="e.g tonic1234"
                                            />

                                            <FormInput
                                                label="Weekly Discount"
                                                name="Weekly Discount"
                                                placeholder="e.g tonic1234"
                                            />

                                            <FormInput
                                                label="Cleaning Fee"
                                                name="cleaningFee"
                                                placeholder="e.g tonic1234"
                                            />
                                        </GeneralRowForm>
                                    </WrapFormContext>
                                </Card>
                            </div>
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
