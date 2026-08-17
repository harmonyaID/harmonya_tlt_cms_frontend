import { ReactNode, memo } from 'react'
import { isEmpty } from 'lodash'
import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormRadioButtonMulti from '@/component/form/FormRadioButtonMulti.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTinyMCE from '@/component/form/FormTinyMCE.tsx'
import FormUploadFile from '@/component/form/FormUploadFile.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import { BtnCircleRemove } from '@/component/general/Button.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PreviewEmbedMap from '@/component/general/PreviewEmbedMap.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import LoadingNotAvailable from '@/component/loading/LoadingNotAvailable.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useHomePageMainForm from '@/page/contentHomePage/hook/useHomePageMainForm.ts'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'

const defaultPropsFile = {
    isUseHook: false,
    isMulti: false,
    isGeneralFile: false,
    dataPreviewBy: 'url',
    classNameLayoutImage: 'max-h-240px ratio ratio-21x9',
}

interface InputCustomProps {
    sectionName?: string
    name: string
    value: any | ReactNode
    [key: string]: any
}

const ContentHomePageEditPage = () => {
    const {
        __formRequest,
        __isLoading,
        __isLoadingDetail,
        __detail,
        __pageStateDataSearch,

        // Chang Form
        __setFormRequest,
        __handleChange,
        __handleArrToggle,
        __handleArrChange,
        __handleChangeWithParent,
        __handleSectionInput,

        // Input File
        __handleUploadFile,
        __handleSectionRemoveNested,

        // SEO
        __seoThumbnail,
        __setSetSEOThumbnail,
        __handleSEOThumbnailRemove,

        __handleSubmit,
        __handleCancel,
    } = useHomePageMainForm({ isEdit: true })

    const {
        SECTION1 = {},
        SECTION2 = {},
        SECTION3 = {},
        SECTION4 = {},
        SECTION5 = {},
        SECTION6 = {},
        SECTION7 = {},
        SECTION8 = {},
        SECTION9 = {},
        SECTION10 = {},
        SECTION11 = {},
        SECTION12 = {},
        SECTION13 = {},

        // @ts-ignore
    } = !__isLoadingDetail && !isEmpty(__detail) ? __formRequest.value : {}

    console.log('SECTION1: ', SECTION1)

    const FormInputDataFileImage = memo(
        ({
            sectionName = '',
            name = '',
            value = '',
            ...other
        }: InputCustomProps) => {
            return (
                <FormUploadFile
                    // Default
                    {...defaultPropsFile}

                    {...other}

                    accept="image/*"
                    name={name}
                    value={value || ''}
                    actions={{
                        onChange: (_, newFiles) => {
                            __handleSectionInput(
                                sectionName ? sectionName + '.' + name : name,
                                newFiles,
                            )
                            // __handleUploadFile(sectionName, name, newFiles)
                        },
                    }}
                />
            )
        },
    )

    const FormInputTextEditor = ({
        sectionName = '',
        name = '',
        value = '',
        ...other
    }: InputCustomProps) => {
        return (
            // <FormTextEditor
            //     {...other}
            //     value={value || ''}
            //     actions={{
            //         onChange: (passValue) =>
            //             __handleSectionInput(
            //                 sectionName ? sectionName + '.' + name : name,
            //                 passValue,
            //             ),
            //     }}
            //     required
            // />
            <FormTinyMCE
                {...other}
                name={sectionName ? sectionName + '.' + name : name}
                isUseHook={false}
                isSimple
                value={value || ''}
                actions={{
                    onChange: (passName, passValue) =>
                        __handleSectionInput(
                            sectionName ? sectionName + '.' + name : name,
                            passValue,
                        ),
                }}
            />
        )
    }

    return (
        <>
            <NavBreadcrumb
                navs={[
                    objectNavBread('Home Page', {
                        url: contentHomePagePath.main,
                        state: __pageStateDataSearch,
                    }),
                    objectNavBread('Edit'),
                ]}
            />

            {__isLoadingDetail || isEmpty(__detail) ? (
                <LoadingNotAvailable
                    isLoading={__isLoadingDetail}
                    isNotFound={isEmpty(__detail)}
                />
            ) : (
                <>
                    <FormWrap
                        actions={{
                            handleSubmit: () => __handleSubmit(),
                        }}>
                        <div className="row">
                            <div className="col-lg-12">
                                <h5 className="fs-18 fw-600 pb-3">
                                    Homepage Content
                                </h5>

                                <WrapFormContext
                                    formRequest={__formRequest.value}
                                    actions={{
                                        change: (name, value) =>
                                            __handleSectionInput(name, value),
                                    }}>
                                    <div className="vstack gap-3">
                                        {/*SECTION 1*/}
                                        <CardDropdown
                                            title="SECTION 1"
                                            isShow
                                            id="section-01">
                                            <WrapFormContext
                                                formRequest={
                                                    __formRequest.value.SECTION1
                                                }
                                                actions={{
                                                    change: (name, value) =>
                                                        __handleSectionInput(
                                                            'SECTION1.' + name,
                                                            value,
                                                        ),
                                                }}>
                                                <GeneralRowForm
                                                    label="Content"
                                                    isRequired>
                                                    {/*<FormTinyMCE*/}
                                                    {/*    name="SECTION1.content"*/}
                                                    {/*    isSimple*/}
                                                    {/*/>*/}
                                                    <FormInputTextEditor
                                                        sectionName="SECTION1"
                                                        name="content"
                                                        value={
                                                            SECTION1?.content ||
                                                            ''
                                                        }
                                                        required
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Video Thumbnail"
                                                    isRequired>
                                                    <FormUploadFile
                                                        // Default
                                                        {...defaultPropsFile}

                                                        accept="image/*"
                                                        required
                                                        name="videoThumbnail"
                                                        value={
                                                            SECTION1.videoThumbnail
                                                        }
                                                        actions={{
                                                            onChange: (
                                                                _,
                                                                newFiles,
                                                            ) => {
                                                                __handleUploadFile(
                                                                    'SECTION1',
                                                                    'videoThumbnail',
                                                                    newFiles,
                                                                )
                                                            },
                                                        }}
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Background Video"
                                                    isRequired>
                                                    <FormUploadFile
                                                        // Default
                                                        {...defaultPropsFile}

                                                        name="backgroundVideo"
                                                        required
                                                        isPreviewVideo
                                                        subTitle="Video MP4, MOV"
                                                        accept="video/*"
                                                        value={
                                                            SECTION1?.backgroundVideo ||
                                                            ''
                                                        }
                                                        actions={{
                                                            onChange: (
                                                                _,
                                                                newFiles,
                                                            ) => {
                                                                __handleUploadFile(
                                                                    'SECTION1',
                                                                    'backgroundVideo',
                                                                    newFiles,
                                                                )
                                                            },
                                                        }}
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm label="Preview Video ?">
                                                    <FormRadioButtonMulti
                                                        name="isVideo"
                                                        className="mb-0"
                                                        checkBoxs={[
                                                            {
                                                                defaultValue:
                                                                    'false',
                                                                label: 'No',
                                                            },
                                                            {
                                                                defaultValue:
                                                                    'true',
                                                                label: 'Yes',
                                                            },
                                                        ]}
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Search"
                                                    isRequired>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Search Label Dates"
                                                                name="searchLabelDates"
                                                                value={
                                                                    SECTION1.searchLabelDates
                                                                }
                                                                required
                                                                placeholder="e.g Dates"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Search Placeholder Dates"
                                                                name="searchPlaceholderDates"
                                                                value={
                                                                    SECTION1.searchPlaceholderDates
                                                                }
                                                                required
                                                                placeholder="e.g Choose Date"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Search Label Guest"
                                                                name="searchLabelGuest"
                                                                value={
                                                                    SECTION1.searchLabelGuest
                                                                }
                                                                required
                                                                placeholder="e.g Guest"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Search Placeholder Guest"
                                                                name="searchPlaceholderGuest"
                                                                value={
                                                                    SECTION1.searchPlaceholderGuest
                                                                }
                                                                required
                                                                placeholder="e.g 2 Adults, 0 Children"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Search Label Collection"
                                                                name="searchLabelCollection"
                                                                value={
                                                                    SECTION1.searchLabelCollection
                                                                }
                                                                required
                                                                placeholder="e.g Guest"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Search Placeholder Collection"
                                                                name="searchPlaceholderCollection"
                                                                value={
                                                                    SECTION1.searchPlaceholderCollection
                                                                }
                                                                required
                                                                placeholder="e.g 2 Villas / Resort"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION1.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION1.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </GeneralRowForm>
                                            </WrapFormContext>
                                        </CardDropdown>

                                        {/*SECTION 2*/}
                                        <CardDropdown
                                            title="SECTION 2"
                                            id="section-02">
                                            <WrapFormContext
                                                formRequest={
                                                    __formRequest.value.SECTION2
                                                }
                                                actions={{
                                                    change: (name, value) =>
                                                        __handleSectionInput(
                                                            'SECTION2.' + name,
                                                            value,
                                                        ),
                                                }}>
                                                <p className="fs-18 fw-medium">
                                                    Left Position
                                                </p>
                                                <GeneralRowForm
                                                    label="Content"
                                                    isRequired>
                                                    <FormInputTextEditor
                                                        sectionName="SECTION2"
                                                        name="content"
                                                        value={
                                                            SECTION2?.content ||
                                                            ''
                                                        }
                                                        required
                                                    />
                                                </GeneralRowForm>
                                                <GeneralRowForm label="Map Image">
                                                    <FormInputDataFileImage
                                                        sectionName="SECTION2"
                                                        name="mapImage"
                                                        value={
                                                            SECTION2.mapImage ||
                                                            ''
                                                        }
                                                    />
                                                </GeneralRowForm>

                                                <p className="fs-18 fw-medium pt-5">
                                                    Right Position
                                                </p>
                                                <GeneralRowForm label="Banner Image">
                                                    <FormInputDataFileImage
                                                        sectionName="SECTION2"
                                                        name="image"
                                                        value={
                                                            SECTION2.image || ''
                                                        }
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Side Content"
                                                    isRequired>
                                                    <FormInputTextEditor
                                                        sectionName="SECTION2"
                                                        name="sideContent"
                                                        value={
                                                            SECTION2?.sideContent ||
                                                            ''
                                                        }
                                                        required
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Action"
                                                    isRequired>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION2.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION2.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </GeneralRowForm>
                                            </WrapFormContext>
                                        </CardDropdown>

                                        {/*SECTION 3*/}
                                        <CardDropdown
                                            title="SECTION 3"
                                            id="section-03">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION3"
                                                    name="content"
                                                    value={
                                                        SECTION3?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <p className="fs-18 fw-medium pt-2">
                                                Tabs
                                            </p>

                                            {SECTION3.tabs?.map(
                                                (tab, index) => {
                                                    const items =
                                                        tab?.items || []
                                                    return (
                                                        <GeneralRowForm
                                                            key={index}
                                                            label={tab.tabName}
                                                            isRequired>
                                                            <WrapFormContext
                                                                formRequest={
                                                                    SECTION3
                                                                        .tabs[
                                                                        index
                                                                    ]
                                                                }
                                                                actions={{
                                                                    change: (
                                                                        name,
                                                                        value,
                                                                    ) =>
                                                                        __handleSectionInput(
                                                                            'SECTION3.tabs[' +
                                                                                index +
                                                                                ']' +
                                                                                name,
                                                                            value,
                                                                        ),
                                                                }}>
                                                                <FormInput
                                                                    label="Tab Name"
                                                                    name="tabName"
                                                                    value={
                                                                        tab.tabName
                                                                    }
                                                                    required
                                                                    placeholder="e.g Island Travel Tips"
                                                                />
                                                            </WrapFormContext>

                                                            <div className="vstack gap-3">
                                                                {items.map(
                                                                    (
                                                                        item,
                                                                        idx,
                                                                    ) => {
                                                                        return (
                                                                            <div
                                                                                className="card card-body"
                                                                                key={
                                                                                    idx
                                                                                }>
                                                                                <div className="row align-items-top pb-2">
                                                                                    <div className="col-md">
                                                                                        <h6 className="mb-0">
                                                                                            Option{' '}
                                                                                            {idx +
                                                                                                1}
                                                                                        </h6>
                                                                                    </div>
                                                                                    <div className="col-auto pb-2">
                                                                                        {/*<BtnCircleRemove*/}
                                                                                        {/*    actions={{*/}
                                                                                        {/*        remove: () =>*/}
                                                                                        {/*            __handleSectionRemoveNested(*/}
                                                                                        {/*                'SECTION3.tabs[' +*/}
                                                                                        {/*                    index +*/}
                                                                                        {/*                    '].items',*/}
                                                                                        {/*                idx,*/}
                                                                                        {/*            ),*/}
                                                                                        {/*    }}*/}
                                                                                        {/*/>*/}
                                                                                    </div>
                                                                                </div>

                                                                                <WrapFormContext
                                                                                    formRequest={
                                                                                        SECTION3
                                                                                            .tabs[
                                                                                            index
                                                                                        ]
                                                                                    }
                                                                                    actions={{
                                                                                        change: (
                                                                                            name,
                                                                                            value,
                                                                                        ) =>
                                                                                            __handleSectionInput(
                                                                                                'SECTION3.tabs[' +
                                                                                                    index +
                                                                                                    ']items[' +
                                                                                                    idx +
                                                                                                    ']' +
                                                                                                    name,
                                                                                                value,
                                                                                            ),
                                                                                    }}>
                                                                                    <FormInput
                                                                                        label="Title"
                                                                                        name="title"
                                                                                        value={
                                                                                            item.title
                                                                                        }
                                                                                        required
                                                                                        placeholder="e.g Island Travel Tips"
                                                                                    />

                                                                                    <FormTextArea
                                                                                        label="Description"
                                                                                        name="description"
                                                                                        value={
                                                                                            item.description
                                                                                        }
                                                                                        placeholder="e.g Placeholder text, edit with the ideal"
                                                                                    />

                                                                                    <div className="row">
                                                                                        <div className="col-md-6">
                                                                                            <FormInput
                                                                                                label="Button Text"
                                                                                                name="buttonText"
                                                                                                value={
                                                                                                    item.buttonText
                                                                                                }
                                                                                                required
                                                                                                placeholder="e.g Search"
                                                                                            />
                                                                                        </div>
                                                                                        <div className="col-md-6">
                                                                                            <FormInput
                                                                                                label="Button Link"
                                                                                                name="buttonLink"
                                                                                                value={
                                                                                                    item.buttonLink
                                                                                                }
                                                                                                required
                                                                                                placeholder="e.g #"
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                </WrapFormContext>

                                                                                <FormInputDataFileImage
                                                                                    sectionName="SECTION3"
                                                                                    name={
                                                                                        'tabs[' +
                                                                                        index +
                                                                                        '].items[' +
                                                                                        idx +
                                                                                        '].image'
                                                                                    }
                                                                                    value={
                                                                                        item.image ||
                                                                                        ''
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )
                                                                    },
                                                                )}
                                                            </div>
                                                        </GeneralRowForm>
                                                    )
                                                },
                                            )}
                                        </CardDropdown>

                                        {/*SECTION 4*/}
                                        <CardDropdown
                                            title="SECTION 4"
                                            id="section-04">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION4"
                                                    name="content"
                                                    value={
                                                        SECTION4?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Items"
                                                isRequired>
                                                <div className="vstack gap-3">
                                                    {SECTION4?.items?.map(
                                                        (item, idx) => {
                                                            return (
                                                                <div
                                                                    className="card card-body"
                                                                    key={idx}>
                                                                    <WrapFormContext
                                                                        formRequest={
                                                                            SECTION4
                                                                                .items[
                                                                                idx
                                                                            ]
                                                                        }
                                                                        actions={{
                                                                            change: (
                                                                                name,
                                                                                value,
                                                                            ) =>
                                                                                __handleSectionInput(
                                                                                    'SECTION4.items[' +
                                                                                        idx +
                                                                                        ']' +
                                                                                        name,
                                                                                    value,
                                                                                ),
                                                                        }}>
                                                                        <FormInput
                                                                            label="Title"
                                                                            name="title"
                                                                            value={
                                                                                item.title
                                                                            }
                                                                            required
                                                                            placeholder="e.g Island Travel Tips"
                                                                        />

                                                                        <FormTextArea
                                                                            label="Description"
                                                                            name="description"
                                                                            value={
                                                                                item.description
                                                                            }
                                                                            placeholder="e.g Placeholder text, edit with the ideal"
                                                                        />

                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <FormInput
                                                                                    label="Button Text"
                                                                                    name="buttonText"
                                                                                    value={
                                                                                        item.buttonText
                                                                                    }
                                                                                    required
                                                                                    placeholder="e.g Search"
                                                                                />
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <FormInput
                                                                                    label="Button Link"
                                                                                    name="buttonLink"
                                                                                    value={
                                                                                        item.buttonLink
                                                                                    }
                                                                                    required
                                                                                    placeholder="e.g #"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    </WrapFormContext>

                                                                    <FormInputDataFileImage
                                                                        sectionName="SECTION4"
                                                                        name={
                                                                            'items[' +
                                                                            idx +
                                                                            '].image'
                                                                        }
                                                                        value={
                                                                            item.image ||
                                                                            ''
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 5*/}
                                        <CardDropdown
                                            title="SECTION 5"
                                            id="section-05">
                                            <WrapFormContext
                                                formRequest={SECTION5}
                                                actions={{
                                                    change: (name, value) =>
                                                        __handleSectionInput(
                                                            'SECTION5.' + name,
                                                            value,
                                                        ),
                                                }}>
                                                <GeneralRowForm
                                                    label="Content"
                                                    isRequired>
                                                    <FormInputTextEditor
                                                        sectionName="SECTION5"
                                                        name="content"
                                                        value={
                                                            SECTION5?.content ||
                                                            ''
                                                        }
                                                        required
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Label"
                                                    isRequired>
                                                    <FormInput
                                                        // label="label"
                                                        name="label"
                                                        value={
                                                            SECTION5.label || ''
                                                        }
                                                        required
                                                        placeholder="e.g Limited Offer"
                                                    />
                                                </GeneralRowForm>

                                                <GeneralRowForm
                                                    label="Action"
                                                    isRequired>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION5.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION5.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </GeneralRowForm>
                                            </WrapFormContext>

                                            <GeneralRowForm
                                                label="Background"
                                                isRequired>
                                                <FormInputDataFileImage
                                                    sectionName="SECTION5"
                                                    name="background"
                                                    value={
                                                        SECTION5.background ||
                                                        ''
                                                    }
                                                />
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 6*/}
                                        <CardDropdown
                                            title="SECTION 6"
                                            id="section-06">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION6"
                                                    name="content"
                                                    value={
                                                        SECTION6?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Action"
                                                isRequired>
                                                <WrapFormContext
                                                    formRequest={SECTION6}
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleSectionInput(
                                                                'SECTION6.' +
                                                                    name,
                                                                value,
                                                            ),
                                                    }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION6.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION6.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 7*/}
                                        <CardDropdown
                                            title="SECTION 7"
                                            id="section-07">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION7"
                                                    name="content"
                                                    value={
                                                        SECTION7?.content || ''
                                                    }
                                                    classNameTextEditor="bg-neutral-300"
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Items"
                                                isRequired>
                                                <div className="vstack gap-3">
                                                    {SECTION7?.items?.map(
                                                        (item, idx) => {
                                                            return (
                                                                <div
                                                                    className="card card-body"
                                                                    key={idx}>
                                                                    <WrapFormContext
                                                                        formRequest={
                                                                            SECTION7
                                                                                .items[
                                                                                idx
                                                                            ]
                                                                        }
                                                                        actions={{
                                                                            change: (
                                                                                name,
                                                                                value,
                                                                            ) =>
                                                                                __handleSectionInput(
                                                                                    'SECTION7.items[' +
                                                                                        idx +
                                                                                        ']' +
                                                                                        name,
                                                                                    value,
                                                                                ),
                                                                        }}>
                                                                        <FormInput
                                                                            label="Title"
                                                                            name="title"
                                                                            value={
                                                                                item.title
                                                                            }
                                                                            required
                                                                            placeholder="e.g Island Travel Tips"
                                                                        />

                                                                        <FormTextArea
                                                                            label="Description"
                                                                            name="description"
                                                                            value={
                                                                                item.description
                                                                            }
                                                                            placeholder="e.g Placeholder text, edit with the ideal"
                                                                        />
                                                                    </WrapFormContext>

                                                                    <FormInputDataFileImage
                                                                        sectionName="SECTION7"
                                                                        name={
                                                                            'items[' +
                                                                            idx +
                                                                            '].icon'
                                                                        }
                                                                        value={
                                                                            item.icon ||
                                                                            ''
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 8*/}
                                        <CardDropdown
                                            title="SECTION 8"
                                            id="section-08">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION8"
                                                    name="content"
                                                    value={
                                                        SECTION8?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Action"
                                                isRequired>
                                                <WrapFormContext
                                                    formRequest={SECTION8}
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleSectionInput(
                                                                'SECTION8.' +
                                                                    name,
                                                                value,
                                                            ),
                                                    }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION8.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION8.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 9*/}
                                        <CardDropdown
                                            title="SECTION 9"
                                            id="section-09">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION9"
                                                    name="content"
                                                    value={
                                                        SECTION9?.content || ''
                                                    }
                                                    required
                                                    classNameTextEditor="bg-neutral-300"
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Action"
                                                isRequired>
                                                <WrapFormContext
                                                    formRequest={SECTION9}
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleSectionInput(
                                                                'SECTION9.' +
                                                                    name,
                                                                value,
                                                            ),
                                                    }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION9.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION9.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Logo">
                                                <FormInputDataFileImage
                                                    sectionName="SECTION9"
                                                    name="logo"
                                                    value={SECTION9.logo || ''}
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Background Image">
                                                <FormInputDataFileImage
                                                    sectionName="SECTION9"
                                                    name="backgroundImage"
                                                    value={
                                                        SECTION9.backgroundImage ||
                                                        ''
                                                    }
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Image">
                                                <FormInputDataFileImage
                                                    sectionName="SECTION9"
                                                    name="image"
                                                    value={SECTION9.image || ''}
                                                />
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 10*/}
                                        <CardDropdown
                                            title="SECTION 10"
                                            id="section-10">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION10"
                                                    name="content"
                                                    value={
                                                        SECTION10?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Action"
                                                isRequired>
                                                <WrapFormContext
                                                    formRequest={SECTION10}
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleSectionInput(
                                                                'SECTION10.' +
                                                                    name,
                                                                value,
                                                            ),
                                                    }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Text"
                                                                name="buttonText"
                                                                value={
                                                                    SECTION10.buttonText
                                                                }
                                                                required
                                                                placeholder="e.g Search"
                                                            />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <FormInput
                                                                label="Button Link"
                                                                name="buttonLink"
                                                                value={
                                                                    SECTION10.buttonLink
                                                                }
                                                                required
                                                                placeholder="e.g #"
                                                            />
                                                        </div>
                                                    </div>
                                                </WrapFormContext>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 11*/}
                                        <CardDropdown
                                            title="SECTION 11"
                                            id="section-11">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION11"
                                                    name="content"
                                                    value={
                                                        SECTION11?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <WrapFormContext
                                                formRequest={SECTION11}
                                                actions={{
                                                    change: (name, value) =>
                                                        __handleSectionInput(
                                                            'SECTION11.' + name,
                                                            value,
                                                        ),
                                                }}>
                                                <GeneralRowForm label="Address">
                                                    <FormTextArea
                                                        name="address"
                                                        value={
                                                            SECTION11.Address
                                                        }
                                                        placeholder="e.g Jln Kedonganan Bali"
                                                    />
                                                </GeneralRowForm>
                                                <GeneralRowForm label="Phone">
                                                    <FormInput
                                                        name="phone"
                                                        value={SECTION11.phone}
                                                        placeholder="e.g 629xxx"
                                                    />
                                                </GeneralRowForm>
                                                <GeneralRowForm label="Gmaps Embed">
                                                    <FormInput
                                                        name="gmapsEmbed"
                                                        value={
                                                            SECTION11.gmapsEmbed
                                                        }
                                                        placeholder="e.g https://www.google.com"
                                                    />

                                                    {SECTION11.gmapsEmbed ? (
                                                        <PreviewEmbedMap
                                                            src={
                                                                SECTION11.gmapsEmbed
                                                            }
                                                            className="mt-2"
                                                        />
                                                    ) : null}
                                                </GeneralRowForm>
                                            </WrapFormContext>
                                        </CardDropdown>

                                        {/*SECTION 12*/}
                                        <CardDropdown
                                            title="SECTION 12"
                                            id="section-12">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION12"
                                                    name="content"
                                                    value={
                                                        SECTION12?.content || ''
                                                    }
                                                    required
                                                />
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        {/*SECTION 13*/}
                                        <CardDropdown
                                            title="SECTION 13"
                                            id="section-13">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormInputTextEditor
                                                    sectionName="SECTION13"
                                                    name="content"
                                                    value={
                                                        SECTION13?.content || ''
                                                    }
                                                    required
                                                    classNameTextEditor="bg-neutral-300"
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Form"
                                                isRequired>
                                                <WrapFormContext
                                                    formRequest={SECTION13}
                                                    actions={{
                                                        change: (name, value) =>
                                                            __handleSectionInput(
                                                                'SECTION13.' +
                                                                    name,
                                                                value,
                                                            ),
                                                    }}>
                                                    <FormInput
                                                        label="Label"
                                                        name="label"
                                                        value={SECTION13.label}
                                                        placeholder="e.g Email"
                                                    />
                                                    <FormInput
                                                        label="Input Placeholder"
                                                        name="inputPlaceholder"
                                                        value={
                                                            SECTION13.inputPlaceholder
                                                        }
                                                        required
                                                        placeholder="e.g Email"
                                                    />
                                                    <FormInput
                                                        label="Button Text"
                                                        name="buttonText"
                                                        value={
                                                            SECTION13.buttonText
                                                        }
                                                        required
                                                        placeholder="e.g Subscribe"
                                                    />
                                                </WrapFormContext>
                                            </GeneralRowForm>

                                            <GeneralRowForm label="Background Image">
                                                <FormInputDataFileImage
                                                    sectionName="SECTION13"
                                                    name="background"
                                                    value={
                                                        SECTION13.background ||
                                                        ''
                                                    }
                                                />
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        <SectionFormSEOInfo
                                            classNameColumn="col-12"
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
                                </WrapFormContext>
                            </div>
                        </div>

                        <FooterSubmit
                            isLoading={__isLoading}
                            handleCancel={() => __handleCancel()}
                        />
                    </FormWrap>
                </>
            )}
        </>
    )
}

export default ContentHomePageEditPage
