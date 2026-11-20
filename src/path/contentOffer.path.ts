import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const contentOfferPath = {
    ...objectPathMenu('offer'),
    trash: pathBasenameRoute('offer') + '/trash',
    preview: (id?: string | number) =>
        pathBasenameRoute('offer') + '/' + id + '/detail/preview',
}

export default contentOfferPath
