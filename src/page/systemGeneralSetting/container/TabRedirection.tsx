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
    MDPSTabRedirectionAdd,
    MDPSTabRedirectionRemove,
} from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiContactFormType } from '@/service/api/contentManageSetting.api.ts'
import { apiRedirectionCRUD } from '@/service/api/systemManagement.api.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'

const initForm = {
    name: '',
    sourceUrl: '',
    targetUrl: '',
    statusCode: '',
    isActive: '1',
}

const initMapForm = (passData) => ({
    name: passData.name || '',
    sourceUrl: passData.sourceUrl || '',
    targetUrl: passData.targetUrl || '',
    statusCode: passData.statusCode || '',
    isActive: passData.isActive ? '1' : '0',
})

const TabRedirection = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiRedirectionCRUD.list,
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
        modalId: MDPSTabRedirectionAdd,
        modalRemoveId: MDPSTabRedirectionRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: initMapForm,
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDPSTabRedirectionRemove, false),
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
                    <h5 className="fs-18 fw-500">Redirections</h5>
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
                        ths={['Name', 'Source URL', 'Target URL', 'Status', '']}
                        tds={__list}>
                        {__list.map((type) => (
                            <tr key={type.id}>
                                <td>{type.name}</td>
                                <td>{type.sourceUrl || '-'}</td>
                                <td>{type.targetUrl || '-'}</td>
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
                    id={MDPSTabRedirectionRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiContactFormType.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabRedirectionAdd}
                    detail={__detailData}
                    title="Redirection"
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
                            <FormInput
                                label="Source URL"
                                name="sourceUrl"
                                required
                                placeholder="e.g http://example.com"
                            />
                            <FormInput
                                label="Target URL"
                                name="targetUrl"
                                required
                                placeholder="e.g http://example.com"
                            />
                            <FormInput
                                label="Status Code"
                                name="statusCode"
                                required
                                isNumberOnly
                                placeholder="e.g http://example.com"
                            />
                            <FormRadioButtonMulti
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
                        urlAPIAdd: () => apiRedirectionCRUD.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiRedirectionCRUD.update(
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

export default TabRedirection
