import { pathBasenameRoute } from '@/config/base/objectPath.config.js'

const base = pathBasenameRoute('boat-inquiry')
export const boatInquiryGeneral = {
    root: base,
    main: (slug: string = ':slug') => base + '/' + slug,
    add: (slug: string = ':slug') => base + '/' + slug + '/add',
}
