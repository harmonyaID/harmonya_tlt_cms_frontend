import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiFAQ } from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { MDBoatTypeAdd, MDBoatTypeRemove } from '@/config/modal.config.ts'
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
import { apiBoatType } from '@/service/api/boatManage.api.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import { OSBoatTypeDetail } from '@/config/offCanvas.config.ts'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import PreElement from '@/component/general/PreElement.tsx'
import joinClassNameHelper from '@/helper/base/joinClassName.helper.ts'

const defaultActive = '1'
const defaultCurrency = 'AUD'

const initForm = {
    boatId: '',
    name: '',
    description: '',
    priceReturnAdult: '',
    priceReturnChild: '',
    priceOneWayAdult: '',
    priceOneWayChild: '',
    currency: defaultCurrency,
    childAgeNote: '',
    isActive: defaultActive,
}

const initMapForm = (passData) => ({
    boatId: passData.boatId || '',
    name: passData.name || '',
    description: passData.description || '',
    priceReturnAdult: passData.priceReturnAdult || '',
    priceReturnChild: passData.priceReturnChild || '',
    priceOneWayAdult: passData.priceOneWayAdult || '',
    priceOneWayChild: passData.priceOneWayChild || '',
    currency: passData.currency || defaultCurrency,
    childAgeNote: passData.childAgeNote || '',
    isActive: passData.isActive || '0',
})

const DataPrice = ({
    currency,
    adultPrice,
    adultPriceDiscounted,
    childPrice,
    childPriceDiscounted,
    isColumn = true,
}: {
    currency: string
    adultPrice: string | number
    adultPriceDiscounted: string | number
    childPrice: string | number
    childPriceDiscounted: string | number
    isColumn?: boolean
}) => {
    return (
        <div
            className={joinClassNameHelper(
                'gap-3 d-inline-flex',
                isColumn ? 'vstack' : 'hstack',
            )}>
            <div className="hstack gap-4 flex-row p-2 rounded-3 bg-neutral-500">
                <TblPointData title="Adult" isUseDefaultMargin={false}>
                    {adultPrice ? currency + ' ' + adultPrice : '-'}
                </TblPointData>
                <TblPointData
                    title="Discounted Price"
                    isUseDefaultMargin={false}>
                    {adultPriceDiscounted
                        ? currency + ' ' + adultPriceDiscounted
                        : '-'}
                </TblPointData>
            </div>

            <div className="hstack gap-4 flex-row p-2 rounded-3 bg-neutral-500">
                <TblPointData title="Child" isUseDefaultMargin={false}>
                    {childPrice ? currency + ' ' + childPrice : '-'}
                </TblPointData>
                <TblPointData
                    title="Discounted Price"
                    isUseDefaultMargin={false}>
                    {childPriceDiscounted
                        ? currency + ' ' + childPriceDiscounted
                        : '-'}
                </TblPointData>
            </div>
        </div>
    )
}

const TabBoatType = ({ boatId }: { boatId: number | string }) => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiBoatType.list,
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
        modalId: MDBoatTypeAdd,
        modalRemoveId: MDBoatTypeRemove,
        emptyParam: { ...initForm, boatId },
        mapDetailToFormRequest: (passData) =>
            initMapForm({ ...passData, boatId }),
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDBoatTypeRemove, false),
        },
    })

    const {
        __data: __dataForDetail,
        __handleChooseAndNextStep: __handleChooseDetail,
        __setData: __handleSetDataDetail,
    } = useChooseData({
        action: {
            nextStep: () => actionOffCanvas(OSBoatTypeDetail, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Boat Type</h5>
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
                            { content: 'Name', className: 'max-w-200px' },
                            'Price One Way',
                            'Price Return',
                            'Info',
                            '',
                        ]}
                        tds={__list}>
                        {__list
                            .sort((a, b) => Number(a.order) - Number(b.order))
                            .map((vm, index) => {
                                const currency = vm?.currency || 'AUD'

                                return (
                                    <tr
                                        key={index}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            __handleChooseDetail(vm)
                                        }}>
                                        <td>
                                            <TblLineFirst value={vm.name} />
                                        </td>
                                        <td>
                                            <DataPrice
                                                currency={currency}
                                                adultPrice={vm.priceOneWayAdult}
                                                adultPriceDiscounted={
                                                    vm.discountedOneWayAdult
                                                }
                                                childPrice={vm.priceOneWayChild}
                                                childPriceDiscounted={
                                                    vm.discountedOneWayChild
                                                }
                                            />
                                        </td>
                                        <td>
                                            <DataPrice
                                                currency={currency}
                                                adultPrice={vm.priceReturnAdult}
                                                adultPriceDiscounted={
                                                    vm.discountedReturnAdult
                                                }
                                                childPrice={vm.priceReturnChild}
                                                childPriceDiscounted={
                                                    vm.discountedReturnChild
                                                }
                                            />
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
                    id={MDBoatTypeRemove}
                    configHandle={{
                        urlAPI: () => apiBoatType.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDBoatTypeAdd}
                    detail={__detailData}
                    title="Boat Type"
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
                                placeholder="e.g Option 1 - Private Driver in Bali"
                            />

                            <FormTextArea
                                label="Description"
                                name="description"
                                required
                                placeholder="e.g Nusa Lembongan is a great place to bring children of all ages. It’s a very safe island and the locals adore children."
                            />

                            <div className="px-3 pt-3 border-neutral-500 bg-neutral-600 border rounded-3 mb-3">
                                <FormInput
                                    label="Currency"
                                    name="currency"
                                    required
                                    placeholder="e.g AUD"
                                />

                                <div className="hstack gap-3 flex-row">
                                    <FormInput
                                        label="Price Return Adult"
                                        name="priceReturnAdult"
                                        required
                                        placeholder="e.g 45.00"
                                        className="w-100"
                                    />

                                    <FormInput
                                        label="Price Return Child"
                                        name="priceReturnChild"
                                        required
                                        placeholder="e.g 45.00"
                                        className="w-100"
                                    />
                                </div>

                                <div className="hstack gap-3 flex-row">
                                    <FormInput
                                        label="Price One Way Adult"
                                        name="priceOneWayAdult"
                                        required
                                        placeholder="e.g 35.00"
                                        className="w-100"
                                    />

                                    <FormInput
                                        label="Price One Way Child"
                                        name="priceOneWayChild"
                                        required
                                        placeholder="e.g 35.00"
                                        className="w-100"
                                    />
                                </div>
                            </div>

                            <FormTextArea
                                label="Child AgeNote"
                                name="childAgeNote"
                                required
                                placeholder="e.g Child 3-10 years, 0-2 years no charge."
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
                        urlAPIAdd: () => apiBoatType.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiBoatType.update(
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

                <OffCanvasGeneral
                    id={OSBoatTypeDetail}
                    title="Boat Type Details"
                    width={720}
                    isCloseAnywhere>
                    <HorizontalLoopDataLogic
                        list={[
                            objectListDetail(
                                'Name',
                                __dataForDetail?.name || '',
                            ),
                            objectListDetail(
                                'Status Active',
                                <TextTrueOrFalse
                                    value={__dataForDetail.isActive}
                                />,
                            ),
                            objectListDetail(
                                'Price One Way',
                                <>
                                    <DataPrice
                                        currency={__dataForDetail.currency}
                                        adultPrice={
                                            __dataForDetail.priceOneWayAdult
                                        }
                                        adultPriceDiscounted={
                                            __dataForDetail.discountedOneWayAdult
                                        }
                                        childPrice={
                                            __dataForDetail.priceOneWayChild
                                        }
                                        childPriceDiscounted={
                                            __dataForDetail.discountedOneWayChild
                                        }
                                        isColumn={false}
                                    />
                                </>,
                            ),
                            objectListDetail(
                                'Price Return',
                                <>
                                    <DataPrice
                                        currency={__dataForDetail.currency}
                                        adultPrice={
                                            __dataForDetail.priceReturnAdult
                                        }
                                        adultPriceDiscounted={
                                            __dataForDetail.discountedReturnAdult
                                        }
                                        childPrice={
                                            __dataForDetail.priceReturnChild
                                        }
                                        childPriceDiscounted={
                                            __dataForDetail.discountedReturnChild
                                        }
                                        isColumn={false}
                                    />
                                </>,
                            ),

                            objectListDetail(
                                'Child Age Note',
                                __dataForDetail.childAgeNote ? (
                                    <PreElement>
                                        {__dataForDetail.childAgeNote}
                                    </PreElement>
                                ) : (
                                    '-'
                                ),
                            ),

                            objectListDetail(
                                'Description',
                                __dataForDetail.description ? (
                                    <PreElement>
                                        {__dataForDetail.description}
                                    </PreElement>
                                ) : (
                                    '-'
                                ),
                            ),
                        ]}
                    />
                </OffCanvasGeneral>
            </CreatePortalLayout>
        </>
    )
}

export default TabBoatType
