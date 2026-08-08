import { isEmpty } from 'lodash'
import HorizontalLoopDataLogic from '@/common/list/HorizontalLoopData.logic.tsx'
import Card from '@/component/card/Card.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
import { objectListDetail } from '@/config/objectList.config.ts'
import { formatDateTimeByTlt } from '@/helper/actionFormatDate.helper.ts'
import useContentMenuDetailHook from '@/page/contentMenu/hook/useContentMenuDetail.hook.ts'
import contentMenuPath from '@/path/contentMenu.path.ts'

const RowMenus = ({
    menus = [],
    className = '',
}: {
    menus?: any[]
    className?: string
}) => {
    return (
        <div className="vstack gap-3">
            {menus.map((item: any, index: number) => {
                return (
                    <div key={index} className={'vstack gap-3 ' + className}>
                        <div className="card card-body py-2 bg-neutral-600 border-0">
                            <p className="fs-14 fw-500 mb-1">
                                {item.menuLabel}
                            </p>

                            <p className="fs-12 mb-0 text-primary">
                                {item.menuUrl}
                            </p>
                        </div>

                        {!isEmpty(item.children) ? (
                            <RowMenus menus={item.children} className="ps-4" />
                        ) : null}
                    </div>
                )
            })}
        </div>
    )
}

const ContentMenuDetailPage = () => {
    const {
        __id,
        __detail,
        __isLoading,
        __pageStateDataSearch,

        // Change Page
        __handleToAdd,
        __handleToEdit,
        __handleToMain,
    } = useContentMenuDetailHook()

    return (
        <>
            <NavBreadcrumb
                navs={[
                    {
                        name: 'Menu',
                        actions: {
                            url: contentMenuPath.main,
                            state: { ...__pageStateDataSearch },
                        },
                    },
                    { name: 'Detail' },
                ]}
            />

            <div className="row mb-4 g-3 align-items-md-center">
                <div className="col">
                    <PageTitle title="Menu Detail" />
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
                <div className="row">
                    <div className="col-lg-4">
                        <Card title="Menu Information">
                            <HorizontalLoopDataLogic
                                list={[
                                    objectListDetail(
                                        'Title',
                                        __detail?.title || '-',
                                    ),
                                    objectListDetail(
                                        'Handle',
                                        __detail?.handle || '-',
                                    ),
                                    objectListDetail(
                                        'Locale',
                                        __detail?.locale || '-',
                                    ),
                                    objectListDetail(
                                        'Created At',
                                        formatDateTimeByTlt(
                                            __detail?.createdAt,
                                        ),
                                    ),
                                ]}
                            />
                        </Card>
                    </div>

                    <div className="col-lg-8">
                        <Card title="Menu Items">
                            {!isEmpty(__detail?.items) ? (
                                <RowMenus menus={__detail?.items} />
                            ) : null}
                        </Card>
                    </div>
                </div>
            </LoadingStatePreviewData>
        </>
    )
}

export default ContentMenuDetailPage
