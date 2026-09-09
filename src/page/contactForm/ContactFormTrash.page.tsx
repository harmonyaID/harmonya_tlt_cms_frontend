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
    BtnInfo,
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
import {
    apiWebContactForm,
    getContactFormTrash,
    permanentDeleteContactForm,
    restoreContactForm,
} from '@/service/api/contentManageSetting.api.ts'
import SelectOptionContactFormType from '@/common/dataForm/SelectOptionContactFormType.tsx'
import moment from 'moment'
import SelectOptionBoatType from '@/common/dataForm/SelectOptionBoatType.tsx'
import AdvanceSearch from '@/component/general/AdvanceSearch.tsx'
import useContactFormMain from '@/page/contactForm/hook/useContactFormMain.hook.ts'
import useTrash from '@/common/dataFeature/trash/hook/useTrash.ts'
import {
    permanentDeleteBlog,
    restoreBlog,
} from '@/service/api/contentManage.api.ts'
import TrashConfirmModals from '@/common/dataFeature/trash/TrashConfirmModals.tsx'
import ContactFormTable from '@/page/contactForm/component/ContactFormTable.tsx'
import ContactFormFilter from '@/page/contactForm/component/ContactFormFilter.tsx'

const ContactFormPage = () => {
    const {
        __search,
        __isLoading,
        __list,
        __pagination,

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
        __handleToMain,
    } = useContactFormMain({ urlAPI: getContactFormTrash })

    const {
        __isLoadingTrash,
        __handlePermanentRemove,
        __handleChooseRestore,
        __handleRestore,
        __handleChoosePermanentRemove,
        __dataPermanentRemove,
        __dataRestore,
    } = useTrash({
        urlAPIRestore: restoreContactForm,
        urlAPIPermanentRemove: permanentDeleteContactForm,
        actions: {
            onSuccess: (vm) => __actionRemove(vm.id),
        },
    })

    return (
        <>
            <CardListData
                title="Contact Form Trash"
                componentAction={
                    <>
                        <BtnInfo isOutline onClick={() => __handleToMain()}>
                            Back
                        </BtnInfo>
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
                    isTrash
                    __list={__list}
                    __isLoading={__isLoading}
                    __pagination={__pagination}
                    actions={{
                        __actionPagination: __actionPagination,
                        __actionUpdateModal: __actionUpdateModal,
                        __handleChooseDetail: __handleChooseDetail,
                        __handleChooseRemove: _handleChooseRemove,
                        __handleChoosePermanentRemove:
                            __handleChoosePermanentRemove,
                        __handleChooseRestore: __handleChooseRestore,
                    }}
                />
            </CardListData>

            <CreatePortalLayout>
                <TrashConfirmModals
                    name={__dataRestore?.title || __dataPermanentRemove?.title}
                    isLoading={__isLoadingTrash}
                    actions={{
                        handleRestore: __handleRestore,
                        handlePermanentRemove: __handlePermanentRemove,
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default ContactFormPage
