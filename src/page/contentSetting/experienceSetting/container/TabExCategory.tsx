import useDataListHook from '@/hook/base/useDataList.hook.ts'
import { apiExperienceCategory } from '@/service/api/contentManageSetting.api.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { MDExCategoryAdd, MDExCategoryRemove } from '@/config/modal.config.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import Pagination from '@/component/general/Pagination.tsx'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FilterBarBasic from '@/common/misc/FilterBarBasic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'

const initForm = {
    experienceTypeId: '',
    name: '',
}

const initMapForm = (passData) => ({
    experienceTypeId: passData?.experienceType?.id || '',
    name: passData.name || '',
})

const TabExCategory = ({
    listType,
    isLoadingType,
}: {
    listType: any[]
    isLoadingType: boolean
}) => {
    const {
        __list,
        __search,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
        __actionChange,
        __actionClear,
    } = useDataListHook({
        urlAPI: apiExperienceCategory.list,
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
        modalId: MDExCategoryAdd,
        modalRemoveId: MDExCategoryRemove,
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
            nextStep: () => actionModal(MDExCategoryRemove, false),
        },
    })

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Category</h5>
                </div>
                <div className="col-auto">
                    <BtnPrimary onClick={() => __actionAddModal()}>
                        Add New
                    </BtnPrimary>
                </div>
            </div>
            <FilterBarBasic
                formRequest={__search}
                searchTextPlaceholder="e.g D'Stars Fast Ferry"
                isDateRange={false}
                classNameWrap="pb-4"
                actions={{
                    change: __actionChange,
                    pagination: __actionPagination,
                    clear: __actionClear,
                }}
            />
            <div className="row overflow-y position-relative">
                <div className="col-md-12">
                    <TableThemeLogic
                        isLoading={__isLoading}
                        isNoWrap
                        ths={['Category', 'Type', '']}
                        tds={__list}>
                        {__list.map((vm, index) => {
                            return (
                                <tr
                                    key={index}
                                    title="Preview Detail"
                                    className="cursor-pointer">
                                    <td>
                                        <TblLineFirstPrimary
                                            value={vm?.name || ''}
                                        />
                                    </td>
                                    <td>
                                        <TblLineSecond>
                                            {vm?.type?.name || '-'}
                                        </TblLineSecond>
                                    </td>
                                    <td>
                                        <div className="hstack gap-2 justify-content-end">
                                            <BtnCircleRemove
                                                actions={{
                                                    remove: (e) => {
                                                        e.stopPropagation()
                                                        _handleChooseRemove(vm)
                                                    },
                                                }}
                                            />

                                            <BtnCircleEdit
                                                title="Edit Data"
                                                actions={{
                                                    edit: (e) => {
                                                        e.stopPropagation()
                                                        __actionUpdateModal(vm)
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
                    id={MDExCategoryRemove}
                    configHandle={{
                        urlAPI: () =>
                            apiExperienceCategory.delete(dataForRemove.id),
                        callBack: () => {
                            __actionRemove(dataForRemove.id)
                        },
                        emptySelect: () => {
                            _handleSetData({})
                        },
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDExCategoryAdd}
                    detail={__detailData}
                    title="Website Contact Form"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            {/*{!isEmpty(listContactFormType) ? (*/}
                            <FormSelectOption
                                label="Form Type"
                                name="experienceTypeId"
                                required>
                                <option value="">- Select Form Type -</option>
                                {listType.map((vm, index) => (
                                    <option key={index} value={vm.id}>
                                        {vm.name}
                                    </option>
                                ))}
                            </FormSelectOption>
                            {/*) : null}*/}

                            <FormInput
                                label="Name"
                                name="name"
                                required
                                placeholder="e.g Uni"
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: () =>
                            apiExperienceCategory.add(__formRequest),
                        urlAPIUpdate: () => {
                            return apiExperienceCategory.update(
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

export default TabExCategory
