import useUserMainFormHook from '@/page/user/hook/useUserMainForm.hook.ts'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import boatPath from '@/path/boat.path.ts'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import userPath from '@/path/user.path.ts'
import { Loading, NotAvailable } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import Card from '@/component/card/Card.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import { WrapFormContext } from '@/context/Form.context.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'
import SelectOptionCountry from '@/common/dataForm/SelectOptionCountry.tsx'
import { isEmpty } from 'lodash'

const UserMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __setFormRequest,
        __handleChange,
        __dataDetail,

        __handleSubmit,
        __handleCancel,
    } = useUserMainFormHook({ isEdit })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Staff', {
                        url: userPath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {__isLoadingDetail && isEdit ? (
                <Loading />
            ) : isEmpty(__dataDetail) && isEdit ? (
                <NotAvailable isCard />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}
                        className="vstack gap-1">
                        <Card title="Staff Information">
                            <div className="row">
                                <div className="col-md-8">
                                    <WrapFormContext
                                        formRequest={__formRequest}
                                        actions={{
                                            change: __handleChange,
                                        }}>
                                        <GeneralRowForm
                                            label="Full Name"
                                            isRequired>
                                            <FormInput
                                                name="fullName"
                                                placeholder="e.g Arbi TLT"
                                                required
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Gender"
                                            isRequired>
                                            <FormRadioButtonMulti
                                                name="genderId"
                                                checkBoxs={[
                                                    {
                                                        defaultValue: 1,
                                                        label: 'Male',
                                                    },
                                                    {
                                                        defaultValue: 2,
                                                        label: 'Female',
                                                    },
                                                ]}
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Country"
                                            isRequired>
                                            <SelectOptionCountry
                                                name="countryId"
                                                required
                                                isUseHook
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Address"
                                            isRequired>
                                            <FormTextArea
                                                name="address"
                                                placeholder="e.g Fast ferry from Sanur to Nusa Lembongan"
                                                required
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Contact"
                                            isRequired>
                                            <FormInput
                                                label="Phone"
                                                name="phone"
                                                required
                                                placeholder="e.g 08100xxxx"
                                                isNumberOnly
                                            />

                                            <FormInput
                                                label="Email"
                                                name="email"
                                                placeholder="e.g demo@tlt.com"
                                                required
                                                type="email"
                                            />
                                        </GeneralRowForm>

                                        {!isEdit ? (
                                            <GeneralRowForm
                                                label="Config Password"
                                                isRequired>
                                                <FormInputPassword
                                                    label="Password"
                                                    name="password"
                                                    required
                                                />
                                                <FormInputPassword
                                                    label="Confirm Password"
                                                    name="confirmPassword"
                                                    required
                                                />
                                            </GeneralRowForm>
                                        ) : null}
                                        <GeneralRowForm
                                            label="Status"
                                            isRequired>
                                            <FormRadioButtonMulti
                                                name="isActive"
                                                checkBoxs={[
                                                    {
                                                        defaultValue: false,
                                                        label: 'Not Active',
                                                    },
                                                    {
                                                        defaultValue: true,
                                                        label: 'Active',
                                                    },
                                                ]}
                                            />
                                        </GeneralRowForm>
                                        <GeneralRowForm
                                            label="Super Admin"
                                            isRequired>
                                            <FormRadioButtonMulti
                                                name="isSuperadmin"
                                                checkBoxs={[
                                                    {
                                                        defaultValue: false,
                                                        label: 'No',
                                                    },
                                                    {
                                                        defaultValue: true,
                                                        label: 'Yes',
                                                    },
                                                ]}
                                            />
                                        </GeneralRowForm>
                                    </WrapFormContext>
                                </div>
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

export default UserMainForm
