import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'
import { experienceSetting } from '@/path/experienceManage.path.ts'
import { islandGuideSetting } from '@/path/islandGuideManage.path.ts'

const islandGuideAreaPath = {
    ...objectPathMenu(islandGuideSetting.default + '/area'),
    trash: pathBasenameRoute(islandGuideSetting.default + '/area') + '/trash',
}

export default islandGuideAreaPath
