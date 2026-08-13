import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const experienceTypePath = {
    ...objectPathMenu('experience-type'),
    trash: pathBasenameRoute('experience-type') + '/trash',
}

export default experienceTypePath
