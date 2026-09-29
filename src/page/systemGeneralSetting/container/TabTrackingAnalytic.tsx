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
    MDPSTabTrackingAnalyticAdd,
    MDPSTabTrackingAnalyticRemove,
} from '@/config/modal.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiTrackingAnalyticsCRUD } from '@/service/api/systemManagement.api.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import { textSlug } from '@/helper/convertText.helper.ts'
import TextMoreLess from '@/component/general/TextMoreLess.tsx'

const initForm = {
    name: '',
    key: '',
    value: '',
}

const initMapForm = (passData) => ({
    name: passData.name || '',
    key: passData.key || '',
    value: passData.value || '',
})

const TabTrackingAnalytic = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiTrackingAnalyticsCRUD.list,
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
        modalId: MDPSTabTrackingAnalyticAdd,
        modalRemoveId: MDPSTabTrackingAnalyticRemove,
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
            nextStep: () => actionModal(MDPSTabTrackingAnalyticRemove, false),
        },
    })

    const _handleChangeForm = (name, value) => {
        if (name === 'name') {
            __setFormRequest((prev) => ({
                ...prev,
                [name]: value,
                key: textSlug(value),
            }))
            return
        }

        _handleChange(name, value)
    }

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Tracking Analytics</h5>
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
                        ths={['Name', 'Key', 'Value', '']}
                        tds={__list}>
                        {__list.map((type) => (
                            <tr key={type.id}>
                                <td>{type.name}</td>
                                <td>{type.key || '-'}</td>
                                <td className="max-w-300px">
                                    <TextMoreLess>
                                        {type.value || '-'}
                                    </TextMoreLess>
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
                    id={MDPSTabTrackingAnalyticRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiTrackingAnalyticsCRUD.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabTrackingAnalyticAdd}
                    detail={__detailData}
                    title="Tracking Analytic"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChangeForm,
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
                                label="Key"
                                name="key"
                                required
                                placeholder="e.g Career"
                            />
                            <FormTextArea
                                label="Value"
                                name="value"
                                required
                                placeholder="Some value"
                                rows={15}
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: () =>
                            apiTrackingAnalyticsCRUD.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiTrackingAnalyticsCRUD.update(
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

export default TabTrackingAnalytic
