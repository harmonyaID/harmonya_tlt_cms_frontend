import { objectNavBread } from '@/config/objectNavBread.config.ts'
import boatPath from '@/path/boat.path.ts'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { boatInquiryPath } from '@/path/boatInquiry.path.ts'
import useLocationStateHook from '@/hook/useLocationState.hook.ts'
import useBoatInquiryMainForm from '@/common/dataFeature/boatInquiry/hook/useBoatInquiryMainForm.hook.ts'
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

const BoatInquiryMainForm = ({
    isEdit = false,
    title,
    basePath,
}: {
    isEdit?: boolean
    title: string
    basePath: any
}) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __handleSubmit,
        __handleCancel,
        __setFormRequest,
        __handleChange,
    } = useBoatInquiryMainForm({
        isEdit: isEdit,
        basePath: basePath,
    })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread(title, {
                        url: basePath.main,
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
                                            placeholder="e.g John"
                                            required
                                        />
                                    </GeneralRowForm>
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
                                        <FormInput
                                            name="phone"
                                            placeholder="e.g 393849393"
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
                                                    defaultValue: 'one_way',
                                                    label: 'One Way',
                                                },
                                                {
                                                    defaultValue: 'return',
                                                    label: 'Return',
                                                },
                                            ]}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Bali Land Location">
                                        <FormInput
                                            name="baliLandLocation"
                                            placeholder="e.g Something"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm
                                        label="Booked Through TLT"
                                        isRequired>
                                        <FormRadioButtonMulti
                                            name="bookedTHroughTlt"
                                            checkBoxs={[
                                                {
                                                    defaultValue: 0,
                                                    label: 'No',
                                                },
                                                {
                                                    defaultValue: 1,
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
                                    <GeneralRowForm label="Departure Date From Bali">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormInputDatePicker name="departureDateFromBali" />
                                            </div>
                                            <div className="col-md-6">
                                                <FormInputTimePicker
                                                    name="departureTimeFromBali"
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
                                    <GeneralRowForm label="Pick Up Location in Bali">
                                        <FormInput
                                            name="pickUpLocationBali"
                                            placeholder="e.g Location"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Flight Number">
                                        <FormInput
                                            name="flightNumber"
                                            isNumberOnly
                                            placeholder="e.g Number"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Arrival Time">
                                        <FormInputTimePicker
                                            name="arrivalTime"
                                            actions={{
                                                onChange: (name, value) =>
                                                    __handleChange(name, value),
                                            }}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Hotel Name Bali">
                                        <FormInput
                                            name="hotelNameBali"
                                            placeholder="e.g Name"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Hotel Contact Bali">
                                        <FormInput
                                            name="hotelContactBali"
                                            placeholder="e.g Contact"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm
                                        label="Departure Date From Lembongan"
                                        isRequired>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <FormInputDatePicker name="departureDateFromLembongan" />
                                            </div>
                                            <div className="col-md-6">
                                                <FormInputTimePicker
                                                    name="departureTimeFromLembongan"
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
                                    <GeneralRowForm label="Drop Off Location Bali">
                                        <FormInput
                                            name="dropOffLocationBali"
                                            placeholder="e.g Location"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Flight Time">
                                        <FormInputTimePicker
                                            name="flightTime"
                                            actions={{
                                                onChange: (name, value) =>
                                                    __handleChange(name, value),
                                            }}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Hotel Name Lembongan">
                                        <FormInput
                                            name="hotelNameLembongan"
                                            placeholder="e.g Name"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Accommodation Lembongan">
                                        <FormInput
                                            name="accommodationLembongan"
                                            placeholder="e.g Accomodation"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Passenger Names">
                                        <FormInput
                                            name="passengerNames"
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
                                                    defaultValue: 0,
                                                    label: 'No',
                                                },
                                                {
                                                    defaultValue: 1,
                                                    label: 'Yes',
                                                },
                                            ]}
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Hear About Us">
                                        <FormInput
                                            name="hearAboutUs"
                                            placeholder="e.g something"
                                        />
                                    </GeneralRowForm>
                                    <GeneralRowForm label="Message">
                                        <FormTextArea
                                            name="message"
                                            placeholder="e.g Type"
                                        />
                                    </GeneralRowForm>
                                </WrapFormContext>
                            </div>
                        </Card>

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

export default BoatInquiryMainForm
