import { objectNavBread } from '@/config/objectNavBread.config.ts'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import useBoatInquiryMainForm from '@/page/boatInquiry/hook/useBoatInquiryMainForm.hook.ts'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import Card from '@/component/card/Card.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import FormInputDatePicker from '@/component/form/FormInputDatePicker.tsx'
import FormInputTimePicker from '@/component/form/FormInputTimePicker.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import SelectOptionBoat from '@/common/dataForm/SelectOptionBoat.tsx'
import FormInputPhone from '@/component/form/FormInputPhone.tsx'
import SelectOptionBoatInquiryPoint from '@/common/dataForm/SelectOptionBoatInquiryPoint.tsx'

const RETURN = 'return'
const ONE_WAY = 'one_way'

const BoatInquiryMainForm = ({
    isEdit = false,
    title,
}: {
    isEdit?: boolean
    title: string
}) => {
    const {
        __formRequest,
        __isLoading,
        __mainPath,
        __pageStateDataSearch,
        __handleSubmit,
        __handleCancel,
        __handleChange,
    } = useBoatInquiryMainForm()

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread(title, {
                        url: __mainPath,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {isEdit ? (
                <Loading />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}
                        className="vstack gap-3">
                        <Card title={title + ' Information'}>
                            <div className="col-md-9">
                                <WrapFormContext
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                    }}>
                                    <GeneralRowForm label="Boat" isRequired>
                                        <SelectOptionBoat
                                            name="boatId"
                                            isUseHook
                                            placeholder="e.g Andromeda"
                                            required
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm
                                        label="Ticket Type"
                                        isRequired>
                                        <FormRadioButtonMulti
                                            name="ticketType"
                                            checkBoxs={[
                                                {
                                                    defaultValue: ONE_WAY,
                                                    label: 'One Way',
                                                },
                                                {
                                                    defaultValue: RETURN,
                                                    label: 'Return',
                                                },
                                            ]}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Location">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormInput
                                                    label="From"
                                                    name="fromLocation"
                                                    placeholder="e.g Something"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormInput
                                                    label="To"
                                                    name="toLocation"
                                                    placeholder="e.g Something"
                                                />
                                            </div>
                                        </div>
                                    </GeneralRowForm>
                                    <GeneralRowForm
                                        label="Departure Date & Time"
                                        isRequired>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormInputDatePicker
                                                    name="departureDate"
                                                    label="Date"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <FormInputTimePicker
                                                    label="Time"
                                                    name="departureTime"
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                        ) =>
                                                            __handleChange(
                                                                name,
                                                                value,
                                                            ),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </GeneralRowForm>
                                    {__formRequest.ticketType === RETURN && (
                                        <GeneralRowForm
                                            label="Return Date & Time"
                                            isRequired>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <FormInputDatePicker
                                                        name="returnDate"
                                                        label="Date"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <FormInputTimePicker
                                                        label="Time"
                                                        name="returnTime"
                                                        actions={{
                                                            onChange: (
                                                                name,
                                                                value,
                                                            ) =>
                                                                __handleChange(
                                                                    name,
                                                                    value,
                                                                ),
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </GeneralRowForm>
                                    )}
                                    <GeneralRowForm label="Adult Count">
                                        <FormInput
                                            name="adultCount"
                                            isNumberOnly
                                            min={0}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Child Count">
                                        <FormInput
                                            name="childCount"
                                            isNumberOnly
                                            min={0}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Infant Count">
                                        <FormInput
                                            name="infantCount"
                                            isNumberOnly
                                            min={0}
                                        />
                                    </GeneralRowForm>

                                    <h5 className="text-neutral-400 fs-16 mt-5 mb-3">
                                        Passenger Information
                                    </h5>
                                    <GeneralRowForm label="Name" isRequired>
                                        <FormInput
                                            name="name"
                                            placeholder="e.g John"
                                            required
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Email" isRequired>
                                        <FormInput
                                            name="email"
                                            placeholder="e.g mail@mail.com"
                                            required
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Phone" isRequired>
                                        <FormInputPhone
                                            value={__formRequest.phone}
                                            actions={{
                                                onChange: (value) =>
                                                    __handleChange(
                                                        'phone',
                                                        value,
                                                    ),
                                            }}
                                        />
                                    </GeneralRowForm>

                                    <h5 className="text-neutral-400 fs-16 mt-5 mb-3">
                                        Transport Information
                                    </h5>

                                    <GeneralRowForm
                                        label="Need Land Transport"
                                        isRequired>
                                        <FormRadioButtonMulti
                                            name="needLandTransport"
                                            checkBoxs={[
                                                {
                                                    defaultValue: '0',
                                                    label: 'No',
                                                },
                                                {
                                                    defaultValue: '1',
                                                    label: 'Yes',
                                                },
                                            ]}
                                        />
                                    </GeneralRowForm>

                                    {__formRequest.needLandTransport ===
                                        '1' && (
                                        <>
                                            <GeneralRowForm label="Departure">
                                                <SelectOptionBoatInquiryPoint
                                                    label="Pickup Point"
                                                    name="departurePickupPoint"
                                                />
                                                <FormInput
                                                    label="Flight Number"
                                                    name="departurePickupFlightNumber"
                                                    isNumberOnly
                                                    placeholder="e.g Number"
                                                />
                                                <FormInputTimePicker
                                                    label="Arrival Time"
                                                    name="arrivalTime"
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                        ) =>
                                                            __handleChange(
                                                                name,
                                                                value,
                                                            ),
                                                    }}
                                                />
                                                <SelectOptionBoatInquiryPoint
                                                    label="Drop Off Point"
                                                    name="departureDropOffPoint"
                                                />
                                                <FormInput
                                                    label="Drop Off Location"
                                                    name="departureDropOffLocation"
                                                    placeholder="e.g Location"
                                                />
                                                <FormInputTimePicker
                                                    label="Drop Off Arrival Time"
                                                    name="departureDropOffArrivalTime"
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                        ) =>
                                                            __handleChange(
                                                                name,
                                                                value,
                                                            ),
                                                    }}
                                                />
                                            </GeneralRowForm>

                                            {__formRequest.ticketType ===
                                                RETURN && (
                                                <GeneralRowForm label="Return">
                                                    <SelectOptionBoatInquiryPoint
                                                        label="Return Pickup Point"
                                                        name="returnPickupPoint"
                                                    />
                                                    <FormInput
                                                        label="Return Pickup Location"
                                                        name="returnPickupLocation"
                                                        placeholder="e.g Location"
                                                    />
                                                    <FormInputTimePicker
                                                        label="Return Checkout Time"
                                                        name="returnPickupCheckoutTime"
                                                        actions={{
                                                            onChange: (
                                                                name,
                                                                value,
                                                            ) =>
                                                                __handleChange(
                                                                    name,
                                                                    value,
                                                                ),
                                                        }}
                                                    />
                                                    <SelectOptionBoatInquiryPoint
                                                        label="Return Drop Off Point"
                                                        name="returnDropOffPoint"
                                                    />
                                                    <FormInput
                                                        label="Return Drop Off Location"
                                                        name="returnDropOffLocation"
                                                        placeholder="e.g Location"
                                                    />
                                                </GeneralRowForm>
                                            )}
                                        </>
                                    )}

                                    <h5 className="text-neutral-400 fs-16 mt-5 mb-3">
                                        Extra Information
                                    </h5>

                                    <GeneralRowForm
                                        label="Booked Through TLT"
                                        isRequired>
                                        <FormRadioButtonMulti
                                            name="bookedTHroughTlt"
                                            checkBoxs={[
                                                {
                                                    defaultValue: '0',
                                                    label: 'No',
                                                },
                                                {
                                                    defaultValue: '1',
                                                    label: 'Yes',
                                                },
                                            ]}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="TLT Booking Ref Name">
                                        <FormInput
                                            name="tltBookingRefName"
                                            placeholder="e.g Name"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm
                                        label="Has Surf Board"
                                        isRequired>
                                        <FormRadioButtonMulti
                                            name="hasSurfboard"
                                            checkBoxs={[
                                                {
                                                    defaultValue: '0',
                                                    label: 'No',
                                                },
                                                {
                                                    defaultValue: '1',
                                                    label: 'Yes',
                                                },
                                            ]}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Message">
                                        <FormTextArea
                                            name="message"
                                            className="mb-0"
                                            placeholder="e.g Type"
                                        />
                                    </GeneralRowForm>
                                </WrapFormContext>
                            </div>
                        </Card>

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() => __handleCancel()}
                        />
                    </FormWrap>
                </>
            )}
        </>
    )
}

export default BoatInquiryMainForm
