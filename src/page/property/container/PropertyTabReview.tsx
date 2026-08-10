import PropertyReview from '@/common/dataFeature/propertyReview/PropertyReview.tsx'
import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'
import { apiPropertyReviews } from '@/service/api/property.api.ts'

const PropertyTabReview = ({
    propertyId,
}: {
    propertyId?: string | number
}) => {
    const { __handleToAdd, __handleToEdit, __handleToDetail } =
        usePageFlowHandlerHook({
            basePath: propertyReviewsPath,
            pathFromKey: 'property-review-main',
        })

    return (
        <PropertyReview
            isDetailProperty
            api={{
                list: (search) =>
                    apiPropertyReviews.list({ ...search, propertyId }),
            }}
            actions={{
                add: __handleToAdd,
                edit: __handleToEdit,
            }}
        />
    )
}

export default PropertyTabReview
