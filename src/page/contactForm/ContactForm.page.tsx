import { isEmpty } from 'lodash'
import SelectBaseOptionContactFormType from '@/common/dataForm/SelectBaseOptionContactFormType.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import OffCanvasWithActionFormCRUDLogic from '@/common/misc/OffCanvasWithActionFormCRUD.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import { TblLineFirst } from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import {
    MDPSTabWebContactFormAdd,
    MDPSTabWebContactFormRemove,
} from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import {
    OCContactFormCRUD,
    OCWebContactFormDetail,
} from '@/config/offCanvas.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import useContactFormDetailHook from '@/page/contactForm/hook/useContactFormDetail.hook.ts'
import { apiWebContactForm } from '@/service/api/contentManageSetting.api.ts'

const initForm = {
    formTypeId: '',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
}

const initMapForm = (passData) => ({
    formTypeId: passData?.formType?.id || '',
    name: passData.name || '',
    email: passData.email || '',
    phone: passData.phone || '',
    subject: passData.subject || '',
    message: passData.message || '',
})

const ContactFormPage = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __search,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiWebContactForm.list,
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
        // modalId: OCContactFormCRUD,
        // modalRemoveId: MDPSTabWebContactFormRemove,
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
            nextStep: () => actionModal(MDPSTabWebContactFormRemove, false),
        },
    })

    const {
        __detail,
        __isLoadingDetail,

        __handleChooseDetail,
        __handleSetDetail,
        __handleCloseDetail,
    } = useContactFormDetailHook()

    return (
        <>
            <CardListData
                title="Contact Form"
                componentAction={
                    <>
                        <BtnPrimary
                            onClick={() => {
                                actionOffCanvas(OCContactFormCRUD)
                                __actionAddModal()
                            }}>
                            Add New
                        </BtnPrimary>
                    </>
                }>
                <FilterBarBasic
                    formRequest={__search}
                    searchTextPlaceholder="e.g D'Stars Fast Ferry"
                    isDateRange={false}
                    actions={{
                        change: __actionChange,
                        pagination: __actionPagination,
                        clear: __actionClear,
                    }}
                />

                <div className="row overflow-y position-relative">
                    <div className="col-md-12 table-responsive-md">
                        <TableThemeLogic
                            isLoading={__isLoading}
                            isNoWrap
                            ths={[
                                'Name',
                                'Form Type',
                                'Phone',
                                'Email',
                                // 'Contact Info.',
                                // { content: 'FAQ', className: 'w-75' },
                                'Subject',
                                'Read',
                                '',
                            ]}
                            tds={__list}>
                            {__list
                                .sort(
                                    (a, b) => Number(a.order) - Number(b.order),
                                )
                                .map((vm, index) => {
                                    return (
                                        <tr key={index}>
                                            <td
                                                scope="row"
                                                className="max-w-200px">
                                                <TblLineFirst
                                                    value={vm.name || '-'}
                                                />
                                            </td>
                                            <td>
                                                <TblLineFirst
                                                    value={
                                                        vm?.formType?.name ||
                                                        '-'
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <TblLineFirst
                                                    value={vm.phone || '-'}
                                                />
                                            </td>
                                            <td>
                                                <TblLineFirst
                                                    value={vm.email || '-'}
                                                />
                                            </td>
                                            <td>
                                                <TblLineFirst
                                                    value={vm.subject || '-'}
                                                />
                                            </td>
                                            <td>
                                                <TextTrueOrFalse
                                                    value={vm.isRead}
                                                />
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
                                                                actionOffCanvas(
                                                                    OCContactFormCRUD,
                                                                )
                                                            },
                                                        }}
                                                    />
                                                    <BtnCircleDetail
                                                        actions={{
                                                            onClick: (e) => {
                                                                e.stopPropagation()
                                                                __handleChooseDetail(
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
            </CardListData>

            <CreatePortalLayout>
                <ConfirmRemoveListLogic
                    id={MDPSTabWebContactFormRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiWebContactForm.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <OffCanvasWithActionFormCRUDLogic
                    id={OCContactFormCRUD}
                    detail={__detailData}
                    title="Website Contact Form"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: () => {
                            actionOffCanvas(OCContactFormCRUD, true)
                            __actionCloseModal()
                        },
                    }}
                    isCloseAnywhere={false}
                    placeholder="e.g Customer Staging"
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            {/*{!isEmpty(listContactFormType) ? (*/}
                            {/*<FormSelectOption*/}
                            {/*    label="Form Type"*/}
                            {/*    name="formTypeId"*/}
                            {/*    required>*/}
                            {/*    <option value="">- Select Form Type -</option>*/}
                            {/*    {listContactFormType.map((vm, index) => (*/}
                            {/*        <option key={index} value={vm.id}>*/}
                            {/*            {vm.name}*/}
                            {/*        </option>*/}
                            {/*    ))}*/}
                            {/*</FormSelectOption>*/}

                            <SelectBaseOptionContactFormType
                                label="Form Type"
                                name="formTypeId"
                                required
                            />
                            {/*) : null}*/}

                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g Uni"
                            />

                            <FormInput
                                label="Email"
                                name="email"
                                type="email"
                                required
                                placeholder="e.g uni@tlt.com"
                            />

                            <FormInput
                                label="Phone"
                                name="phone"
                                required
                                placeholder="e.g 08100xxxx"
                                isNumberOnly
                            />

                            <FormInput
                                label="Subject"
                                name="subject"
                                required
                                placeholder="e.g Lembongan Good For Kids"
                            />

                            <FormTextArea
                                label="Message"
                                name="message"
                                required
                                placeholder="e.g We would like to discuss a potential partnership."
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: () => apiWebContactForm.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiWebContactForm.update(
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
                            __handleCloseDetail()
                        },
                        emptySelect: () =>
                            __setFormRequest(() => ({
                                ...initForm,
                            })),
                    }}
                />

                <OffCanvasGeneral
                    title="Detail Information"
                    closeAction={() => __handleCloseDetail()}
                    isCloseAnywhere
                    id={OCWebContactFormDetail}>
                    {__isLoadingDetail || isEmpty(__detail) ? (
                        <LoadingNotAvailable isLoading={__isLoadingDetail} />
                    ) : (
                        <HorizontalLoopDataLogic
                            list={[
                                objectListDetail('Name', __detail.name),
                                objectListDetail(
                                    'Form Type',
                                    __detail?.formType?.name || '-',
                                ),
                                objectListDetail(
                                    'Read',
                                    <TextTrueOrFalse value={__detail.isRead} />,
                                ),
                                objectListDetail(
                                    'Phone',
                                    __detail.phone || '-',
                                ),
                                objectListDetail(
                                    'Email',
                                    __detail.email || '-',
                                ),
                                objectListDetail(
                                    'Subject',
                                    __detail.subject || '-',
                                ),
                                objectListDetail(
                                    'Message',
                                    <PreElement>{__detail.message}</PreElement>,
                                ),
                            ]}
                        />
                    )}
                </OffCanvasGeneral>
            </CreatePortalLayout>
        </>
    )
}

export default ContactFormPage
