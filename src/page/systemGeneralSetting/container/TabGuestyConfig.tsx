import { useState } from 'react'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { objectTabContent } from '@/config/objectNavTab.config.ts'
import useDataDetailHook from '@/hook/base/useDataDetail.hook.ts'
import {
    getGuestyConfig,
    testGuestyConfig,
    updateGuestyConfig,
} from '@/service/api/systemManagement.api.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { MDGuestyConfigForm} from '@/config/modal.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormInputPassword from '@/component/form/FormInputPassword.tsx'
import { oneTypeFormatDate } from '@/helper/actionFormatDate.helper.ts'

const initFormMap = (data?: any) => ({
    clientId: data?.credentials?.client_id || '',
    clientSecret: '',
    authUrl: '',
    baseUrl: '',
    isActive: data?.isActive || false,
})

const TabGuestyConfig = () => {
    const [formRequest, setFormRequest] = useState(initFormMap())
    const { __detail, __isLoading, __actionUpdate } = useDataDetailHook({
        urlAPI: getGuestyConfig,
    })

    const [isLoadingTest, setIsLoadingTest] = useState(false)

    const _handleTestConnect = () => {
        setIsLoadingTest(true)
        testGuestyConfig().then((res) => {
            setIsLoadingTest(false)
        })
    }

    const _handleChange = (name, value) => {
        setFormRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const _handleParseKey = (key: string) => {
        return key.replace(/_/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    }

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Guesty Configuration</h5>
                </div>
                <div className="col-auto hstack gap-3">
                    <BtnPrimary
                        onClick={() => _handleTestConnect()}
                        isOutline
                        isLoading={isLoadingTest}
                        isDisabled={isLoadingTest}>
                        Test Connect
                    </BtnPrimary>

                    <BtnPrimary
                        onClick={() => {
                            setFormRequest(initFormMap(__detail))
                            actionModal(MDGuestyConfigForm, false)
                        }}>
                        Edit
                    </BtnPrimary>
                </div>
            </div>

            <HorizontalLoopDataLogic
                list={[
                    objectTabContent('Name', __detail.name),
                    objectTabContent('Key', __detail.key),
                    objectTabContent(
                        'Status Active',
                        <TextTrueOrFalse value={__detail.isActive} />,
                    ),
                    objectTabContent(
                        'Last Test ',
                        oneTypeFormatDate(
                            __detail.lastTestedAt,
                            'DD MMMM YYYY HH:mm',
                        ),
                    ),
                    objectTabContent(
                        'Last Test Success',
                        <TextTrueOrFalse value={__detail.lastTestSuccessful} />,
                    ),
                    objectTabContent(
                        'Credentials',
                        __detail?.credentials
                            ? Object.entries(__detail?.credentials)?.map(
                                  ([key, value], index) => (
                                      <p className="fs-12" key={index}>
                                          {_handleParseKey(key)} :{' '}
                                          {value as string}
                                      </p>
                                  ),
                              )
                            : '-',
                    ),
                ]}
            />

            <CreatePortalLayout>
                <ModalWithActionFormCRUDLogic
                    id={MDGuestyConfigForm}
                    detail={{
                        ...__detail,
                        id: 1,
                    }}
                    title="Guesty Configuration"
                    isEdit={true}
                    formRequest={formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: () =>
                            actionModal(MDGuestyConfigForm, true),
                    }}
                    placeholder="e.g Customer Staging"
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            <FormInput
                                label="Client ID"
                                name="clientId"
                                placeholder="wkejfnwklenwe"
                            />

                            <FormInputPassword
                                label="Client Secret"
                                name="clientSecret"
                                placeholder="*****"
                            />

                            <FormInput
                                label="Auth URL"
                                name="authUrl"
                                placeholder="http://auth"
                            />

                            <FormInput
                                label="Base URL"
                                name="baseUrl"
                                placeholder="http://base"
                            />

                            <FormRadioButtonMulti
                                label="Active"
                                name="isActive"
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
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: null,
                        urlAPIUpdate: () => updateGuestyConfig(formRequest),
                        initialForm: () =>
                            setFormRequest(initFormMap(__detail)),
                        callBack: (newData) => __actionUpdate(newData),
                        emptySelect: () => {
                            setFormRequest(initFormMap(__detail))
                        },
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default TabGuestyConfig
