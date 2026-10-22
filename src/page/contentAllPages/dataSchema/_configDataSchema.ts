// import {
//     BLOG_PAGE_TYPE,
//     OFFER_PAGE_TYPE,
//     STAY_PAGE_TYPE,
// } from '@/page/contentAllPages/dataSchema/_typeDataSchema.ts'
import {
    TEMPLATE_BLOG,
    TEMPLATE_BOAT_TRANSFER,
    TEMPLATE_EXPERIENCE,
    TEMPLATE_INFO_CONTACT,
    TEMPLATE_INFO_FAQ,
    TEMPLATE_INFO_PRES_AND_MEDIA,
    TEMPLATE_INFO_PRIVACY_POLICY,
    TEMPLATE_INFO_TNC,
    TEMPLATE_ISLAND_GUIDE,
    TEMPLATE_OFFER,
    TEMPLATE_PROPERTY,
} from '@/config/pageTemplate.config.ts'
import dataBlogPage from '@/page/contentAllPages/dataSchema/dataBlogPage.ts'
import { dataContactUsPage } from '@/page/contentAllPages/dataSchema/dataContactUsPage.ts'
import dataExperiencePage from '@/page/contentAllPages/dataSchema/dataExperiencePage.ts'
import {
    dataFAQInfoPage,
    dataGeneralAndContentInfoPage,
    dataGeneralInfoPage,
} from '@/page/contentAllPages/dataSchema/dataInfoPage.ts'
import dataIslandGuidePage from '@/page/contentAllPages/dataSchema/dataIslandGuidePage.ts'
import dataOfferPage from '@/page/contentAllPages/dataSchema/dataOfferPage.ts'
import dataPropertyPage from '@/page/contentAllPages/dataSchema/dataPropertyPage.ts'
import { dataBoatTransferPage } from '@/page/contentAllPages/dataSchema/dataBoatTransferPage.ts'

const configDataSchema = {
    [TEMPLATE_BLOG]: dataBlogPage,
    [TEMPLATE_PROPERTY]: dataPropertyPage,
    [TEMPLATE_OFFER]: dataOfferPage,
    [TEMPLATE_EXPERIENCE]: dataExperiencePage,
    [TEMPLATE_ISLAND_GUIDE]: dataIslandGuidePage,
    [TEMPLATE_BOAT_TRANSFER]: dataBoatTransferPage,

    // Info Page
    [TEMPLATE_INFO_CONTACT]: dataContactUsPage,
    [TEMPLATE_INFO_FAQ]: dataFAQInfoPage,
    [TEMPLATE_INFO_TNC]: dataGeneralAndContentInfoPage,
    [TEMPLATE_INFO_PRIVACY_POLICY]: dataGeneralAndContentInfoPage,
    [TEMPLATE_INFO_PRES_AND_MEDIA]: dataGeneralInfoPage,
}

export default configDataSchema
