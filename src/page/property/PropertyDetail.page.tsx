import Card from '@/component/card/Card.tsx'
import { BtnPrimary } from '@/component/general/Button.tsx'
import NavBreadcrumb from '@/component/general/NavBreadcrumb.tsx'
import PageTitle from '@/component/general/PageTitle.tsx'
import LoadingStatePreviewData from '@/component/loading/LoadingStatePreviewData.tsx'
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
                <Card>
                    <div className="row">
                        <div className="col-md-4"></div>

                        <div className="col-md-8">
                            <h5 className="text-primary">
                                {__detail?.nickname}
                            </h5>
                        </div>
                    </div>
                </Card>
            </LoadingStatePreviewData>
        </>
    )
}

export default PropertyDetailPage
