import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const propertyPath = {
    ...objectPathMenu('property'),
    trash: pathBasenameRoute('property') + '/trash',
}

export default propertyPath
