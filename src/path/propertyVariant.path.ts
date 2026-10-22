import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const propertyVariantPath = {
    ...objectPathMenu('property-variant'),
    trash: pathBasenameRoute('property-variant') + '/trash',
}

export default propertyVariantPath
