import { isEmpty } from 'lodash'
import SectionFormSEOInfo from '@/common/dataForm/SectionFormSEOInfo.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormInput from '@/component/form/FormInput.tsx'
import FormTextArea from '@/component/form/FormTextArea.tsx'
import FormTextEditor from '@/component/form/FormTextEditor.tsx'
import GeneralRowForm from '@/component/form/GeneralRowForm.tsx'
import FooterSubmit from '@/component/general/FooterSubmit.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import { Loading } from '@/component/general/TextDefault.tsx'
import FormWrap from '@/component/wrapping/Form.wrap.tsx'
import { objectNavBread } from '@/config/objectNavBread.config.ts'
import { WrapFormContext } from '@/context/Form.context.tsx'
import useHomePageMainForm from '@/page/contentHomePage/hook/useHomePageMainForm.ts'
import contentHomePagePath from '@/path/contentHomePage.path.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'

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

            {__isLoadingDetail && !isEmpty(__detail) ? (
                <Loading />
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
                                    formRequest={__formRequest}
                                    actions={{
                                        change: __handleChange,
                                    }}>
                                    <div className="vstack gap-3">
                                        <CardDropdown
                                            title="SECTION 1"
                                            isShow
                                            id="section-01">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION1?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Background"
                                                isRequired></GeneralRowForm>

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
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 2"
                                            id="section-02">
                                            <p className="fs-18 fw-medium">
                                                Left Position
                                            </p>
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION2?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
                                                    required
                                                />
                                            </GeneralRowForm>
                                            <GeneralRowForm
                                                label="Background Image"
                                                isRequired></GeneralRowForm>

                                            <p className="fs-18 fw-medium pt-5">
                                                Right Position
                                            </p>
                                            <GeneralRowForm
                                                label="Background Image"
                                                isRequired></GeneralRowForm>

                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION2?.sideContent ||
                                                        ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'sideContent',
                                                                value,
                                                            ),
                                                    }}
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
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 3"
                                            id="section-03">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION3?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
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
                                                            <FormInput
                                                                label="Tab Name"
                                                                name="tabName"
                                                                value={
                                                                    tab.tabName
                                                                }
                                                                required
                                                                placeholder="e.g Island Travel Tips"
                                                            />

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
                                                                                <p className="fs-18 fw-medium pt-2">
                                                                                    Option{' '}
                                                                                    {idx +
                                                                                        1}
                                                                                </p>

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

                                        <CardDropdown
                                            title="SECTION 4"
                                            id="section-04">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION4?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
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
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 5"
                                            id="section-05">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION5?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
                                                    required
                                                />
                                            </GeneralRowForm>

                                            <GeneralRowForm
                                                label="Label"
                                                isRequired>
                                                <FormInput
                                                    // label="label"
                                                    name="label"
                                                    value={SECTION5.label || ''}
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

                                            <GeneralRowForm
                                                label="Background Image"
                                                secondLabel="On Dev"
                                                isRequired></GeneralRowForm>
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 6"
                                            id="section-06">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION6?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
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
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 7"
                                            id="section-07">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION7?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
                                                    required
                                                    classNameTextEditor="bg-neutral-300"
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

                                                                    {/*Icon On Dev*/}
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </div>
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 8"
                                            id="section-08">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION8?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
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
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 9"
                                            id="section-09">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION8?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
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
                                            </GeneralRowForm>
                                        </CardDropdown>

                                        <CardDropdown
                                            title="SECTION 10"
                                            id="section-10">
                                            <GeneralRowForm
                                                label="Content"
                                                isRequired>
                                                <FormTextEditor
                                                    value={
                                                        SECTION10?.content || ''
                                                    }
                                                    actions={{
                                                        onChange: (value) =>
                                                            __handleChange(
                                                                'content',
                                                                value,
                                                            ),
                                                    }}
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
