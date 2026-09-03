import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

export const boatInquiryTransferPath = {
    ...objectPathMenu('boat-inquiry-transfer'),
    trash: pathBasenameRoute('boat-inqury-transfer') + '/trash',
}

export const boatInquiryPrivatePath = {
    ...objectPathMenu('boat-inquiry-private'),
    trash: pathBasenameRoute('boat-inqury-private') + '/trash',
}
