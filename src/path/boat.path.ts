import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const boatPath = {
    ...objectPathMenu('boat'),
    trash: pathBasenameRoute('boat') + '/trash',
}

export default boatPath
