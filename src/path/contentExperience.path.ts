import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const contentExperiencePath = {
    ...objectPathMenu('experience'),
    trash: pathBasenameRoute('experience') + '/trash',
}

export default contentExperiencePath
