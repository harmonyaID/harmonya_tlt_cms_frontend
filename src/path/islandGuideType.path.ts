import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'
import { islandGuideSetting } from '@/path/islandGuideManage.path.ts'

const islandGuideTypePath = {
    ...objectPathMenu(islandGuideSetting.default + '/type'),
    trash: pathBasenameRoute(islandGuideSetting.default + '/type') + '/trash',
}

export default islandGuideTypePath
