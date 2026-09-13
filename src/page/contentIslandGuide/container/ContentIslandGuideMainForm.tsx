import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import FormUploadFileWithActionPreviewLogic from '@/common/misc/FormUploadFileWithActionPreview.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useDataListHook from '@/hook/base/useDataList.hook.ts'
import useFormDataFilesHook from '@/hook/dev/useFormDataFiles.hook.ts'
import useUploadFileFormRequestHook from '@/hook/useUploadFileFormRequest.hook.ts'
import useContentExMainFormHook from '@/page/contentExperience/hook/useContentExMainForm.hook.ts'
import contentBlogPath from '@/path/contentBlog.path.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import useContentIslandGuideMainFormHook from '@/page/contentIslandGuide/hook/useContentIslandGuideMainForm.hook.ts'
import {
    apiIslandGuideArea,
    apiIslandGuideType,
} from '@/service/api/contentManageSetting.api.ts'
import contentIslandGuidePath from '@/path/contentIslandGuide.path.ts'

const ContentExMainForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const {
        __formRequest,
        __setFormRequest,
        __isLoading,
        __isLoadingDetail,
        __pageStateDataSearch,
        __handleChange,
        __handleChangeWithParent,
        __handleArrAddMulti,
        __handleArrChange,

        // Thumbnail
        __previewThumbnail,
        __setPreviewThumbnail,
        __handleThumbnailRemove,

        // Map Image
        __previewMapImage,
        __setPreviewMapImage,
        __handleMapImageRemove,

        // SEO Thumbnail
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        // Form
        __handleSubmit,
        __handleCancel,
    } = useContentIslandGuideMainFormHook({ isEdit })

    // Photos
    const {
        __dataFiles,
        __handleAddFiles: __actionAddFiles,
        __handleSetDataFiles: __actionSetDataFiles,
        __handleRemoveDataFile: __actionRemoveDataFile,
    } = useUploadFileFormRequestHook({
        formRequest: __formRequest,
        setFormRequest: __setFormRequest,
        keyFormRequest: 'photos',
        withMimeType: true,
        isLoadData: isEdit,
        externalFormRequest: { order: 0 },
    })

    const _handleRemovePhoto = (index, idFile) => {
        __setFormRequest((prev) => ({
            ...prev,
            deletePhotoIds: [...prev.deletePhotoIds, idFile],
        }))

        __actionRemoveDataFile(index, idFile)
    }


    // List Option Type
    const { __list: typeList, __isLoading: isTypeLoading } = useDataListHook({
        urlAPI: ({ search }) => apiIslandGuideType.list({ search, page: 0 }),
    })

    // List Option Category
    // const { __list: categoryList, __isLoading: isCategoryLoading } =
    //     useDataListHook({
    //         urlAPI: ({ search }) =>
    //             apiExperienceCategory.list({ search, page: 0 }),
    //     })

    // List Option Area
    const { __list: areaList, __isLoading: isAreaLoading } = useDataListHook({
        urlAPI: ({ search }) => apiIslandGuideArea.list({ search, page: 0 }),
    })

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Island Guide', {
                        url: contentIslandGuidePath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread(isEdit ? 'Edit' : 'Add'),
                ]}
            />

            {__isLoadingDetail && isEdit ? (
                <Loading />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}>
                        <div className="row">
                            <div className="col-md-8">
                                <div className="vstack gap-4">
                                    <CardDropdown
                                        title="Island Guide Information"
                                        isShow>
                                        <WrapFormContext
                                            formRequest={__formRequest}
                                            actions={{
                                                change: __handleChange,
                                            }}>
                                            <GeneralRowForm
                                                label="Name"
                                                isRequired>
                                                <FormInput
                                                    name="name"
                                                    placeholder="e.g Amara"
                                                    required
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Type"
                                                isRequired>
                                                <FormSelectOption
                                                    name="islandGuideTypeId"
                                                    disabled={isTypeLoading}
                                                    required
                                                    value={
                                                        __formRequest.islandGuideTypeId
                                                    }
                                                    actions={{
                                                        onChange: (
                                                            name,
                                                            value,
                                                        ) => {
                                                            __setFormRequest(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [name]: value,
                                                                }),
                                                            )
                                                        },
                                                    }}>
                                                    <option value="">
                                                        - Select Type -
                                                    </option>
                                                    {typeList.map(
                                                        (vm, index) => (
                                                            <option
                                                                key={index}
                                                                value={vm.id}>
                                                                {vm.name}
                                                            </option>
                                                        ),
                                                    )}
                                                </FormSelectOption>
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Area"
                                                isRequired>
                                                <FormSelectOption
                                                    name="islandGuideAreaId"
                                                    disabled={isAreaLoading}
                                                    required>
                                                    <option value="">
                                                        - Select Area -
                                                    </option>
                                                    {areaList
                                                        // .filter(
                                                        //     (vm) =>
                                                        //         vm.type.id !==
                                                        //         __formRequest.experienceAreaId,
                                                        // )
                                                        .map((vm, index) => (
                                                            <option
                                                                key={index}
                                                                value={vm.id}>
                                                                {vm.name}
                                                            </option>
                                                        ))}
                                                </FormSelectOption>
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Open Hours"
                                                isRequired>
                                                <FormInput
                                                    name="openHours"
                                                    placeholder="e.g Open Everyday 6.30AM - Late"
                                                    required
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Description"
                                                isRequired>
                                                <FormTinyMCE
                                                    name="description"
                                                    isSimple
                                                />
                                            </GeneralRowForm>
                                        </WrapFormContext>

                                        <WrapFormContext
                                            formRequest={__formRequest}
                                            actions={{
                                                change: __handleChange,
                                                handleAddFiles:
                                                    __actionAddFiles,
                                                handleSetDataFiles:
                                                    __actionSetDataFiles,
                                                handleRemoveDataFile:
                                                    _handleRemovePhoto,
                                                handleArrChange:
                                                    __handleArrChange,
                                            }}>
                                            <GeneralRowForm
                                                label="New Photos"
                                                isRequired>
                                                <FormUploadFileWithActionPreviewLogic
                                                    isUseInputDesc={false}
                                                    dataBy="photo"
                                                    formName="photos"
                                                    dataFiles={__dataFiles}
                                                    formRequest={__formRequest}
                                                />
                                            </GeneralRowForm>
                                        </WrapFormContext>

                                        {/*<WrapFormContext*/}
                                        {/*    formRequest={__formRequest}*/}
                                        {/*    actions={{*/}
                                        {/*        change: __handleChange,*/}
                                        {/*        handleAddFiles:*/}
                                        {/*            __actionAddFilesCatalogs,*/}
                                        {/*        handleSetDataFiles:*/}
                                        {/*            __actionSetDataFilesCatalogs,*/}
                                        {/*        handleRemoveDataFile:*/}
                                        {/*            __actionRemoveDataFileCatalogs,*/}
                                        {/*        handleArrChange:*/}
                                        {/*            __handleArrChange,*/}
                                        {/*    }}>*/}
                                        {/*    <GeneralRowForm*/}
                                        {/*        label="Catalogs"*/}
                                        {/*        isRequired>*/}
                                        {/*        <FormUploadFileWithActionPreviewLogic*/}
                                        {/*            formName="catalogs"*/}
                                        {/*            dataFiles={*/}
                                        {/*                __dataFilesCatalogs*/}
                                        {/*            }*/}
                                        {/*            formRequest={__formRequest}*/}
                                        {/*            nameInput="description"*/}
                                        {/*            isUseInputDesc*/}
                                        {/*            actions={{*/}
                                        {/*                handleAddFiles:*/}
                                        {/*                    __actionAddFilesCatalogs,*/}
                                        {/*                handleSetDataFiles:*/}
                                        {/*                    __actionSetDataFilesCatalogs,*/}
                                        {/*                handleRemoveDataFile:*/}
                                        {/*                    __actionRemoveDataFileCatalogs,*/}
                                        {/*                handleArrChange:*/}
                                        {/*                    __handleArrChange,*/}
                                        {/*            }}*/}
                                        {/*        />*/}
                                        {/*    </GeneralRowForm>*/}
                                        {/*</WrapFormContext>*/}
                                    </CardDropdown>

                                    <SectionFormSEOInfo
                                        // classNameColumn="col-md-8"
                                        __formRequest={__formRequest}
                                        __handleChangeWithParent={
                                            __handleChangeWithParent
                                        }

                                        // SEO Thumbnail
                                        __seoThumbnail={__seoThumbnail}
                                        __setSetSEOThumbnail={
                                            __setSetSEOThumbnail
                                        }
                                        __handleSEOThumbnailRemove={
                                            __handleSEOThumbnailRemove
                                        }
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <WrapFormContext
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                    }}>
                                    <Card title="Other Information">
                                        <div>
                                            {/*Thumbnail*/}
                                            {__previewThumbnail ? (
                                                <>
                                                    <div className="pb-3">
                                                        <p className="mb-2 text-neutral-100">
                                                            Thumbnail
                                                        </p>

                                                        <PreviewFileModalLogic
                                                            dataUrl={__previewThumbnail?.toString()}
                                                            dataBy="file"
                                                            dataFile={
                                                                __previewThumbnail
                                                            }
                                                            isShowBtnRemove
                                                            actions={{
                                                                remove: __handleThumbnailRemove,
                                                            }}
                                                            classNameWidth="w-100 max-h-148px"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <FormUploadFile
                                                    label="Thumbnail"
                                                    name="thumbnail"
                                                    required
                                                    isUseHook={false}
                                                    isPreview={false}
                                                    accept="image/*"
                                                    actions={{
                                                        onChange: (
                                                            _,
                                                            newFiles,
                                                        ) => {
                                                            const img =
                                                                new Image()
                                                            const objectUrl =
                                                                URL.createObjectURL(
                                                                    newFiles,
                                                                )

                                                            img.onload = () => {
                                                                __handleChange(
                                                                    'thumbnail',
                                                                    newFiles,
                                                                )
                                                            }

                                                            img.src = objectUrl
                                                        },
                                                        handleDataFiles: (
                                                            newDataFiles,
                                                        ) => {
                                                            __setPreviewThumbnail(
                                                                newDataFiles.url,
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}

                                            {/*Map Image*/}
                                            {__previewMapImage ? (
                                                <>
                                                    <div className="pb-3">
                                                        <p className="mb-2 text-neutral-100">
                                                            Map Image
                                                        </p>

                                                        <PreviewFileModalLogic
                                                            dataUrl={__previewMapImage?.toString()}
                                                            dataBy="file"
                                                            dataFile={
                                                                __previewMapImage
                                                            }
                                                            isShowBtnRemove
                                                            actions={{
                                                                remove: __handleMapImageRemove,
                                                            }}
                                                            classNameWidth="w-100 max-h-148px"
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <FormUploadFile
                                                    label="Map Image"
                                                    name="mapImage"
                                                    required
                                                    isUseHook={false}
                                                    isPreview={false}
                                                    accept="image/*"
                                                    actions={{
                                                        onChange: (
                                                            _,
                                                            newFiles,
                                                        ) => {
                                                            const img =
                                                                new Image()
                                                            const objectUrl =
                                                                URL.createObjectURL(
                                                                    newFiles,
                                                                )

                                                            img.onload = () => {
                                                                __handleChange(
                                                                    'mapImage',
                                                                    newFiles,
                                                                )
                                                            }

                                                            img.src = objectUrl
                                                        },
                                                        handleDataFiles: (
                                                            newDataFiles,
                                                        ) => {
                                                            __setPreviewMapImage(
                                                                newDataFiles.url,
                                                            )
                                                        },
                                                    }}
                                                />
                                            )}

                                            <FormRadioButtonMulti
                                                label="Status Active"
                                                name="isActive"
                                                className="mb-0"
                                                required
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

                                            <FormRadioButtonMulti
                                                label="Show Inquiry"
                                                name="showInquiry"
                                                className="mb-0"
                                                required
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

                                            <FormInput
                                                label="Whatsapp"
                                                name="whatsapp"
                                                placeholder="e.g 628700xxxx"
                                                isNumberOnly
                                                required
                                            />

                                            <FormInput
                                                label="Instagram"
                                                name="instagram"
                                                placeholder="e.g @3monkeyslembongan"
                                                required
                                            />

                                            <FormInput
                                                label="Website"
                                                name="website"
                                                placeholder="e.g https://www.3monkeys.com"
                                                type="url"
                                                required
                                            />

                                            <FormInput
                                                label="Map Location Url"
                                                name="mapLocationUrl"
                                                placeholder="e.g https://maps.google.com/?q=-8.123,115.456"
                                                required
                                            />
                                        </div>
                                    </Card>
                                </WrapFormContext>
                            </div>
                        </div>

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() =>
                                __handleCancel(__pageStateDataSearch)
                            }
                        />
                    </FormWrap>
                </>
            )}
        </>
    )
}

export default ContentExMainForm
