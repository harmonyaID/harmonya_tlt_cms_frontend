import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    MDPSTabNotificationAdd,
    MDPSTabNotificationRemove,
} from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiContactFormType } from '@/service/api/contentManageSetting.api.ts'
import {
    apiNotificationsCRUD,
    getNotificationStaticFirebase,
    getNotificationStaticPostmark,
} from '@/service/api/systemManagement.api.ts'
import { isShowPagination, isSuccess } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import SelectOptionNotificationStaticProviderType from '@/common/dataForm/SelectOptionNotificationStaticProviderType.tsx'
import { useState } from 'react'
import LoadingInPage from '@/component/loading/LoadingPage.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import setNestedValue from '@/helper/setNestedValue.helper.ts'
import { TblPointData } from '@/component/general/TablePartial.tsx'

const initForm = {
    providerId: '',
    name: '',
    credentials: {},
    isActive: '1',
}

const initMapForm = (passData) => ({
    name: passData.name || '',
    providerId: passData.provider?.id || '',
    credentials: passData.credentials || {},
    isActive: passData.isActive ? '1' : '0',
})

const FIREBASE_ID = 1
const POSTMARK_ID = 2

const TabNotificationConfig = () => {
    const [isLoadingCredential, setIsLoadingCredential] = useState(false)

    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiNotificationsCRUD.list,
    })

    const {
        __formRequest,
        __detailData,
        __selectedId,
        __isEdit,
        __setFormRequest,
        __setSelectedId,
        __actionAddModal,
        __actionUpdateModal,
        __actionCloseModal,
        __actionRemoveModal,
    } = useCRUDModalRequestHook({
        modalId: MDPSTabNotificationAdd,
        modalRemoveId: MDPSTabNotificationRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: initMapForm,
    })

    const _handleSetCredentialPostmark = (credential: any, providerId) => {
        __setFormRequest((prev) => ({
            ...prev,
            providerId: providerId,
            credentials: {
                serverToken: credential.serverToken,
                fromEmail: credential.fromEmail,
                fromName: credential.fromName,
            },
        }))
    }

    const _handleSetCredentialFirebase = (credential: any, providerId) => {
        __setFormRequest((prev) => ({
            ...prev,
            providerId: providerId,
            credentials: {
                projectId: credential.projectId,
                clientEmail: credential.clientEmail,
                privateKey: credential.privateKey,
            },
        }))
    }

    const _handleChange = (name, value) => {
        if (name === 'providerId') {
            setIsLoadingCredential(true)

            if (Number(value) === FIREBASE_ID) {
                getNotificationStaticFirebase()
                    .then((res) => {
                        if (isSuccess(res)) {
                            _handleSetCredentialFirebase(res.result, value)
                        }
                    })
                    .finally(() => setIsLoadingCredential(false))
            } else if (Number(value) === POSTMARK_ID) {
                getNotificationStaticPostmark()
                    .then((res) => {
                        if (isSuccess(res)) {
                            _handleSetCredentialPostmark(res.result, value)
                        }
                    })
                    .finally(() => setIsLoadingCredential(false))
            }
        } else {
            __setFormRequest((prev) => setNestedValue(prev, name, value))
        }
    }

    const _handleMask = (value: string) => {
        if (!value) return ''

        return value.slice(0, 4) + '*'.repeat(Math.max(0, value.length - 4))
    }

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabNotificationRemove, false),
        },
    })

    // useEffect(() => {
    //     action.setListFormType(__list)
    //     action.setIsLoadingFormType(__isLoading)
    // }, [...__list, __isLoading, __isEdit])

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Notifications</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => __actionAddModal()}>
                        Add New
                    </BtnPrimary>
                </div>
            </div>

            <div className="row overflow-y-auto position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={['Name', 'Provider', 'Credentials', 'Active', '']}
                        tds={__list}>
                        {__list.map((type) => (
                            <tr key={type.id}>
                                <td>{type.name}</td>
                                <td>{type.provider?.name || '-'}</td>
                                <td>
                                    {type.provider?.id == FIREBASE_ID && (
                                        <>
                                            <TblPointData title="Project ID">
                                                {type.credentials?.projectId}
                                            </TblPointData>
                                            <TblPointData title="Client Email">
                                                {type.credentials?.clientEmail}
                                            </TblPointData>
                                            <TblPointData title="Private Key">
                                                {_handleMask(
                                                    type.credentials
                                                        ?.privateKey,
                                                )}
                                            </TblPointData>
                                        </>
                                    )}

                                    {type.provider?.id == POSTMARK_ID && (
                                        <>
                                            <TblPointData title="From name">
                                                {type.credentials?.fromName}
                                            </TblPointData>
                                            <TblPointData title="From Email">
                                                {type.credentials?.fromEmail}
                                            </TblPointData>
                                            <TblPointData title="Server Token">
                                                {_handleMask(
                                                    type.credentials
                                                        ?.serverToken,
                                                )}
                                            </TblPointData>
                                        </>
                                    )}
                                </td>
                                <td>
                                    <TextTrueOrFalse value={type.isActive} />
                                </td>
                                <td>
                                    <div className="hstack gap-2 justify-content-end">
                                        <BtnCircleRemove
                                            actions={{
                                                remove: (e) => {
                                                    e.stopPropagation()
                                                    _handleChooseRemove(type)
                                                },
                                            }}
                                        />
                                        <BtnCircleEdit
                                            actions={{
                                                edit: (e) => {
                                                    e.stopPropagation()
                                                    __actionUpdateModal(type)
                                                },
                                            }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </TableThemeLogic>
                </div>
            </div>

            {isShowPagination(__isLoading, __list, __pagination) ? (
                <Pagination
                    onMove={(step) => __actionPagination(step)}
                    className="mt-2"
                    pagination={configDefaultPagination(
                        __pagination,
                        'totalPage',
                    )}
                />
            ) : null}

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDPSTabNotificationRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiNotificationsCRUD.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabNotificationAdd}
                    detail={__detailData}
                    title="Notification"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    placeholder="e.g Customer Staging"
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g Career"
                            />

                            <SelectOptionNotificationStaticProviderType
                                label="Provider"
                                name="providerId"
                                isUseHook
                                required
                            />

                            {isLoadingCredential ? (
                                <LoadingInPage />
                            ) : (
                                <>
                                    {__formRequest.providerId ==
                                        FIREBASE_ID && (
                                        <>
                                            <FormInput
                                                label="Project ID"
                                                value={
                                                    __formRequest.credentials
                                                        .projectId
                                                }
                                                name="credentials.projectId"
                                            />

                                            <FormInput
                                                name="credentials.clientEmail"
                                                value={
                                                    __formRequest.credentials
                                                        .clientEmail
                                                }
                                                type="email"
                                                label="Client Email"
                                            />

                                            <FormInput
                                                name="credentials.privateKey"
                                                value={
                                                    __formRequest.credentials
                                                        .privateKey
                                                }
                                                label="Private Key"
                                            />
                                        </>
                                    )}

                                    {__formRequest.providerId ==
                                        POSTMARK_ID && (
                                        <>
                                            <FormTextArea
                                                label="Server Token"
                                                value={
                                                    __formRequest.credentials
                                                        .serverToken
                                                }
                                                name="credentials.serverToken"
                                            />

                                            <FormInput
                                                name="credentials.fromEmail"
                                                value={
                                                    __formRequest.credentials
                                                        .fromEmail
                                                }
                                                type="email"
                                                label="From Email"
                                            />

                                            <FormInput
                                                name="credentials.fromName"
                                                value={
                                                    __formRequest.credentials
                                                        .fromName
                                                }
                                                label="From Name"
                                            />
                                        </>
                                    )}
                                </>
                            )}

                            <FormRadioButtonMulti
                                name="isActive"
                                label="Active"
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
                        urlAPIAdd: () =>
                            apiNotificationsCRUD.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiNotificationsCRUD.update(
                                __selectedId,
                                __formRequest,
                            )
                        },
                        initialForm: () =>
                            __setFormRequest(initMapForm(__detailData)),
                        callBack: (newData) => {
                            __isEdit
                                ? __actionUpdate(newData)
                                : __actionAdd(newData, 'id', true)
                        },
                        emptySelect: () =>
                            __setFormRequest(() => ({
                                ...initForm,
                            })),
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default TabNotificationConfig
