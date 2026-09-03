import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import OffCanvasWithActionFormCRUDLogic from '@/common/misc/OffCanvasWithActionFormCRUD.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import {
    BtnCircleDetail,
    BtnCircleEdit,
    BtnCircleRemove,
    BtnDanger,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import { TblLineFirst } from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import OffCanvasGeneral from '@/component/offCanvas/OffCanvasGeneral.tsx'
import { MDPSTabWebContactFormRemove } from '@/config/modal.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import {
    OCContactFormCRUD,
    OCWebContactFormDetail,
} from '@/config/offCanvas.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionOffCanvas from '@/helper/actionOffCanvas.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { apiWebContactForm } from '@/service/api/contentManageSetting.api.ts'
import SelectOptionContactFormType from '@/common/dataForm/SelectOptionContactFormType.tsx'
import AdvanceSearch from '@/component/general/AdvanceSearch.tsx'
import useContactFormMain from '@/page/contactForm/hook/useContactFormMain.hook.ts'
import ContactFormTable from '@/page/contactForm/component/ContactFormTable.tsx'
import ContactFormFilter from '@/page/contactForm/component/ContactFormFilter.tsx'

const ContactFormPage = () => {
    const {
        __search,
        __isLoading,
        __list,
        __pagination,
        __detailData,
        __isEdit,
        __formRequest,
        __selectedId,
        __isLoadingDetail,
        __detail,
        __initForm: initForm,
        __dataForRemove: dataForRemove,

        __actionAddModal,
        __actionChange,
        __actionPagination,
        __actionClear,
        __actionSetIsUseSearch,
        __setSearch,
        __handleChooseRemove: _handleChooseRemove,
        __actionUpdateModal,
        __handleChooseDetail,
        __actionRemove,
        __actionCloseModal,
        __setFormRequest,
        __initMapForm: initMapForm,
        __actionUpdate,
        __actionAdd,
        __handleSetData,
        __handleChange,
        __handleCloseDetail,
        __handleToTrash,
    } = useContactFormMain({ urlAPI: apiWebContactForm.list })

    return (
        <>
            <CardListData
                title="Contact Form"
                componentAction={
                    <>
                        <div className="hstack gap-2">
                            <BtnDanger
                                isOutline
                                handle={() => {
                                    __handleToTrash()
                                }}>
                                Trash
                            </BtnDanger>
                            <BtnPrimary
                                onClick={() => {
                                    actionOffCanvas(OCContactFormCRUD)
                                    __actionAddModal()
                                }}>
                                Add New
                            </BtnPrimary>
                        </div>
                    </>
                }>
                <ContactFormFilter
                    __isLoading={__isLoading}
                    __search={__search}
                    actions={{
                        __setSearch,
                        __actionClear,
                        __actionSetIsUseSearch,
                        __actionChange,
                        __actionPagination,
                    }}
                />

                <ContactFormTable
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __actionPagination: __actionPagination,
                        __actionUpdateModal: __actionUpdateModal,
                        __handleChooseDetail: __handleChooseDetail,
                        __handleChooseRemove: _handleChooseRemove,
                    }}
                />
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
                            __handleSetData({})
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
                        change: __handleChange,
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

                            <SelectOptionContactFormType
                                name="formTypeId"
                                isUseHook
                                label="Form Type"
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
