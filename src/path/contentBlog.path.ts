import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const contentBlogPath = {
    ...objectPathMenu('cm-blog'),
    trash: pathBasenameRoute('cm-blog') + '/trash',
    preview: (id?: string|number) => pathBasenameRoute('cm-blog') + '/' + id + '/detail/preview',
}

export default contentBlogPath
