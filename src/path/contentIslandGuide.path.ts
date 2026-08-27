import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const contentIslandGuidePath = {
    ...objectPathMenu('island-guide'),
    trash: pathBasenameRoute('island-guide') + '/trash',
}

export default contentIslandGuidePath
