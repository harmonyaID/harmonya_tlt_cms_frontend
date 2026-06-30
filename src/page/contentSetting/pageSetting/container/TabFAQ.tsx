import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiFAQ } from '@/service/api/contentManageSetting.api.ts'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { MDPSTabFAQAdd, MDPSTabFAQRemove } from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import Pagination from '@/component/general/Pagination.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirst,
    TblLineSecond,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'

const defaultActive = '1'

const initForm = {
    question: '',
    answer: '',
    order: '',
    isActive: defaultActive,
}

const initMapForm = (passData) => ({
    question: passData.question || '',
    answer: passData.answer || '',
    order: passData.order || '',
    isActive: passData.isActive || '0',
})

const TabFAQ = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiFAQ.list,
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
        modalId: MDPSTabFAQAdd,
        modalRemoveId: MDPSTabFAQRemove,
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
            nextStep: () => actionModal(MDPSTabFAQRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">FAQ</h5>
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
                        ths={[
                            'Order',
                            { content: 'FAQ', className: 'w-75' },
                            'Info',
                            '',
                        ]}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <TblLineFirst value={vm.order} />
                                        </td>
                                        <td>
                                            <TblPointData title="Question">
                                                {vm.question || '-'}
                                            </TblPointData>
                                            <TblPointData title="Answer">
                                                {vm.answer || '-'}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TblPointData title="Status Active">
                                                {/*{vm.isActive || '-'}*/}
                                                <TextTrueOrFalse
                                                    value={vm.isActive}
                                                />
                                            </TblPointData>
                                            <TblPointData title="Created At">
                                                {vm.createdAt || '-'}
                                            </TblPointData>
                                        </td>
                                        {/*<td>*/}
                                        {/*    <AvatarInTable*/}
                                        {/*        className="mt-1"*/}
                                        {/*        {...(vm.createdBy*/}
                                        {/*            ? {*/}
                                        {/*                title: vm.createdBy,*/}
                                        {/*            }*/}
                                        {/*            : {})}*/}
                                        {/*        subTitle={*/}
                                        {/*            vm.createdAt*/}
                                        {/*                ? vm.createdAt*/}
                                        {/*                : '-'*/}
                                        {/*        }*/}
                                        {/*        isSmall*/}
                                        {/*    />*/}
                                        {/*    <TblLineSecond>*/}
                                        {/*        {vm.createdAt}*/}
                                        {/*    </TblLineSecond>*/}
                                        {/*</td>*/}
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
                        urlAPI: () => apiFAQ.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDPSTabFAQAdd}
                    detail={__detailData}
                    title="FAQ"
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
                            {/*{__isEdit ? (*/}
                            {/*    <FormInput*/}
                            {/*        label="Order"*/}
                            {/*        name="order"*/}
                            {/*        required*/}
                            {/*        disabled*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    <div className="">*/}
                            {/*        <p className="fs-14">*/}
                            {/*            Order : <b>{__formRequest.order}</b>*/}
                            {/*        </p>*/}
                            {/*    </div>*/}
                            {/*)}*/}

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
                        urlAPIAdd: () => apiFAQ.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiFAQ.update(__selectedId, __formRequest)
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

export default TabFAQ
