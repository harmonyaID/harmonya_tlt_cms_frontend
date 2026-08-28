import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const contentOfferPath = {
    ...objectPathMenu('offer'),
    trash: pathBasenameRoute('offer') + '/trash',
}

export default contentOfferPath
