import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'
import { experienceSetting } from '@/path/experienceManage.path.ts'

const experienceAreaPath = {
    ...objectPathMenu(experienceSetting.default + '/area'),
    trash: pathBasenameRoute(experienceSetting.default + '/area') + '/trash',
}

export default experienceAreaPath
