import { objectPathMenu, pathBasenameRoute } from '@/config/base/objectPath.config.js'

const experienceInquiryFormPath = {
    ...objectPathMenu('experience-inquiry-form'),
    trash: pathBasenameRoute('experience-inquiry-form') + '/trash',
}

export default experienceInquiryFormPath
