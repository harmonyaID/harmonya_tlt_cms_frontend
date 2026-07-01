import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiTLTReview } from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import {
    MDPSTabFAQAdd,
    MDPSTabFAQRemove,
    MDPSTabLanguageAdd,
    MDPSTabTLTReviewAdd,
    MDPSTabTLTReviewRemove,
} from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirst,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import { APIResponse } from '@/type/resultAPI.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'

const initForm = {
    name: '',
    position: '',
    company: '',
    rating: '',
    review: '',
    isActive: '0',
    photos: [],
}

const initMapForm = (passData) => ({
    name: passData.name || '',
    position: passData.position || '',
    company: passData.company || '',
    rating: passData.rating || '1',
    review: passData.review || '',
    isActive: passData.isActive || '0',
    photos: passData?.photos || [],
})

const TabTLTReview = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiTLTReview.list,
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
        modalId: MDPSTabTLTReviewAdd,
        modalRemoveId: MDPSTabTLTReviewRemove,
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
            nextStep: () => actionModal(MDPSTabTLTReviewRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">TLT Review</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => {}}>Add New</BtnPrimary>
                </div>
            </div>

            <div className="row overflow-y-auto position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={[
                            'Name',
                            'Company',
                            'Review',
                            'Active',
                            'Photos',
                            '',
                        ]}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <TblLineFirst value={vm.name} />
                                            <TblLineSecond
                                                value={vm.position}
                                            />
                                        </td>
                                        <td>
                                            <TblLineSecond value={vm.company} />
                                        </td>
                                        <td>
                                            <TblPointData title="Rating">
                                                {vm.rating || '-'}
                                            </TblPointData>

                                            <TblPointData title="Review">
                                                {vm.review || '-'}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TextTrueOrFalse
                                                value={vm.isActive}
                                            />
                                        </td>
                                        <td></td>
                                        <td>
                                            <div className="hstack gap-2 justify-content-end">
                                                <BtnCircleRemove
                                                    actions={{
                                                        remove: (e) => {
                                                            e.stopPropagation()
                                                            _handleChooseRemove(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />
                                                <BtnCircleEdit
                                                    actions={{
                                                        edit: (e) => {
                                                            e.stopPropagation()
                                                            __actionUpdateModal(
                                                                vm,
                                                            )
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
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
                    id={MDPSTabFAQRemove}
                    configHandle={{
                        urlAPI: () => apiTLTReview.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabLanguageAdd}
                    detail={__detailData}
                    title="TLT Review"
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
                                label="Order"
                                name="order"
                                required
                                type="number"
                                min="1"
                                placeholder="e.g 1"
                            />

                            <FormInput
                                label="Question"
                                name="question"
                                required
                                placeholder="e.g Is Lembongan Good For Kids ?"
                            />
                            <FormTextArea
                                label="Answer"
                                name="answer"
                                required
                                placeholder="e.g Nusa Lembongan is a great place to bring children of all ages. It’s a very safe island and the locals adore children."
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
                        urlAPIAdd: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTLTReview.addWithData(dataForm)
                        },
                        urlAPIUpdate: async (): Promise<APIResponse> => {
                            const dataForm = await objectToFormData({
                                ...__formRequest,
                            })
                            return apiTLTReview.updateWithData(
                                __selectedId,
                                dataForm,
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

export default TabTLTReview
