import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { MDPSTabFAQAdd, MDPSTabFAQRemove } from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirst,
    TblPointData,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import { apiBoatContactForm } from '@/service/api/boatManage.api.ts'

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

const TabBoatContactForm = ({ boatId = '' }: { boatId?: number | string }) => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiBoatContactForm.list,
        advancedSearch: {
            bootId: boatId,
        },
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
            <div className="row mb-2">
                <div className="col-md">
                    <h5 className="fs-16 fw-500 mb-2">Boat Contact Form</h5>
                </div>
                <div className="col-auto">
                    {/*<BtnPrimary onClick={() => __actionAddModal()}>*/}
                    {/*    Add New*/}
                    {/*</BtnPrimary>*/}
                </div>
            </div>

            <div className="row overflow-y-auto position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={['Booking Ref', 'Contact', 'Info', '']}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <TblLineFirst
                                                value={vm.tltBookingRefName}
                                            />

                                            <TblPointData title="Name">
                                                {vm.name || '-'}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TblPointData title="Email">
                                                {vm.email || '-'}
                                            </TblPointData>
                                            <TblPointData title="Phone">
                                                {vm.phone || '-'}
                                            </TblPointData>
                                        </td>
                                        <td>
                                            <TblPointData title="Passenger Names">
                                                {vm.passengerNames || '-'}
                                            </TblPointData>
                                        </td>
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
        </>
    )
}

export default TabBoatContactForm
