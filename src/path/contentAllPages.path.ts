import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const basePath = 'cm-page'

const contentAllPages = {
    ...objectPathMenu(basePath),
    trash: pathBasenameRoute(basePath) + '/trash',
    preview: (id?: string | number) =>
        pathBasenameRoute(basePath) + '/' + id + '/detail/preview',
}

export default contentAllPages
