import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const propertyReviewsPath = {
    ...objectPathMenu('property-reviews'),
    trash: pathBasenameRoute('property-reviews') + '/trash',
}

export default propertyReviewsPath
