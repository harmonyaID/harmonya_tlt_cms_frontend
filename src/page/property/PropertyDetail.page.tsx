import { Map, Location } from 'iconsax-react'
import { isEmpty } from 'lodash'
import Image from 'rc-image'
import ImgGeneralDefault from '@/asset/image/default/general-default.svg'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'
import PreviewFileModalMultiLogic from '@/common/misc/PreviewFileModalMulti.logic.tsx'
import SectionPreviewSEOInformation from '@/common/misc/SectionPreviewSEOInformation.tsx'
import Card from '@/component/card/Card.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import { BadgeStatusGeneral } from '@/component/general/Badge.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import PreElement from '@/component/general/PreElement.tsx'
import { NotAvailable } from '@/component/general/TextDefault.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import PropertyBoxInfo from '@/page/property/component/PropertyBoxInfo.tsx'
import PropertySpaceInfo from '@/page/property/component/PropertySpaceInfo.tsx'
import PropertyTitleInfo from '@/page/property/component/PropertyTitleInfo.tsx'
import PropertyTabReview from '@/page/property/container/PropertyTabReview.tsx'
import usePropertyDetail from '@/page/property/hook/usePropertyDetail.hook.ts'
import contentExperiencePath from '@/path/contentExperience.path.ts'
import propertyPath from '@/path/property.path.ts'

const PropertyDetailPage = () => {
    const {
        __id,
        __detail,
        __isLoading,
        __pageStateDataSearch,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
    } = usePropertyDetail()

    const availability = __detail?.availability || {}
    const guestInfo = __detail?.guestInfo || {}
    const descriptions = __detail?.descriptions || []
    const pricing = __detail?.pricing || {}

    const _handleFormatPrice = (value) => {
        return __detail.currency + ' ' + value
    }

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Property',
                        actions: {
                            url: propertyPath.main,
                            state: { ...__pageStateDataSearch },
                        },
                    },
                    { name: 'Detail' },
                ]}
            />

            <div className="row mb-4 g-3 align-items-md-center">
                <div className="col">
                    <PageTitle title="Property Detail" />
                </div>

                <div className="col-auto">
                    <div className="hstack gap-2 flex-wrap">
                        {__detail?.id ? (
                            <BtnPrimary
                                isOutline
                                onClick={() =>
                                    __handleToEdit(__detail.id, {
                                        parentId: __detail.id,
                                    })
                                }>
                                Edit
                            </BtnPrimary>
                        ) : null}

                        <BtnPrimary
                            isOutline
                            onClick={() =>
                                __handleToMain(__pageStateDataSearch)
                            }>
                            Back
                        </BtnPrimary>
                    </div>
                </div>
            </div>

            <LoadingStatePreviewData isLoading={__isLoading} data={__detail}>
                {/*<div className="row">*/}
                {/*    <div className="col-md-4">*/}
                {/*        <Card>*/}
                {/*            <h6 className="text-primary">*/}
                {/*                {__detail?.nickname}{' '}*/}
                {/*                <div className="ms-2 badge text-bg-tint-500 fs-12 rounded-pill">*/}
                {/*                    {__detail?.type?.name}*/}
                {/*                </div>*/}
                {/*            </h6>*/}
                {/*        </Card>*/}
                {/*    </div>*/}

                {/*    <div className="col-md-9"></div>*/}
                {/*</div>*/}

                <div className="vstack gap-3">
                    <Card>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="position-relative">
                                    <div className="overflow-hidden rounded position-relative">
                                        <div
                                            className="wp-img-preview"
                                            onClick={() => {}}>
                                            <Image
                                                src={__detail?.coverPhoto}
                                                alt="Preview File"
                                                fallback={ImgGeneralDefault}
                                                className="data-img data-img-contain w-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9">
                                <h5 className="text-primary">
                                    {__detail?.nickname}{' '}
                                    <div className="ms-2 badge text-bg-tint-500 fs-12 rounded-pill">
                                        {__detail?.type?.name}
                                    </div>
                                </h5>

                                <div className="hstack gap-3">
                                    {__detail?.tags
                                        ? __detail?.tags.map((tag) => {
                                              return (
                                                  <BadgeStatusGeneral
                                                      value={tag.name}
                                                      className="text-bg-neutral-500"
                                                      inTable
                                                  />
                                              )
                                          })
                                        : ''}
                                </div>

                                {/*<div className="hstack gap-3 flex-wrap">*/}
                                {/*    <PropertyBoxInfo*/}
                                {/*        title="Occupancy"*/}
                                {/*        value={__detail?.occupancy}*/}
                                {/*        className="text-center"*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </Card>

                    <CardNavTab
                        tabs={[
                            objectTab(
                                'Property Information',
                                'tabPropertyInfo',
                            ),
                            objectTab('Overview', 'tabOverview'),
                            objectTab('Pricing', 'tabPricing'),
                            objectTab('Photos', 'tabPhotos'),
                            objectTab('Review', 'tabReview'),
                            objectTab('SEO Information', 'tabSEOInformation'),
                            // objectTab('Calender', 'tabCalender'),
                        ]}
                        tabContents={[
                            objectTabContent(
                                '',
                                <>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="vstack gap-4">
                                                <PropertySpaceInfo title="Property Detail">
                                                    <HorizontalLoopDataLogic
                                                        list={[
                                                            objectTabContent(
                                                                'Status Active',
                                                                <TextTrueOrFalse
                                                                    value={
                                                                        __detail
                                                                            ?.status
                                                                            ?.id
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />,
                                                            ),
                                                            objectTabContent(
                                                                'Listing Type',
                                                                __detail
                                                                    ?.listingType
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Property Type',
                                                                __detail?.type
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Property Size',
                                                                __detail?.propertySize ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Occupancy',
                                                                __detail?.occupancy ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Unit Type',
                                                                __detail
                                                                    ?.unitType
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Room Type',
                                                                __detail
                                                                    ?.roomType
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Cleaning Status',
                                                                __detail
                                                                    ?.cleaningStatus
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Currency',
                                                                __detail?.currency ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Tags',
                                                                <div className="hstack gap-3">
                                                                    {__detail?.tags
                                                                        ? __detail?.tags.map(
                                                                              (
                                                                                  tag,
                                                                              ) => {
                                                                                  return (
                                                                                      <BadgeStatusGeneral
                                                                                          value={
                                                                                              tag.name
                                                                                          }
                                                                                          className="text-bg-neutral-500"
                                                                                          inTable
                                                                                      />
                                                                                  )
                                                                              },
                                                                          )
                                                                        : '-'}
                                                                </div>,
                                                            ),
                                                            objectTabContent(
                                                                'Created At',
                                                                __detail?.createdAt ||
                                                                    '-',
                                                            ),
                                                        ]}
                                                    />
                                                </PropertySpaceInfo>

                                                <PropertySpaceInfo title="Locations">
                                                    <div className="vstack gap-3">
                                                        {__detail?.addresses?.map(
                                                            (vm, index) => {
                                                                return (
                                                                    <div
                                                                        className="card card-body mb-0"
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <HorizontalLoopDataLogic
                                                                            key={
                                                                                index
                                                                            }
                                                                            list={[
                                                                                objectTabContent(
                                                                                    'Address',
                                                                                    vm?.address ||
                                                                                        '',
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Building Name',
                                                                                    vm?.buildingName ||
                                                                                        '',
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Type',
                                                                                    vm
                                                                                        ?.type
                                                                                        ?.name ||
                                                                                        '',
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Longitude & Latitude',
                                                                                    <>
                                                                                        {vm.longitude ||
                                                                                            '-'}{' '}
                                                                                        ,{' '}
                                                                                        {vm.latitude ||
                                                                                            '-'}
                                                                                    </>,
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Zip Code',
                                                                                    vm?.zipCode ||
                                                                                        '',
                                                                                ),
                                                                            ]}
                                                                        />
                                                                    </div>
                                                                )
                                                            },
                                                        )}
                                                    </div>
                                                </PropertySpaceInfo>

                                                <PropertySpaceInfo title="Rooms">
                                                    <div className="vstack gap-3">
                                                        {__detail?.rooms?.map(
                                                            (vm, index) => {
                                                                return (
                                                                    <div
                                                                        className="card card-body mb-0"
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <HorizontalLoopDataLogic
                                                                            key={
                                                                                index
                                                                            }
                                                                            list={[
                                                                                objectTabContent(
                                                                                    'Label',
                                                                                    vm?.label ||
                                                                                        '-',
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Room Type',
                                                                                    vm
                                                                                        ?.roomType
                                                                                        ?.name ||
                                                                                        '-',
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Bed Count',
                                                                                    vm?.bedCount ||
                                                                                        '-',
                                                                                ),
                                                                                objectTabContent(
                                                                                    'Bed Type',
                                                                                    vm
                                                                                        ?.bedType
                                                                                        ?.name ||
                                                                                        '-',
                                                                                ),
                                                                            ]}
                                                                        />
                                                                    </div>
                                                                )
                                                            },
                                                        )}
                                                    </div>
                                                </PropertySpaceInfo>
                                            </div>
                                        </div>
                                    </div>
                                </>,
                            ),
                            objectTabContent(
                                '',
                                <>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="vstack gap-4">
                                                <PropertySpaceInfo title="Availability">
                                                    <HorizontalLoopDataLogic
                                                        list={[
                                                            objectTabContent(
                                                                'Advance Notice Value',
                                                                availability?.advanceNoticeValue ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Advance Notice Unit',
                                                                availability
                                                                    ?.advanceNoticeUnit
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Booking Window',
                                                                availability?.bookingWindow ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Check In Restrictions',
                                                                availability?.checkInRestrictions ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Default Availability',
                                                                availability
                                                                    ?.defaultAvailability
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Max Length Of Stay',
                                                                availability?.maxLengthOfStay ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Min Length Of Stay',
                                                                availability?.minLengthOfStay ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Max Nights Per Year',
                                                                availability?.maxNightsPerYear ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Preparation Time Value',
                                                                availability?.preparationTimeValue ||
                                                                    '-',
                                                            ),
                                                        ]}
                                                    />
                                                </PropertySpaceInfo>

                                                <PropertySpaceInfo title="Guest Info">
                                                    <HorizontalLoopDataLogic
                                                        list={[
                                                            objectTabContent(
                                                                'Cleaning Instructions',
                                                                guestInfo?.cleaningInstructions ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Host Name',
                                                                guestInfo?.hostName ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'House Manual',
                                                                guestInfo?.houseManual ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Interaction With Guests',
                                                                guestInfo?.interactionWithGuests ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Parking Instructions',
                                                                guestInfo?.parkingInstructions ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Trash Instructions',
                                                                guestInfo?.trashInstructions ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Wifi Name',
                                                                guestInfo?.wifiName ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Wifi Password',
                                                                guestInfo?.wifiPassword ||
                                                                    '-',
                                                            ),
                                                        ]}
                                                    />
                                                </PropertySpaceInfo>

                                                <PropertySpaceInfo title="Descriptions">
                                                    {descriptions?.map(
                                                        (vm, index) => {
                                                            return (
                                                                <div
                                                                    className="card card-body mb-0"
                                                                    key={index}>
                                                                    <HorizontalLoopDataLogic
                                                                        list={[
                                                                            objectTabContent(
                                                                                'Title',
                                                                                vm?.title ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'Channel',
                                                                                vm?.channel ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'Language',
                                                                                vm?.language ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'Getting Around',
                                                                                vm?.gettingAround ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'Guest Access',
                                                                                vm?.guestAccess ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'The Neighborhood',
                                                                                vm?.theNeighborhood ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'The Space',
                                                                                vm?.theSpace ||
                                                                                    '-',
                                                                            ),
                                                                            objectTabContent(
                                                                                'Summary',
                                                                                vm?.summary ? (
                                                                                    <PreElement
                                                                                        children={
                                                                                            vm.summary
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    '-'
                                                                                ),
                                                                            ),
                                                                            objectTabContent(
                                                                                'Other Things To Note',
                                                                                vm?.otherThingsToNote ? (
                                                                                    <PreElement
                                                                                        children={
                                                                                            vm.otherThingsToNote
                                                                                        }
                                                                                    />
                                                                                ) : (
                                                                                    '-'
                                                                                ),
                                                                            ),
                                                                        ]}
                                                                    />
                                                                </div>
                                                            )
                                                        },
                                                    )}
                                                </PropertySpaceInfo>
                                            </div>
                                        </div>
                                    </div>
                                </>,
                            ),
                            objectTabContent(
                                '',
                                <>
                                    <div className="row">
                                        <div className="col-md-9">
                                            <div className="vstack gap-4">
                                                <PropertySpaceInfo title="Pricing">
                                                    <HorizontalLoopDataLogic
                                                        list={[
                                                            objectTabContent(
                                                                'Cleaning Fee Type',
                                                                pricing
                                                                    ?.cleaningFeeType
                                                                    ?.name ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Cleaning Fee',
                                                                _handleFormatPrice(
                                                                    pricing?.cleaningFee ||
                                                                        '-',
                                                                ),
                                                            ),
                                                            objectTabContent(
                                                                'Extra Person Fee',
                                                                pricing?.extraPersonFee ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Markup Percent',
                                                                pricing?.markupPercent ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Monthly Discount',
                                                                _handleFormatPrice(
                                                                    pricing?.monthlyDiscount ||
                                                                        '-',
                                                                ),
                                                            ),
                                                            objectTabContent(
                                                                'Rate Strategy',
                                                                pricing?.rateStrategy ||
                                                                    '-',
                                                            ),
                                                            objectTabContent(
                                                                'Security Deposit Fee',
                                                                _handleFormatPrice(
                                                                    pricing?.securityDepositFee ||
                                                                        '-',
                                                                ),
                                                            ),
                                                            objectTabContent(
                                                                'Weekday Base Price',
                                                                _handleFormatPrice(
                                                                    pricing?.weekdayBasePrice,
                                                                ),
                                                            ),
                                                            objectTabContent(
                                                                'Weekend Base Price',
                                                                _handleFormatPrice(
                                                                    pricing?.weekendBasePrice ||
                                                                        '-',
                                                                ),
                                                            ),
                                                            objectTabContent(
                                                                'Weekly Discount',
                                                                _handleFormatPrice(
                                                                    pricing?.weeklyDiscount ||
                                                                        '-',
                                                                ),
                                                            ),
                                                        ]}
                                                    />
                                                </PropertySpaceInfo>
                                            </div>
                                        </div>
                                    </div>
                                </>,
                            ),

                            objectTabContent(
                                'Photos',
                                <>
                                    {!isEmpty(__detail.photos) ? (
                                        <>
                                            <PreviewFileModalMultiLogic
                                                dataFiles={__detail.photos}
                                                dataBy="photo"
                                                isDescription={false}
                                                classNameWrapImg="max-h-120-px"
                                            />
                                        </>
                                    ) : (
                                        <NotAvailable />
                                    )}
                                </>,
                            ),
                            objectTabContent('', <PropertyTabReview />),
                            objectTabContent(
                                '',
                                <SectionPreviewSEOInformation
                                    seo={__detail?.seo || {}}
                                    classNameColumn="col-md-9"
                                />,
                            ),
                        ]}
                    />
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default PropertyDetailPage
