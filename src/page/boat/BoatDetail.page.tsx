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
                <div className="vstack gap-4">
                    <Card>
                        <h5 className="fs-18 fw-500 text-capitalize">
                            {__detail.name}
                        </h5>

                        <div className="row pt-3">
                            <div className="col-md-8">
                                <HorizontalLoopDataLogic
                                    list={[
                                        objectListDetail(
                                            'Description',
                                            __detail.description ? (
                                                <PreElement>
                                                    {__detail.description}
                                                </PreElement>
                                            ) : (
                                                '-'
                                            ),
                                        ),
                                        objectListDetail(
                                            'Discount Percentage',
                                            __detail?.discountPercentage +
                                                '%' || '-',
                                        ),
                                        objectListDetail(
                                            'Route From',
                                            __detail.routeFrom || '-',
                                        ),
                                        objectListDetail(
                                            'Route To',
                                            __detail.routeTo || '-',
                                        ),
                                        objectListDetail(
                                            'Departure Time From Bali',
                                            __detail?.departureTimesFromBali?.map(
                                                (dp, idx) => (
                                                    <span
                                                        className="badge text-bg-neutral-300 me-1"
                                                        key={idx}>
                                                        {dp}
                                                    </span>
                                                ),
                                            ) || '-',
                                        ),
                                        objectListDetail(
                                            'Departure Time From Lembongan',
                                            __detail?.departureTimesFromLembongan?.map(
                                                (dp, idx) => (
                                                    <span
                                                        className="badge text-bg-neutral-300 me-1"
                                                        key={idx}>
                                                        {dp}
                                                    </span>
                                                ),
                                            ) || '-',
                                        ),
                                        objectListDetail(
                                            'Status Active',
                                            <TextTrueOrFalse
                                                value={__detail.isActive}
                                            />,
                                        ),

                                        objectListDetail(
                                            'Notes',
                                            __detail.notes ? (
                                                <PreElement>
                                                    {__detail.notes}
                                                </PreElement>
                                            ) : (
                                                '-'
                                            ),
                                        ),

                                        objectListDetail(
                                            'Photos',
                                            !isEmpty(__detail.photos) ? (
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
                                            ),
                                        ),
                                    ]}
                                />
                            </div>
                        </div>
                    </Card>

                    <CardNavTab
                        tabs={[
                            objectTab('Boat Type', 'tabBoatType'),
                            objectTab(
                                'Boat Contact Form',
                                'tabBoatContactForm',
                            ),
                        ]}
                        tabContents={[
                            objectTabContent(
                                '',
                                <TabBoatType boatId={__detail.id} />,
                            ),
                            objectTabContent('', <TabBoatContactForm />),
                        ]}
                    />
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default BoatDetailPage
