import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const contentBlogPath = {
    ...objectPathMenu('cm-blog'),
    trash: pathBasenameRoute('cm-blog') + '/trash',
}

export default contentBlogPath
