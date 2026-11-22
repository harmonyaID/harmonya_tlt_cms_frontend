import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Image from 'rc-image'
import ConfirmRemoveListLogic from '@/common/misc/ConfirmRemoveList.logic.tsx'
import ModalWithActionFormCRUDLogic from '@/common/misc/ModalWithActionFormCRUD.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import TableThemeLogic from '@/common/table/TableTheme.logic.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import {
    BtnCircleEdit,
    BtnCircleRemove,
    BtnPrimary,
} from '@/component/general/Button.tsx'
import Pagination from '@/component/general/Pagination.tsx'
import {
    TblLineFirstPrimary,
    TblLineSecond,
} from '@/component/general/TablePartial.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import CreatePortalLayout from '@/component/layout/CreatePortal.layout.tsx'
import {
    MDBSTabAffiliateAdd,
    MDBSTabAffiliateRemove,
} from '@/config/modal.config.ts'
import { configDefaultPagination } from '@/config/pagination.config.ts'
import actionModal from '@/helper/base/actionModal.helper.ts'
import { isShowPagination } from '@/helper/base/condition.helper.ts'
import { objectToFormData } from '@/helper/convertFormData.helper.ts'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useNestedFormHook from '@/hook/base/useNestedForm.hook.ts'
import useChooseData from '@/hook/useChooseData.hook.ts'
import useCRUDModalRequestHook from '@/hook/useCRUDModalRequest.hook.ts'
import { apiBlogAffiliate } from '@/service/api/contentManageSetting.api.ts'
import { APIResponse } from '@/type/resultAPI.ts'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'

const initForm = {
    title: '',
    bannerImage: '',
    deleteBannerImage: false,
    bannerUrl: '',
    isAppliedToAll: 0,
}

const initMapForm = (passData) => ({
    title: passData?.title || '',
    bannerImage: '',
    deleteBannerImage: false,
    bannerUrl: passData?.bannerUrl || '',
    isAppliedToAll: passData?.isAppliedToAll ? 1 : 0,
})

const TabBlogAffiliate = () => {
    const {
        __list,
        __isLoading,
        __actionRemove,
        __actionAdd,
        __actionUpdate,
        __pagination,
        __actionPagination,
    } = useDataListHook({
        urlAPI: apiBlogAffiliate.list,
        isAutoSearch: false,
    })

    const [previewBanner, setPreviewBanner] = useState('')

    const {
        __formRequest,
        __detailData,
        __selectedId,
        __isEdit,
        __setFormRequest,
        __actionAddModal,
        __actionUpdateModal,
        __actionCloseModal,
    } = useCRUDModalRequestHook({
        modalId: MDBSTabAffiliateAdd,
        modalRemoveId: MDBSTabAffiliateRemove,
        emptyParam: { ...initForm },
        mapDetailToFormRequest: (res) => {
            setPreviewBanner(res?.bannerImage || '')
            return initMapForm(res)
        },
    })

    const { _handleChange } = useNestedFormHook(__formRequest, __setFormRequest)

    const {
        __data: dataForRemove,
        __handleChooseAndNextStep: _handleChooseRemove,
        __setData: _handleSetData,
    } = useChooseData({
        action: {
            nextStep: () => actionModal(MDBSTabAffiliateRemove, false),
        },
    })

    const _handleRemoveBanner = () => {
        // flag the saved image for deletion when it is removed / replaced
        const isSavedImage =
            __isEdit &&
            !!__detailData?.bannerImage &&
            previewBanner === __detailData.bannerImage

        __setFormRequest((prev) => ({
            ...prev,
            bannerImage: '',
            ...(isSavedImage ? { deleteBannerImage: true } : {}),
        }))
        setPreviewBanner('')
    }

    const _handleAddSync = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData({ ...__formRequest })
        return apiBlogAffiliate.addWithData(dataForm)
    }

    const _handleUpdateSync = async (): Promise<APIResponse> => {
        const dataForm = await objectToFormData({ ...__formRequest })
        return apiBlogAffiliate.updateWithData(__selectedId, dataForm)
    }

    useEffect(() => {
        __actionPagination(1)
    }, [])

    return (
        <>
            <div className="row mb-4">
                <div className="col-md">
                    <h5 className="fs-18 fw-500">Affiliate</h5>
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
                        ths={['Banner', 'Banner URL', 'Applied To All', '']}
                        tds={__list}>
                        {__list.map((vm, index) => (
                            <tr key={index}>
                                <td className="max-w-300px text-wrap">
                                    <div className="hstack gap-3 align-items-start">
                                        <div className="position-relative float-end">
                                            <div className="overflow-hidden rounded position-relative">
                                                <div
                                                    className="wp-img-preview"
                                                    onClick={() => {}}>
                                                    <Image
                                                        src={vm?.bannerImage}
                                                        alt="Preview File"
                                                        fallback={
                                                            ImgGeneralDefault
                                                        }
                                                        className="data-img data-img-contain avatar-46 object-fit-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <TblLineFirstPrimary
                                            value={vm?.title || '-'}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <TblLineSecond>
                                        {vm?.bannerUrl ? (
                                            <Link
                                                to={vm.bannerUrl}
                                                target="_blank">
                                                Preview
                                            </Link>
                                        ) : (
                                            '-'
                                        )}
                                    </TblLineSecond>
                                </td>
                                <td>
                                    <TextTrueOrFalse
                                        value={vm?.isAppliedToAll}
                                    />
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
                    id={MDBSTabAffiliateRemove}
                    configHandle={{
                        urlAPI: () => apiBlogAffiliate.delete(dataForRemove.id),
                        callBack: () => __actionRemove(dataForRemove.id),
                        emptySelect: () => _handleSetData({}),
                    }}
                />

                <ModalWithActionFormCRUDLogic
                    id={MDBSTabAffiliateAdd}
                    detail={__detailData}
                    title="Affiliate"
                    isEdit={__isEdit}
                    formRequest={__formRequest}
                    actions={{
                        change: _handleChange,
                        toggleModal: __actionCloseModal,
                    }}
                    isUseDefaultInput={false}
                    externalForm={
                        <>
                            <FormInput
                                label="Title"
                                name="title"
                                required
                                placeholder="e.g Summer Promo"
                            />

                            {previewBanner ? (
                                <div className="my-3">
                                    <p className="mb-2 text-neutral-100">
                                        Banner Image
                                    </p>

                                    <PreviewFileModalLogic
                                        dataUrl={previewBanner?.toString()}
                                        dataBy="file"
                                        dataFile={previewBanner}
                                        isShowBtnRemove
                                        actions={{
                                            remove: _handleRemoveBanner,
                                        }}
                                    />
                                </div>
                            ) : (
                                <FormUploadFile
                                    label="Banner Image"
                                    name="bannerImage"
                                    isUseHook={false}
                                    isPreview={false}
                                    accept="image/*"
                                    actions={{
                                        onChange: (_, newFiles) =>
                                            _handleChange(
                                                'bannerImage',
                                                newFiles,
                                            ),
                                        handleDataFiles: (newDataFiles) =>
                                            setPreviewBanner(newDataFiles.url),
                                    }}
                                />
                            )}

                            <FormInput
                                label="Banner URL"
                                name="bannerUrl"
                                type="url"
                                placeholder="e.g https://www.thelembongantraveller.com/"
                            />

                            <FormRadioButtonMulti
                                label="Applied To All Blogs ?"
                                name="isAppliedToAll"
                                required
                                checkBoxs={[
                                    { defaultValue: 0, label: 'No' },
                                    { defaultValue: 1, label: 'Yes' },
                                ]}
                            />
                        </>
                    }
                    configHandle={{
                        urlAPIAdd: _handleAddSync,
                        urlAPIUpdate: _handleUpdateSync,
                        initialForm: () =>
                            __setFormRequest(initMapForm(__detailData)),
                        callBack: (newData) => {
                            __isEdit
                                ? __actionUpdate(newData)
                                : __actionAdd(newData, 'id', true)
                        },
                        emptySelect: () => {
                            setPreviewBanner('')
                            __setFormRequest(() => ({ ...initForm }))
                        },
                    }}
                />
            </CreatePortalLayout>
        </>
    )
}

export default TabBlogAffiliate
