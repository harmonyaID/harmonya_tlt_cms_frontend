import {
    objectPathMenu,
    pathBasenameRoute,
} from '@/config/base/objectPath.config.js'

const boatInquiryTransferPath = {
    ...objectPathMenu('boat-inquiry-transfer'),
    trash: pathBasenameRoute('boat-inqury-transfer') + '/trash',
}

const boatInquiryPrivatePath = {
    ...objectPathMenu('boat-inquiry-private'),
    trash: pathBasenameRoute('boat-inqury-private') + '/trash',
}

export const boatInquiryPath = {
    main: pathBasenameRoute('boat-inquiry'),
    transfer: { ...boatInquiryTransferPath },
    private: { ...boatInquiryPrivatePath },
}
