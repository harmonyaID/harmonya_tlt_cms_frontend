import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'
import { experienceSetting } from '@/path/experienceManage.path.ts'

const experienceTypePath = {
    ...objectPathMenu(experienceSetting.default + '/type'),
    trash: pathBasenameRoute(experienceSetting.default + '/type') + '/trash',
}

export default experienceTypePath
