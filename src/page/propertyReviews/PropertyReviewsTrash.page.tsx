import usePageFlowHandlerHook from '@/hook/usePageFlowHandler.hook.ts'
import propertyReviewsPath from '@/path/propertyReviews.path.ts'
import PropertyReview from '@/common/dataFeature/propertyReview/PropertyReview.tsx'
import { apiPropertyReviews, getPropertyReviewsTrash } from '@/service/api/property.api.ts'

const PropertyReviewsTrashPage = () => {
    const {__handleToMain, __handleToTrash} =
        usePageFlowHandlerHook({
            basePath: propertyReviewsPath,
            pathFromKey: propertyReviewsPath.trash,
        })

    return (
        <PropertyReview
            title="Property Reviews Trash"
            isTrash
            api={{
                trash: getPropertyReviewsTrash,
            }}
            actions={{
                main: __handleToMain,
                trash: __handleToTrash,
            }}
        />
    )
}

export default PropertyReviewsTrashPage