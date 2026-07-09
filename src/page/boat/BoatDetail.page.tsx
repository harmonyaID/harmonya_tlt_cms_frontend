import BoatMainForm from '@/page/boat/container/BoatMainForm.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import boatPath from '@/path/boat.path.ts'
import useBoatDetailHook from '@/page/boat/hook/useBoatDetail.hook.ts'
import PageTitle from '@/component/general/PageTitle.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import CardPreview from '@/component/card/CardPreview.tsx'
import Card from '@/component/card/Card.tsx'
import CardListData from '@/component/card/CardListData.tsx'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import PreElement from '@/component/general/PreElement.tsx'
import TextTrueOrFalse from '@/component/general/TextTrueOrFalse.tsx'
import { isEmpty } from 'lodash'
import { NotAvailable } from '@/component/general/TextDefault.tsx'
import PreviewFileModalLogic from '@/common/misc/PreviewFileModal.logic.tsx'
import PreviewFileModalMultiLogic from '@/common/misc/PreviewFileModalMulti.logic.tsx'
import { objectTab, objectTabContent } from '@/config/objectNavTab.config.ts'
import TabBoatType from '@/page/boat/container/TabBoatType.tsx'
import TabBoatContactForm from '@/page/boat/container/TabBoatContactForm.tsx'
import CardNavTab from '@/component/card/CardNavTab.tsx'
import VerticalLoopDataLogic from '@/common/list/VerticalLoopData.logic.tsx'

const BoatDetailPage = () => {
    const {
        __id,
        __detail,
        __isLoading,
        __pageStateDataSearch,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
    } = useBoatDetailHook()

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Boat',
                        actions: {
                            url: boatPath.main,
                            state: { ...__pageStateDataSearch },
                        },
                    },
                    { name: 'Detail' },
                ]}
            />

            <div className="row mb-4 g-3 align-items-md-center">
                <div className="col">
                    <PageTitle title="Boat Detail" />
                </div>

                <div className="col-auto">
                    <div className="hstack gap-2 flex-wrap">
                        <BtnPrimary
                            isOutline
                            onClick={() =>
                                __handleToEdit(__detail.id, {
                                    parentId: __detail.id,
                                })
                            }>
                            Edit
                        </BtnPrimary>

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
                {/*<div className="vstack gap-4"></div>*/}

                <div className="row g-3">
                    <div className="col-lg-4">
                        <Card title="Boat Information">
                            <VerticalLoopDataLogic
                                list={[
                                    objectListDetail(
                                        'Boat Type',
                                        __detail?.boatComponentType?.name ||
                                            '-',
                                    ),
                                    objectListDetail(
                                        'Status Active',
                                        <TextTrueOrFalse
                                            value={__detail.isActive}
                                        />,
                                    ),
                                    objectListDetail(
                                        'Price File',
                                        <>
                                            <a
                                                className="link text-underline"
                                                href={__detail.priceFile}
                                                target="_blank">
                                                Preview
                                            </a>
                                        </>,
                                    ),
                                    objectListDetail(
                                        'Created At',
                                        __detail.createdAt || '-',
                                    ),
                                ]}
                            />

                            {__detail?.customInformations?.length ? (
                                <div className="pb-3">
                                    <h5 className="fs-16 fw-500">
                                        Custom Information
                                    </h5>

                                    {__detail.customInformations.map(
                                        (vm, index) => {
                                            return (
                                                <div
                                                    className="hstack gap-3 align-items-start pb-3 border-bottom border-neutral-500"
                                                    key={index}>
                                                    <div className="fs-13">
                                                        {vm.order}.
                                                    </div>
                                                    <div className="w-100">
                                                        <label className="fs-12 text-neutral-300 pb-2">
                                                            {vm.name}
                                                        </label>
                                                        <p className="fs-14 text-neutral-100 fw-semibold mb-0">
                                                            {vm.value}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        },
                                    )}
                                </div>
                            ) : null}

                            <CardNavTab
                                classNameTabPane="px-0"
                                tabs={[
                                    objectTab('Photos', 'tabPhotos'),
                                    objectTab(
                                        'Photos Promotion',
                                        'tabPhotoPromotion',
                                    ),
                                ]}
                                tabContents={[
                                    objectTabContent(
                                        'Photos',
                                        <>
                                            {!isEmpty(__detail.photos) ? (
                                                <>
                                                    <PreviewFileModalMultiLogic
                                                        dataFiles={
                                                            __detail.photos
                                                        }
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
                                    objectTabContent(
                                        'Photos Promotion',
                                        <>
                                            {!isEmpty(__detail.promoPhotos) ? (
                                                <>
                                                    <PreviewFileModalMultiLogic
                                                        dataFiles={__detail.promoPhotos.map(
                                                            (vm) => ({
                                                                photo: vm,
                                                            }),
                                                        )}
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
                                ]}
                            />
                        </Card>
                    </div>
                    <div className="col-lg-8">
                        <CardNavTab
                            tabs={[
                                objectTab('Description', 'tabDescription'),
                                objectTab(
                                    'Boat Contact Form',
                                    'tabBoatContactForm',
                                ),
                            ]}
                            tabContents={[
                                objectTabContent(
                                    'Description / Content',
                                    <>
                                        <div
                                            className="p-3 bg-neutral-600 rounded-2 border-neutral-500"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    __detail?.description ||
                                                    '-',
                                            }}
                                        />
                                    </>,
                                ),
                                objectTabContent(
                                    '',
                                    <TabBoatContactForm boatId={__detail.id} />,
                                ),
                            ]}
                        />
                    </div>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default BoatDetailPage
