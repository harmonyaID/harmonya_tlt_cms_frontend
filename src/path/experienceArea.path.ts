import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const experienceAreaPath = {
    ...objectPathMenu('experience-area'),
    trash: pathBasenameRoute('experience-area') + '/trash',
}

export default experienceAreaPath
