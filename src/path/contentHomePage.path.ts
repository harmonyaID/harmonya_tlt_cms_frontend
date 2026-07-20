import { objectPathMenu } from '@/config/base/objectPath.config.js'

const main = '/cm-home-page'

// const contentHomePagePath = {
//     main,
//     page: main + '/page',
//     banner: main + '/banner',
// }
const contentHomePagePath = { ...objectPathMenu('cm-home-page') }

export default contentHomePagePath
