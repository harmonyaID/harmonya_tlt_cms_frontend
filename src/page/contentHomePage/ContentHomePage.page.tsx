import '@/asset/theme/content-public.scss'
import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import Card from '@/component/card/Card.tsx'
import CardDropdown from '@/component/card/CardDropdown.tsx'
import FormSelectOption from '@/component/form/FormSelectOption.tsx'
import { BadgeStatusGeneral, BadgeYesOrNo } from '@/component/general/Badge.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import ContentMedia from '@/component/general/ContentMedia.tsx'
import PreviewEmbedMap from '@/component/general/PreviewEmbedMap.tsx'
import RenderHtml from '@/component/general/RenderHtml.tsx'
import { MediaNotAvailable } from '@/component/general/TextDefault.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import VerticalDataPreview from '@/component/general/VerticalDataPreview.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { localeOption } from '@/config/locale.config.ts'
import { objectListDetail } from '@/config/objectList.config.ts'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import { isToBoolean } from '@/helper/condition.helper.ts'
import TabListContent from '@/page/contentHomePage/component/TabListContent.tsx'
import useHomePageMainHook from '@/page/contentHomePage/hook/useHomePageMain.hook.ts'

const ContentHomePagePage = () => {
    const {
        __search,
        __handleSearchChange,

        // ---- List Data ----
        // __list: __detail,
        __detail,
        __isLoading,
        // __pagination,
        // __search,
        // __actionPagination,
        // __actionRemove,
        // __actionChange,
        // __actionClear,

        // ---- Change Page ----
        __handleToAdd,
        __handleToEdit,
        __handleToDetail,
    } = useHomePageMainHook()

    // @ts-ignore
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
    } = !__isLoading && !isEmpty(__detail) ? __detail?.value : {}

    // @ts-ignore
    const seo = !__detail && !isEmpty(__detail) ? __detail?.seo : {}

    return (
        <>
            <LoadingStatePreviewData isLoading={__isLoading} data={__detail}>
                <div className="hstack flex-wrap align-items-center justify-content-between pb-3">
                    <h5 className="fs-18 fw-600 mb-0">Homepage Content</h5>

                    <div className="hstack flex-wrap gap-2">
                        <FormSelectOption
                            name="locale"
                            className="mb-0"
                            isUseHook={false}
                            classNameSelect="text-uppercase fs-13"
                            value={__search.locale}
                            actions={{
                                onChange: (name, value) =>
                                    __handleSearchChange(name, value),
                            }}>
                            {localeOption.map((vm) => (
                                <option value={vm} key={vm}>
                                    {vm}
                                </option>
                            ))}
                        </FormSelectOption>

                        <BtnPrimary
                            className="btn-sm"
                            handle={() => __handleToEdit(__detail.locale)}>
                            Edit Content
                        </BtnPrimary>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="vstack gap-3 content-public">
                            <CardDropdown
                                title="SECTION 1"
                                isShow
                                id="section-01">
                                <HorizontalLoopDataLogic
                                    isNoPadding
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    className="vstack gap-4"
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION1.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Video Thumbnail',
                                            <ContentMedia
                                                src={SECTION1.videoThumbnail}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Video',
                                            <ContentMedia
                                                src={SECTION1.backgroundVideo}
                                                type="video"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Preview Video ?',
                                            <TextTrueOrFalse
                                                value={isToBoolean(
                                                    SECTION1.isVideo,
                                                )}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Search',
                                            <>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Search Label Dates"
                                                            content={
                                                                SECTION1.searchLabelDates
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Search Placeholder Dates"
                                                            content={
                                                                SECTION1.searchPlaceholderDates
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Search Label Guest"
                                                            content={
                                                                SECTION1.searchLabelGuest
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Search Placeholder Guest"
                                                            content={
                                                                SECTION1.searchPlaceholderGuest
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Search Label Collection"
                                                            content={
                                                                SECTION1.searchLabelCollection
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Search Placeholder Collection"
                                                            content={
                                                                SECTION1.searchPlaceholderCollection
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Button Text"
                                                            content={
                                                                SECTION1.buttonText
                                                            }
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <VerticalDataPreview
                                                            title="Button Link"
                                                            content={
                                                                SECTION1.buttonLink
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </>,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 2" id="section-02">
                                <p className="fs-18 fw-medium">Left Position</p>
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION2.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Map Image',
                                            <ContentMedia
                                                src={SECTION2.mapImage}
                                                type="image"
                                            />,
                                        ),
                                    ]}
                                />

                                <p className="fs-18 fw-medium pt-5">
                                    Right Position
                                </p>

                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Banner Image',
                                            <ContentMedia
                                                src={SECTION2.image}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Side Content',
                                            <RenderHtml
                                                html={SECTION2.sideContent}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION2.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION2.buttonLink}
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 3" id="section-03">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION3.content}
                                            />,
                                        ),
                                    ]}
                                />

                                <div className="pt-3">
                                    <TabListContent
                                        tabId="tabSection03"
                                        tabs={SECTION3?.tabs || []}
                                    />
                                </div>
                            </CardDropdown>

                            <CardDropdown title="SECTION 4" id="section-04">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION4.content}
                                            />,
                                        ),
                                    ]}
                                />

                                <div className="vstack gap-4 pt-4">
                                    {!isEmpty(SECTION4.items)
                                        ? SECTION4.items.map((item, idx) => {
                                              return (
                                                  <div
                                                      key={idx}
                                                      className="border-bottom border-neutral-500 pb-4">
                                                      <HorizontalLoopDataLogic
                                                          config={{
                                                              contentColumn:
                                                                  'col-md-9',
                                                          }}
                                                          list={[
                                                              objectListDetail(
                                                                  'Background Image',
                                                                  <ContentMedia
                                                                      src={
                                                                          item.image
                                                                      }
                                                                      type="image"
                                                                  />,
                                                              ),
                                                              objectListDetail(
                                                                  'Title',
                                                                  <RenderHtml
                                                                      html={
                                                                          item.title
                                                                      }
                                                                  />,
                                                              ),
                                                              objectListDetail(
                                                                  'Description',
                                                                  <RenderHtml
                                                                      html={
                                                                          item.description
                                                                      }
                                                                  />,
                                                              ),
                                                              objectListDetail(
                                                                  'Button Text',
                                                                  <RenderHtml
                                                                      html={
                                                                          item.buttonText
                                                                      }
                                                                  />,
                                                              ),
                                                              objectListDetail(
                                                                  'Button Link',
                                                                  <RenderHtml
                                                                      html={
                                                                          item.buttonLink
                                                                      }
                                                                  />,
                                                              ),
                                                          ]}
                                                      />
                                                  </div>
                                              )
                                          })
                                        : null}
                                </div>
                            </CardDropdown>

                            <CardDropdown title="SECTION 5" id="section-05">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Label',
                                            <RenderHtml
                                                html={SECTION5.label}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION5.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Image',
                                            <ContentMedia
                                                src={SECTION5.background}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION5.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION5.buttonLink}
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 6" id="section-06">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION6.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION5.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION5.buttonLink}
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 7" id="section-07">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                className="p-3 bg-neutral-400"
                                                html={SECTION7.content}
                                            />,
                                        ),
                                    ]}
                                />

                                <div className="vstack gap-4 pt-4">
                                    {!isEmpty(SECTION7.items)
                                        ? SECTION7.items.map((item, idx) => {
                                              return (
                                                  <div
                                                      key={idx}
                                                      className="border-bottom border-neutral-500 pb-4">
                                                      <HorizontalLoopDataLogic
                                                          config={{
                                                              contentColumn:
                                                                  'col-md-9',
                                                          }}
                                                          list={[
                                                              objectListDetail(
                                                                  'Icon',
                                                                  <ContentMedia
                                                                      src={
                                                                          item.icon
                                                                      }
                                                                      type="image"
                                                                  />,
                                                              ),
                                                              objectListDetail(
                                                                  'Title',
                                                                  <RenderHtml
                                                                      html={
                                                                          item.title
                                                                      }
                                                                  />,
                                                              ),
                                                              objectListDetail(
                                                                  'Description',
                                                                  <RenderHtml
                                                                      html={
                                                                          item.description
                                                                      }
                                                                  />,
                                                              ),
                                                          ]}
                                                      />
                                                  </div>
                                              )
                                          })
                                        : null}
                                </div>
                            </CardDropdown>

                            <CardDropdown title="SECTION 8" id="section-08">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION8.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION8.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION8.buttonLink}
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 9" id="section-09">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                className="p-3 bg-neutral-400"
                                                html={SECTION9.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION9.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION9.buttonLink}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Logo',
                                            <ContentMedia
                                                src={SECTION9.logo}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Image',
                                            <ContentMedia
                                                src={SECTION9.backgroundImage}
                                                type="image"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Image',
                                            <ContentMedia
                                                src={SECTION9.image}
                                                type="image"
                                            />,
                                        ),
                                        // objectListDetail(
                                        //     'Images',
                                        //     <div className="vstack gap-3">
                                        //         {!isEmpty(SECTION9.images)
                                        //             ? SECTION9.images.map(
                                        //                   (item, idx) => (
                                        //                       <ContentMedia
                                        //                           src={item}
                                        //                           type="image"
                                        //                           key={idx}
                                        //                       />
                                        //                   ),
                                        //               )
                                        //             : null}
                                        //     </div>,
                                        // ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 10" id="section-10">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION10.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION10.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Link',
                                            <RenderHtml
                                                html={SECTION10.buttonLink}
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 11" id="section-11">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION11.content}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Address',
                                            <RenderHtml
                                                html={SECTION11.address}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Phone',
                                            <RenderHtml
                                                html={SECTION11.phone}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Gmaps Embed',
                                            SECTION11.gmapsEmbed ? (
                                                <>
                                                    <a
                                                        href={
                                                            SECTION11.gmapsEmbed
                                                        }
                                                        target="_blank">
                                                        Preview Detail
                                                        {/*{SECTION11.gmapsEmbed}*/}
                                                    </a>

                                                    <PreviewEmbedMap
                                                        src={
                                                            SECTION11.gmapsEmbed
                                                        }
                                                        className="mt-2"
                                                    />
                                                </>
                                            ) : (
                                                '-'
                                            ),
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 12" id="section-12">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION12.content}
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown title="SECTION 13" id="section-13">
                                <HorizontalLoopDataLogic
                                    config={{
                                        contentColumn: 'col-md-9',
                                    }}
                                    list={[
                                        objectListDetail(
                                            'Label',
                                            <RenderHtml
                                                html={SECTION13.label}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Content',
                                            <RenderHtml
                                                html={SECTION13.content}
                                                className="p-3 bg-neutral-400"
                                            />,
                                        ),
                                        objectListDetail(
                                            'Input Placeholder',
                                            <RenderHtml
                                                html={
                                                    SECTION13.inputPlaceholder
                                                }
                                            />,
                                        ),
                                        objectListDetail(
                                            'Button Text',
                                            <RenderHtml
                                                html={SECTION13.buttonText}
                                            />,
                                        ),
                                        objectListDetail(
                                            'Background Image',
                                            <ContentMedia
                                                src={SECTION13.background}
                                                type="image"
                                            />,
                                        ),
                                    ]}
                                />
                            </CardDropdown>

                            <CardDropdown
                                title="SEO Information"
                                id="section-seo-info">
                                <SectionPreviewSEOInformation
                                    isTitle={false}
                                    classNameColumn="col-md-12"
                                    seo={__detail?.seo || {}}
                                />
                            </CardDropdown>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="vstack gap-4">
                            <Card title="Other Information">
                                <VerticalLoopDataLogic
                                    list={[
                                        objectListDetail(
                                            'Locale',
                                            <span className="text-uppercase">
                                                {__detail.locale}
                                            </span>,
                                        ),
                                        objectListDetail(
                                            'Created At',
                                            formatDateTimeByTlt(
                                                __detail?.createdAt,
                                            ),
                                        ),
                                        objectListDetail(
                                            'Updated At',
                                            formatDateTimeByTlt(
                                                __detail?.updatedAt,
                                            ),
                                        ),
                                    ]}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentHomePagePage
